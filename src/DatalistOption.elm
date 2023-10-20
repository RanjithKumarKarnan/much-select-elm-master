module DatalistOption exposing (DatalistOption, activate, decoder, deselect, encode, getOptionDisplay, getOptionLabel, getOptionSelectedIndex, getOptionValue, getOptionValueAsString, isEmpty, isSelected, merge, new, newSelected, newSelectedDatalistOptionPendingValidation, newSelectedDatalistOptionWithErrors, newSelectedEmpty, select, setOptionDisplay, setOptionValue, test_optionToDebuggingString)

import Json.Decode
import Json.Encode
import OptionDisplay exposing (OptionDisplay)
import OptionLabel exposing (OptionLabel)
import OptionValue exposing (OptionValue(..))
import TransformAndValidate exposing (ValidationFailureMessage)


type DatalistOption
    = DatalistOption OptionDisplay OptionValue


newSelected : OptionValue -> Int -> DatalistOption
newSelected optionValue selectedIndex =
    DatalistOption
        (OptionDisplay.selected selectedIndex)
        optionValue


newSelectedEmpty : Int -> DatalistOption
newSelectedEmpty selectedIndex =
    DatalistOption
        (OptionDisplay.selected selectedIndex)
        EmptyOptionValue


newSelectedDatalistOptionWithErrors : List ValidationFailureMessage -> OptionValue -> Int -> DatalistOption
newSelectedDatalistOptionWithErrors errors optionValue selectedIndex =
    DatalistOption
        (OptionDisplay.selectedAndInvalid selectedIndex errors)
        optionValue


newSelectedDatalistOptionPendingValidation : OptionValue -> Int -> DatalistOption
newSelectedDatalistOptionPendingValidation optionValue selectedIndex =
    DatalistOption
        (OptionDisplay.selectedAndPendingValidation selectedIndex)
        optionValue


new : OptionValue -> DatalistOption
new optionValue =
    DatalistOption
        OptionDisplay.default
        optionValue


getOptionDisplay : DatalistOption -> OptionDisplay
getOptionDisplay datalistOption =
    case datalistOption of
        DatalistOption optionDisplay _ ->
            optionDisplay


setOptionDisplay : OptionDisplay -> DatalistOption -> DatalistOption
setOptionDisplay optionDisplay datalistOption =
    case datalistOption of
        DatalistOption _ optionValue ->
            DatalistOption optionDisplay optionValue


isSelected : DatalistOption -> Bool
isSelected datalistOption =
    datalistOption |> getOptionDisplay |> OptionDisplay.isSelected


getOptionSelectedIndex : DatalistOption -> Int
getOptionSelectedIndex datalistOption =
    datalistOption |> getOptionDisplay |> OptionDisplay.getSelectedIndex


getOptionLabel : DatalistOption -> OptionLabel
getOptionLabel datalistOption =
    case datalistOption of
        DatalistOption _ optionValue ->
            optionValue |> OptionValue.optionValueToString |> OptionLabel.new


getOptionValue : DatalistOption -> OptionValue
getOptionValue datalistOption =
    case datalistOption of
        DatalistOption _ optionValue ->
            optionValue


getOptionValueAsString : DatalistOption -> String
getOptionValueAsString datalistOption =
    datalistOption |> getOptionValue |> OptionValue.optionValueToString


setOptionValue : OptionValue -> DatalistOption -> DatalistOption
setOptionValue optionValue datalistOption =
    case datalistOption of
        DatalistOption optionDisplay _ ->
            DatalistOption optionDisplay optionValue


merge : DatalistOption -> DatalistOption -> DatalistOption
merge optionA _ =
    -- TODO Seems like we should be doing more here.
    optionA


select : Int -> DatalistOption -> DatalistOption
select selectionIndex option =
    setOptionDisplay (OptionDisplay.select selectionIndex (getOptionDisplay option)) option


deselect : DatalistOption -> DatalistOption
deselect option =
    setOptionDisplay (OptionDisplay.deselect (getOptionDisplay option)) option


isEmpty : DatalistOption -> Bool
isEmpty datalistOption =
    case datalistOption of
        DatalistOption _ optionValue ->
            optionValue == EmptyOptionValue


activate : DatalistOption -> DatalistOption
activate option =
    setOptionDisplay (getOptionDisplay option |> OptionDisplay.activate) option


decoder : Json.Decode.Decoder DatalistOption
decoder =
    Json.Decode.map2 DatalistOption
        (OptionDisplay.decoder OptionDisplay.MatureOption)
        (Json.Decode.field
            "value"
            OptionValue.decoder
        )


encode : DatalistOption -> Json.Decode.Value
encode option =
    Json.Encode.object
        [ ( "value", Json.Encode.string (getOptionValueAsString option) )
        , ( "label", Json.Encode.string (getOptionLabel option |> OptionLabel.optionLabelToString) )
        , ( "labelClean", Json.Encode.string (getOptionLabel option |> OptionLabel.optionLabelToSearchString) )
        , ( "isSelected", Json.Encode.bool (isSelected option) )
        ]


test_optionToDebuggingString : DatalistOption -> String
test_optionToDebuggingString datalistOption =
    datalistOption |> getOptionValue |> OptionValue.optionValueToString
