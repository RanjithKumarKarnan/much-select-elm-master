module FilteringOptions.Highlighting exposing (suite)

import Expect
import Html exposing (span, text)
import Html.Attributes exposing (class)
import OptionPresentor exposing (highlightMarkup, indexInsideMatch, tokenize)
import OptionSearcher exposing (simpleMatch)
import Test exposing (Test, describe, test)


straightUpMatchResult =
    simpleMatch "red" "red"


noMatchResult =
    simpleMatch "q" "red"


colorResult =
    simpleMatch "red" "22 orange red purple 11"


colorPartialResult =
    simpleMatch "re" "22 orange red purple 11"


suite : Test
suite =
    describe "Highlighting search results"
        [ describe "we need to know which characters are inside of a match and which are not"
            [ describe "a simple example where the whole needs matches the whole hay"
                [ test "Expected the first character to be part of a match" <|
                    \_ ->
                        Expect.equal True (indexInsideMatch straightUpMatchResult 0)
                , test "Expected the second character to be part of a match" <|
                    \_ ->
                        Expect.equal True (indexInsideMatch straightUpMatchResult 1)
                , test "Expected the third character to be part of a match" <|
                    \_ ->
                        Expect.equal True (indexInsideMatch straightUpMatchResult 2)
                , test "Expected the forth character to not be part of a match" <|
                    \_ ->
                        Expect.equal False (indexInsideMatch straightUpMatchResult 3)
                ]
            , describe "a simple example nothing in the needle matches in the hay"
                [ test "Expected the first character not to be part of a match" <|
                    \_ ->
                        Expect.equal False (indexInsideMatch noMatchResult 0)
                , test "Expected the second character not to be part of a match" <|
                    \_ ->
                        Expect.equal False (indexInsideMatch noMatchResult 1)
                , test "Expected the third character to not be part of a match" <|
                    \_ ->
                        Expect.equal False (indexInsideMatch noMatchResult 2)
                ]
            , describe "an example where the needle is in the middle of the hay"
                [ test "Expected the 1st character not to be part of a match" <|
                    \_ ->
                        Expect.equal False (indexInsideMatch colorResult 0)
                , test "Expected the 10th character not to be part of a match" <|
                    \_ ->
                        Expect.equal False (indexInsideMatch colorResult 9)
                , test "Expected the 11th character to be part of a match" <|
                    \_ ->
                        Expect.equal True (indexInsideMatch colorResult 10)
                , test "Expected the 12th character to be part of a match" <|
                    \_ ->
                        Expect.equal True (indexInsideMatch colorResult 11)
                , test "Expected the 13th character to be part of a match" <|
                    \_ ->
                        Expect.equal True (indexInsideMatch colorResult 12)
                , test "Expected the 14th character not to be part of a match" <|
                    \_ ->
                        Expect.equal False (indexInsideMatch colorResult 13)
                ]
            ]
        , test "a simple example where the needle and the hay are identical" <|
            \_ ->
                Expect.equal (tokenize "red" straightUpMatchResult)
                    [ ( True, "red" ) ]
        , test "an example where the needle is in the middle of some hay" <|
            \_ ->
                Expect.equal (tokenize "22 orange red purple 11" colorResult)
                    [ ( False, "22 orange " ), ( True, "red" ), ( False, " purple 11" ) ]
        , test "an example of a partial match" <|
            \_ ->
                Expect.equal (tokenize "22 orange red purple 11" colorPartialResult)
                    [ ( False, "22 orange " ), ( True, "re" ), ( False, "d purple 11" ) ]
        , test "an example of a partial match with just one letter for the needle" <|
            \_ ->
                Expect.equal (tokenize "22 orange red purple 11" (simpleMatch "r" "22 orange red purple 11"))
                    [ ( False, "22 orange " ), ( True, "r" ), ( False, "ed purple 11" ) ]
        , test "an example of a partial match with just one letter for the needle that's in the middle of the words" <|
            \_ ->
                let
                    hay =
                        "22 orange red purple 11"

                    result =
                        simpleMatch "e" hay
                in
                Expect.equal (tokenize hay result)
                    [ ( False, "22 orange r" ), ( True, "e" ), ( False, "d purple 11" ) ]
        , test "a needle with all but the last character of a word" <|
            \_ ->
                let
                    hay =
                        "22 orange red purple 11"

                    result =
                        simpleMatch "orang" hay
                in
                Expect.equal (tokenize hay result)
                    [ ( False, "22 " ), ( True, "orang" ), ( False, "e red purple 11" ) ]
        , test "a needle with all but the last character of a word and that word is at the end of the text block" <|
            \_ ->
                let
                    hay =
                        "red orange"

                    result =
                        simpleMatch "orang" hay
                in
                Expect.equal (tokenize hay result)
                    [ ( False, "red " ), ( True, "orang" ), ( False, "e" ) ]
        , test "a one character needle in the middle of a word" <|
            \_ ->
                let
                    hay =
                        "red"

                    result =
                        simpleMatch "e" hay
                in
                Expect.equal (tokenize hay result)
                    [ ( False, "r" ), ( True, "e" ), ( False, "d" ) ]
        , test "a one character needle at the end of a word" <|
            \_ ->
                let
                    hay =
                        "red"

                    result =
                        simpleMatch "d" hay
                in
                Expect.equal (tokenize hay result)
                    [ ( False, "re" ), ( True, "d" ) ]
        , test "a one character hay with no needle" <|
            \_ ->
                let
                    hay =
                        "a"

                    result =
                        simpleMatch "" hay
                in
                Expect.equal (tokenize hay result)
                    [ ( False, "a" ) ]
        , test "a one emoji character hay with no needle" <|
            \_ ->
                let
                    hay =
                        "🐇"

                    result =
                        simpleMatch "" hay
                in
                Expect.equal (tokenize hay result)
                    [ ( False, "🐇" ) ]
        , describe "html output"
            [ test "a simple example where the needle and the hay are identical" <|
                \_ ->
                    Expect.equal (highlightMarkup "red" straightUpMatchResult)
                        (span [] [ span [ class "highlight" ] [ text "red" ] ])
            , test "a needle with all but the last character of a word" <|
                \_ ->
                    let
                        hay =
                            "orange red"

                        result =
                            simpleMatch "orang" hay
                    in
                    Expect.equal (highlightMarkup hay result)
                        (span [] [ span [ class "highlight" ] [ text "orang" ], text "e red" ])
            , test "a needle with all but the last character of a word and that word is at the end" <|
                \_ ->
                    let
                        hay =
                            "red orange"

                        result =
                            simpleMatch "orang" hay
                    in
                    Expect.equal (highlightMarkup hay result)
                        (span [] [ text "red ", span [ class "highlight" ] [ text "orang" ], text "e" ])
            , test "a one character needle at the end of a word" <|
                \_ ->
                    let
                        hay =
                            "two"

                        result =
                            simpleMatch "o" hay
                    in
                    Expect.equal (highlightMarkup hay result)
                        (span [] [ text "tw", span [ class "highlight" ] [ text "o" ] ])
            , test "a one character hay with no needle" <|
                \_ ->
                    let
                        hay =
                            "a"

                        result =
                            simpleMatch "" hay
                    in
                    Expect.equal (highlightMarkup hay result)
                        (span [] [ text "a" ])
            ]
        ]
