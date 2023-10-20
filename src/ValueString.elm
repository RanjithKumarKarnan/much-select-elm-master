module ValueString exposing (ValueString, fromOptionValue, fromString, length, reset, toOptionValue, toString)

import OptionValue exposing (OptionValue)


type ValueString
    = ValueString String


reset : ValueString
reset =
    ValueString ""


fromString : String -> ValueString
fromString string =
    ValueString string


toOptionValue : ValueString -> OptionValue
toOptionValue (ValueString str) =
    OptionValue.stringToOptionValue str


length : ValueString -> Int
length (ValueString str) =
    String.length str


toString : ValueString -> String
toString (ValueString str) =
    str


fromOptionValue : OptionValue -> ValueString
fromOptionValue optionValue =
    ValueString (OptionValue.optionValueToString optionValue)
