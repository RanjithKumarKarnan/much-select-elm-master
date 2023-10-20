module Events.KeyPress exposing (suite)

import Expect
import Json.Decode
import Json.Encode
import MuchSelect exposing (Flags)
import ProgramTest exposing (ensureViewHas, expectOutgoingPortValues, fillIn, start)
import SimulatedEffect.Cmd
import SimulatedEffect.Ports
import Test exposing (Test, describe, test)
import Test.Html.Selector exposing (all, classes, id)


element =
    ProgramTest.createElement
        { init = MuchSelect.init
        , update = MuchSelect.update
        , view = MuchSelect.view
        }


flagsDatalistSingle : Flags
flagsDatalistSingle =
    { isEventsOnly = False
    , selectedValue = ""
    , selectedValueEncoding = Nothing
    , placeholder = ( True, "" )
    , customOptionHint = Nothing
    , allowMultiSelect = False
    , outputStyle = "datalist"
    , enableMultiSelectSingleItemRemoval = False
    , optionsJson = ""
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


simulateEffects : MuchSelect.Effect -> ProgramTest.SimulatedEffect MuchSelect.Msg
simulateEffects effect =
    case effect of
        MuchSelect.InputHasBeenKeyUp string _ ->
            SimulatedEffect.Ports.send "inputKeyUp" (Json.Encode.string string)

        MuchSelect.Batch effects ->
            effects
                |> List.map simulateEffects
                |> SimulatedEffect.Cmd.batch

        _ ->
            SimulatedEffect.Cmd.none


suite : Test
suite =
    describe "There should be an outgoing input key up port triggered"
        [ test "when in datalist output mode" <|
            \() ->
                element
                    |> ProgramTest.withSimulatedEffects simulateEffects
                    |> start flagsDatalistSingle
                    |> ensureViewHas
                        [ all
                            [ id "value-casing"
                            , classes
                                [ "no-option-selected"
                                , "single"
                                , "output-style-datalist"
                                , "not-focused"
                                ]
                            ]
                        ]
                    |> fillIn "input-value" "much-select-value" "hello"
                    |> expectOutgoingPortValues
                        "inputKeyUp"
                        Json.Decode.string
                        (Expect.equal [ "hello" ])
        ]
