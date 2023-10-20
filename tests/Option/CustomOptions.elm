module Option.CustomOptions exposing (suite)

import Expect exposing (Expectation)
import MuchSelect
    exposing
        ( updateModelWithChangesThatEffectTheOptionsWithSearchString
        )
import Option exposing (Option(..), select, test_newFancyCustomOptionWithCleanString, test_newFancyCustomOptionWithLabelAndMaybeCleanString, test_newFancyOption)
import OptionList exposing (OptionList(..), prependCustomOption, removeUnselectedCustomOptions, selectOptionByOptionValue, test_newFancyOptionList)
import OptionValue exposing (stringToOptionValue)
import OutputStyle
    exposing
        ( MaxDropdownItems(..)
        , SearchStringMinimumLength(..)
        , SingleItemRemoval(..)
        )
import PositiveInt
import RightSlot exposing (RightSlot(..))
import SearchString
import SelectionMode
    exposing
        ( OutputStyle(..)
        , SelectionConfig(..)
        , SelectionMode(..)
        , defaultSelectionConfig
        , setAllowCustomOptionsWithBool
        , setSingleItemRemoval
        )
import Test exposing (Test, describe, test)


birchWood =
    test_newFancyOption "Birch Wood"


cutCopper =
    test_newFancyOption "Cut Copper"


mossyCobblestone =
    test_newFancyOption "Mossy Cobblestone"


torch =
    test_newFancyCustomOptionWithCleanString "Torch"


turf =
    test_newFancyCustomOptionWithCleanString "Turf"


vines =
    test_newFancyCustomOptionWithCleanString "Vines"


blocks =
    test_newFancyOptionList [ birchWood, cutCopper, mossyCobblestone, torch, turf, vines ]


maxDropdownItemsIsTen =
    FixedMaxDropdownItems (PositiveInt.new 10)


emptyFancyList =
    test_newFancyOptionList []


suite : Test
suite =
    describe "Custom options"
        [ test "should be able to remove all the unselected custom options" <|
            \_ ->
                Expect.equal
                    (test_newFancyOptionList
                        [ birchWood
                        , select 0 cutCopper
                        , mossyCobblestone
                        , select 1 turf
                        ]
                    )
                    (blocks
                        |> selectOptionByOptionValue (stringToOptionValue "Cut Copper")
                        |> selectOptionByOptionValue (stringToOptionValue "Turf")
                        |> removeUnselectedCustomOptions
                    )
        , test "should be able to maintain a custom option with an empty hint" <|
            \_ ->
                Expect.equal
                    (prependCustomOption (Just "{{}}") (SearchString.update "pizza") emptyFancyList)
                    (test_newFancyOptionList [ test_newFancyCustomOptionWithCleanString "pizza" ])
        , test "should not include the hint in the value of the custom option" <|
            \_ ->
                Expect.equal
                    (prependCustomOption (Just "Add {{}}") (SearchString.update "pizza") emptyFancyList)
                    (test_newFancyOptionList [ test_newFancyCustomOptionWithLabelAndMaybeCleanString "pizza" "Add pizza" (Just "pizza") ])
        , describe "updateModelWithChangesThatEffectTheOptionsWithSearchString"
            [ test "should show up at the top in the dropdown" <|
                \_ ->
                    let
                        selectionConfig =
                            defaultSelectionConfig
                                |> setAllowCustomOptionsWithBool True (Just "{{}}")
                                |> setSingleItemRemoval EnableSingleItemRemoval
                                |> SelectionMode.setMaxDropdownItems maxDropdownItemsIsTen
                    in
                    Expect.equalLists
                        (updateModelWithChangesThatEffectTheOptionsWithSearchString
                            ShowNothing
                            selectionConfig
                            (SearchString.update "mil")
                            (FancyOptionList [ birchWood ])
                            { options = FancyOptionList [ birchWood ], rightSlot = ShowNothing }
                            |> .options
                            |> OptionList.optionsValuesAsStrings
                        )
                        [ "mil", "Birch Wood" ]
            ]
        ]
