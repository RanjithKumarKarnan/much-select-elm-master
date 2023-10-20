module Option exposing
    ( Option(..)
    , SearchResults
    , activate
    , activateIfEqualRemoveHighlightElse
    , decodeSearchResults
    , decoder
    , decoderWithAgeAndOutputStyle
    , deselect
    , encode
    , encodeSearchResult
    , equal
    , getDescription
    , getMaybeOptionSearchFilter
    , getOptionDisplay
    , getOptionGroup
    , getOptionLabel
    , getOptionSelectedIndex
    , getOptionValidationErrors
    , getOptionValue
    , getOptionValueAsString
    , getSlot
    , hasSelectedItemIndex
    , highlight
    , isBelowSearchFilterScore
    , isCustomOption
    , isEmpty
    , isEmptyOrHasEmptyValue
    , isHighlightable
    , isHighlighted
    , isInvalid
    , isPendingValidation
    , isSelected
    , isSelectedHighlighted
    , isValid
    , isValueInListOfStrings
    , merge
    , newDisabledOption
    , newSelectedDatalistOption
    , newSelectedEmptyDatalistOption
    , newSelectedOption
    , optionEqualsOptionValue
    , optionsHaveEqualValues
    , removeHighlight
    , select
    , setDescriptionWithString
    , setGroupWithString
    , setLabel
    , setLabelWithString
    , setMaybeSortRank
    , setOptionDisplay
    , setOptionDisplayAge
    , setOptionSearchFilter
    , setOptionValue
    , setOptionValueErrors
    , setPart
    , singleSelectViewCustomHtmlValueHtml
    , test_newDatalistOption
    , test_newEmptyDatalistOption
    , test_newEmptySelectedDatalistOption
    , test_newFancyCustomOptionWithCleanString
    , test_newFancyCustomOptionWithLabelAndMaybeCleanString
    , test_newFancyCustomOptionWithMaybeCleanString
    , test_newFancyOption
    , test_newFancyOptionWithMaybeCleanString
    , test_newSlottedOption
    , test_optionToDebuggingString
    , toDatalistOption
    , toValueLabelTuple
    , toggleHighlight
    , transformOptionForOutputStyle
    )

import DatalistOption
import FancyOption
import Html exposing (Html)
import Html.Extra
import Json.Decode
import Json.Encode
import OptionDescription exposing (OptionDescription)
import OptionDisplay exposing (OptionDisplay)
import OptionGroup exposing (OptionGroup)
import OptionLabel exposing (OptionLabel(..), optionLabelToString)
import OptionPart exposing (OptionPart)
import OptionSearchFilter exposing (OptionSearchFilter, OptionSearchFilterWithValue, OptionSearchResult)
import OptionSlot exposing (OptionSlot)
import OptionValue exposing (OptionValue(..))
import SelectionMode exposing (OutputStyle(..), SelectionConfig, SelectionMode(..))
import SlottedOption
import SortRank exposing (SortRank(..))
import TransformAndValidate exposing (ValidationErrorMessage, ValidationFailureMessage)


type Option
    = FancyOption FancyOption.FancyOption
    | DatalistOption DatalistOption.DatalistOption
    | SlottedOption SlottedOption.SlottedOption


toDatalistOption : Option -> Option
toDatalistOption option =
    case option of
        FancyOption fancyOption ->
            DatalistOption
                (FancyOption.getOptionValue fancyOption
                    |> DatalistOption.new
                    |> DatalistOption.setOptionDisplay
                        (FancyOption.getOptionDisplay fancyOption)
                )

        DatalistOption _ ->
            option

        SlottedOption slottedOption ->
            DatalistOption
                (SlottedOption.getOptionValue slottedOption
                    |> DatalistOption.new
                    |> DatalistOption.setOptionDisplay
                        (SlottedOption.getOptionDisplay slottedOption)
                )


