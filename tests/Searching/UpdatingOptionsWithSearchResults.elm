module Searching.UpdatingOptionsWithSearchResults exposing (suite)

import DropdownOptions
import Expect
import Json.Decode
import Option exposing (test_newFancyOption)
import OptionDisplay
import OptionList exposing (test_newFancyOptionList)
import OptionSearchFilter exposing (OptionSearchFilterWithValue)
import OptionSearcher
import OptionValue
import OutputStyle
import SearchString
import Test exposing (Test, describe, test)


options =
    test_newFancyOptionList
        [ test_newFancyOption "C++"
        , test_newFancyOption "Objective-C"
        , test_newFancyOption "C"
        ]


suite : Test
suite =
    describe "Searching through lots of options"
        [ test "The labels tokens should have the right highlights" <|
            \_ ->
                -- TODO This test is a bit convoluted, it's supposed to simulate the process of data
                -- passing between the filter worker and into the much-select. Ideally things would be
                -- refactored so more of this happened in 1 function that could be tested, or this should
                -- be refactored to en elm-program-test.
                let
                    searchString =
                        SearchString.new "ob" False

                    newOptions =
                        OptionSearcher.updateOptionsWithSearchString searchString
                            OutputStyle.NoMinimumToSearchStringLength
                            options

                    optionsToSend =
                        DropdownOptions.filterOptionsToShowInDropdownBySearchScore newOptions

                    searchResultsJson =
                        OptionList.encodeSearchResults optionsToSend
                            0
                            False

                    searchResults =
                        Json.Decode.decodeValue Option.decodeSearchResults
                            searchResultsJson
                            |> Result.withDefault
                                (Option.SearchResults [] 0 False)
                in
                Expect.equal
                    (options
                        |> OptionList.updateOptionsWithNewSearchResults searchResults.optionSearchFilters
                        |> OptionList.setAge OptionDisplay.MatureOption
                        |> OptionList.findByValue (OptionValue.stringToOptionValue "Objective-C")
                        |> Maybe.andThen Option.getMaybeOptionSearchFilter
                    )
                    (Just
                        (OptionSearchFilter.OptionSearchFilter
                            55090
                            90
                            [ ( True, "Ob" )
                            , ( False, "jective-C" )
                            ]
                            []
                            []
                        )
                    )
        ]
