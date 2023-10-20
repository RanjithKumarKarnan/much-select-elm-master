module OptionList.FindingOptions exposing (suite)

import Expect
import Option exposing (Option, test_newFancyOption)
import OptionList exposing (OptionList(..), findClosestHighlightableOptionGoingDown, findClosestHighlightableOptionGoingUp)
import SelectionMode exposing (SelectionMode(..))
import Test exposing (Test, describe, test)


rusty : Option
rusty =
    test_newFancyOption "Rusty"


irwin : Option
irwin =
    test_newFancyOption "Irwin"


ginger : Option
ginger =
    test_newFancyOption "Ginger"


singleItemFancyList =
    FancyOptionList
        [ rusty
        ]


tripleItemFancyList =
    FancyOptionList
        [ rusty
        , irwin
        , ginger
        ]


suite : Test
suite =
    describe "Looking for something to highlight"
        [ describe "going up"
            [ test "but we are starting at the top so there's nothing there"
                (\_ ->
                    findClosestHighlightableOptionGoingUp SingleSelect 0 singleItemFancyList
                        |> Expect.equal Nothing
                )
            , test "in a single item list"
                (\_ ->
                    findClosestHighlightableOptionGoingUp SingleSelect 1 singleItemFancyList
                        |> Expect.equal (Just rusty)
                )
            , test "from the middle"
                (\_ ->
                    findClosestHighlightableOptionGoingUp SingleSelect 2 tripleItemFancyList
                        |> Expect.equal (Just irwin)
                )
            ]
        , describe "going down"
            [ test "starting at the top"
                (\_ ->
                    findClosestHighlightableOptionGoingDown SingleSelect 0 singleItemFancyList
                        |> Expect.equal (Just rusty)
                )
            , test "in a single item list but starting at the bottom"
                (\_ ->
                    findClosestHighlightableOptionGoingDown SingleSelect 1 singleItemFancyList
                        |> Expect.equal Nothing
                )
            , test "from the middle"
                (\_ ->
                    findClosestHighlightableOptionGoingDown SingleSelect 1 tripleItemFancyList
                        |> Expect.equal (Just irwin)
                )
            ]
        ]
