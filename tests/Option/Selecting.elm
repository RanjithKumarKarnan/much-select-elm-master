module Option.Selecting exposing (suite)

import Expect exposing (Expectation)
import Option exposing (Option(..), select, test_newDatalistOption, test_newEmptyDatalistOption, test_newFancyOption, test_newFancyOptionWithMaybeCleanString)
import OptionList exposing (OptionList(..), cleanupEmptySelectedOptions, deselectEveryOptionExceptOptionsInList, selectOptionByOptionValue, selectOptions, selectOptionsInOptionsListByString, selectSingleOptionByValue, test_newFancyOptionList)
import OptionValue exposing (stringToOptionValue)
import Test exposing (Test, describe, test)


matthew =
    test_newFancyOption "Matthew"


mark =
    test_newFancyOption "Mark"


luke =
    test_newFancyOption "Luke"


john =
    test_newFancyOption "John"


gospels =
    FancyOptionList
        [ matthew
        , mark
        , luke
        , john
        ]


numbers =
    test_newDatalistOption "Numbers"
        |> Option.select 0


cor =
    test_newFancyOption "cor"


corinthians =
    cor |> Option.setLabelWithString "Letter to the Corinthians" (Just "Letter to the Corinthians")


suite : Test
suite =
    describe "Selecting options"
        [ test "just one option" <|
            \_ ->
                Expect.equal
                    (gospels
                        |> selectOptionByOptionValue (stringToOptionValue "Mark")
                    )
                    (FancyOptionList
                        [ matthew
                        , select 0 mark
                        , luke
                        , john
                        ]
                    )
        , test "just 2 options" <|
            \_ ->
                Expect.equal
                    (gospels
                        |> selectOptionByOptionValue (stringToOptionValue "Mark")
                        |> selectOptionByOptionValue (stringToOptionValue "Luke")
                    )
                    (FancyOptionList
                        [ matthew
                        , select 0 mark
                        , select 1 luke
                        , john
                        ]
                    )
        , test "one and only one option should... just... select one option" <|
            \_ ->
                Expect.equal
                    (gospels
                        |> selectSingleOptionByValue (stringToOptionValue "Mark")
                        |> selectSingleOptionByValue (stringToOptionValue "Luke")
                    )
                    (gospels
                        |> selectSingleOptionByValue (stringToOptionValue "Luke")
                    )
        , test "only no deselecting them" <|
            \_ ->
                Expect.equal
                    (deselectEveryOptionExceptOptionsInList [ mark ]
                        (test_newFancyOptionList
                            [ matthew
                            , select 0 mark
                            , select 1 luke
                            , john
                            ]
                        )
                    )
                    (test_newFancyOptionList
                        [ matthew
                        , select 0 mark
                        , luke
                        , john
                        ]
                    )
        , test "select 3 options in a list " <|
            \_ ->
                Expect.equal
                    (test_newFancyOptionList
                        [ select 0 matthew
                        , select 0 mark
                        , luke
                        , select 0 john
                        ]
                    )
                    (selectOptions [ matthew, mark, john ] gospels)
        , test "select an option with a fancy label " <|
            \_ ->
                Expect.equal
                    (test_newFancyOptionList
                        [ select 0 corinthians
                        , luke
                        ]
                    )
                    (selectOptions [ corinthians ] (test_newFancyOptionList [ corinthians, luke ]))
        , test "select no options in a list " <|
            \_ ->
                Expect.equal
                    gospels
                    (selectOptions [] gospels)
        , describe "by strings"
            [ test "select a single option" <|
                \_ ->
                    Expect.equal
                        (selectOptionsInOptionsListByString [ "Luke" ] gospels)
                        (test_newFancyOptionList
                            [ matthew
                            , mark
                            , select 0 luke
                            , john
                            ]
                        )
            , test "select 2 options" <|
                \_ ->
                    Expect.equal
                        (gospels
                            |> selectOptionsInOptionsListByString [ "Matthew", "Luke" ]
                        )
                        (test_newFancyOptionList
                            [ select 0 matthew
                            , mark
                            , select 0 luke
                            , john
                            ]
                        )
            , test "select 2 different options" <|
                \_ ->
                    Expect.equal
                        (test_newFancyOptionList
                            [ select 0 matthew
                            , mark
                            , select 0 luke
                            , john
                            ]
                            |> selectOptionsInOptionsListByString [ "Mark", "John" ]
                        )
                        (FancyOptionList
                            [ matthew
                            , select 0 mark
                            , luke
                            , select 0 john
                            ]
                        )
            ]
        , describe "for datalists"
            [ test "allow one empty option" <|
                \_ ->
                    Expect.equal
                        (DatalistOptionList
                            [ test_newEmptyDatalistOption |> select 0
                            ]
                            |> cleanupEmptySelectedOptions
                        )
                        (DatalistOptionList
                            [ test_newEmptyDatalistOption |> select 0
                            ]
                        )
            , test "allow only one empty option" <|
                \_ ->
                    Expect.equal
                        (DatalistOptionList
                            [ test_newEmptyDatalistOption |> select 0
                            , test_newEmptyDatalistOption |> select 1
                            , test_newEmptyDatalistOption |> select 2
                            ]
                            |> cleanupEmptySelectedOptions
                        )
                        (DatalistOptionList
                            [ test_newEmptyDatalistOption |> select 0
                            ]
                        )
            , test "allow no empty options is there is at least one non empty option" <|
                \_ ->
                    Expect.equal
                        (DatalistOptionList
                            [ numbers
                            , test_newEmptyDatalistOption |> select 1
                            , test_newEmptyDatalistOption |> select 2
                            , test_newEmptyDatalistOption |> select 3
                            ]
                            |> cleanupEmptySelectedOptions
                        )
                        (DatalistOptionList
                            [ numbers
                            ]
                        )
            ]
        ]
