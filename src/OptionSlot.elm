module OptionSlot exposing (OptionSlot, decoder, empty, encode, new_test, toSlotNameAttribute)

import Html
import Html.Attributes
import Html.Attributes.Extra
import Json.Decode exposing (Decoder)
import Json.Encode
import String.Extra


type OptionSlot
    = OptionSlot String


toString : OptionSlot -> String
toString optionSlot =
    case optionSlot of
        OptionSlot option ->
            option


decoder : Decoder OptionSlot
decoder =
    Json.Decode.string
        |> Json.Decode.map OptionSlot


encode : OptionSlot -> Json.Encode.Value
encode optionSlot =
    case optionSlot of
        OptionSlot string ->
            Json.Encode.string string


empty : OptionSlot
empty =
    OptionSlot ""


toSlotNameAttribute : OptionSlot -> Html.Attribute msg
toSlotNameAttribute optionSlot =
    case optionSlot of
        OptionSlot string ->
            if string == "" then
                Html.Attributes.Extra.empty

            else
                Html.Attributes.attribute "name" string


new_test : String -> OptionSlot
new_test string =
    string |> String.toLower |> String.Extra.dasherize |> OptionSlot
