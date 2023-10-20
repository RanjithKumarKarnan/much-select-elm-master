module OptionGroup exposing (OptionGroup(..), decoder, new, toSearchString, toString)

import Json.Decode


type OptionGroup
    = OptionGroup String
    | NoOptionGroup


new : String -> OptionGroup
new string =
    if string == "" then
        NoOptionGroup

    else
        OptionGroup string


toString : OptionGroup -> String
toString optionGroup =
    case optionGroup of
        OptionGroup string ->
            string

        NoOptionGroup ->
            ""


toSearchString : OptionGroup -> String
toSearchString optionGroup =
    case optionGroup of
        OptionGroup string ->
            String.toLower string

        NoOptionGroup ->
            ""


decoder : Json.Decode.Decoder OptionGroup
decoder =
    Json.Decode.oneOf
        [ Json.Decode.field "group" Json.Decode.string
            |> Json.Decode.map OptionGroup
        , Json.Decode.succeed NoOptionGroup
        ]
