module Option.ReplacingOptions exposing (suite)

import Expect
import Option exposing (test_newFancyOption)
import OptionList exposing (OptionList(..), test_newFancyOptionList)
import OutputStyle
import SelectionMode
import Test exposing (Test, describe, test)


futureCop =
    test_newFancyOption "Future Cop!"


theMidnight =
    test_newFancyOption "The Midnight"


thirdEyeBlind =
    test_newFancyOption "Third Eye Blind"


timeCop1983 =
    test_newFancyOption "Timecop1983"


timeCop1983WithLabel =
    test_newFancyOption "Timecop1983"
        |> Option.setLabelWithString "Timecop 1983" (Just "Timecop 1983")


selectionConfig =
    SelectionMode.defaultSelectionConfig
        |> SelectionMode.setAllowCustomOptionsWithBool False Nothing
        |> SelectionMode.setSelectedItemStaysInPlaceWithBool True


multiSelectSelectionConfig =
    SelectionMode.defaultSelectionConfig
        |> SelectionMode.setSelectionMode SelectionMode.MultiSelect
        |> SelectionMode.setAllowCustomOptionsWithBool False Nothing
        |> SelectionMode.setSelectedItemStaysInPlaceWithBool True


suite : Test
suite =
    describe "Replacing options"
        [ describe "in multi select mode "
            [ test "should not include options that were there before" <|
                \_ ->
                    Expect.equalLists
                        [ futureCop, theMidnight ]
                        (OptionList.replaceOptions
                            multiSelectSelectionConfig
                            (test_newFancyOptionList [ thirdEyeBlind, futureCop ])
                            (test_newFancyOptionList [ futureCop, theMidnight ])
                            |> OptionList.getOptions
                        )
            , test "should preserver selected options" <|
                \_ ->
                    Expect.equalLists
                        [ futureCop, Option.select 0 theMidnight ]
                        (OptionList.replaceOptions
                            multiSelectSelectionConfig
                            (test_newFancyOptionList [ thirdEyeBlind, futureCop ])
                            (test_newFancyOptionList [ futureCop, Option.select 0 theMidnight ])
                            |> OptionList.getOptions
                        )
            , test "should preserver selected options even if the selected value is not in the new list of options" <|
                \_ ->
                    Expect.equalLists
                        (OptionList.replaceOptions
                            multiSelectSelectionConfig
                            (test_newFancyOptionList [ Option.select 0 thirdEyeBlind, futureCop ])
                            (test_newFancyOptionList [ futureCop, theMidnight ])
                            |> OptionList.getOptions
                        )
                        [ futureCop, theMidnight, Option.select 0 thirdEyeBlind ]
            , test "should preserver selected order of the options" <|
                \_ ->
                    Expect.equalLists
                        (OptionList.replaceOptions
                            multiSelectSelectionConfig
                            (test_newFancyOptionList [ Option.select 1 thirdEyeBlind, futureCop, Option.select 0 theMidnight ])
                            (test_newFancyOptionList [ Option.select 1 thirdEyeBlind, futureCop, Option.select 0 theMidnight ])
                            |> OptionList.getOptions
                        )
                        [ Option.select 1 thirdEyeBlind, futureCop, Option.select 0 theMidnight ]
            , test "merging the 2 lists of options should preserver selected order of the options" <|
                \_ ->
                    Expect.equalLists
                        (OptionList.mergeTwoListsOfOptionsPreservingSelectedOptions
                            SelectionMode.MultiSelect
                            OutputStyle.SelectedItemStaysInPlace
                            (test_newFancyOptionList [ Option.select 1 thirdEyeBlind, futureCop, Option.select 0 theMidnight ])
                            (test_newFancyOptionList [ Option.select 1 thirdEyeBlind, futureCop, Option.select 0 theMidnight ])
                            |> OptionList.getOptions
                        )
                        [ Option.select 1 thirdEyeBlind, futureCop, Option.select 0 theMidnight ]
            ]
        , describe "in single select mode"
            [ test "should preserver a single selected item in the new list of options" <|
                \_ ->
                    Expect.equalLists
                        (OptionList.replaceOptions
                            selectionConfig
                            (test_newFancyOptionList [ futureCop, theMidnight ])
                            (test_newFancyOptionList [ Option.select 0 thirdEyeBlind, futureCop ])
                            |> OptionList.getOptions
                        )
                        [ Option.select 0 thirdEyeBlind, futureCop ]
            , test "should preserver a single selected item in the old list of options" <|
                \_ ->
                    Expect.equalLists
                        (OptionList.replaceOptions
                            selectionConfig
                            (test_newFancyOptionList [ Option.select 0 thirdEyeBlind, theMidnight ])
                            (test_newFancyOptionList [ thirdEyeBlind, futureCop ])
                            |> OptionList.getOptions
                        )
                        [ Option.select 0 thirdEyeBlind, futureCop ]
            , test "should preserver a single selected item when the selected item is in both the old and new list" <|
                \_ ->
                    Expect.equalLists
                        (OptionList.replaceOptions
                            selectionConfig
                            (test_newFancyOptionList [ Option.select 0 thirdEyeBlind, theMidnight ])
                            (test_newFancyOptionList [ Option.select 0 thirdEyeBlind, futureCop ])
                            |> OptionList.getOptions
                        )
                        [ Option.select 0 thirdEyeBlind, futureCop ]
            , test "should preserver a single selected item when the selected item is NOT in the new list" <|
                \_ ->
                    Expect.equalLists
                        (OptionList.replaceOptions
                            selectionConfig
                            (test_newFancyOptionList [ Option.select 0 thirdEyeBlind, theMidnight ])
                            (test_newFancyOptionList [ futureCop ])
                            |> OptionList.getOptions
                        )
                        [ futureCop, Option.select 0 thirdEyeBlind ]
            , test "should preserver a single selected item when different items are selected in the old and new list, favoring the new selected option" <|
                \_ ->
                    Expect.equalLists
                        (OptionList.replaceOptions
                            selectionConfig
                            (test_newFancyOptionList [ Option.select 0 thirdEyeBlind, theMidnight ])
                            (test_newFancyOptionList [ Option.select 0 futureCop ])
                            |> OptionList.getOptions
                        )
                        [ Option.select 0 futureCop ]
            , test "should get the label values from the second list if the option with matching values in the first list doesn't have a label" <|
                \_ ->
                    Expect.equalLists
                        [ Option.select 0 timeCop1983WithLabel, theMidnight ]
                        (OptionList.replaceOptions
                            selectionConfig
                            (test_newFancyOptionList [ Option.select 0 timeCop1983, theMidnight ])
                            (test_newFancyOptionList [ timeCop1983WithLabel, theMidnight ])
                            |> OptionList.getOptions
                        )
            ]
        ]
