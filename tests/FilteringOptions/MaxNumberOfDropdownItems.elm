module FilteringOptions.MaxNumberOfDropdownItems exposing (suite)

import DomStateCache exposing (OutputStyleAttribute(..), test_defaultDomStateCache, updateOutputStyle)
import DropdownOptions exposing (figureOutWhichOptionsToShowInTheDropdown)
import Expect exposing (Expectation)
import Option exposing (setGroupWithString, test_newDatalistOption, test_newEmptyDatalistOption, test_newFancyOptionWithMaybeCleanString)
import OptionList exposing (OptionList(..), test_newDatalistOptionList)
import OutputStyle exposing (MaxDropdownItems(..), SearchStringMinimumLength(..))
import PositiveInt
import SelectionMode exposing (OutputStyle(..), SelectionConfig(..), defaultSelectionConfig)
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


utilityKnife =
    test_newFancyOptionWithMaybeCleanString "Utility Knife" Nothing
        |> setGroupWithString "Hand Tool"


tools =
    FancyOptionList
        [ screwDriver
        , drill
        , multiMeter
        , sawZaw
        , wrench
        , hammer
        , chisel
        , signalTester
        , utilityKnife
        ]


ten =
    FixedMaxDropdownItems (PositiveInt.new 10)


nine =
    FixedMaxDropdownItems (PositiveInt.new 9)


five =
    FixedMaxDropdownItems (PositiveInt.new 5)


six =
    FixedMaxDropdownItems (PositiveInt.new 6)


three =
    FixedMaxDropdownItems (PositiveInt.new 3)


selectionConfig =
    defaultSelectionConfig


selectionConfigMaxDropdownItemsTen =
    selectionConfig |> SelectionMode.setMaxDropdownItems ten


selectionConfigMaxDropdownItemsNine =
    selectionConfig |> SelectionMode.setMaxDropdownItems nine


selectionConfigMaxDropdownItemsSix =
    selectionConfig |> SelectionMode.setMaxDropdownItems six


selectionConfigMaxDropdownItemsFive =
    selectionConfig |> SelectionMode.setMaxDropdownItems five


selectionConfigMaxDropdownItemsThree =
    selectionConfig |> SelectionMode.setMaxDropdownItems three


assertEqualLists : OptionList -> OptionList -> Expectation
assertEqualLists optionListA optionListB =
    Expect.equalLists
        (optionListA |> OptionList.getOptions |> List.map Option.getOptionValueAsString)
        (optionListB |> OptionList.getOptions |> List.map Option.getOptionValueAsString)


emptyFancyList =
    FancyOptionList []


