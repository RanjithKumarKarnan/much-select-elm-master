module OptionSearchFilter exposing
    ( OptionSearchFilter
    , OptionSearchFilterWithValue
    , OptionSearchResult
    , decoder
    , descriptionHandicap
    , encode
    , groupHandicap
    , impossiblyLowScore
    , lowScoreCutOff
    , new
    )

import Fuzzy exposing (Result)
import Json.Decode
import Json.Encode
import OptionValue exposing (OptionValue)


type alias OptionSearchFilter =
    { totalScore : Int
    , bestScore : Int
    , labelTokens : List ( Bool, String )
    , descriptionTokens : List ( Bool, String )
    , groupTokens : List ( Bool, String )
    }


type alias OptionSearchFilterWithValue =
    { value : OptionValue
    , maybeSearchFilter : Maybe OptionSearchFilter
    }


type alias OptionSearchResult =
    { labelMatch : Result
    , descriptionMatch : Result
    , groupMatch : Result
    }


impossiblyLowScore : number
impossiblyLowScore =
    1000000


new : Int -> Int -> List ( Bool, String ) -> List ( Bool, String ) -> List ( Bool, String ) -> OptionSearchFilter
new totalScore bestScore labelTokens descriptionTokens groupTokens =
    { totalScore = totalScore
    , bestScore = bestScore
    , labelTokens = labelTokens
    , descriptionTokens = descriptionTokens
    , groupTokens = groupTokens
    }


lowScoreCutOff : Int -> Int
lowScoreCutOff score =
    if score == 0 then
        51

    else if score <= 10 then
        100

    else if score <= 100 then
        1000

    else if score <= 1000 then
        10000

    else
        impossiblyLowScore


descriptionHandicap : Int -> Int
descriptionHandicap score =
    if score < 5 then
        5

    else
        floor (toFloat score * 1.25)


groupHandicap : Int -> Int
groupHandicap score =
    if score < 10 then
        10

    else
        floor (toFloat score * 1.5)


encode : OptionSearchFilter -> Json.Encode.Value
encode optionSearchFilter =
    Json.Encode.object
        [ ( "totalScore", Json.Encode.int optionSearchFilter.totalScore )
        , ( "bestScore", Json.Encode.int optionSearchFilter.bestScore )
        , ( "labelTokens", encodeTokens optionSearchFilter.labelTokens )
        , ( "descriptionTokens", encodeTokens optionSearchFilter.descriptionTokens )
        , ( "groupTokens", encodeTokens optionSearchFilter.groupTokens )
        ]


encodeTokens : List ( Bool, String ) -> Json.Encode.Value
encodeTokens tokens =
    Json.Encode.list encodeToken tokens


encodeToken : ( Bool, String ) -> Json.Encode.Value
encodeToken ( isHighlighted, stringChuck ) =
    Json.Encode.object
        [ ( "isHighlighted", Json.Encode.bool isHighlighted )
        , ( "stringChunk", Json.Encode.string stringChuck )
        ]


decoder : Json.Decode.Decoder OptionSearchFilter
decoder =
    Json.Decode.map5
        OptionSearchFilter
        (Json.Decode.field "totalScore" Json.Decode.int)
        (Json.Decode.field "bestScore" Json.Decode.int)
        (Json.Decode.field "labelTokens" decodeTokens)
        (Json.Decode.field "descriptionTokens" decodeTokens)
        (Json.Decode.field "groupTokens" decodeTokens)


decodeTokens : Json.Decode.Decoder (List ( Bool, String ))
decodeTokens =
    Json.Decode.list decodeToken


decodeToken : Json.Decode.Decoder ( Bool, String )
decodeToken =
    Json.Decode.map2
        Tuple.pair
        (Json.Decode.field "isHighlighted" Json.Decode.bool)
        (Json.Decode.field "stringChunk" Json.Decode.string)
