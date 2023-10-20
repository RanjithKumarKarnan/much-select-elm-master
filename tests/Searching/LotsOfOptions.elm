module Searching.LotsOfOptions exposing (suite)

import Expect
import Maybe.Extra
import Option exposing (test_newFancyOption)
import OptionList exposing (test_newFancyOptionList)
import OptionSearcher exposing (updateOptionsWithSearchString)
import OutputStyle exposing (defaultSearchStringMinimumLength)
import SearchString
import Test exposing (Test, describe, test)


options =
    test_newFancyOptionList
        [ test_newFancyOption "Nam Commodi Tempore Fuga Eos Impedit Qui"
        , test_newFancyOption "Et Reprehenderit Optio Et"
        , test_newFancyOption "Magni Omnis Et"
        , test_newFancyOption "Eligendi Itaque Neque Dolor Ex Ut Cupiditate"
        , test_newFancyOption "Nostrum Fugit Est Voluptatem"
        , test_newFancyOption "Dolore Vel Voluptas"
        , test_newFancyOption "Unde Corporis Aperiam Unde"
        , test_newFancyOption "Non Rem Rerum"
        , test_newFancyOption "Et Voluptatibus"
        , test_newFancyOption "Doloribus Sapiente Minima Cupiditate Nesciunt"
        , test_newFancyOption "Qui Neque Quae Vitae Sit Ipsum Aliquam"
        , test_newFancyOption "Qui Dolor"
        , test_newFancyOption "Quidem Iure Deleniti Occaecati Explicabo Natus Eos"
        , test_newFancyOption "Sed Illum Et Voluptatem Quae Numquam Ut"
        , test_newFancyOption "Voluptate Qui Magnam Est"
        , test_newFancyOption "Mollitia Labore Ad Culpa Et Quae"
        , test_newFancyOption "Molestiae Possimus"
        , test_newFancyOption "Laudantium In"
        , test_newFancyOption "Neque Porro Placeat Aspernatur Cumque Et"
        , test_newFancyOption "Asperiores Sint Ipsam Maxime Non"
        , test_newFancyOption "Non Quaerat Maiores Sit Quisquam Omnis"
        , test_newFancyOption "Qui Distinctio Aut"
        , test_newFancyOption "Eaque Enim Ipsa Voluptatem"
        , test_newFancyOption "A Aut Porro Libero"
        ]


suite : Test
suite =
    describe "Searching through lots of options"
        [ test "The labels tokens should have the right highlights" <|
            \_ ->
                Expect.equalLists
                    (updateOptionsWithSearchString
                        (SearchString.new "Porro" False)
                        defaultSearchStringMinimumLength
                        options
                        |> OptionList.andMap Option.getMaybeOptionSearchFilter
                        |> Maybe.Extra.values
                        |> List.map .labelTokens
                    )
                    [ [ ( False, "Nam Commodi Tem" )
                      , ( True, "por" )
                      , ( False, "e Fuga Eos Impedit Qui" )
                      ]
                    , [ ( False, "Et Reprehenderit " )
                      , ( True, "Op" )
                      , ( False, "ti" )
                      , ( True, "o" )
                      , ( False, " Et" )
                      ]
                    , [ ( False, "Magni " ), ( True, "O" ), ( False, "mnis Et" ) ]
                    , [ ( False, "Eligendi Itaque Neque D" )
                      , ( True, "o" )
                      , ( False, "l" )
                      , ( True, "or" )
                      , ( False, " Ex Ut Cupiditate" )
                      ]
                    , [ ( False, "N" )
                      , ( True, "o" )
                      , ( False, "st" )
                      , ( True, "r" )
                      , ( False, "um Fugit Est Voluptatem" )
                      ]
                    , [ ( False, "D" )
                      , ( True, "o" )
                      , ( False, "l" )
                      , ( True, "or" )
                      , ( False, "e Vel Voluptas" )
                      ]
                    , [ ( False, "Unde C" ), ( True, "orpor" ), ( False, "is Aperiam Unde" ) ]
                    , [ ( False, "Non Rem " ), ( True, "R" ), ( False, "e" ), ( True, "r" ), ( False, "um" ) ]
                    , [ ( False, "Et V" ), ( True, "o" ), ( False, "lu" ), ( True, "p" ), ( False, "tatibus" ) ]
                    , [ ( False, "D" )
                      , ( True, "o" )
                      , ( False, "l" )
                      , ( True, "or" )
                      , ( False, "ibus Sapiente Minima Cupiditate Nesciunt" )
                      ]
                    , [ ( False, "Qui Neque Quae Vitae Sit I" ), ( True, "p" ), ( False, "sum Aliquam" ) ]
                    , [ ( False, "Qui D" ), ( True, "o" ), ( False, "l" ), ( True, "or" ) ]
                    , [ ( False, "Quidem Iure Deleniti Occaecati Ex" )
                      , ( True, "p" )
                      , ( False, "licab" )
                      , ( True, "o" )
                      , ( False, " Natus Eos" )
                      ]
                    , [ ( False, "Sed Illum Et V" ), ( True, "o" ), ( False, "lu" ), ( True, "p" ), ( False, "tatem Quae Numquam Ut" ) ]
                    , [ ( False, "V" ), ( True, "o" ), ( False, "lu" ), ( True, "p" ), ( False, "tate Qui Magnam Est" ) ]
                    , [ ( False, "Mollitia Lab" ), ( True, "or" ), ( False, "e Ad Culpa Et Quae" ) ]
                    , [ ( False, "Molestiae " ), ( True, "Po" ), ( False, "ssimus" ) ]
                    , [ ( False, "Laudantium In" ) ]
                    , [ ( False, "Neque " )
                      , ( True, "Porro" )
                      , ( False, " Placeat Aspernatur Cumque Et" )
                      ]
                    , [ ( False, "As" )
                      , ( True, "p" )
                      , ( False, "e" )
                      , ( True, "r" )
                      , ( False, "i" )
                      , ( True, "or" )
                      , ( False, "es Sint Ipsam Maxime Non" )
                      ]
                    , [ ( False, "Non Quaerat Mai" )
                      , ( True, "or" )
                      , ( False, "es Sit Quisquam Omnis" )
                      ]
                    , [ ( False, "Qui Distincti" )
                      , ( True, "o" )
                      , ( False, " Aut" )
                      ]
                    , [ ( False, "Eaque Enim Ipsa V" )
                      , ( True, "o" )
                      , ( False, "lu" )
                      , ( True, "p" )
                      , ( False, "tatem" )
                      ]
                    , [ ( False, "A Aut " )
                      , ( True, "Porro" )
                      , ( False, " Libero" )
                      ]
                    ]
        ]
