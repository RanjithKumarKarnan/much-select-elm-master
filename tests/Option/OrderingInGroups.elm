module Option.OrderingInGroups exposing (suite)

import DropdownOptions
import Expect
import GroupedDropdownOptions
import Option exposing (Option(..), setGroupWithString, test_newFancyOptionWithMaybeCleanString)
import OptionGroup exposing (OptionGroup)
import OptionList
import Test exposing (Test, describe, test)


screwDriver =
    test_newFancyOptionWithMaybeCleanString "Screw Driver" Nothing
        |> setGroupWithString "Hand Tool"


wrench =
    test_newFancyOptionWithMaybeCleanString "Wrench" Nothing
        |> setGroupWithString "Hand Tool"


hammer =
    test_newFancyOptionWithMaybeCleanString "Hammer" Nothing
        |> setGroupWithString "Hand Tool"


chisel =
    test_newFancyOptionWithMaybeCleanString "Chisel" Nothing
        |> setGroupWithString "Hand Tool"


multiMeter =
    test_newFancyOptionWithMaybeCleanString "Multi Meter" Nothing
        |> setGroupWithString "Electronic Instrument"


signalTester =
    test_newFancyOptionWithMaybeCleanString "Signal Tester" Nothing
        |> setGroupWithString "Electronic Instrument"


drill =
    test_newFancyOptionWithMaybeCleanString "Drill" Nothing
        |> setGroupWithString "Power Tool"


sawZaw =
    test_newFancyOptionWithMaybeCleanString "Saw Zaw" Nothing
        |> setGroupWithString "Power Tool"


tools =
    OptionList.FancyOptionList
        [ screwDriver
        , drill
        , multiMeter
        , sawZaw
        , wrench
        , hammer
        , chisel
        , signalTester
        ]


optionGroupToDebuggingString : OptionGroup -> String
optionGroupToDebuggingString optionGroup =
    OptionGroup.toString optionGroup


suite : Test
suite =
    describe "When we have a sorted list of options"
        [ test "keep them in order but group them by their option groups" <|
            \_ ->
                Expect.equalLists
                    (GroupedDropdownOptions.groupOptionsInOrder (DropdownOptions.test_fromOptions tools)
                        |> GroupedDropdownOptions.test_DropdownOptionsGroupToStringAndOptions
                    )
                    ([ ( OptionGroup.new "Hand Tool", [ screwDriver ] )
                     , ( OptionGroup.new "Power Tool", [ drill ] )
                     , ( OptionGroup.new "Electronic Instrument", [ multiMeter ] )
                     , ( OptionGroup.new "Power Tool", [ sawZaw ] )
                     , ( OptionGroup.new "Hand Tool", [ wrench, hammer, chisel ] )
                     , ( OptionGroup.new "Electronic Instrument", [ signalTester ] )
                     ]
                        |> List.map
                            (\( optionGroup, options ) ->
                                ( optionGroupToDebuggingString optionGroup
                                , List.map Option.test_optionToDebuggingString options
                                )
                            )
                    )
        ]
