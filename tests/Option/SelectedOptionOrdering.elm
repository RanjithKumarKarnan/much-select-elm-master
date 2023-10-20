module Option.SelectedOptionOrdering exposing (..)

import Json.Decode
import Json.Encode
import LightDomChange
import MuchSelect exposing (Flags)
import ProgramTest exposing (ProgramTest)
import SelectionMode
import SimulatedEffect.Cmd
import SimulatedEffect.Ports
import Test exposing (Test, describe, test)
import Test.Html.Selector exposing (all, classes, containing, id, text)


booksJsonWithIndexesAndWithSelected =
    """
[
  {
    "value": "The Enormous Crocodile",
    "label": "The Enormous Crocodile",
    "labelClean": "The Enormous Crocodile"
  },
  {
    "value": "James and the Giant Peach",
    "label": "James and the Giant Peach",
    "labelClean": "James and the Giant Peach"
  },
  {
    "value": "Matilda",
    "label": "Matilda",
    "labelClean": "Matilda",
    "selected": true
  },
  {
    "value": "The BFG",
    "label": "The BFG",
    "labelClean": "The BFG"
  }
]
"""


flagsBookOptionsWithSelected : Flags
flagsBookOptionsWithSelected =
    { isEventsOnly = False
    , selectedValue = ""
    , selectedValueEncoding = Nothing
    , placeholder = ( True, "A book" )
    , customOptionHint = Nothing
    , allowMultiSelect = False
    , outputStyle = "customHtml"
    , enableMultiSelectSingleItemRemoval = False
    , optionsJson = booksJsonWithIndexesAndWithSelected
    , optionSort = ""
    , loading = False
    , maxDropdownItems = Just "2"
    , disabled = False
    , allowCustomOptions = False
    , selectedItemStaysInPlace = True
    , searchStringMinimumLength = Just "2"
    , showDropdownFooter = False
    , transformationAndValidationJson = ""
    }


simulatedEffects : MuchSelect.Effect -> ProgramTest.SimulatedEffect MuchSelect.Msg
simulatedEffects effect =
    case effect of
        MuchSelect.NoEffect ->
            SimulatedEffect.Cmd.none

        MuchSelect.Batch effects ->
            SimulatedEffect.Cmd.batch (List.map simulatedEffects effects)

        MuchSelect.FocusInput ->
            SimulatedEffect.Ports.send "focusInput" (Json.Encode.object [])

        MuchSelect.BlurInput ->
            SimulatedEffect.Ports.send "blurInput" (Json.Encode.object [])

        MuchSelect.InputHasBeenFocused ->
            SimulatedEffect.Ports.send "inputFocused" (Json.Encode.object [])

        MuchSelect.InputHasBeenBlurred ->
            SimulatedEffect.Ports.send "inputBlurred" (Json.Encode.object [])

        MuchSelect.InputHasBeenKeyUp string _ ->
            SimulatedEffect.Ports.send "inputKeyUp" (Json.Encode.string string)

        MuchSelect.SearchStringTouched _ ->
            SimulatedEffect.Cmd.none

        MuchSelect.UpdateOptionsInWebWorker ->
            SimulatedEffect.Ports.send "updateOptionsInWebWorker" (Json.Encode.object [])

        MuchSelect.SearchOptionsWithWebWorker value ->
            SimulatedEffect.Ports.send "searchOptionsWithWebWorker" value

        MuchSelect.ReportValueChanged value selectionMode ->
            case selectionMode of
                SelectionMode.SingleSelect ->
                    SimulatedEffect.Ports.send "valueChangedSingleSelect" value

                SelectionMode.MultiSelect ->
                    SimulatedEffect.Ports.send "valueChangedMultiSelect" value

        MuchSelect.ValueCleared ->
            SimulatedEffect.Ports.send "valueCleared" (Json.Encode.object [])

        MuchSelect.InvalidValue value ->
            SimulatedEffect.Ports.send "invalidValue" value

        MuchSelect.CustomOptionSelected strings ->
            SimulatedEffect.Ports.send "invalidValue" (Json.Encode.list Json.Encode.string strings)

        MuchSelect.ReportOptionSelected value ->
            SimulatedEffect.Ports.send "optionSelected" value

        MuchSelect.ReportOptionDeselected value ->
            SimulatedEffect.Ports.send "optionDeselected" value

        MuchSelect.OptionsUpdated bool ->
            SimulatedEffect.Ports.send "optionDeselected" (Json.Encode.bool bool)

        MuchSelect.SendCustomValidationRequest ( string, int ) ->
            SimulatedEffect.Ports.send "sendCustomValidationRequest"
                (Json.Encode.list identity
                    [ Json.Encode.string string
                    , Json.Encode.int int
                    ]
                )

        MuchSelect.ReportErrorMessage string ->
            SimulatedEffect.Ports.send "errorMessage" (Json.Encode.string string)

        MuchSelect.ReportReady ->
            SimulatedEffect.Ports.send "ready" (Json.Encode.object [])

        MuchSelect.ReportInitialValueSet value ->
            SimulatedEffect.Ports.send "initialValueSet" value

        MuchSelect.FetchOptionsFromDom ->
            SimulatedEffect.Ports.send "ready" (Json.Encode.object [])

        MuchSelect.ScrollDownToElement string ->
            SimulatedEffect.Ports.send "scrollDropdownToElement" (Json.Encode.string string)

        MuchSelect.ReportAllOptions value ->
            SimulatedEffect.Ports.send "allOptions" value

        MuchSelect.DumpConfigState value ->
            SimulatedEffect.Ports.send "dumpConfigState" value

        MuchSelect.DumpSelectedValues value ->
            SimulatedEffect.Ports.send "dumpSelectedValues" value

        MuchSelect.ChangeTheLightDom lightDomChange ->
            SimulatedEffect.Ports.send "lightDomChange" (LightDomChange.encode lightDomChange)


simulateSubscriptions : MuchSelect.Model -> ProgramTest.SimulatedSub MuchSelect.Msg
simulateSubscriptions _ =
    SimulatedEffect.Ports.subscribe "addOptions"
        Json.Decode.value
        MuchSelect.AddOptions


start : ProgramTest MuchSelect.Model MuchSelect.Msg MuchSelect.Effect
start =
    ProgramTest.createElement
        { init = MuchSelect.init, update = MuchSelect.update, view = MuchSelect.view }
        |> ProgramTest.withSimulatedEffects simulatedEffects
        |> ProgramTest.withSimulatedSubscriptions simulateSubscriptions
        |> ProgramTest.start flagsBookOptionsWithSelected


suite : Test
suite =
    describe "Selected Option Ordering"
        [ test "initial selected value should be selected" <|
            \_ ->
                start
                    |> ProgramTest.ensureViewHas
                        [ all
                            [ id "selected-value"
                            , containing [ text "Matilda" ]
                            ]
                        ]
                    |> ProgramTest.ensureViewHas
                        [ classes [ "selected", "option" ]
                        , containing
                            [ text "Matilda" ]
                        ]
                    |> ProgramTest.ensureViewHas
                        [ classes [ "option" ]
                        , containing
                            [ text "The BFG" ]
                        ]
                    |> ProgramTest.expectViewHasNot
                        [ classes [ "selected", "option" ]
                        , containing
                            [ text "The BFG" ]
                        ]
        ]
