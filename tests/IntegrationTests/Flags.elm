module IntegrationTests.Flags exposing (suite)

import Expect exposing (fail, pass)
import MuchSelect exposing (Flags)
import Test exposing (Test, describe, test)


defaultTestFlags : Flags
defaultTestFlags =
    { isEventsOnly = False
    , selectedValue = ""
    , selectedValueEncoding = Nothing
    , placeholder = ( True, "peace" )
    , customOptionHint = Nothing
    , allowMultiSelect = False
    , outputStyle = "customHtml"
    , enableMultiSelectSingleItemRemoval = False
    , optionsJson = ""
    , optionSort = ""
    , loading = False
    , maxDropdownItems = Just "10"
    , disabled = False
    , allowCustomOptions = False
    , selectedItemStaysInPlace = True
    , searchStringMinimumLength = Just "2"
    , showDropdownFooter = False
    , transformationAndValidationJson = ""
    }


suite : Test
suite =
    describe "Flag"
        [ describe "maxDropdownItems"
            [ test "should not allow negative integers" <|
                \() ->
                    MuchSelect.init
                        { defaultTestFlags
                            | maxDropdownItems = Just "-2"
                        }
                        |> (\( _, effect ) ->
                                case effect of
                                    MuchSelect.Batch effects ->
                                        if
                                            List.member
                                                (MuchSelect.ReportErrorMessage
                                                    "Invalid value for the max-dropdown-items attribute."
                                                )
                                                effects
                                        then
                                            pass

                                        else
                                            fail "There should have been an error message about max dropdown items being invalid"

                                    _ ->
                                        fail "Expecting a batch of effects"
                           )
            , test "should allow zero, no limit to the number of items" <|
                \() ->
                    MuchSelect.init
                        { defaultTestFlags
                            | maxDropdownItems = Just "0"
                        }
                        |> (\( _, effect ) ->
                                case effect of
                                    MuchSelect.Batch effects ->
                                        if
                                            List.member
                                                MuchSelect.ReportReady
                                                effects
                                        then
                                            pass

                                        else
                                            fail "These flags should have been OK"

                                    _ ->
                                        fail "Expecting a batch of effects"
                           )
            ]
        ]
