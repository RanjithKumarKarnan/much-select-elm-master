module IntegrationTests.DisplayingOptions exposing (suite)

import Html.Attributes
import MuchSelect exposing (Flags)
import ProgramTest
    exposing
        ( ProgramTest
        , ensureViewHas
        , ensureViewHasNot
        , expectViewHas
        , expectViewHasNot
        )
import Test exposing (Test, describe, test)
import Test.Html.Selector exposing (classes, text)


flagsEmptyOptionsWithOrangeSelected : Flags
flagsEmptyOptionsWithOrangeSelected =
    { isEventsOnly = False
    , selectedValue = "Orange"
    , selectedValueEncoding = Nothing
    , placeholder = ( True, "What is your favorite color" )
    , customOptionHint = Nothing
    , allowMultiSelect = False
    , outputStyle = "customHtml"
    , enableMultiSelectSingleItemRemoval = False
    , optionsJson = "[]"
    , optionSort = ""
    , loading = False
    , maxDropdownItems = Just "10"
    , disabled = False
    , allowCustomOptions = False
    , selectedItemStaysInPlace = True
    , searchStringMinimumLength = Nothing
    , showDropdownFooter = False
    , transformationAndValidationJson = ""
    }


booksJsonWithIndexes =
    """
[
  {
    "value": "The Enormous Crocodile",
    "label": "The Enormous Crocodile",
    "labelClean": "The Enormous Crocodile",
    "index": 0
  },
  {
    "value": "James and the Giant Peach",
    "label": "James and the Giant Peach",
    "labelClean": "James and the Giant Peach",
    "index": 1
  },
  {
    "value": "Matilda",
    "label": "Matilda",
    "labelClean": "Matilda",
    "index": 2
  },
  {
    "value": "The BFG",
    "label": "The BFG",
    "labelClean": "The BFG",
    "index": 3
  }
]
"""


booksJsonWithIndexesAndWithSelected =
    """
[
  {
    "value": "The Enormous Crocodile",
    "label": "The Enormous Crocodile",
    "labelClean": "The Enormous Crocodile"
  },
  {
    "value": "James and the Giant Peach",
    "label": "James and the Giant Peach",
    "labelClean": "James and the Giant Peach"
  },
  {
    "value": "Matilda",
    "label": "Matilda",
    "labelClean": "Matilda",
    "selected": true
  },
  {
    "value": "The BFG",
    "label": "The BFG",
    "labelClean": "The BFG"
  }
]
"""


flagsBookOptions : Flags
flagsBookOptions =
    { isEventsOnly = False
    , selectedValue = ""
    , selectedValueEncoding = Nothing
    , placeholder = ( True, "A book" )
    , customOptionHint = Nothing
    , allowMultiSelect = False
    , outputStyle = "customHtml"
    , enableMultiSelectSingleItemRemoval = False
    , optionsJson = booksJsonWithIndexes
    , optionSort = ""
    , loading = False
    , maxDropdownItems = Just "2"
    , disabled = False
    , allowCustomOptions = False
    , selectedItemStaysInPlace = True
    , searchStringMinimumLength = Nothing
    , showDropdownFooter = False
    , transformationAndValidationJson = ""
    }


flagsBookOptionsWithValue : Flags
flagsBookOptionsWithValue =
    { isEventsOnly = False
    , selectedValue = "Matilda"
    , selectedValueEncoding = Nothing
    , placeholder = ( True, "A book" )
    , customOptionHint = Nothing
    , allowMultiSelect = False
    , outputStyle = "customHtml"
    , enableMultiSelectSingleItemRemoval = False
    , optionsJson = booksJsonWithIndexes
    , optionSort = ""
    , loading = False
    , maxDropdownItems = Just "2"
    , disabled = False
    , allowCustomOptions = False
    , selectedItemStaysInPlace = True
    , searchStringMinimumLength = Nothing
    , showDropdownFooter = False
    , transformationAndValidationJson = ""
    }


flagsBookOptionsWithSelected : Flags
flagsBookOptionsWithSelected =
    { isEventsOnly = False
    , selectedValue = ""
    , selectedValueEncoding = Nothing
    , placeholder = ( True, "A book" )
    , customOptionHint = Nothing
    , allowMultiSelect = False
    , outputStyle = "customHtml"
    , enableMultiSelectSingleItemRemoval = False
    , optionsJson = booksJsonWithIndexesAndWithSelected
    , optionSort = ""
    , loading = False
    , maxDropdownItems = Just "2"
    , disabled = False
    , allowCustomOptions = False
    , selectedItemStaysInPlace = True
    , searchStringMinimumLength = Nothing
    , showDropdownFooter = False
    , transformationAndValidationJson = ""
    }


element =
    ProgramTest.createElement
        { init = MuchSelect.init
        , update = MuchSelect.update
        , view = MuchSelect.view
        }


start : Flags -> ProgramTest MuchSelect.Model MuchSelect.Msg MuchSelect.Effect
start flags =
    element
        |> ProgramTest.start
            flags


suite : Test
suite =
    describe "When displaying the dropdown"
        [ test "if there is an initial value create an option for it" <|
            \() ->
                start flagsEmptyOptionsWithOrangeSelected
                    |> expectViewHas
                        [ text "Orange"
                        ]
        , describe "with initial options"
            [ test "if there is an initial selected attribute and a list of options where the selection is not reflected the value should still be selected" <|
                \() ->
                    start flagsBookOptionsWithValue
                        |> expectViewHas
                            [ classes [ "selected", "option" ]
                            , Test.Html.Selector.attribute (Html.Attributes.attribute "data-value" "Matilda")
                            ]
            , describe "if there are more options that there are max dropdown options"
                [ test "only show the first ones" <|
                    \_ ->
                        start flagsBookOptions
                            |> ensureViewHas
                                [ text "The Enormous Crocodile"
                                ]
                            |> ensureViewHas
                                [ text "James and the Giant Peach"
                                ]
                            |> ensureViewHasNot
                                [ text "Matilda" ]
                            |> expectViewHasNot
                                [ text "The BFG" ]
                , test "show the options around the selected option" <|
                    \_ ->
                        start flagsBookOptionsWithSelected
                            |> ensureViewHasNot
                                [ text "The Enormous Crocodile"
                                ]
                            |> ensureViewHasNot
                                [ text "James and the Giant Peach"
                                ]
                            |> ensureViewHas
                                [ text "Matilda" ]
                            |> expectViewHas
                                [ text "The BFG" ]
                ]
            ]
        ]
