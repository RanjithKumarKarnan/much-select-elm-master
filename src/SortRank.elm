module SortRank exposing (SortRank(..), getAutoIndexForSorting, getManualWeightForSorting, newMaybeAutoSortRank, sortRankDecoder)

import Json.Decode
import PositiveInt exposing (PositiveInt)


type SortRank
    = Auto PositiveInt
    | Manual PositiveInt
    | NoSortRank


newMaybeAutoSortRank : Int -> Maybe SortRank
newMaybeAutoSortRank sortRank =
    PositiveInt.maybeNew sortRank
        |> Maybe.map Auto


getAutoIndexForSorting : SortRank -> Int
getAutoIndexForSorting sortRank =
    case sortRank of
        Auto positiveInt ->
            PositiveInt.toInt positiveInt

        Manual manualInt ->
            PositiveInt.toInt manualInt

        NoSortRank ->
            100000000


getManualWeightForSorting : SortRank -> Int
getManualWeightForSorting sortRank =
    case sortRank of
        Auto _ ->
            0

        Manual positiveInt ->
            PositiveInt.toInt positiveInt

        NoSortRank ->
            0


sortRankDecoder : Json.Decode.Decoder SortRank
sortRankDecoder =
    Json.Decode.oneOf
        [ Json.Decode.field "index" Json.Decode.int
            |> Json.Decode.andThen
                (\int ->
                    case PositiveInt.maybeNew int of
                        Just positiveInt ->
                            Json.Decode.succeed (Auto positiveInt)

                        Nothing ->
                            Json.Decode.fail "The index must be a positive number."
                )
        , Json.Decode.field "weight" Json.Decode.int
            |> Json.Decode.andThen
                (\int ->
                    case PositiveInt.maybeNew int of
                        Just positiveInt ->
                            Json.Decode.succeed (Manual positiveInt)

                        Nothing ->
                            Json.Decode.fail "The weight must be a positive number."
                )
        , Json.Decode.succeed NoSortRank
        ]
