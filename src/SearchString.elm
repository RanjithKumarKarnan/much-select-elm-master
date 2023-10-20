module SearchString exposing (SearchString, decode, encode, isCleared, isEmpty, length, new, reset, toLower, toString, update)

import Json.Decode
import Json.Encode


type SearchString
    = SearchString String Bool


reset : SearchString
reset =
    SearchString "" True


new : String -> Bool -> SearchString
new string isCleared_ =
    SearchString string isCleared_


update : String -> SearchString
update string =
    SearchString string False


length : SearchString -> Int
length (SearchString str _) =
    String.length str


toLower : SearchString -> String
toLower (SearchString str _) =
    String.toLower str


toString : SearchString -> String
toString (SearchString str _) =
    str


isEmpty : SearchString -> Bool
isEmpty (SearchString str _) =
    String.length str == 0


isCleared : SearchString -> Bool
isCleared (SearchString _ isCleared_) =
    isCleared_


encode : SearchString -> Json.Encode.Value
encode searchString =
    Json.Encode.string (toString searchString)


decode : Json.Decode.Decoder SearchString
decode =
    Json.Decode.map2
        SearchString
        Json.Decode.string
        (Json.Decode.succeed True)