setOptionValue : OptionValue -> Option -> Option
setOptionValue optionValue option =
    case option of
        FancyOption fancyOption ->
            FancyOption (FancyOption.setOptionValue optionValue fancyOption)

        DatalistOption datalistOption ->
            DatalistOption (DatalistOption.setOptionValue optionValue datalistOption)

        SlottedOption slottedOption ->
            SlottedOption (SlottedOption.setOptionValue optionValue slottedOption)


getOptionLabel : Option -> OptionLabel
getOptionLabel option =
    case option of
        FancyOption fancyOption ->
            FancyOption.getOptionLabel fancyOption

        DatalistOption datalistOption ->
            DatalistOption.getOptionLabel datalistOption

        SlottedOption _ ->
            OptionLabel.new ""


setLabel : OptionLabel -> Option -> Option
setLabel label option =
    case option of
        FancyOption fancyOption ->
            FancyOption (FancyOption.setLabel label fancyOption)

        DatalistOption _ ->
            option

        SlottedOption _ ->
            option


setLabelWithString : String -> Maybe String -> Option -> Option
setLabelWithString string maybeCleanString option =
    let
        newOptionLabel =
            OptionLabel.newWithCleanLabel string maybeCleanString
    in
    setLabel newOptionLabel option


setDescription : OptionDescription -> Option -> Option
setDescription description option =
    case option of
        FancyOption fancyOption ->
            FancyOption (FancyOption.setDescription description fancyOption)

        DatalistOption _ ->
            option

        SlottedOption _ ->
            option


setDescriptionWithString : String -> Option -> Option
setDescriptionWithString string option =
    let
        newOptionDescription =
            OptionDescription.new string
    in
    setDescription newOptionDescription option


setGroup : OptionGroup -> Option -> Option
setGroup optionGroup option =
    case option of
        FancyOption fancyOption ->
            FancyOption (FancyOption.setOptionGroup optionGroup fancyOption)

        DatalistOption _ ->
            option

        SlottedOption _ ->
            option


setGroupWithString : String -> Option -> Option
setGroupWithString string option =
    let
        newOptionGroup =
            OptionGroup.new string
    in
    setGroup newOptionGroup option


setOptionDisplay : OptionDisplay -> Option -> Option
setOptionDisplay optionDisplay option =
    case option of
        FancyOption fancyOption ->
            FancyOption (FancyOption.setOptionDisplay optionDisplay fancyOption)

        DatalistOption datalistOption ->
            DatalistOption (DatalistOption.setOptionDisplay optionDisplay datalistOption)

        SlottedOption slottedOption ->
            SlottedOption (SlottedOption.setOptionDisplay optionDisplay slottedOption)


setOptionDisplayAge : OptionDisplay.OptionAge -> Option -> Option
setOptionDisplayAge optionAge option =
    setOptionDisplay (option |> getOptionDisplay |> OptionDisplay.setAge optionAge) option


setOptionSearchFilter : Maybe OptionSearchFilter -> Option -> Option
setOptionSearchFilter maybeOptionSearchFilter option =
    case option of
        FancyOption fancyOption ->
            FancyOption (FancyOption.setOptionSearchFilter maybeOptionSearchFilter fancyOption)

        DatalistOption _ ->
            option

        SlottedOption _ ->
            option


setMaybeSortRank : Maybe SortRank -> Option -> Option
setMaybeSortRank maybeSortRank option =
    setLabel (option |> getOptionLabel |> OptionLabel.setMaybeSortRank maybeSortRank) option


setPart : OptionPart -> Option -> Option
setPart optionPart option =
    case option of
        FancyOption fancyOption ->
            FancyOption (FancyOption.setPart optionPart fancyOption)

        DatalistOption _ ->
            option

        SlottedOption _ ->
            option


newSelectedOption : Int -> String -> Maybe String -> Option
newSelectedOption index labelString maybeCleanLabel =
    FancyOption (FancyOption.newSelectedOption index labelString maybeCleanLabel)


