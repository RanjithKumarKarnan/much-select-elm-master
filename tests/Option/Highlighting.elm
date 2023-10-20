module Option.Highlighting exposing (suite)

import DropdownOptions exposing (moveHighlightedOptionDown, moveHighlightedOptionUp)
import Expect
import Option exposing (test_newDatalistOption, test_newFancyOption, test_newFancyOptionWithMaybeCleanString, test_newSlottedOption)
import OptionList exposing (OptionList(..))
import SelectionMode
import Test exposing (Test, describe, test)


suite : Test
suite =
    describe "Change option highlighting"
        [ describe "with the setter"
            [ test "with a fancy option" <|
                \_ ->
                    Expect.equal
                        (Option.highlight (test_newFancyOption "fish") |> Option.isHighlighted)
                        True
            , test "with a datalist option (but datalist options can't be highlighted" <|
                \_ ->
                    Expect.equal
                        (Option.highlight (test_newDatalistOption "ketchup") |> Option.isHighlighted)
                        False
            , test "with a slotted option " <|
                \_ ->
                    Expect.equal
                        (Option.highlight (test_newSlottedOption "ketchup") |> Option.isHighlighted)
                        True
            ]
        , describe "by moving the highlighted option down in an option list"
            [ test "but if no option is already highlighted, highlight the first (top) option" <|
                \_ ->
                    let
                        options =
                            FancyOptionList
                                [ test_newFancyOptionWithMaybeCleanString "one" Nothing
                                , test_newFancyOptionWithMaybeCleanString "two" Nothing
                                , test_newFancyOptionWithMaybeCleanString "three" Nothing
                                ]
                    in
                    Expect.equal
                        (moveHighlightedOptionDown SelectionMode.defaultSelectionConfig options)
                        (FancyOptionList
                            [ test_newFancyOptionWithMaybeCleanString "one" Nothing |> Option.highlight
                            , test_newFancyOptionWithMaybeCleanString "two" Nothing
                            , test_newFancyOptionWithMaybeCleanString "three" Nothing
                            ]
                        )
            , test "highlight the next highlightable option, not skipping over the selected option" <|
                \_ ->
                    let
                        options =
                            FancyOptionList
                                [ test_newFancyOptionWithMaybeCleanString "one" Nothing |> Option.highlight
                                , test_newFancyOptionWithMaybeCleanString "two" Nothing |> Option.select 0
                                , test_newFancyOptionWithMaybeCleanString "three" Nothing
                                ]
                    in
                    Expect.equal
                        (moveHighlightedOptionDown SelectionMode.defaultSelectionConfig options)
                        (FancyOptionList
                            [ test_newFancyOptionWithMaybeCleanString "one" Nothing
                            , test_newFancyOptionWithMaybeCleanString "two" Nothing |> Option.select 0 |> Option.highlight
                            , test_newFancyOptionWithMaybeCleanString "three" Nothing
                            ]
                        )
            , test "highlight the next highlightable option, skipping over disabled options" <|
                \_ ->
                    let
                        options =
                            FancyOptionList
                                [ test_newFancyOptionWithMaybeCleanString "one" Nothing |> Option.highlight
                                , Option.newDisabledOption "two" Nothing
                                , Option.newDisabledOption "three" Nothing
                                , test_newFancyOptionWithMaybeCleanString "four" Nothing
                                ]
                    in
                    Expect.equal
                        (moveHighlightedOptionDown SelectionMode.defaultSelectionConfig options)
                        (FancyOptionList
                            [ test_newFancyOptionWithMaybeCleanString "one" Nothing
                            , Option.newDisabledOption "two" Nothing
                            , Option.newDisabledOption "three" Nothing
                            , test_newFancyOptionWithMaybeCleanString "four" Nothing |> Option.highlight
                            ]
                        )
            ]
        , describe "by moving the highlighted option up in a list"
            [ test "but if no option is already highlighted, highlight the first (top) option" <|
                \_ ->
                    let
                        options =
                            FancyOptionList
                                [ test_newFancyOptionWithMaybeCleanString "one" Nothing
                                , test_newFancyOptionWithMaybeCleanString "two" Nothing
                                , test_newFancyOptionWithMaybeCleanString "three" Nothing
                                ]
                    in
                    Expect.equal
                        (moveHighlightedOptionUp SelectionMode.defaultSelectionConfig options)
                        (FancyOptionList
                            [ test_newFancyOptionWithMaybeCleanString "one" Nothing |> Option.highlight
                            , test_newFancyOptionWithMaybeCleanString "two" Nothing
                            , test_newFancyOptionWithMaybeCleanString "three" Nothing
                            ]
                        )
            , test "highlight the previous highlightable option, not skipping over the selected option" <|
                \_ ->
                    let
                        options =
                            FancyOptionList
                                [ test_newFancyOptionWithMaybeCleanString "one" Nothing
                                , test_newFancyOptionWithMaybeCleanString "two" Nothing |> Option.select 0
                                , test_newFancyOptionWithMaybeCleanString "three" Nothing |> Option.highlight
                                ]
                    in
                    Expect.equal
                        (moveHighlightedOptionUp SelectionMode.defaultSelectionConfig options)
                        (FancyOptionList
                            [ test_newFancyOptionWithMaybeCleanString "one" Nothing
                            , test_newFancyOptionWithMaybeCleanString "two" Nothing |> Option.select 0 |> Option.highlight
                            , test_newFancyOptionWithMaybeCleanString "three" Nothing
                            ]
                        )
            , test "highlight the previous highlightable option, skipping over disabled options" <|
                \_ ->
                    let
                        options =
                            FancyOptionList
                                [ test_newFancyOptionWithMaybeCleanString "one" Nothing
                                , Option.newDisabledOption "two" Nothing
                                , Option.newDisabledOption "three" Nothing
                                , test_newFancyOptionWithMaybeCleanString "four" Nothing |> Option.highlight
                                ]
                    in
                    Expect.equal
                        (moveHighlightedOptionUp SelectionMode.defaultSelectionConfig options)
                        (FancyOptionList
                            [ test_newFancyOptionWithMaybeCleanString "one" Nothing |> Option.highlight
                            , Option.newDisabledOption "two" Nothing
                            , Option.newDisabledOption "three" Nothing
                            , test_newFancyOptionWithMaybeCleanString "four" Nothing
                            ]
                        )
            , test "highlight the previous highlightable option in the middle of a long list" <|
                \_ ->
                    let
                        options =
                            FancyOptionList
                                [ test_newFancyOptionWithMaybeCleanString "one" Nothing
                                , test_newFancyOptionWithMaybeCleanString "two" Nothing
                                , test_newFancyOptionWithMaybeCleanString "three" Nothing |> Option.highlight
                                , test_newFancyOptionWithMaybeCleanString "four" Nothing
                                , test_newFancyOptionWithMaybeCleanString "five" Nothing
                                ]
                    in
                    Expect.equal
                        (moveHighlightedOptionUp SelectionMode.defaultSelectionConfig options)
                        (FancyOptionList
                            [ test_newFancyOptionWithMaybeCleanString "one" Nothing
                            , test_newFancyOptionWithMaybeCleanString "two" Nothing |> Option.highlight
                            , test_newFancyOptionWithMaybeCleanString "three" Nothing
                            , test_newFancyOptionWithMaybeCleanString "four" Nothing
                            , test_newFancyOptionWithMaybeCleanString "five" Nothing
                            ]
                        )
            ]
        ]
