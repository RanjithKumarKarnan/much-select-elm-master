module OptionList.DeselectingOptions exposing (..)

import Expect
import Option exposing (test_newDatalistOption, test_newFancyOption)
import OptionList exposing (test_newDatalistOptionList, test_newFancyOptionList)
import OptionValue exposing (test_newOptionValue)
import PositiveInt
import Test exposing (Test, describe, test)


suite : Test
suite =
    describe "Deselecting options"
        [ describe "in a fancy list"
            [ test "in single select mode" <|
                \_ ->
                    Expect.equal
                        (test_newFancyOptionList
                            [ test_newFancyOption "Al's"
                            , test_newFancyOption "Glass-bottom"
                            , test_newFancyOption "Tours"
                            ]
                            |> OptionList.selectSingleOptionByValue (test_newOptionValue "Al's")
                            |> OptionList.deselectOptionByValue (test_newOptionValue "Al's")
                        )
                        (test_newFancyOptionList
                            [ test_newFancyOption "Al's"
                            , test_newFancyOption "Glass-bottom"
                            , test_newFancyOption "Tours"
                            ]
                        )
            ]
        , describe "in a datalist list"
            [ describe "in single select mode"
                [ test "by option value" <|
                    \_ ->
                        Expect.equal
                            (test_newDatalistOptionList
                                [ test_newDatalistOption "Al's"
                                , test_newDatalistOption "Glass-bottom"
                                , test_newDatalistOption "Tours"
                                ]
                                |> OptionList.selectSingleOptionByValue (test_newOptionValue "Al's")
                                |> OptionList.deselectOptionByValue (test_newOptionValue "Al's")
                            )
                            (test_newDatalistOptionList
                                [ test_newDatalistOption "Al's"
                                , test_newDatalistOption "Glass-bottom"
                                , test_newDatalistOption "Tours"
                                ]
                            )
                , test "by selected value index" <|
                    \_ ->
                        Expect.equal
                            (test_newDatalistOptionList
                                [ test_newDatalistOption "Al's"
                                , test_newDatalistOption "Glass-bottom"
                                , test_newDatalistOption "Tours"
                                ]
                                |> OptionList.selectSingleOptionByValue (test_newOptionValue "Al's")
                                |> OptionList.deselect (PositiveInt.test_new 0)
                            )
                            (test_newDatalistOptionList
                                [ test_newDatalistOption "Al's"
                                , test_newDatalistOption "Glass-bottom"
                                , test_newDatalistOption "Tours"
                                ]
                            )
                ]
            , describe "in multi select mode"
                [ test "by option value" <|
                    \_ ->
                        Expect.equal
                            (test_newDatalistOptionList
                                [ test_newDatalistOption "Al's"
                                , test_newDatalistOption "Glass-bottom"
                                , test_newDatalistOption "Tours"
                                ]
                                |> OptionList.selectOptionByOptionValueWithIndex 0 (test_newOptionValue "Al's")
                                |> OptionList.selectOptionByOptionValueWithIndex 1 (test_newOptionValue "Tours")
                                |> OptionList.deselectOptionByValue (test_newOptionValue "Al's")
                            )
                            (test_newDatalistOptionList
                                [ test_newDatalistOption "Al's"
                                , test_newDatalistOption "Glass-bottom"
                                , test_newDatalistOption "Tours" |> Option.select 1
                                ]
                            )
                , test "by selected value index" <|
                    \_ ->
                        Expect.equal
                            (test_newDatalistOptionList
                                [ test_newDatalistOption "Al's"
                                , test_newDatalistOption "Glass-bottom"
                                , test_newDatalistOption "Tours"
                                ]
                                |> OptionList.selectOptionByOptionValueWithIndex 0 (test_newOptionValue "Al's")
                                |> OptionList.selectOptionByOptionValueWithIndex 1 (test_newOptionValue "Tours")
                                |> OptionList.deselect (PositiveInt.test_new 0)
                            )
                            (test_newDatalistOptionList
                                [ test_newDatalistOption "Al's"
                                , test_newDatalistOption "Glass-bottom"
                                , test_newDatalistOption "Tours" |> Option.select 1
                                ]
                            )
                , test "all the options" <|
                    \_ ->
                        Expect.equal
                            (test_newDatalistOptionList
                                [ test_newDatalistOption "Al's"
                                , test_newDatalistOption "Glass-bottom"
                                , test_newDatalistOption "Tours"
                                ]
                                |> OptionList.selectOptionByOptionValueWithIndex 0 (test_newOptionValue "Al's")
                                |> OptionList.selectOptionByOptionValueWithIndex 1 (test_newOptionValue "Tours")
                                |> OptionList.deselectAll
                            )
                            (test_newDatalistOptionList
                                [ test_newDatalistOption "Al's"
                                , test_newDatalistOption "Glass-bottom"
                                , test_newDatalistOption "Tours"
                                ]
                            )
                ]
            ]
        ]
