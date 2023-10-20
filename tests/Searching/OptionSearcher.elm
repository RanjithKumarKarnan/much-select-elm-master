module Searching.OptionSearcher exposing (suite)

import Expect
import Maybe.Extra
import Option exposing (test_newFancyOption)
import OptionSearcher exposing (updateSearchResultInOption)
import SearchString
import Test exposing (Test, describe, test)


someday =
    test_newFancyOption "Someday this will all be yours"


suite : Test
suite =
    describe "Option Searcher"
        [ test "Get the total score from an option after searching" <|
            \_ ->
                Expect.equal
                    (updateSearchResultInOption
                        (SearchString.new "this" False)
                        someday
                        |> Option.getMaybeOptionSearchFilter
                        |> Maybe.map .totalScore
                    )
                    (Just 110000)
        , test "Highlight the searched for string" <|
            \_ ->
                Expect.equalLists
                    (updateSearchResultInOption
                        (SearchString.new "this" False)
                        someday
                        |> Option.getMaybeOptionSearchFilter
                        |> Maybe.map .labelTokens
                        |> Maybe.Extra.unwrap [] identity
                    )
                    [ ( False, "Someday " ), ( True, "this" ), ( False, " will all be yours" ) ]
        ]
