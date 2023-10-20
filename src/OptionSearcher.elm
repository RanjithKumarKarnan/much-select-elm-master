module OptionSearcher exposing (decodeSearchParams, doesSearchStringFindNothing, encodeSearchParams, simpleMatch, updateOptionsWithSearchString, updateOrAddCustomOption, updateSearchResultInOption)

import DropdownOptions exposing (DropdownOptions, getSearchFilters)
import Fuzzy exposing (Result, match)
import Json.Decode
import Json.Encode
import Option exposing (Option(..))
import OptionDescription
import OptionGroup
import OptionLabel exposing (optionLabelToSearchString, optionLabelToString)
import OptionList exposing (OptionList)
import OptionPresentor exposing (tokenize)
import OptionSearchFilter exposing (OptionSearchFilter, OptionSearchResult, descriptionHandicap, groupHandicap)
import OutputStyle exposing (CustomOptions(..), SearchStringMinimumLength(..), decodeSearchStringMinimumLength)
import PositiveInt exposing (PositiveInt)
import SearchString exposing (SearchString)
import SelectionMode exposing (SelectionConfig, getCustomOptionHint)
import TransformAndValidate


simpleMatch : String -> String -> Result
simpleMatch needle hay =
    match [] [ " " ] needle hay



{- This matcher is for the option groups. We add a penalty of 50 points because we want matches on the label and
   description to show up first.
-}


groupMatch : String -> String -> Result
groupMatch needle hay =
    match [] [ " " ] needle hay


search : String -> Option -> OptionSearchResult
search string option =
    { labelMatch =
        simpleMatch
            (string |> String.toLower)
            (option
                |> Option.getOptionLabel
                |> optionLabelToSearchString
            )
    , descriptionMatch =
        simpleMatch
            (string |> String.toLower)
            (option
                |> Option.getDescription
                |> OptionDescription.toSearchString
            )
    , groupMatch =
        groupMatch
            (string |> String.toLower)
            (option
                |> Option.getOptionGroup
                |> OptionGroup.toSearchString
            )
    }


updateSearchResultInOption : SearchString -> Option -> Option
updateSearchResultInOption searchString option =
    let
        -- if the searchString has a trailing space it doesn't match with certain types of options
        trimmedSearchString =
            SearchString.toString searchString
                |> String.trim

        searchResult : OptionSearchResult
        searchResult =
            search trimmedSearchString option

        labelTokens =
            tokenize (option |> Option.getOptionLabel |> optionLabelToString) searchResult.labelMatch

        descriptionTokens =
            tokenize (option |> Option.getDescription |> OptionDescription.toSearchString) searchResult.descriptionMatch

        groupTokens =
            tokenize (option |> Option.getOptionGroup |> OptionGroup.toSearchString) searchResult.groupMatch

        bestScore =
            Maybe.withDefault OptionSearchFilter.impossiblyLowScore
                (List.minimum
                    [ searchResult.labelMatch.score
                    , descriptionHandicap searchResult.descriptionMatch.score
                    , groupHandicap searchResult.groupMatch.score
                    ]
                )

        totalScore =
            List.sum
                [ searchResult.labelMatch.score
                , descriptionHandicap searchResult.descriptionMatch.score
                , groupHandicap searchResult.groupMatch.score
                ]

        cappedBestScore =
            -- Just putting our thumb on the scale here for the sake of substring matches
            if bestScore > 100 then
                if String.contains (SearchString.toString searchString |> String.toLower) (option |> Option.getOptionLabel |> OptionLabel.optionLabelToSearchString |> String.toLower) then
                    if String.length (SearchString.toString searchString) < 2 then
                        bestScore

                    else if String.length (SearchString.toString searchString) < 3 then
                        50

                    else if String.length (SearchString.toString searchString) < 4 then
                        20

                    else if String.length (SearchString.toString searchString) < 5 then
                        15

                    else if String.length (SearchString.toString searchString) < 6 then
                        10

                    else if String.length (SearchString.toString searchString) >= 6 then
                        10

                    else
                        bestScore

                else
                    bestScore

            else
                bestScore
    in
    Option.setOptionSearchFilter
        (Just
            (OptionSearchFilter.new
                totalScore
                cappedBestScore
                labelTokens
                descriptionTokens
                groupTokens
            )
        )
        option


