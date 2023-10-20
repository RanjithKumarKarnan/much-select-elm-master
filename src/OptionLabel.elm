module OptionLabel exposing
    ( OptionLabel
    , getLabelString
    , getSortRank
    , labelDecoder
    , new
    , newWithCleanLabel
    , optionLabelToSearchString
    , optionLabelToString
    , setMaybeSortRank
    , setSortRank
    )

import Json.Decode
import SortRank exposing (SortRank(..), sortRankDecoder)


type OptionLabel
    = OptionLabel String (Maybe String) SortRank


new : String -> OptionLabel
new string =
    OptionLabel string Nothing NoSortRank


newWithCleanLabel : String -> Maybe String -> OptionLabel
newWithCleanLabel string maybeString =
    OptionLabel string maybeString NoSortRank


getLabelString : OptionLabel -> String
getLabelString optionLabel =
    case optionLabel of
        OptionLabel string _ _ ->
            string


optionLabelToString : OptionLabel -> String
optionLabelToString optionLabel =
    case optionLabel of
        OptionLabel label _ _ ->
            label


optionLabelToSearchString : OptionLabel -> String
optionLabelToSearchString optionLabel =
    case optionLabel of
        OptionLabel string maybeCleanString _ ->
            case maybeCleanString of
                Just cleanString ->
                    cleanString

                Nothing ->
                    String.toLower string


getSortRank : OptionLabel -> SortRank
getSortRank optionLabel =
    case optionLabel of
        OptionLabel _ _ sortRank ->
            sortRank


setSortRank : SortRank -> OptionLabel -> OptionLabel
setSortRank sortRank optionLabel =
    case optionLabel of
        OptionLabel string maybeString _ ->
            OptionLabel string maybeString sortRank


setMaybeSortRank : Maybe SortRank -> OptionLabel -> OptionLabel
setMaybeSortRank maybeSortRank optionLabel =
    case maybeSortRank of
        Just sortRank ->
            setSortRank sortRank optionLabel

        Nothing ->
            optionLabel


labelDecoder : Json.Decode.Decoder OptionLabel
labelDecoder =
    Json.Decode.map3
        OptionLabel
        (Json.Decode.field "label" Json.Decode.string)
        (Json.Decode.field "labelClean" (Json.Decode.nullable Json.Decode.string))
        sortRankDecoder
