module Attributes.SelectedValue exposing (suite)

import Expect
import Json.Decode
import Json.Encode
import LightDomChange exposing (LightDomChange(..))
import List.Extra
import MuchSelect exposing (Flags)
import Option exposing (test_newFancyOptionWithMaybeCleanString)
import OptionList exposing (OptionList(..))
import Ports exposing (optionsEncoder)
import ProgramTest exposing (ProgramTest)
import SelectionMode
import SimulatedEffect.Cmd
import SimulatedEffect.Ports
import Test exposing (Test, describe, test)


flags : Flags
flags =
    { isEventsOnly = False
    , selectedValue = "fifi"
    , selectedValueEncoding = Nothing
    , placeholder = ( True, "" )
    , customOptionHint = Nothing
    , allowMultiSelect = False
    , outputStyle = "customHtml"
    , enableMultiSelectSingleItemRemoval = False
    , optionsJson = "[]"
    , optionSort = ""
    , loading = False
    , maxDropdownItems = Just "10"
    , disabled = False
    , allowCustomOptions = False
    , selectedItemStaysInPlace = True
    , searchStringMinimumLength = Nothing
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
    SimulatedEffect.Ports.subscribe "attributeChanged"
        (Json.Decode.map2
            Tuple.pair
            (Json.Decode.index 0 Json.Decode.string)
            (Json.Decode.index 1 Json.Decode.string)
        )
        MuchSelect.AttributeChanged


element =
    ProgramTest.createElement
        { init = MuchSelect.init
        , update = MuchSelect.update
        , view = MuchSelect.view
        }
        |> ProgramTest.withSimulatedEffects simulatedEffects
        |> ProgramTest.withSimulatedSubscriptions simulateSubscriptions


start : Flags -> ProgramTest MuchSelect.Model MuchSelect.Msg MuchSelect.Effect
start flags_ =
    element
        |> ProgramTest.start
            flags_


suite : Test
suite =
    describe "When the selected-value attribute is updated"
        [ describe "in single select mode"
            [ test "and it's the same value as before we should do nothing" <|
                \() ->
                    start flags
                        |> ProgramTest.simulateIncomingPort
                            "attributeChanged"
                            (Json.Encode.list Json.Encode.string [ "selected-value", "fifi" ])
                        |> ProgramTest.expectLastEffect
                            (\effect ->
                                case effect of
                                    MuchSelect.NoEffect ->
                                        Expect.pass

                                    _ ->
                                        Expect.fail "We should have done nothing"
                            )
            , test "to a new value we should get effects to report the changed value" <|
                \() ->
                    start flags
                        |> ProgramTest.simulateIncomingPort
                            "attributeChanged"
                            (Json.Encode.list Json.Encode.string [ "selected-value", "pilot" ])
                        |> ProgramTest.expectLastEffect
                            (\lastEffect ->
                                case lastEffect of
                                    MuchSelect.Batch lastEffects ->
                                        case List.head lastEffects of
                                            Just firstLastEffect ->
                                                Expect.equal firstLastEffect
                                                    (MuchSelect.ReportValueChanged
                                                        (optionsEncoder
                                                            (FancyOptionList
                                                                [ test_newFancyOptionWithMaybeCleanString "pilot" Nothing
                                                                    |> Option.select 0
                                                                ]
                                                            )
                                                        )
                                                        SelectionMode.SingleSelect
                                                    )

                                            Nothing ->
                                                Expect.fail "Nothing in the batch of effects"

                                    _ ->
                                        Expect.fail "Should have been a batch"
                            )
            , test "to a new value we should get effects to report the changed value and update the light DOM" <|
                \() ->
                    start flags
                        |> ProgramTest.simulateIncomingPort
                            "attributeChanged"
                            (Json.Encode.list Json.Encode.string [ "selected-value", "pilot" ])
                        |> ProgramTest.expectLastEffect
                            (\lastEffect ->
                                case lastEffect of
                                    MuchSelect.Batch lastEffects ->
                                        case List.Extra.last lastEffects of
                                            Just lastLastEffect ->
                                                case lastLastEffect of
                                                    MuchSelect.ChangeTheLightDom change ->
                                                        case change of
                                                            UpdateSelectedValue value ->
                                                                Expect.equal
                                                                    value
                                                                    (Json.Encode.object
                                                                        [ ( "rawValue"
                                                                          , Json.Encode.string "pilot"
                                                                          )
                                                                        , ( "value"
                                                                          , Json.Encode.string "pilot"
                                                                          )
                                                                        , ( "selectionMode"
                                                                          , Json.Encode.string "single-select"
                                                                          )
                                                                        ]
                                                                    )

                                                            _ ->
                                                                Expect.fail "This should have been an update to the selected value"

                                                    _ ->
                                                        Expect.fail "This should have been a change to the light DOM"

                                            Nothing ->
                                                Expect.fail "There should have been something in the list of effects"

                                    _ ->
                                        Expect.fail "The effect should have been a batch"
                            )
            ]
        , describe "in multi select mode"
            [ describe "with json encoding"
                [ test "and it's the same value as before we should do nothing" <|
                    \() ->
                        start
                            { flags
                                | allowMultiSelect = True
                                , selectedValueEncoding = Just "json"
                                , selectedValue = "%5B%22fifi%22%5D"
                            }
                            |> ProgramTest.simulateIncomingPort
                                "attributeChanged"
                                (Json.Encode.list Json.Encode.string [ "selected-value", "%5B%22fifi%22%5D" ])
                            |> ProgramTest.expectLastEffect
                                (\effect ->
                                    case effect of
                                        MuchSelect.NoEffect ->
                                            Expect.pass

                                        _ ->
                                            Expect.fail "We should have done nothing"
                                )
                , test "to a new value we should get effects to report the changed value" <|
                    \() ->
                        start
                            { flags
                                | allowMultiSelect = True
                                , selectedValueEncoding = Just "json"
                                , selectedValue = "%5B%22fifi%22%5D"
                            }
                            |> ProgramTest.simulateIncomingPort
                                "attributeChanged"
                                (Json.Encode.list Json.Encode.string [ "selected-value", "%5B%22pilot%22%5D" ])
                            |> ProgramTest.expectLastEffect
                                (\lastEffect ->
                                    case lastEffect of
                                        MuchSelect.Batch lastEffects ->
                                            case List.head lastEffects of
                                                Just firstLastEffect ->
                                                    Expect.equal firstLastEffect
                                                        (MuchSelect.ReportValueChanged
                                                            (optionsEncoder
                                                                (FancyOptionList
                                                                    [ test_newFancyOptionWithMaybeCleanString "pilot" Nothing
                                                                        |> Option.select 0
                                                                    ]
                                                                )
                                                            )
                                                            SelectionMode.MultiSelect
                                                        )

                                                Nothing ->
                                                    Expect.fail "Nothing in the batch of effects"

                                        _ ->
                                            Expect.fail "Should have been a batch"
                                )
                , test "to a new value we should get effects to report the changed value and update the light DOM" <|
                    \() ->
                        start
                            { flags
                                | allowMultiSelect = True
                                , selectedValueEncoding = Just "json"
                                , selectedValue = "%5B%22fifi%22%5D"
                            }
                            |> ProgramTest.simulateIncomingPort
                                "attributeChanged"
                                (Json.Encode.list Json.Encode.string [ "selected-value", "%5B%22pilot%22%5D" ])
                            |> ProgramTest.expectLastEffect
                                (\lastEffect ->
                                    case lastEffect of
                                        MuchSelect.Batch lastEffects ->
                                            case List.Extra.last lastEffects of
                                                Just lastLastEffect ->
                                                    case lastLastEffect of
                                                        MuchSelect.ChangeTheLightDom change ->
                                                            case change of
                                                                UpdateSelectedValue value ->
                                                                    Expect.equal
                                                                        value
                                                                        (Json.Encode.object
                                                                            [ ( "rawValue"
                                                                              , Json.Encode.string "%5B%22pilot%22%5D"
                                                                              )
                                                                            , ( "value"
                                                                              , Json.Encode.list Json.Encode.string [ "pilot" ]
                                                                              )
                                                                            , ( "selectionMode"
                                                                              , Json.Encode.string "multi-select"
                                                                              )
                                                                            ]
                                                                        )

                                                                _ ->
                                                                    Expect.fail "This should have been an update to the selected value"

                                                        _ ->
                                                            Expect.fail "This should have been a change to the light DOM"

                                                Nothing ->
                                                    Expect.fail "There should have been something in the list of effects"

                                        _ ->
                                            Expect.fail "The effect should have been a batch"
                                )
                , describe "in events only mode"
                    [ test "and it's the same value as before we should do nothing" <|
                        \() ->
                            start
                                { flags
                                    | allowMultiSelect = True
                                    , selectedValueEncoding = Just "json"
                                    , selectedValue = "%5B%22fifi%22%5D"
                                    , isEventsOnly = True
                                }
                                |> ProgramTest.simulateIncomingPort
                                    "attributeChanged"
                                    (Json.Encode.list Json.Encode.string [ "selected-value", "%5B%22fifi%22%5D" ])
                                |> ProgramTest.expectLastEffect
                                    (\effect ->
                                        case effect of
                                            MuchSelect.NoEffect ->
                                                Expect.pass

                                            _ ->
                                                Expect.fail "We should have done nothing"
                                    )
                    , test "with multiple values selected and it's the same selected value as before we should do nothing" <|
                        \() ->
                            start
                                { flags
                                    | allowMultiSelect = True
                                    , selectedValueEncoding = Just "json"
                                    , selectedValue = "%5B%22fifi%22%2C%22pilot%22%5D"
                                    , isEventsOnly = True
                                }
                                |> ProgramTest.simulateIncomingPort
                                    "attributeChanged"
                                    (Json.Encode.list Json.Encode.string [ "selected-value", "%5B%22fifi%22%2C%22pilot%22%5D" ])
                                |> ProgramTest.expectLastEffect
                                    (\effect ->
                                        case effect of
                                            MuchSelect.NoEffect ->
                                                Expect.pass

                                            _ ->
                                                Expect.fail "We should have done nothing"
                                    )
                    , test "to a new selected value we should get an effect to report the changed value" <|
                        \() ->
                            start
                                { flags
                                    | allowMultiSelect = True
                                    , selectedValueEncoding = Just "json"
                                    , selectedValue = "%5B%22fifi%22%5D"
                                    , isEventsOnly = True
                                }
                                |> ProgramTest.simulateIncomingPort
                                    "attributeChanged"
                                    (Json.Encode.list Json.Encode.string [ "selected-value", "%5B%22pilot%22%5D" ])
                                |> ProgramTest.expectLastEffect
                                    (\lastEffect ->
                                        case lastEffect of
                                            MuchSelect.Batch lastEffects ->
                                                case List.head lastEffects of
                                                    Just firstLastEffect ->
                                                        Expect.equal firstLastEffect
                                                            (MuchSelect.ReportValueChanged
                                                                (optionsEncoder
                                                                    (FancyOptionList
                                                                        [ test_newFancyOptionWithMaybeCleanString "pilot" Nothing
                                                                            |> Option.select 0
                                                                        ]
                                                                    )
                                                                )
                                                                SelectionMode.MultiSelect
                                                            )

                                                    Nothing ->
                                                        Expect.fail "Nothing in the batch of effects"

                                            _ ->
                                                Expect.fail "Should have been a batch"
                                    )
                    , test "to a new selected value we should get not get effects to change the light DOM" <|
                        \() ->
                            start
                                { flags
                                    | allowMultiSelect = True
                                    , selectedValueEncoding = Just "json"
                                    , selectedValue = "%5B%22fifi%22%5D"
                                    , isEventsOnly = True
                                }
                                |> ProgramTest.simulateIncomingPort
                                    "attributeChanged"
                                    (Json.Encode.list Json.Encode.string [ "selected-value", "%5B%22pilot%22%5D" ])
                                |> ProgramTest.expectLastEffect
                                    (\lastEffect ->
                                        case lastEffect of
                                            MuchSelect.Batch lastEffects ->
                                                List.filter
                                                    (\lastEffect_ ->
                                                        case lastEffect_ of
                                                            MuchSelect.ChangeTheLightDom _ ->
                                                                True

                                                            _ ->
                                                                False
                                                    )
                                                    lastEffects
                                                    |> List.isEmpty
                                                    |> Expect.equal True

                                            _ ->
                                                Expect.fail "The effect should have been a batch"
                                    )
                    ]
                ]
            , describe "with comma encoding"
                [ test "and it's the same selected value as before we get no effects" <|
                    \() ->
                        start { flags | allowMultiSelect = True }
                            |> ProgramTest.simulateIncomingPort
                                "attributeChanged"
                                (Json.Encode.list Json.Encode.string [ "selected-value", "fifi" ])
                            |> ProgramTest.expectLastEffect
                                (\effect ->
                                    case effect of
                                        MuchSelect.NoEffect ->
                                            Expect.pass

                                        _ ->
                                            Expect.fail "We should have done nothing"
                                )
                , test "to a new selected value we should get an effect to report the changed value" <|
                    \() ->
                        start { flags | allowMultiSelect = True }
                            |> ProgramTest.simulateIncomingPort
                                "attributeChanged"
                                (Json.Encode.list Json.Encode.string [ "selected-value", "pilot" ])
                            |> ProgramTest.expectLastEffect
                                (\lastEffect ->
                                    case lastEffect of
                                        MuchSelect.Batch lastEffects ->
                                            case List.head lastEffects of
                                                Just firstLastEffect ->
                                                    Expect.equal firstLastEffect
                                                        (MuchSelect.ReportValueChanged
                                                            (optionsEncoder
                                                                (FancyOptionList
                                                                    [ test_newFancyOptionWithMaybeCleanString "pilot" Nothing
                                                                        |> Option.select 0
                                                                    ]
                                                                )
                                                            )
                                                            SelectionMode.MultiSelect
                                                        )

                                                Nothing ->
                                                    Expect.fail "Nothing in the batch of effects"

                                        _ ->
                                            Expect.fail "Should have been a batch"
                                )
                , test "to a new selected value we should get an effect update the light DOM" <|
                    \() ->
                        start { flags | allowMultiSelect = True }
                            |> ProgramTest.simulateIncomingPort
                                "attributeChanged"
                                (Json.Encode.list Json.Encode.string [ "selected-value", "pilot" ])
                            |> ProgramTest.expectLastEffect
                                (\lastEffect ->
                                    case lastEffect of
                                        MuchSelect.Batch lastEffects ->
                                            case List.Extra.last lastEffects of
                                                Just lastLastEffect ->
                                                    case lastLastEffect of
                                                        MuchSelect.ChangeTheLightDom change ->
                                                            case change of
                                                                UpdateSelectedValue value ->
                                                                    Expect.equal
                                                                        value
                                                                        (Json.Encode.object
                                                                            [ ( "rawValue"
                                                                              , Json.Encode.string "pilot"
                                                                              )
                                                                            , ( "value"
                                                                              , Json.Encode.list Json.Encode.string [ "pilot" ]
                                                                              )
                                                                            , ( "selectionMode"
                                                                              , Json.Encode.string "multi-select"
                                                                              )
                                                                            ]
                                                                        )

                                                                _ ->
                                                                    Expect.fail "This should have been an update to the selected value"

                                                        _ ->
                                                            Expect.fail "This should have been a change to the light DOM"

                                                Nothing ->
                                                    Expect.fail "There should have been something in the list of effects"

                                        _ ->
                                            Expect.fail "The effect should have been a batch"
                                )
                ]
            ]
        ]
