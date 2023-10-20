module Option.AddingOptions exposing (suite)

import Expect exposing (Expectation)
import Option exposing (Option(..), select, setDescriptionWithString, setLabelWithString, test_newDatalistOption, test_newEmptyDatalistOption, test_newEmptySelectedDatalistOption, test_newFancyOption, test_newFancyOptionWithMaybeCleanString)
import OptionList exposing (OptionList(..), addAdditionalOptionsToOptionList, addAdditionalOptionsToOptionListWithAutoSortRank, addAndSelectOptionsInOptionsListByString, addNewSelectedEmptyOptionAtIndex, mergeTwoListsOfOptionsPreservingSelectedOptions, test_newFancyOptionList, updatedDatalistSelectedOptions)
import OptionValue
import OutputStyle exposing (SelectedItemPlacementMode(..))
import SelectionMode
import SortRank exposing (newMaybeAutoSortRank)
import Test exposing (Test, describe, test)


heartBones =
    test_newFancyOptionWithMaybeCleanString "Heart Bones" Nothing


timecop1983 =
    test_newFancyOptionWithMaybeCleanString "Timecop1983" Nothing


wolfCubJustValue =
    test_newFancyOptionWithMaybeCleanString "Wolf Club" Nothing


wolfClub =
    test_newFancyOptionWithMaybeCleanString "Wolf Club" Nothing
        |> setLabelWithString "W O L F C L U B" Nothing
        |> setDescriptionWithString "80s Retro Wave"


waveshaper =
    test_newFancyOptionWithMaybeCleanString "Waveshaper" Nothing


theMidnightOptionValue =
    OptionValue.stringToOptionValue "The Midnight"


theMidnightSelected =
    test_newDatalistOption "The Midnight"
        |> Option.select 0


theMidnight =
    test_newDatalistOption "The Midnight"



--noinspection SpellCheckingInspection


futureCopOptionValue =
    OptionValue.stringToOptionValue "Futurecop!"



--noinspection SpellCheckingInspection


futureCop =
    test_newDatalistOption "Futurecop!"



--noinspection SpellCheckingInspection


futureCopSelected =
    test_newDatalistOption "Futurecop!"
        |> Option.select 1


arcadeHighOptionValue =
    OptionValue.stringToOptionValue "Arcade High"


arcadeHigh =
    test_newDatalistOption "Arcade High"


arcadeHighSelected =
    test_newDatalistOption "Arcade High"
        |> Option.select 2


