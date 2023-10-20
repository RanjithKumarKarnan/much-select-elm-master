module Searching.OptionSearchFilter exposing (suite)

import Expect
import Json.Decode
import Option exposing (test_newFancyOption)
import OptionSearchFilter
import OptionSearcher exposing (updateSearchResultInOption)
import SearchString
import Test exposing (Test, describe, test)


easyPrey =
    test_newFancyOption "No fur, no claws"


suite : Test
suite =
    describe "Option Search Filter"
        [ test "encode and decode" <|
            \_ ->
                Expect.equal
                    (updateSearchResultInOption
                        (SearchString.new "this" False)
                        easyPrey
                        |> Option.getMaybeOptionSearchFilter
                        |> Maybe.map OptionSearchFilter.encode
                        |> Maybe.map (Json.Decode.decodeValue OptionSearchFilter.decoder)
                        |> Maybe.map Result.toMaybe
                        |> Maybe.andThen identity
                    )
                    (updateSearchResultInOption
                        (SearchString.new "this" False)
                        easyPrey
                        |> Option.getMaybeOptionSearchFilter
                    )
        ]