suite : Test
suite =
    describe "Calculate which options to show in the dropdown"
        [ describe "when we have fewer options than the max"
            [ test "it should show all the options if nothing in highlighted" <|
                \_ ->
                    assertEqualLists
                        (figureOutWhichOptionsToShowInTheDropdown selectionConfigMaxDropdownItemsTen tools |> DropdownOptions.test_getOptions)
                        tools
            , test "it should show no options if the list is empty" <|
                \_ ->
                    assertEqualLists
                        (figureOutWhichOptionsToShowInTheDropdown selectionConfigMaxDropdownItemsTen emptyFancyList |> DropdownOptions.test_getOptions)
                        emptyFancyList
            , test "it shows all the options even if something is highlighted" <|
                \_ ->
                    assertEqualLists
                        (figureOutWhichOptionsToShowInTheDropdown selectionConfigMaxDropdownItemsTen
                            (OptionList.highlightOption wrench tools)
                            |> DropdownOptions.test_getOptions
                        )
                        (OptionList.highlightOption wrench tools)
            ]
        , describe "when we have the same number of options as the max"
            [ test "it should show all the options if nothing in highlighted" <|
                \_ ->
                    assertEqualLists
                        (figureOutWhichOptionsToShowInTheDropdown
                            selectionConfigMaxDropdownItemsNine
                            tools
                            |> DropdownOptions.test_getOptions
                        )
                        tools
            , test "it should show no options if the list is empty" <|
                \_ ->
                    assertEqualLists
                        (figureOutWhichOptionsToShowInTheDropdown selectionConfigMaxDropdownItemsNine emptyFancyList
                            |> DropdownOptions.test_getOptions
                        )
                        emptyFancyList
            , test "it shows all the options even if something is highlighted" <|
                \_ ->
                    assertEqualLists
                        (figureOutWhichOptionsToShowInTheDropdown selectionConfigMaxDropdownItemsNine (OptionList.highlightOption wrench tools)
                            |> DropdownOptions.test_getOptions
                        )
                        (OptionList.highlightOption wrench tools)
            ]
        , describe "when we have more options than the max (which is odd)"
            [ test "it should show all the maximum number of options starting at the start of the list if nothing in highlighted" <|
                \_ ->
                    assertEqualLists
                        (figureOutWhichOptionsToShowInTheDropdown selectionConfigMaxDropdownItemsFive tools |> DropdownOptions.test_getOptions)
                        (FancyOptionList
                            [ screwDriver
                            , drill
                            , multiMeter
                            , sawZaw
                            , wrench
                            ]
                        )
            , test "it shows the options around the highlighted option" <|
                \_ ->
                    assertEqualLists
                        (figureOutWhichOptionsToShowInTheDropdown selectionConfigMaxDropdownItemsFive (OptionList.highlightOption wrench tools) |> DropdownOptions.test_getOptions)
                        (OptionList.highlightOption wrench
                            (FancyOptionList
                                [ multiMeter
                                , sawZaw
                                , wrench
                                , hammer
                                , chisel
                                ]
                            )
                        )
            , test "it shows the maximum number of options before the highlighted option if the highlighted option is the last one" <|
                \_ ->
                    assertEqualLists
                        (figureOutWhichOptionsToShowInTheDropdown selectionConfigMaxDropdownItemsFive (OptionList.highlightOption utilityKnife tools) |> DropdownOptions.test_getOptions)
                        (OptionList.highlightOption utilityKnife
                            (FancyOptionList
                                [ wrench
                                , hammer
                                , chisel
                                , signalTester
                                , utilityKnife
                                ]
                            )
                        )
            , test "it shows the maximum number of options but offset if the highlighted option is just after the first one" <|
                \_ ->
                    assertEqualLists
                        (figureOutWhichOptionsToShowInTheDropdown selectionConfigMaxDropdownItemsFive (OptionList.highlightOption drill tools) |> DropdownOptions.test_getOptions)
                        (OptionList.highlightOption drill
                            (FancyOptionList
                                [ screwDriver
                                , drill
                                , multiMeter
                                , sawZaw
                                , wrench
                                ]
                            )
                        )
            , test "it shows the maximum number of options but offset if the highlighted option is just before the last one" <|
                \_ ->
                    assertEqualLists
                        (figureOutWhichOptionsToShowInTheDropdown selectionConfigMaxDropdownItemsFive (OptionList.highlightOption signalTester tools) |> DropdownOptions.test_getOptions)
                        (OptionList.highlightOption signalTester
                            (FancyOptionList
                                [ wrench
                                , hammer
                                , chisel
                                , signalTester
                                , utilityKnife
                                ]
                            )
                        )
            ]
        , describe "when we have more options than the max (which is even)"
            [ test "it should show all the maximum number of options starting at the start of the list if nothing in highlighted" <|
                \_ ->
                    assertEqualLists
                        (figureOutWhichOptionsToShowInTheDropdown selectionConfigMaxDropdownItemsSix tools |> DropdownOptions.test_getOptions)
                        (FancyOptionList
                            [ screwDriver
                            , drill
                            , multiMeter
                            , sawZaw
                            , wrench
                            , hammer
                            ]
                        )
            , test "it shows the options around the highlighted option, but with an extra option after the highlighted option" <|
                \_ ->
                    assertEqualLists
                        (OptionList.highlightOption wrench
                            (FancyOptionList
                                [ multiMeter
                                , sawZaw
                                , wrench
                                , hammer
                                , chisel
                                , signalTester
                                ]
                            )
                        )
                        (figureOutWhichOptionsToShowInTheDropdown selectionConfigMaxDropdownItemsSix (OptionList.highlightOption wrench tools) |> DropdownOptions.test_getOptions)
            , test "it shows the maximum number of options before the highlighted option if the highlighted option is the last one" <|
                \_ ->
                    assertEqualLists
                        (figureOutWhichOptionsToShowInTheDropdown selectionConfigMaxDropdownItemsSix (OptionList.highlightOption utilityKnife tools) |> DropdownOptions.test_getOptions)
                        (OptionList.highlightOption utilityKnife
                            (FancyOptionList
                                [ sawZaw
                                , wrench
                                , hammer
                                , chisel
                                , signalTester
                                , utilityKnife
                                ]
                            )
                        )
            , test "it shows the maximum number of options but offset if the highlighted option is just after the first one" <|
                \_ ->
                    assertEqualLists
                        (figureOutWhichOptionsToShowInTheDropdown selectionConfigMaxDropdownItemsSix (OptionList.highlightOption drill tools) |> DropdownOptions.test_getOptions)
                        (OptionList.highlightOption drill
                            (FancyOptionList
                                [ screwDriver
                                , drill
                                , multiMeter
                                , sawZaw
                                , wrench
                                , hammer
                                ]
                            )
                        )
            , test "it shows the maximum number of options but offset if the highlighted option is just before the last one" <|
                \_ ->
                    assertEqualLists
                        (figureOutWhichOptionsToShowInTheDropdown selectionConfigMaxDropdownItemsSix (OptionList.highlightOption signalTester tools) |> DropdownOptions.test_getOptions)
                        (OptionList.highlightOption signalTester
                            (FancyOptionList
                                [ sawZaw
                                , wrench
                                , hammer
                                , chisel
                                , signalTester
                                , utilityKnife
                                ]
                            )
                        )
            ]
        , describe "when we only have a selected option (nothing is highlighted)"
            [ test "it should show the options around the selected option" <|
                \_ ->
                    assertEqualLists
                        (OptionList.selectOption wrench
                            (FancyOptionList
                                [ sawZaw
                                , wrench
                                , hammer
                                ]
                            )
                        )
                        (figureOutWhichOptionsToShowInTheDropdown selectionConfigMaxDropdownItemsThree (OptionList.selectOption wrench tools)
                            |> DropdownOptions.test_getOptions
                        )
            ]
        , describe "when we have options that are selected and highlighted"
            [ test "it should show the options around the highlighted option" <|
                \_ ->
                    assertEqualLists
                        (OptionList.highlightOption wrench
                            (FancyOptionList
                                [ sawZaw
                                , wrench
                                , hammer
                                ]
                            )
                        )
                        (figureOutWhichOptionsToShowInTheDropdown selectionConfigMaxDropdownItemsThree
                            (tools
                                |> OptionList.selectOption utilityKnife
                                |> OptionList.highlightOption wrench
                            )
                            |> DropdownOptions.test_getOptions
                        )
            ]
        , describe "when we have datalist options"
            [ test "we need to include empty options" <|
                \_ ->
                    assertEqualLists
                        (test_newDatalistOptionList
                            [ test_newDatalistOption "oil"
                            , test_newEmptyDatalistOption
                            , test_newDatalistOption "ladder"
                            , test_newDatalistOption "arrow"
                            ]
                        )
                        (figureOutWhichOptionsToShowInTheDropdown
                            (defaultSelectionConfig
                                |> SelectionMode.setOutputStyle
                                    (test_defaultDomStateCache |> updateOutputStyle OutputStyleDatalist)
                                    Datalist
                            )
                            (test_newDatalistOptionList
                                [ test_newDatalistOption "oil"
                                , test_newEmptyDatalistOption
                                , test_newDatalistOption "ladder"
                                , test_newDatalistOption "arrow"
                                ]
                            )
                            |> DropdownOptions.test_getOptions
                        )
            ]
        ]
