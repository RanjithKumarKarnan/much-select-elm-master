module OptionList.ReIndexSelectedOptions exposing (..)

import Expect
import Option exposing (test_newEmptySelectedDatalistOption)
import OptionList exposing (reIndexSelectedOptions, test_newDatalistOptionList)
import Test exposing (Test, describe, test)


suite : Test
suite =
    describe "Re-Index selected options"
        [ test "when adding a new empty value" <|
            \_ ->
                Expect.equal
                    (test_newDatalistOptionList
                        [ test_newEmptySelectedDatalistOption 0
                        , test_newEmptySelectedDatalistOption 0
                        , test_newEmptySelectedDatalistOption 0
                        ]
                        |> reIndexSelectedOptions
                    )
                    (test_newDatalistOptionList
                        [ test_newEmptySelectedDatalistOption 0
                        , test_newEmptySelectedDatalistOption 1
                        , test_newEmptySelectedDatalistOption 2
                        ]
                    )
        ]