newDisabledOption : String -> Maybe String -> Option
newDisabledOption string maybeCleanLabel =
    FancyOption (FancyOption.newDisabledOption string maybeCleanLabel)


newSelectedEmptyDatalistOption : Int -> Option
newSelectedEmptyDatalistOption int =
    DatalistOption (DatalistOption.newSelectedEmpty int)


newSelectedDatalistOption : Int -> String -> Option
newSelectedDatalistOption int string =
    DatalistOption (DatalistOption.newSelected (OptionValue.stringToOptionValue string) int)


isSelected : Option -> Bool
isSelected option =
    case option of
        FancyOption fancyOption ->
            FancyOption.isSelected fancyOption

        DatalistOption datalistOption ->
            DatalistOption.isSelected datalistOption

        SlottedOption slottedOption ->
            SlottedOption.isSelected slottedOption


getOptionDisplay : Option -> OptionDisplay
getOptionDisplay option =
    case option of
        FancyOption fancyOption ->
            FancyOption.getOptionDisplay fancyOption

        DatalistOption datalistOption ->
            DatalistOption.getOptionDisplay datalistOption

        SlottedOption slottedOption ->
            SlottedOption.getOptionDisplay slottedOption


getOptionSelectedIndex : Option -> Int
getOptionSelectedIndex option =
    case option of
        FancyOption fancyOption ->
            FancyOption.getOptionSelectedIndex fancyOption

        DatalistOption datalistOption ->
            DatalistOption.getOptionSelectedIndex datalistOption

        SlottedOption slottedOption ->
            SlottedOption.getOptionSelectedIndex slottedOption


hasSelectedItemIndex : Int -> Option -> Bool
hasSelectedItemIndex selectedItemIndex option =
    getOptionSelectedIndex option == selectedItemIndex


getOptionValue : Option -> OptionValue
getOptionValue option =
    case option of
        FancyOption fancyOption ->
            FancyOption.getOptionValue fancyOption

        DatalistOption datalistOption ->
            DatalistOption.getOptionValue datalistOption

        SlottedOption slottedOption ->
            SlottedOption.getOptionValue slottedOption


getOptionValueAsString : Option -> String
getOptionValueAsString option =
    case option |> getOptionValue of
        OptionValue string ->
            string

        EmptyOptionValue ->
            ""


getDescription : Option -> OptionDescription
getDescription option =
    case option of
        FancyOption fancyOption ->
            FancyOption.getOptionDescription fancyOption

        DatalistOption _ ->
            OptionDescription.noDescription

        SlottedOption _ ->
            OptionDescription.noDescription


getMaybeOptionSearchFilter : Option -> Maybe OptionSearchFilter
getMaybeOptionSearchFilter option =
    case option of
        FancyOption fancyOption ->
            FancyOption.getMaybeOptionSearchFilter fancyOption

        DatalistOption _ ->
            Nothing

        SlottedOption _ ->
            Nothing


isBelowSearchFilterScore : Int -> Option -> Bool
isBelowSearchFilterScore score option =
    case getMaybeOptionSearchFilter option of
        Just optionSearchFilter ->
            score >= optionSearchFilter.bestScore

        Nothing ->
            False


isValueInListOfStrings : List String -> Option -> Bool
isValueInListOfStrings possibleValues option =
    List.any (\possibleValue -> getOptionValueAsString option == possibleValue) possibleValues


optionsHaveEqualValues : Option -> Option -> Bool
optionsHaveEqualValues a b =
    OptionValue.equals (getOptionValue a) (getOptionValue b)


optionEqualsOptionValue : OptionValue -> Option -> Bool
optionEqualsOptionValue optionValue option =
    OptionValue.equals (getOptionValue option) optionValue


highlight : Option -> Option
highlight option =
    case option of
        FancyOption fancyOption ->
            FancyOption (FancyOption.highlightOption fancyOption)

        DatalistOption _ ->
            option

        SlottedOption slottedOption ->
            SlottedOption (SlottedOption.highlightOption slottedOption)