updateOrAddCustomOption : SearchString -> SelectionConfig -> OptionList -> OptionList
updateOrAddCustomOption searchString selectionMode options =
    let
        ( showCustomOption, newSearchString ) =
            if SearchString.length searchString > 0 then
                case SelectionMode.getCustomOptions selectionMode of
                    AllowCustomOptions _ transformAndValidate ->
                        case TransformAndValidate.transformAndValidateSearchString transformAndValidate searchString of
                            TransformAndValidate.ValidationPass str _ ->
                                ( True, SearchString.new str False )

                            TransformAndValidate.ValidationFailed _ _ _ ->
                                ( False, searchString )

                            TransformAndValidate.ValidationPending _ _ ->
                                ( False, searchString )

                    NoCustomOptions ->
                        ( False, searchString )

            else
                ( False, searchString )

        -- If we have an exact match with an existing option don't show the custom
        --  option.
        noExactOptionLabelMatch =
            options
                |> OptionList.any
                    (\option_ ->
                        (option_
                            |> Option.getOptionLabel
                            |> optionLabelToSearchString
                        )
                            == SearchString.toLower searchString
                            && not (Option.isCustomOption option_)
                    )
                |> not
    in
    if showCustomOption && noExactOptionLabelMatch then
        OptionList.prependCustomOption
            (selectionMode |> getCustomOptionHint)
            newSearchString
            (OptionList.removeUnselectedCustomOptions options)

    else
        OptionList.removeUnselectedCustomOptions options


updateOptionsWithSearchString : SearchString -> SearchStringMinimumLength -> OptionList -> OptionList
updateOptionsWithSearchString searchString searchStringMinimumLength optionList =
    let
        doOptionFiltering =
            case searchStringMinimumLength of
                FixedSearchStringMinimumLength positiveInt ->
                    PositiveInt.lessThanOrEqualTo positiveInt (SearchString.length searchString)

                NoMinimumToSearchStringLength ->
                    True
    in
    if doOptionFiltering then
        optionList
            |> OptionList.map
                (updateSearchResultInOption searchString)

    else
        optionList
            |> OptionList.map
                (\option ->
                    Option.setOptionSearchFilter
                        Nothing
                        option
                )


doesSearchStringFindNothing : SearchString -> SearchStringMinimumLength -> DropdownOptions -> Bool
doesSearchStringFindNothing searchString searchStringMinimumLength options =
    case searchStringMinimumLength of
        NoMinimumToSearchStringLength ->
            True

        FixedSearchStringMinimumLength num ->
            if SearchString.length searchString <= PositiveInt.toInt num then
                False

            else
                options
                    |> getSearchFilters
                    |> List.all
                        (\maybeOptionSearchFilter ->
                            case maybeOptionSearchFilter of
                                Nothing ->
                                    False

                                Just optionSearchFilter ->
                                    optionSearchFilter.bestScore > 1000
                        )


encodeSearchParams : SearchString -> SearchStringMinimumLength -> Int -> Bool -> Json.Encode.Value
encodeSearchParams searchString searchStringMinimumLength searchNonce isClearingSearch =
    Json.Encode.object
        [ ( "searchString", SearchString.encode searchString )
        , ( "searchStringMinimumLength", OutputStyle.encodeSearchStringMinimumLength searchStringMinimumLength )
        , ( "searchNonce", Json.Encode.int searchNonce )
        , ( "isClearingSearch", Json.Encode.bool isClearingSearch )
        ]


type alias SearchParams =
    { searchString : SearchString
    , searchStringMinimumLength : SearchStringMinimumLength
    , searchNonce : Int
    , clearingSearch : Bool
    }


decodeSearchParams : Json.Decode.Decoder SearchParams
decodeSearchParams =
    Json.Decode.map4
        SearchParams
        (Json.Decode.field "searchString" SearchString.decode)
        (Json.Decode.field "searchStringMinimumLength" decodeSearchStringMinimumLength)
        (Json.Decode.field "searchNonce" Json.Decode.int)
        (Json.Decode.field "isClearingSearch" Json.Decode.bool)