suite : Test
suite =
    describe "Adding options"
        [ test "that have different values should get added to the list" <|
            \_ ->
                Expect.equal
                    (test_newFancyOptionList [ heartBones, waveshaper ])
                    (addAdditionalOptionsToOptionList
                        (test_newFancyOptionList [ waveshaper ])
                        (test_newFancyOptionList [ heartBones ])
                    )
        , test "with the same value of an option already in the list (single)" <|
            \_ ->
                Expect.equal
                    (test_newFancyOptionList [ heartBones ])
                    (addAdditionalOptionsToOptionList
                        (test_newFancyOptionList [ heartBones ])
                        (test_newFancyOptionList [ heartBones ])
                    )
        , test "with the same value of an option already in the list" <|
            \_ ->
                Expect.equal
                    (test_newFancyOptionList [ timecop1983, heartBones ])
                    (addAdditionalOptionsToOptionList
                        (test_newFancyOptionList [ timecop1983, heartBones ])
                        (test_newFancyOptionList [ heartBones ])
                    )
        , test "with the same value of an option already in the list but with a description" <|
            \_ ->
                Expect.equal
                    (test_newFancyOptionList [ wolfClub ])
                    (addAdditionalOptionsToOptionList
                        (test_newFancyOptionList [ wolfCubJustValue ])
                        (test_newFancyOptionList [ wolfClub ])
                    )
        , test "with the same value of an option already in the list but with less meta data" <|
            \_ ->
                Expect.equal
                    (test_newFancyOptionList [ wolfClub ])
                    (addAdditionalOptionsToOptionList
                        (test_newFancyOptionList [ wolfClub ])
                        (test_newFancyOptionList [ wolfCubJustValue ])
                    )
        , describe "and selecting them"
            [ test "with the same value of an option already in the list, preserver the label" <|
                \_ ->
                    Expect.equal
                        (test_newFancyOptionList [ select 0 wolfClub ])
                        (addAndSelectOptionsInOptionsListByString [ "Wolf Club" ] (test_newFancyOptionList [ wolfClub ]))
            , test "with the same value of a selected option already in the list preserver the label" <|
                \_ ->
                    Expect.equal
                        (test_newFancyOptionList
                            [ wolfClub
                            , select 1 waveshaper
                            , arcadeHigh
                            , select 0 timecop1983
                            ]
                        )
                        (addAndSelectOptionsInOptionsListByString [ "Timecop1983", "Waveshaper" ]
                            (test_newFancyOptionList
                                [ wolfClub
                                , waveshaper
                                , arcadeHigh
                                , timecop1983
                                ]
                            )
                        )
            , test "should preserver the order of the selection" <|
                \_ ->
                    Expect.equal
                        (test_newFancyOptionList [ select 0 wolfClub ])
                        (addAndSelectOptionsInOptionsListByString [ "Wolf Club" ]
                            (test_newFancyOptionList
                                [ select 0 wolfClub ]
                            )
                        )
            , test "should preserver the order of multiple selections" <|
                \_ ->
                    Expect.equal
                        (test_newFancyOptionList
                            [ select 1 heartBones
                            , timecop1983
                            , select 0 waveshaper
                            ]
                        )
                        (addAndSelectOptionsInOptionsListByString
                            [ "Waveshaper", "Heart Bones" ]
                            (test_newFancyOptionList
                                [ heartBones
                                , timecop1983
                                , waveshaper
                                ]
                            )
                        )
            ]
        , describe "and merging them with a selected value"
            [ test "if a new option matches the selected option update the label and description" <|
                \_ ->
                    Expect.equal
                        (test_newFancyOptionList [ wolfClub |> select 0 ])
                        (mergeTwoListsOfOptionsPreservingSelectedOptions
                            SelectionMode.SingleSelect
                            SelectedItemStaysInPlace
                            (test_newFancyOptionList [ test_newFancyOption "Wolf Club" |> select 0 ])
                            (test_newFancyOptionList [ wolfClub ])
                        )
            , test "if a new option matches the selected option update the description even when adding a bunch of new options" <|
                \_ ->
                    Expect.equal
                        (test_newFancyOptionList [ wolfClub |> select 0, timecop1983, heartBones ])
                        (mergeTwoListsOfOptionsPreservingSelectedOptions
                            SelectionMode.SingleSelect
                            SelectedItemStaysInPlace
                            (test_newFancyOptionList [ test_newFancyOptionWithMaybeCleanString "Wolf Club" Nothing |> select 0 ])
                            (test_newFancyOptionList [ wolfClub, timecop1983, heartBones ])
                        )
            , test "a selection option should stay in the same spot in the list" <|
                \_ ->
                    Expect.equal
                        (test_newFancyOptionList [ timecop1983, heartBones, wolfClub |> select 0 ])
                        (mergeTwoListsOfOptionsPreservingSelectedOptions
                            SelectionMode.SingleSelect
                            SelectedItemStaysInPlace
                            (test_newFancyOptionList [ test_newFancyOptionWithMaybeCleanString "Wolf Club" Nothing |> select 0 ])
                            (test_newFancyOptionList [ timecop1983, heartBones, wolfClub ])
                        )
            , test "a selected option should move to the top of the list of options (when that option is set)" <|
                \_ ->
                    Expect.equal
                        (test_newFancyOptionList [ wolfClub |> select 0, timecop1983, heartBones ])
                        (mergeTwoListsOfOptionsPreservingSelectedOptions
                            SelectionMode.SingleSelect
                            SelectedItemMovesToTheTop
                            (test_newFancyOptionList [ test_newFancyOptionWithMaybeCleanString "Wolf Club" Nothing |> select 0 ])
                            (test_newFancyOptionList [ timecop1983, heartBones, wolfClub ])
                        )
            , describe "with auto sort order rank"
                [ test "new options should get added to the end of the list of options" <|
                    \_ ->
                        Expect.equal
                            (test_newFancyOptionList
                                [ heartBones |> Option.setMaybeSortRank (newMaybeAutoSortRank 3)
                                , wolfClub |> Option.setMaybeSortRank (newMaybeAutoSortRank 1)
                                , timecop1983 |> Option.setMaybeSortRank (newMaybeAutoSortRank 2)
                                ]
                            )
                            (addAdditionalOptionsToOptionListWithAutoSortRank
                                (test_newFancyOptionList
                                    [ wolfClub |> Option.setMaybeSortRank (newMaybeAutoSortRank 1)
                                    , timecop1983 |> Option.setMaybeSortRank (newMaybeAutoSortRank 2)
                                    ]
                                )
                                (test_newFancyOptionList [ heartBones ])
                            )
                , test "multiple new options should get added to the end of the list of options" <|
                    \_ ->
                        Expect.equal
                            (test_newFancyOptionList
                                [ heartBones |> Option.setMaybeSortRank (newMaybeAutoSortRank 6)
                                , timecop1983 |> Option.setMaybeSortRank (newMaybeAutoSortRank 7)
                                , wolfClub |> Option.setMaybeSortRank (newMaybeAutoSortRank 5)
                                ]
                            )
                            (addAdditionalOptionsToOptionListWithAutoSortRank
                                (test_newFancyOptionList
                                    [ wolfClub |> Option.setMaybeSortRank (newMaybeAutoSortRank 5)
                                    ]
                                )
                                (test_newFancyOptionList [ heartBones, timecop1983 ])
                            )
                ]
            ]
        , describe "and merging them with existing options"
            [ test "we should keep label and descriptions" <|
                \_ ->
                    Expect.equal
                        (test_newFancyOptionList
                            [ wolfClub
                            ]
                        )
                        (mergeTwoListsOfOptionsPreservingSelectedOptions
                            SelectionMode.SingleSelect
                            SelectedItemStaysInPlace
                            (test_newFancyOptionList
                                [ wolfClub
                                ]
                            )
                            (test_newFancyOptionList [ test_newFancyOptionWithMaybeCleanString "Wolf Club" Nothing ])
                        )
            ]
        , describe "mering two options"
            [ test "should preserve label and description when the option with the label and description is first" <|
                \_ ->
                    Expect.equal
                        wolfClub
                        (Option.merge wolfClub (test_newFancyOptionWithMaybeCleanString "Wolf Club" Nothing))
            , test "should preserve label and description when the option with the label and description is second" <|
                \_ ->
                    Expect.equal
                        wolfClub
                        (Option.merge (test_newFancyOptionWithMaybeCleanString "Wolf Club" Nothing) wolfClub)
            ]
        , describe "to a datalist list of options"
            [ test "add to the beginning of the selected options" <|
                \_ ->
                    Expect.equal
                        (DatalistOptionList
                            [ test_newEmptySelectedDatalistOption 0
                            , Option.select 1 theMidnight
                            , Option.select 2 futureCop
                            , Option.select 3 arcadeHigh
                            ]
                        )
                        (DatalistOptionList [ theMidnightSelected, futureCopSelected, arcadeHighSelected ]
                            |> addNewSelectedEmptyOptionAtIndex 0
                        )
            , test "add to the middle of the selected options" <|
                \_ ->
                    Expect.equal
                        (DatalistOptionList
                            [ theMidnightSelected
                            , test_newEmptySelectedDatalistOption 1
                            , Option.select 2 futureCop
                            , Option.select 3 arcadeHigh
                            ]
                        )
                        (DatalistOptionList
                            [ theMidnightSelected
                            , futureCopSelected
                            , arcadeHighSelected
                            ]
                            |> addNewSelectedEmptyOptionAtIndex 1
                        )
            , test "add to the end of the selected options" <|
                \_ ->
                    Expect.equal
                        (DatalistOptionList
                            [ theMidnightSelected
                            , futureCopSelected
                            , arcadeHighSelected
                            , test_newEmptySelectedDatalistOption 3
                            ]
                        )
                        (DatalistOptionList
                            [ theMidnightSelected
                            , futureCopSelected
                            , arcadeHighSelected
                            ]
                            |> addNewSelectedEmptyOptionAtIndex 3
                        )
            , test "preserver the empty selected options" <|
                \_ ->
                    Expect.equal
                        (updatedDatalistSelectedOptions
                            [ theMidnightOptionValue, futureCopOptionValue, arcadeHighOptionValue ]
                            (DatalistOptionList
                                [ theMidnightSelected
                                , futureCopSelected
                                , arcadeHighSelected
                                , test_newEmptyDatalistOption
                                    |> select 3
                                , theMidnight
                                , futureCop
                                , arcadeHigh
                                ]
                            )
                        )
                        (DatalistOptionList
                            [ theMidnightSelected
                            , futureCopSelected
                            , arcadeHighSelected
                            , test_newEmptyDatalistOption
                                |> select 3
                            , theMidnight
                            , futureCop
                            , arcadeHigh
                            ]
                        )
            ]
        ]
