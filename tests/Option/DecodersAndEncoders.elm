module Option.DecodersAndEncoders exposing (suite)

import Expect
import Json.Decode
import Option exposing (newDisabledOption, newSelectedOption, select, test_newFancyOptionWithMaybeCleanString)
import OptionList exposing (OptionList(..))
import OptionPart
import SelectionMode
import Test exposing (Test, describe, test)


simpleOptionWithJustLabelAndValue =
    """{"label": "Sup", "labelClean": "sup", "value": "Sup"}"""


simpleSelectedOption =
    """{"label": "Sup", "labelClean": "sup", "value": "Sup", "selected": true}"""


simpleSelectedOptionSelectedIsAString =
    """{"label": "Sup", "labelClean": "sup", "value": "Sup", "selected": "true"}"""


simpleNotSelectedOption =
    """{"label": "Sup", "labelClean": "sup", "value": "Sup", "selected": "false"}"""


disabledOption =
    """{"label": "Dude", "labelClean": "dude", "value": "Dude", "selected": "false", "disabled": true}"""


listOfOptions =
    """[
        {"label": "one", "labelClean": "one", "value": "1", "selected": "false"},
        {"label": "two", "labelClean": "two", "value": "2"},
        {"label": "three", "labelClean": "three", "value": "3", "selected": "true"}]"""


listOfOptionsWithDescriptions =
    """[
        {"label": "straw", "labelClean": "straw", "value": "1", "selected": "false", "description": "👒", "descriptionClean": null},
        {"label": "sticks", "labelClean": "sticks", "value": "2", "description": "🌳", "descriptionClean": null},
        {"label": "bricks", "labelClean": "bricks", "value": "3", "selected": "true", "description": "🧱", "descriptionClean": null}]
    """


listOfOptionsWithGroups =
    """[
        {"label": "straw", "labelClean": "straw", "value": "1", "selected": "false", "group": "Building Material"},
        {"label": "sticks", "labelClean": "sticks", "value": "2", "group": "Building Material"},
        {"label": "bricks", "labelClean": "bricks", "value": "3", "selected": "true", "group": "Building Material"}]
    """


listOfOptionsWithJustValues =
    """
    [
      {
        "value": "The Enormous Crocodile"
      },
      {
        "value": "James and the Giant Peach"
      },
      {
        "value": "Matilda"
      },
      {
        "value": "The BFG"
      }
    ]
    """


decoder =
    Option.decoder


optionListDecoder =
    OptionList.decoder SelectionMode.CustomHtml


