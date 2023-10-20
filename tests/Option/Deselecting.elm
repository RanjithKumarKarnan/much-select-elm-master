module Option.Deselecting exposing (suite)

import Expect exposing (Expectation)
import Option exposing (Option, select, test_newDatalistOption, test_newFancyOptionWithMaybeCleanString)
import OptionList exposing (OptionList(..), deselectAll, deselectAllButTheFirstSelectedOptionInList, removeOptionFromOptionListBySelectedIndex, selectOptionByOptionValue)
import OptionValue exposing (stringToOptionValue)
import Test exposing (Test, describe, test)


buzzCola =
    test_newFancyOptionWithMaybeCleanString "Buzz Cola" Nothing


krustyBurger =
    test_newFancyOptionWithMaybeCleanString "Krusty Burger" Nothing


lardLad =
    test_newFancyOptionWithMaybeCleanString "Lard Lad" Nothing


squishee =
    test_newFancyOptionWithMaybeCleanString "Squishee" Nothing


duff =
    test_newDatalistOption "Duff"


rockBottom =
    test_newDatalistOption "Rock Bottom"


malibuStacy =
    test_newDatalistOption "Malibu Stacy"


brandOptions =
    FancyOptionList [ buzzCola, krustyBurger, lardLad, squishee ]


optionToTuple : Option -> ( String, Bool )
optionToTuple option =
    Tuple.pair (Option.getOptionValueAsString option) (Option.isSelected option)


assertEqualLists : OptionList -> OptionList -> Expectation
assertEqualLists optionListA optionListB =
    Expect.equalLists
        (optionListA |> OptionList.getOptions |> List.map optionToTuple)
        (optionListB |> OptionList.getOptions |> List.map optionToTuple)


suite : Test
suite =
    describe "Deselecting"
        [ test "all the selected option" <|
            \_ ->
                assertEqualLists
                    (brandOptions
                        |> selectOptionByOptionValue (stringToOptionValue "Krusty Burger")
                        |> selectOptionByOptionValue (stringToOptionValue "Lard Lad")
                        |> deselectAll
                    )
                    (FancyOptionList
                        [ buzzCola
                        , krustyBurger
                        , lardLad
                        , squishee
                        ]
                    )
        , test "all but the first selected option" <|
            \_ ->
                assertEqualLists
                    (brandOptions
                        |> selectOptionByOptionValue (stringToOptionValue "Lard Lad")
                        |> selectOptionByOptionValue (stringToOptionValue "Buzz Cola")
                        |> selectOptionByOptionValue (stringToOptionValue "Krusty Burger")
                        |> deselectAllButTheFirstSelectedOptionInList
                    )
                    (FancyOptionList
                        [ buzzCola
                        , krustyBurger
                        , select 0 lardLad
                        , squishee
                        ]
                    )
        , describe "in a datalist"
            [ test "the first option" <|
                \_ ->
                    let
                        optionsWithThreeSelections =
                            OptionList.appendOptions
                                [ test_newDatalistOption "Left-Mart" |> select 0
                                , test_newDatalistOption "Powersause" |> select 1
                                , test_newDatalistOption "Skybucks" |> select 2
                                ]
                                [ duff, rockBottom, malibuStacy ]
                    in
                    assertEqualLists
                        (optionsWithThreeSelections
                            |> removeOptionFromOptionListBySelectedIndex 0
                        )
                        (OptionList.appendOptions
                            [ test_newDatalistOption "Powersause" |> select 0
                            , test_newDatalistOption "Skybucks" |> select 1
                            ]
                            [ duff, rockBottom, malibuStacy ]
                        )
            , test "the middle option" <|
                \_ ->
                    let
                        optionsWithThreeSelections =
                            OptionList.appendOptions
                                [ test_newDatalistOption "Left-Mart" |> select 0
                                , test_newDatalistOption "Powersause" |> select 1
                                , test_newDatalistOption "Skybucks" |> select 2
                                ]
                                [ duff, rockBottom, malibuStacy ]
                    in
                    assertEqualLists
                        (optionsWithThreeSelections
                            |> removeOptionFromOptionListBySelectedIndex 1
                        )
                        (OptionList.appendOptions
                            [ test_newDatalistOption "Left-Mart" |> select 0
                            , test_newDatalistOption "Skybucks" |> select 1
                            ]
                            [ duff, rockBottom, malibuStacy ]
                        )
            , test "the last option" <|
                \_ ->
                    let
                        optionsWithThreeSelections =
                            OptionList.appendOptions
                                [ test_newDatalistOption "Left-Mart" |> select 0
                                , test_newDatalistOption "Powersause" |> select 1
                                , test_newDatalistOption "Skybucks" |> select 2
                                ]
                                [ duff, rockBottom, malibuStacy ]
                    in
                    assertEqualLists
                        (optionsWithThreeSelections
                            |> removeOptionFromOptionListBySelectedIndex 2
                        )
                        (OptionList.appendOptions
                            [ test_newDatalistOption "Left-Mart" |> select 0
                            , test_newDatalistOption "Powersause" |> select 1
                            ]
                            [ duff, rockBottom, malibuStacy ]
                        )
            ]
        ]
