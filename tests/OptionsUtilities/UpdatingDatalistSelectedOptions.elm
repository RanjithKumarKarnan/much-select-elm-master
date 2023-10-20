module OptionsUtilities.UpdatingDatalistSelectedOptions exposing (suite)

import DatalistOption exposing (newSelected, newSelectedDatalistOptionWithErrors, newSelectedEmpty)
import Expect exposing (Expectation)
import Option exposing (Option(..))
import OptionList exposing (OptionList(..), updateDatalistOptionWithValueBySelectedValueIndex)
import OptionValue
import Test exposing (Test, describe, test)
import TransformAndValidate exposing (ValidationErrorMessage(..), ValidationFailureMessage(..), ValidationReportLevel(..))


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
    describe "Updating selected datalist options"
        [ describe "with validation errors"
            [ test "keep the selected option but it should be in an error state" <|
                \_ ->
                    let
                        failureMessage =
                            ValidationFailureMessage ShowError (ValidationErrorMessage "Ho hum")
                    in
                    assertEqualLists
                        (updateDatalistOptionWithValueBySelectedValueIndex
                            [ failureMessage ]
                            (OptionValue.stringToOptionValue "flying car")
                            0
                            (DatalistOptionList
                                [ DatalistOption
                                    (newSelectedDatalistOptionWithErrors
                                        [ ValidationFailureMessage ShowError (ValidationErrorMessage "Heave ho") ]
                                        (OptionValue.stringToOptionValue "flying ca")
                                        0
                                    )
                                ]
                            )
                        )
                        (DatalistOptionList
                            [ DatalistOption
                                (newSelectedDatalistOptionWithErrors
                                    [ failureMessage ]
                                    (OptionValue.stringToOptionValue "flying car")
                                    0
                                )
                            ]
                        )
            , test "those errors have been fixed so we should move the selected value into a selected state" <|
                \_ ->
                    let
                        failureMessage =
                            ValidationFailureMessage ShowError (ValidationErrorMessage "Ho hum")
                    in
                    assertEqualLists
                        (updateDatalistOptionWithValueBySelectedValueIndex
                            []
                            (OptionValue.stringToOptionValue "flying car")
                            0
                            (DatalistOptionList
                                [ DatalistOption
                                    (newSelectedDatalistOptionWithErrors
                                        [ failureMessage ]
                                        (OptionValue.stringToOptionValue "flying ca")
                                        0
                                    )
                                ]
                            )
                        )
                        (DatalistOptionList
                            [ DatalistOption
                                (newSelected
                                    (OptionValue.stringToOptionValue "flying car")
                                    0
                                )
                            ]
                        )
            ]
        , describe "no validation errors"
            [ test "update the existing (empty) selected option" <|
                \_ ->
                    assertEqualLists
                        (updateDatalistOptionWithValueBySelectedValueIndex
                            []
                            (OptionValue.stringToOptionValue "flying car")
                            0
                            (DatalistOptionList
                                [ DatalistOption
                                    (newSelectedEmpty 0)
                                ]
                            )
                        )
                        (DatalistOptionList
                            [ DatalistOption
                                (newSelected
                                    (OptionValue.stringToOptionValue "flying car")
                                    0
                                )
                            ]
                        )
            , test "update an existing selected option" <|
                \_ ->
                    assertEqualLists
                        (updateDatalistOptionWithValueBySelectedValueIndex
                            []
                            (OptionValue.stringToOptionValue "skull")
                            1
                            (DatalistOptionList
                                [ Option.newSelectedDatalistOption 0 "desert"
                                , Option.newSelectedDatalistOption 1 "sun"
                                , Option.newSelectedDatalistOption 2 "rocks"
                                ]
                            )
                        )
                        (DatalistOptionList
                            [ Option.newSelectedDatalistOption 0 "desert"
                            , Option.newSelectedDatalistOption 1 "skull"
                            , Option.newSelectedDatalistOption 2 "rocks"
                            ]
                        )
            , test "update an existing empty selected option" <|
                \_ ->
                    assertEqualLists
                        (updateDatalistOptionWithValueBySelectedValueIndex
                            []
                            (OptionValue.stringToOptionValue "skull")
                            1
                            (DatalistOptionList
                                [ Option.newSelectedDatalistOption 0 "desert"
                                , Option.newSelectedEmptyDatalistOption 1
                                , Option.newSelectedDatalistOption 2 "rocks"
                                ]
                            )
                        )
                        (DatalistOptionList
                            [ Option.newSelectedDatalistOption 0 "desert"
                            , Option.newSelectedDatalistOption 1 "skull"
                            , Option.newSelectedDatalistOption 2 "rocks"
                            ]
                        )
            , test "update an existing empty selected option with a value that we already have in the list" <|
                \_ ->
                    assertEqualLists
                        (updateDatalistOptionWithValueBySelectedValueIndex
                            []
                            (OptionValue.stringToOptionValue "desert")
                            1
                            (DatalistOptionList
                                [ Option.newSelectedDatalistOption 0 "desert"
                                , Option.newSelectedEmptyDatalistOption 1
                                , Option.newSelectedDatalistOption 2 "rocks"
                                ]
                            )
                        )
                        (DatalistOptionList
                            [ Option.newSelectedDatalistOption 0 "desert"
                            , Option.newSelectedDatalistOption 1 "desert"
                            , Option.newSelectedDatalistOption 2 "rocks"
                            ]
                        )
            , test "update an existing empty selected option and there are other empty options" <|
                \_ ->
                    assertEqualLists
                        (updateDatalistOptionWithValueBySelectedValueIndex
                            []
                            (OptionValue.stringToOptionValue "skull")
                            1
                            (DatalistOptionList
                                [ Option.newSelectedDatalistOption 0 "desert"
                                , Option.newSelectedEmptyDatalistOption 1
                                , Option.newSelectedEmptyDatalistOption 2
                                ]
                            )
                        )
                        (DatalistOptionList
                            [ Option.newSelectedDatalistOption 0 "desert"
                            , Option.newSelectedDatalistOption 1 "skull"
                            , Option.newSelectedEmptyDatalistOption 2
                            ]
                        )
            , test "update an existing empty selected option and there are other empty options and the are out of order" <|
                \_ ->
                    assertEqualLists
                        (updateDatalistOptionWithValueBySelectedValueIndex
                            []
                            (OptionValue.stringToOptionValue "skull")
                            1
                            (DatalistOptionList
                                [ Option.newSelectedDatalistOption 0 "desert"
                                , Option.newSelectedEmptyDatalistOption 2
                                , Option.newSelectedEmptyDatalistOption 1
                                ]
                            )
                        )
                        (DatalistOptionList
                            [ Option.newSelectedDatalistOption 0 "desert"
                            , Option.newSelectedEmptyDatalistOption 2
                            , Option.newSelectedDatalistOption 1 "skull"
                            ]
                        )
            ]
        ]