removeHighlight : Option -> Option
removeHighlight option =
    case option of
        FancyOption fancyOption ->
            FancyOption (FancyOption.removeHighlightFromOption fancyOption)

        DatalistOption _ ->
            option

        SlottedOption slottedOption ->
            SlottedOption (SlottedOption.removeHighlightFromOption slottedOption)


toggleHighlight : Option -> Option
toggleHighlight option =
    if isHighlighted option then
        removeHighlight option

    else
        highlight option


isHighlighted : Option -> Bool
isHighlighted option =
    case option of
        FancyOption fancyOption ->
            FancyOption.isOptionHighlighted fancyOption

        DatalistOption _ ->
            False

        SlottedOption slottedOption ->
            SlottedOption.isOptionHighlighted slottedOption


isHighlightable : SelectionMode -> Option -> Bool
isHighlightable selectionMode option =
    case option of
        FancyOption fancyOption ->
            FancyOption.optionIsHighlightable selectionMode fancyOption

        DatalistOption _ ->
            False

        SlottedOption slottedOption ->
            SlottedOption.optionIsHighlightable selectionMode slottedOption


select : Int -> Option -> Option
select selectionIndex option =
    case option of
        FancyOption fancyOption ->
            FancyOption (FancyOption.select selectionIndex fancyOption)

        DatalistOption datalistOption ->
            DatalistOption (DatalistOption.select selectionIndex datalistOption)

        SlottedOption slottedOption ->
            SlottedOption (SlottedOption.select selectionIndex slottedOption)


deselect : Option -> Option
deselect option =
    case option of
        FancyOption fancyOption ->
            FancyOption (FancyOption.deselect fancyOption)

        DatalistOption datalistOption ->
            DatalistOption (DatalistOption.deselect datalistOption)

        SlottedOption slottedOption ->
            SlottedOption (SlottedOption.deselect slottedOption)


isSelectedHighlighted : Option -> Bool
isSelectedHighlighted option =
    case option of
        FancyOption fancyOption ->
            FancyOption.isOptionSelectedHighlighted fancyOption

        DatalistOption _ ->
            False

        SlottedOption slottedOption ->
            SlottedOption.isOptionSelectedHighlighted slottedOption


activate : Option -> Option
activate option =
    case option of
        FancyOption fancyOption ->
            FancyOption (FancyOption.activate fancyOption)

        DatalistOption datalistOption ->
            DatalistOption (DatalistOption.activate datalistOption)

        SlottedOption slottedOption ->
            SlottedOption (SlottedOption.activate slottedOption)


activateIfEqualRemoveHighlightElse : OptionValue -> Option -> Option
activateIfEqualRemoveHighlightElse optionValue option =
    if optionEqualsOptionValue optionValue option then
        activate option

    else
        option


isEmpty : Option -> Bool
isEmpty option =
    case option of
        FancyOption fancyOption ->
            FancyOption.isEmptyOption fancyOption

        DatalistOption datalistOption ->
            DatalistOption.isEmpty datalistOption

        SlottedOption _ ->
            False


isEmptyOrHasEmptyValue : Option -> Bool
isEmptyOrHasEmptyValue option =
    isEmpty option || (getOptionValue option |> OptionValue.isEmpty)


toValueLabelTuple : Option -> ( String, String )
toValueLabelTuple option =
    ( getOptionValueAsString option, getOptionLabel option |> optionLabelToString )


isCustomOption : Option -> Bool
isCustomOption option =
    case option of
        FancyOption fancyOption ->
            FancyOption.isCustomOption fancyOption

        DatalistOption _ ->
            False

        SlottedOption _ ->
            False


getOptionGroup : Option -> OptionGroup
getOptionGroup option =
    case option of
        FancyOption fancyOption ->
            FancyOption.getOptionGroup fancyOption

        DatalistOption _ ->
            OptionGroup.new ""

        SlottedOption _ ->
            OptionGroup.new ""


