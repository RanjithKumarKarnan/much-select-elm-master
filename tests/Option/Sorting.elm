module Option.Sorting exposing (suite)

import Expect
import Option exposing (Option(..), setGroupWithString, test_newFancyOptionWithMaybeCleanString, test_optionToDebuggingString)
import OptionList exposing (findHighestAutoSortRank)
import OptionSorting exposing (OptionSort(..), sortOptions)
import SortRank exposing (newMaybeAutoSortRank)
import Test exposing (Test, describe, test)


heartBones =
    test_newFancyOptionWithMaybeCleanString "Heart Bones" Nothing


timecop1983 =
    test_newFancyOptionWithMaybeCleanString "Timecop1983" Nothing


wolfClub =
    test_newFancyOptionWithMaybeCleanString "W O L F C L U B" Nothing


waveshaper =
    test_newFancyOptionWithMaybeCleanString "Waveshaper" Nothing


musicList =
    [ waveshaper
    , timecop1983
    , wolfClub
    , heartBones
    ]


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
    [ screwDriver
    , drill
    , multiMeter
    , sawZaw
    , wrench
    , hammer
    , chisel
    , signalTester
    ]


suite : Test
suite =
    describe "Sorting lists of options"
        [ describe "sort list of options by group and label"
            [ test "Expect options with no group to just be sorted by their label" <|
                \_ ->
                    Expect.equalLists
                        (musicList
                            |> sortOptions NoSorting
                            |> List.map test_optionToDebuggingString
                        )
                        ([ heartBones
                         , timecop1983
                         , wolfClub
                         , waveshaper
                         ]
                            |> List.map test_optionToDebuggingString
                        )
            , test "options with groups should be sorted by their groups and then by their label" <|
                \_ ->
                    Expect.equalLists
                        (tools |> sortOptions NoSorting |> List.map test_optionToDebuggingString)
                        ([ chisel
                         , hammer
                         , screwDriver
                         , wrench
                         , drill
                         , sawZaw
                         , multiMeter
                         , signalTester
                         ]
                            |> List.map test_optionToDebuggingString
                        )
            ]
        , describe "getting the highest sorted "
            [ test "when there is just 1" <|
                \_ ->
                    Expect.equal
                        (OptionList.FancyOptionList [ screwDriver |> Option.setMaybeSortRank (newMaybeAutoSortRank 1) ] |> findHighestAutoSortRank)
                        1
            , test "when there is more than 1" <|
                \_ ->
                    Expect.equal
                        (OptionList.FancyOptionList
                            [ hammer |> Option.setMaybeSortRank (newMaybeAutoSortRank 1)
                            , drill |> Option.setMaybeSortRank (newMaybeAutoSortRank 2)
                            , screwDriver |> Option.setMaybeSortRank (newMaybeAutoSortRank 3)
                            ]
                            |> findHighestAutoSortRank
                        )
                        3
            ]
        ]