suite : Test
suite =
    describe "The Option modules"
        [ describe "decoding"
            [ test "an option with just a label and value" <|
                \_ ->
                    Expect.equal
                        (Ok (test_newFancyOptionWithMaybeCleanString "Sup" (Just "sup")))
                        (Json.Decode.decodeString decoder simpleOptionWithJustLabelAndValue)
            , test "an option that's selected" <|
                \_ ->
                    Expect.equal
                        (Ok (newSelectedOption 0 "Sup" (Just "sup")))
                        (Json.Decode.decodeString decoder simpleSelectedOption)
            , test "an option that's selected (using the 'true' string)" <|
                \_ ->
                    Expect.equal
                        (Ok (newSelectedOption 0 "Sup" (Just "sup")))
                        (Json.Decode.decodeString decoder simpleSelectedOptionSelectedIsAString)
            , test "an option that's not selected" <|
                \_ ->
                    Expect.equal
                        (Ok (test_newFancyOptionWithMaybeCleanString "Sup" (Just "sup")))
                        (Json.Decode.decodeString decoder simpleNotSelectedOption)
            , test "an option that's disabled" <|
                \_ ->
                    Expect.equal
                        (Ok
                            (newDisabledOption "Dude" (Just "dude")
                                |> Option.setPart (OptionPart.test_new "Dude")
                            )
                        )
                        (Json.Decode.decodeString decoder disabledOption)
            , test "a list of options" <|
                \_ ->
                    Expect.equal
                        (Ok
                            (FancyOptionList
                                [ test_newFancyOptionWithMaybeCleanString "1" Nothing
                                    |> Option.setLabelWithString "one" (Just "one")
                                    |> Option.setPart (OptionPart.test_new "1")
                                , test_newFancyOptionWithMaybeCleanString "2" Nothing
                                    |> Option.setLabelWithString "two" (Just "two")
                                    |> Option.setPart (OptionPart.test_new "2")
                                , test_newFancyOptionWithMaybeCleanString "3" Nothing
                                    |> select 0
                                    |> Option.setLabelWithString "three" (Just "three")
                                    |> Option.setPart (OptionPart.test_new "3")
                                ]
                            )
                        )
                        (Json.Decode.decodeString optionListDecoder listOfOptions)
            , test "a list of options with descriptions" <|
                \_ ->
                    Expect.equal
                        (Ok
                            (FancyOptionList
                                [ test_newFancyOptionWithMaybeCleanString "1" Nothing
                                    |> Option.setLabelWithString "straw" (Just "straw")
                                    |> Option.setDescriptionWithString "👒"
                                    |> Option.setPart (OptionPart.test_new "1")
                                , test_newFancyOptionWithMaybeCleanString "2" Nothing
                                    |> Option.setLabelWithString "sticks" (Just "sticks")
                                    |> Option.setDescriptionWithString "🌳"
                                    |> Option.setPart (OptionPart.test_new "2")
                                , newSelectedOption 0 "3" Nothing
                                    |> Option.setLabelWithString "bricks" (Just "bricks")
                                    |> Option.setDescriptionWithString "🧱"
                                    |> Option.setPart (OptionPart.test_new "3")
                                ]
                            )
                        )
                        (Json.Decode.decodeString
                            optionListDecoder
                            listOfOptionsWithDescriptions
                        )
            , test "a list of options with groups" <|
                \_ ->
                    Expect.equal
                        (Ok
                            (FancyOptionList
                                [ test_newFancyOptionWithMaybeCleanString "1" Nothing
                                    |> Option.setLabelWithString "straw" (Just "straw")
                                    |> Option.setGroupWithString "Building Material"
                                    |> Option.setPart (OptionPart.test_new "1")
                                , test_newFancyOptionWithMaybeCleanString "2" Nothing
                                    |> Option.setLabelWithString "sticks" (Just "sticks")
                                    |> Option.setGroupWithString "Building Material"
                                    |> Option.setPart (OptionPart.test_new "2")
                                , test_newFancyOptionWithMaybeCleanString "3" Nothing
                                    |> select 0
                                    |> Option.setLabelWithString "bricks" (Just "bricks")
                                    |> Option.setGroupWithString "Building Material"
                                    |> Option.setPart (OptionPart.test_new "3")
                                ]
                            )
                        )
                        (Json.Decode.decodeString
                            optionListDecoder
                            listOfOptionsWithGroups
                        )
            , test "an empty option with an empty label" <|
                \_ ->
                    Expect.equal
                        (Ok (FancyOptionList [ test_newFancyOptionWithMaybeCleanString "" (Just "") ]))
                        (Json.Decode.decodeString optionListDecoder """[ {"label": "", "labelClean": "", "value": "" } ]""")
            , test "an empty option with a label" <|
                \_ ->
                    Expect.equal
                        (Ok (FancyOptionList [ test_newFancyOptionWithMaybeCleanString "" Nothing |> Option.setLabelWithString "nothing" (Just "nothing") ]))
                        (Json.Decode.decodeString optionListDecoder """[ {"label": "nothing", "labelClean": "nothing", "value": "" } ]""")
            , test "a list of options with just values should fail" <|
                \_ ->
                    Expect.err
                        (Json.Decode.decodeString optionListDecoder listOfOptionsWithJustValues)
            ]
        ]