decoder : Json.Decode.Decoder Option
decoder =
    Json.Decode.oneOf
        [ Json.Decode.map FancyOption FancyOption.decoder
        , Json.Decode.map DatalistOption DatalistOption.decoder
        , Json.Decode.map SlottedOption SlottedOption.decoder
        ]


decoderWithAgeAndOutputStyle : OptionDisplay.OptionAge -> OutputStyle -> Json.Decode.Decoder Option
decoderWithAgeAndOutputStyle optionAge outputStyle =
    case outputStyle of
        CustomHtml ->
            Json.Decode.oneOf
                [ Json.Decode.map FancyOption (FancyOption.decoderWithAge optionAge)
                , Json.Decode.map SlottedOption (SlottedOption.decoderWithAge optionAge)
                ]

        Datalist ->
            Json.Decode.map DatalistOption DatalistOption.decoder


encode : Option -> Json.Decode.Value
encode option =
    case option of
        FancyOption fancyOption ->
            FancyOption.encode fancyOption

        DatalistOption datalistOption ->
            DatalistOption.encode datalistOption

        SlottedOption slottedOption ->
            SlottedOption.encode slottedOption


type alias SearchResults =
    { optionSearchFilters : List OptionSearchFilterWithValue
    , searchNonce : Int
    , isClearingSearch : Bool
    }


encodeSearchResult : Option -> Json.Encode.Value
encodeSearchResult option =
    Json.Encode.object
        [ ( "value", Json.Encode.string (getOptionValueAsString option) )
        , ( "searchFilter"
          , case getMaybeOptionSearchFilter option of
                Just optionSearchFilter ->
                    OptionSearchFilter.encode optionSearchFilter

                Nothing ->
                    Json.Encode.null
          )
        ]


decodeSearchResults : Json.Decode.Decoder SearchResults
decodeSearchResults =
    Json.Decode.map3
        SearchResults
        (Json.Decode.field "options"
            (Json.Decode.list
                (Json.Decode.map2
                    (\value searchFilter ->
                        { value = value, maybeSearchFilter = searchFilter }
                    )
                    (Json.Decode.field "value" OptionValue.decoder)
                    (Json.Decode.field "searchFilter"
                        (Json.Decode.nullable OptionSearchFilter.decoder)
                    )
                )
            )
        )
        (Json.Decode.field "searchNonce" Json.Decode.int)
        (Json.Decode.field "clearingSearch" Json.Decode.bool)


transformOptionForOutputStyle : OutputStyle -> Option -> Maybe Option
transformOptionForOutputStyle outputStyle option =
    case outputStyle of
        SelectionMode.CustomHtml ->
            case option of
                FancyOption _ ->
                    Just option

                DatalistOption dataListOption ->
                    FancyOption.new
                        (DatalistOption.getOptionValueAsString dataListOption)
                        (DatalistOption.getOptionValueAsString dataListOption |> Just)
                        |> FancyOption.setOptionDisplay (DatalistOption.getOptionDisplay dataListOption)
                        |> FancyOption.setOptionValue (DatalistOption.getOptionValue dataListOption)
                        |> FancyOption
                        |> Just

                SlottedOption _ ->
                    Nothing

        SelectionMode.Datalist ->
            case option of
                FancyOption fancyOption ->
                    fancyOption
                        |> FancyOption.getOptionValue
                        |> DatalistOption.new
                        |> DatalistOption.setOptionDisplay (FancyOption.getOptionDisplay fancyOption)
                        |> DatalistOption
                        |> Just

                DatalistOption _ ->
                    Just option

                SlottedOption _ ->
                    Nothing


equal : Option -> Option -> Bool
equal optionA optionB =
    optionA == optionB


setOptionValueErrors : List ValidationFailureMessage -> Option -> Option
setOptionValueErrors validationFailures option =
    let
        newOptionDisplay =
            option
                |> getOptionDisplay
                |> OptionDisplay.setErrors validationFailures
    in
    setOptionDisplay newOptionDisplay option


