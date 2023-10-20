module Attributes.OutputStyle exposing (suite)

import Expect
import Json.Decode
import Json.Encode
import MuchSelect exposing (Flags)
import ProgramTest exposing (expectLastEffect, expectView, start)
import SimulatedEffect.Cmd
import SimulatedEffect.Ports
import Test exposing (Test, describe, test)
import Test.Html.Query
import Test.Html.Selector exposing (classes, id, tag)


element =
    ProgramTest.createElement
        { init = MuchSelect.init
        , update = MuchSelect.update
        , view = MuchSelect.view
        }


simulateEffects : MuchSelect.Effect -> ProgramTest.SimulatedEffect MuchSelect.Msg
simulateEffects effect =
    case effect of
        MuchSelect.Batch effects ->
            effects
                |> List.map simulateEffects
                |> SimulatedEffect.Cmd.batch

        _ ->
            SimulatedEffect.Cmd.none


simulateSubOutputStyleChangedReceiver : MuchSelect.Model -> ProgramTest.SimulatedSub MuchSelect.Msg
simulateSubOutputStyleChangedReceiver _ =
    SimulatedEffect.Ports.subscribe "outputStyleChangedReceiver"
        Json.Decode.string
        MuchSelect.OutputStyleChanged


decodeTuple2 : Json.Decode.Decoder a -> Json.Decode.Decoder b -> Json.Decode.Decoder ( a, b )
decodeTuple2 decoderA decoderB =
    Json.Decode.list Json.Decode.value
        |> Json.Decode.andThen
            (\values ->
                case values of
                    [ a, b ] ->
                        case ( Json.Decode.decodeValue decoderA a, Json.Decode.decodeValue decoderB b ) of
                            ( Ok valA, Ok valB ) ->
                                Json.Decode.succeed ( valA, valB )

                            _ ->
                                Json.Decode.fail "could not decode tuple"

                    _ ->
                        Json.Decode.fail "expected a list of two elements"
            )


simulateSubAttributeChanged : MuchSelect.Model -> ProgramTest.SimulatedSub MuchSelect.Msg
simulateSubAttributeChanged _ =
    SimulatedEffect.Ports.subscribe "attributeChanged"
        (decodeTuple2 Json.Decode.string Json.Decode.string)
        MuchSelect.AttributeChanged


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
    , searchStringMinimumLength = Nothing
    , showDropdownFooter = False
    , transformationAndValidationJson = ""
    }


flagsCustomHtmlSingle : Flags
flagsCustomHtmlSingle =
    { isEventsOnly = False
    , selectedValue = ""
    , selectedValueEncoding = Nothing
    , placeholder = ( True, "" )
    , customOptionHint = Nothing
    , allowMultiSelect = False
    , outputStyle = "custom-html"
    , enableMultiSelectSingleItemRemoval = False
    , optionsJson = ""
    , optionSort = ""
    , loading = False
    , maxDropdownItems = Just "2"
    , disabled = False
    , allowCustomOptions = False
    , selectedItemStaysInPlace = True
    , searchStringMinimumLength = Nothing
    , showDropdownFooter = False
    , transformationAndValidationJson = ""
    }


suite : Test
suite =
    describe "Changing the output style"
        [ test "to custom-html should result in an effect to fetch the options from the DOM" <|
            \() ->
                element
                    |> ProgramTest.withSimulatedEffects simulateEffects
                    |> ProgramTest.withSimulatedSubscriptions simulateSubOutputStyleChangedReceiver
                    |> start flagsDatalistSingle
                    |> ProgramTest.simulateIncomingPort
                        "outputStyleChangedReceiver"
                        (Json.Encode.string "custom-html")
                    |> expectLastEffect
                        (\effect ->
                            case effect of
                                MuchSelect.Batch batchEffects ->
                                    if List.member MuchSelect.FetchOptionsFromDom batchEffects then
                                        Expect.pass

                                    else
                                        Expect.fail "We should be fetching options from the DOM."

                                _ ->
                                    Expect.fail "We should be fetching options from the DOM."
                        )
        , test "to datalist should result in an effect to fetch the options from the DOM" <|
            \() ->
                element
                    |> ProgramTest.withSimulatedEffects simulateEffects
                    |> ProgramTest.withSimulatedSubscriptions simulateSubOutputStyleChangedReceiver
                    |> start flagsCustomHtmlSingle
                    |> ProgramTest.simulateIncomingPort
                        "outputStyleChangedReceiver"
                        (Json.Encode.string "datalist")
                    |> expectLastEffect
                        (\effect ->
                            case effect of
                                MuchSelect.Batch batchEffects ->
                                    if List.member MuchSelect.FetchOptionsFromDom batchEffects then
                                        Expect.pass

                                    else
                                        Expect.fail "We should be fetching options from the DOM."

                                _ ->
                                    Expect.fail "We should be fetching options from the DOM."
                        )
        , test "an invalid value for output style should result in an error" <|
            \() ->
                element
                    |> ProgramTest.withSimulatedEffects simulateEffects
                    |> ProgramTest.withSimulatedSubscriptions simulateSubOutputStyleChangedReceiver
                    |> start flagsDatalistSingle
                    |> ProgramTest.simulateIncomingPort
                        "outputStyleChangedReceiver"
                        (Json.Encode.string "bogus")
                    |> expectLastEffect
                        (\effect ->
                            case effect of
                                MuchSelect.ReportErrorMessage _ ->
                                    Expect.pass

                                _ ->
                                    Expect.fail "We should be fetching options from the DOM."
                        )
        , test "between output styles should maintain whether or not custom values are allowed" <|
            \() ->
                element
                    |> ProgramTest.withSimulatedEffects simulateEffects
                    |> ProgramTest.withSimulatedSubscriptions simulateSubAttributeChanged
                    |> start flagsCustomHtmlSingle
                    |> ProgramTest.simulateIncomingPort
                        "attributeChanged"
                        (Json.Encode.list Json.Encode.string [ "allow-custom-options", "" ])
                    |> ProgramTest.simulateIncomingPort
                        "attributeChanged"
                        (Json.Encode.list Json.Encode.string [ "output-style", "datalist" ])
                    |> ProgramTest.simulateIncomingPort
                        "attributeChanged"
                        (Json.Encode.list Json.Encode.string
                            [ "output-style"
                            , "custom-html"
                            ]
                        )
                    |> expectView
                        (Test.Html.Query.has
                            [ tag "div"
                            , id "value-casing"
                            , classes
                                [ "output-style-custom-html"
                                , "allows-custom-options"
                                ]
                            ]
                        )
        ]
