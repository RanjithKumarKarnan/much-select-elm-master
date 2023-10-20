module SelectionMode.MakeSelectionConfig exposing (suite)

import Expect
import OutputStyle exposing (CustomOptions(..), DropdownState(..), DropdownStyle(..), EventsMode(..), MaxDropdownItems(..), MultiSelectOutputStyle(..), SearchStringMinimumLength(..), SelectedItemPlacementMode(..), SingleItemRemoval(..), SingleSelectOutputStyle(..), defaultMaxDropdownItems, defaultMaxDropdownItemsNum, defaultSearchStringMinimumLength)
import PositiveInt
import SelectionMode
    exposing
        ( InteractionState(..)
        , SelectionConfig(..)
        , makeSelectionConfig
        )
import Test exposing (Test, describe, test)
import TransformAndValidate exposing (ValueTransformAndValidate(..))


suite : Test
suite =
    describe "Making the initial selection config from flags"
        [ test "we should be able to make a multi select" <|
            \() ->
                Expect.equal
                    (makeSelectionConfig
                        False
                        False
                        True
                        False
                        ""
                        ( False, "" )
                        Nothing
                        False
                        (FixedMaxDropdownItems defaultMaxDropdownItemsNum)
                        True
                        defaultSearchStringMinimumLength
                        False
                        TransformAndValidate.empty
                    )
                    (Ok
                        (MultiSelectConfig
                            (MultiSelectCustomHtml
                                { customOptions = NoCustomOptions
                                , singleItemRemoval = DisableSingleItemRemoval
                                , maxDropdownItems = FixedMaxDropdownItems (PositiveInt.new 1000)
                                , searchStringMinimumLength = FixedSearchStringMinimumLength (PositiveInt.new 2)
                                , dropdownState = Collapsed
                                , dropdownStyle = NoFooter
                                , eventsMode = AllowLightDomChanges
                                }
                            )
                            ( False, "" )
                            Unfocused
                        )
                    )
        , test "we should be able to setup a multi select with custom options with a custom hint" <|
            \() ->
                Expect.equal
                    (makeSelectionConfig
                        False
                        False
                        True
                        True
                        ""
                        ( False, "" )
                        (Just "Milk")
                        False
                        defaultMaxDropdownItems
                        True
                        defaultSearchStringMinimumLength
                        False
                        TransformAndValidate.empty
                    )
                    (Ok
                        (MultiSelectConfig
                            (MultiSelectCustomHtml
                                { customOptions = AllowCustomOptions (Just "Milk") (ValueTransformAndValidate [] [])
                                , singleItemRemoval = DisableSingleItemRemoval
                                , maxDropdownItems = FixedMaxDropdownItems (PositiveInt.new 1000)
                                , searchStringMinimumLength = FixedSearchStringMinimumLength (PositiveInt.new 2)
                                , dropdownState = Collapsed
                                , dropdownStyle = NoFooter
                                , eventsMode = AllowLightDomChanges
                                }
                            )
                            ( False, "" )
                            Unfocused
                        )
                    )
        , test "we should be able to setup a single select with custom options with a custom hint" <|
            \() ->
                Expect.equal
                    (makeSelectionConfig
                        False
                        False
                        False
                        True
                        ""
                        ( False, "" )
                        (Just "Milk")
                        False
                        defaultMaxDropdownItems
                        True
                        defaultSearchStringMinimumLength
                        False
                        TransformAndValidate.empty
                    )
                    (Ok
                        (SingleSelectConfig
                            (SingleSelectCustomHtml
                                { customOptions = AllowCustomOptions (Just "Milk") (ValueTransformAndValidate [] [])
                                , maxDropdownItems = FixedMaxDropdownItems (PositiveInt.new 1000)
                                , searchStringMinimumLength = FixedSearchStringMinimumLength (PositiveInt.new 2)
                                , dropdownState = Collapsed
                                , dropdownStyle = NoFooter
                                , eventsMode = AllowLightDomChanges
                                , selectedItemPlacementMode = SelectedItemStaysInPlace
                                }
                            )
                            ( False, "" )
                            Unfocused
                        )
                    )
        ]