getOptionValidationErrors : Option -> List ValidationFailureMessage
getOptionValidationErrors option =
    OptionDisplay.getErrors (getOptionDisplay option)


isInvalid : Option -> Bool
isInvalid option =
    OptionDisplay.isInvalid (getOptionDisplay option)


isPendingValidation : Option -> Bool
isPendingValidation option =
    OptionDisplay.isPendingValidation (getOptionDisplay option)


isValid : Option -> Bool
isValid option =
    not (isInvalid option || isPendingValidation option)


getSlot : Option -> OptionSlot
getSlot option =
    case option of
        FancyOption _ ->
            OptionSlot.empty

        DatalistOption _ ->
            OptionSlot.empty

        SlottedOption slottedOption ->
            SlottedOption.getOptionSlot slottedOption


merge : Option -> Option -> Option
merge optionA optionB =
    case optionA of
        FancyOption fancyOptionA ->
            case optionB of
                FancyOption fancyOptionB ->
                    FancyOption (FancyOption.merge fancyOptionA fancyOptionB)

                _ ->
                    optionA

        DatalistOption datalistOptionA ->
            case optionB of
                DatalistOption datalistOptionB ->
                    DatalistOption (DatalistOption.merge datalistOptionA datalistOptionB)

                _ ->
                    optionA

        SlottedOption _ ->
            optionA


singleSelectViewCustomHtmlValueHtml : Option -> Html msg
singleSelectViewCustomHtmlValueHtml option =
    case option of
        FancyOption fancyOption ->
            FancyOption.toSingleSelectValueHtml fancyOption

        DatalistOption _ ->
            Html.Extra.nothing

        SlottedOption _ ->
            Html.Extra.nothing


test_optionToDebuggingString : Option -> String
test_optionToDebuggingString option =
    case option of
        FancyOption fancyOption ->
            FancyOption.test_optionToDebuggingString fancyOption

        DatalistOption datalistOption ->
            DatalistOption.test_optionToDebuggingString datalistOption

        SlottedOption slottedOption ->
            SlottedOption.test_optionToDebuggingString slottedOption


test_newFancyOption : String -> Option
test_newFancyOption string =
    test_newFancyOptionWithMaybeCleanString string Nothing


test_newFancyOptionWithMaybeCleanString : String -> Maybe String -> Option
test_newFancyOptionWithMaybeCleanString string maybeString =
    FancyOption (FancyOption.new string maybeString)


test_newFancyCustomOptionWithCleanString : String -> Option
test_newFancyCustomOptionWithCleanString string =
    test_newFancyCustomOptionWithMaybeCleanString string (Just string)


test_newFancyCustomOptionWithMaybeCleanString : String -> Maybe String -> Option
test_newFancyCustomOptionWithMaybeCleanString valueString maybeString =
    test_newFancyCustomOptionWithLabelAndMaybeCleanString valueString valueString maybeString


test_newFancyCustomOptionWithLabelAndMaybeCleanString : String -> String -> Maybe String -> Option
test_newFancyCustomOptionWithLabelAndMaybeCleanString valueString labelString maybeString =
    FancyOption (FancyOption.newCustomOption valueString labelString maybeString)


test_newDatalistOption : String -> Option
test_newDatalistOption string =
    DatalistOption (DatalistOption.new (OptionValue.stringToOptionValue string))


test_newEmptyDatalistOption : Option
test_newEmptyDatalistOption =
    DatalistOption (DatalistOption.new OptionValue.EmptyOptionValue)


test_newEmptySelectedDatalistOption : Int -> Option
test_newEmptySelectedDatalistOption int =
    DatalistOption (DatalistOption.newSelectedEmpty int)


test_newSlottedOption : String -> Option
test_newSlottedOption string =
    SlottedOption (SlottedOption.test_new string)
