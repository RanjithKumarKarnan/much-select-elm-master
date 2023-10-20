module OptionPart exposing (OptionPart, decoder, empty, fromStringOrEmpty, test_new, toActiveDropdownAttribute, toDisabledDropdownAttribute, toDropdownAttribute, toHighlightedDropdownAttribute, toSelectedHighlightedValueAttribute, toSelectedValueAttribute, valueDecoder)

import Html
import Html.Attributes
import Json.Decode exposing (Decoder)
import String.Extra


type OptionPart
    = OptionPart String


toSelectedValueAttribute : OptionPart -> Html.Attribute msg
toSelectedValueAttribute optionPart =
    case optionPart of
        OptionPart string ->
            case string of
                "" ->
                    Html.Attributes.attribute "part" "selected-value"

                _ ->
                    Html.Attributes.attribute "part" ("selected-value " ++ string)


toSelectedHighlightedValueAttribute : OptionPart -> Html.Attribute msg
toSelectedHighlightedValueAttribute optionPart =
    case optionPart of
        OptionPart string ->
            case string of
                "" ->
                    Html.Attributes.attribute "part" "selected-value highlighted"

                _ ->
                    Html.Attributes.attribute "part" ("selected-value highlighted " ++ string)


toDropdownAttribute : OptionPart -> Html.Attribute msg
toDropdownAttribute optionPart =
    case optionPart of
        OptionPart string ->
            case string of
                "" ->
                    Html.Attributes.attribute "part" "dropdown-option"

                _ ->
                    Html.Attributes.attribute "part" ("dropdown-option " ++ string)


toHighlightedDropdownAttribute : OptionPart -> Html.Attribute msg
toHighlightedDropdownAttribute optionPart =
    case optionPart of
        OptionPart string ->
            case string of
                "" ->
                    Html.Attributes.attribute "part" "dropdown-option highlighted"

                _ ->
                    Html.Attributes.attribute "part" ("dropdown-option highlighted " ++ string)


toActiveDropdownAttribute : OptionPart -> Html.Attribute msg
toActiveDropdownAttribute optionPart =
    case optionPart of
        OptionPart string ->
            case string of
                "" ->
                    Html.Attributes.attribute "part" "dropdown-option active highlighted"

                _ ->
                    Html.Attributes.attribute "part" ("dropdown-option active highlighted " ++ string)


toDisabledDropdownAttribute : OptionPart -> Html.Attribute msg
toDisabledDropdownAttribute optionPart =
    case optionPart of
        OptionPart string ->
            case string of
                "" ->
                    Html.Attributes.attribute "part" "dropdown-option disabled"

                _ ->
                    Html.Attributes.attribute "part" ("dropdown-option disabled " ++ string)


empty : OptionPart
empty =
    OptionPart ""


decoder : Decoder OptionPart
decoder =
    Json.Decode.string
        |> Json.Decode.andThen
            (\s ->
                if s == String.Extra.dasherize s then
                    Json.Decode.succeed (OptionPart s)

                else
                    Json.Decode.fail ("Invalid option part: " ++ s)
            )


valueDecoder : Decoder OptionPart
valueDecoder =
    Json.Decode.string
        |> Json.Decode.andThen
            (\s ->
                case fromString s of
                    Nothing ->
                        Json.Decode.fail "The value is empty so we are unable to make a part of the value"

                    Just part ->
                        Json.Decode.succeed part
            )


fromString : String -> Maybe OptionPart
fromString string =
    let
        partString =
            string |> String.trim |> String.Extra.dasherize
    in
    case partString of
        "" ->
            Nothing

        _ ->
            Just (OptionPart string)


fromStringOrEmpty : String -> OptionPart
fromStringOrEmpty string =
    case fromString string of
        Nothing ->
            empty

        Just part ->
            part


test_new : String -> OptionPart
test_new string =
    OptionPart string
