module OptionSorting exposing (OptionSort(..), sortOptions, sortOptionsBySearchFilterTotalScore, stringToOptionSort, toString)

import List.Extra
import Option exposing (Option, getMaybeOptionSearchFilter, getOptionGroup, getOptionLabel)
import OptionLabel exposing (getSortRank, optionLabelToString)
import SortRank exposing (getAutoIndexForSorting)


type OptionSort
    = NoSorting
    | SortByOptionLabel


stringToOptionSort : String -> Result String OptionSort
stringToOptionSort string =
    case string of
        "no-sorting" ->
            Ok NoSorting

        "by-option-label" ->
            Ok SortByOptionLabel

        _ ->
            Err ("Sorting the options by \"" ++ string ++ "\" is not supported")


toString : OptionSort -> String
toString optionSort =
    case optionSort of
        NoSorting ->
            "no-sorting"

        SortByOptionLabel ->
            "by-option-label"


sortFunction : OptionSort -> (List Option -> List Option)
sortFunction optionSort_ =
    case optionSort_ of
        NoSorting ->
            sortOptionsByRank

        SortByOptionLabel ->
            sortOptionsByLabel


sortOptionsBySearchFilterTotalScore : List Option -> List Option
sortOptionsBySearchFilterTotalScore options =
    -- TODO I might not this any more.
    List.sortBy
        (\option ->
            option
                |> getMaybeOptionSearchFilter
                |> Maybe.map .totalScore
                |> Maybe.withDefault 100000
        )
        options



{- This name is a little deceptive, what it's going to do is used the specified sorting
   method to sort the groups, then the options inside of those groups.
-}


sortOptions : OptionSort -> List Option -> List Option
sortOptions optionSort options =
    options
        |> List.Extra.gatherWith
            (\optionA optionB ->
                getOptionGroup optionA == getOptionGroup optionB
            )
        |> List.map (\( option_, options_ ) -> List.append [ option_ ] options_)
        |> List.map (\options_ -> sortFunction optionSort options_)
        |> List.concat



-- TODO This isn't done yet. It needs to be more complex.
--  It should sort primarily by the weight (bigger numbers should show up first)
--  Then it should sort by index
--  Last it should sort by alphabetically by label.


sortOptionsByRank : List Option -> List Option
sortOptionsByRank options =
    List.sortBy
        (\option ->
            option
                |> getOptionLabel
                |> optionLabelToString
        )
        options
        |> List.sortBy
            (\option ->
                option
                    |> getOptionLabel
                    |> getSortRank
                    |> getAutoIndexForSorting
            )


sortOptionsByLabel : List Option -> List Option
sortOptionsByLabel options =
    List.sortBy
        (\option ->
            option
                |> getOptionLabel
                |> optionLabelToString
                |> String.toLower
        )
        options
