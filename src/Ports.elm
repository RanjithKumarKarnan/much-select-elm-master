port module Ports exposing
    ( addOptionsReceiver
    , allOptions
    , allowCustomOptionsReceiver
    , attributeChanged
    , attributeRemoved
    , blurInput
    , customOptionHintReceiver
    , customOptionSelected
    , customValidationReceiver
    , deselectOptionReceiver
    , disableChangedReceiver
    , dumpConfigState
    , dumpSelectedValues
    , errorMessage
    , focusInput
    , initialValueSet
    , inputBlurred
    , inputFocused
    , inputKeyUp
    , invalidValue
    , lightDomChange
    , loadingChangedReceiver
    , maxDropdownItemsChangedReceiver
    , muchSelectIsReady
    , multiSelectChangedReceiver
    , multiSelectSingleItemRemovalChangedReceiver
    , optionDecoder
    , optionDeselected
    , optionEncoder
    , optionSelected
    , optionSortingChangedReceiver
    , optionsDecoder
    , optionsEncoder
    , optionsReplacedReceiver
    , optionsUpdated
    , outputStyleChangedReceiver
    , placeholderChangedReceiver
    , removeOptionsReceiver
    , requestAllOptionsReceiver
    , requestConfigState
    , requestSelectedValues
    , scrollDropdownToElement
    , searchOptionsWithWebWorker
    , searchStringMinimumLengthChangedReceiver
    , selectOptionReceiver
    , selectedItemStaysInPlaceChangedReceiver
    , selectedValueEncodingChangeReceiver
    , sendCustomValidationRequest
    , showDropdownFooterChangedReceiver
    , transformationAndValidationReceiver
    , updateOptionsFromDom
    , updateOptionsInWebWorker
    , updateSearchResultDataWithWebWorkerReceiver
    , valueCasingDimensionsChangedReceiver
    , valueChangedMultiSelectSelect
    , valueChangedReceiver
    , valueChangedSingleSelect
    , valueCleared
    , valueDecoder
    , valuesDecoder
    )

import Json.Decode
import Json.Encode
import Option exposing (Option)
import OptionLabel
import OptionList exposing (OptionList)


port muchSelectIsReady : () -> Cmd msg


port errorMessage : String -> Cmd msg


port valueChangedSingleSelect : Json.Encode.Value -> Cmd msg


port valueChangedMultiSelectSelect : Json.Encode.Value -> Cmd msg


port invalidValue : Json.Encode.Value -> Cmd msg


port initialValueSet : Json.Encode.Value -> Cmd msg


port customOptionSelected : List String -> Cmd msg


port valueCleared : () -> Cmd msg


port optionSelected : Json.Encode.Value -> Cmd msg


port optionDeselected : Json.Encode.Value -> Cmd msg


optionsEncoder : OptionList -> Json.Encode.Value
optionsEncoder optionList =
    optionList |> OptionList.getOptions |> Json.Encode.list optionEncoder


optionEncoder : Option -> Json.Encode.Value
optionEncoder option =
    Json.Encode.object
        [ ( "value", Json.Encode.string (Option.getOptionValueAsString option) )
        , ( "label", Json.Encode.string (Option.getOptionLabel option |> OptionLabel.optionLabelToString) )
        , ( "isValid", Json.Encode.bool (Option.isValid option) )
        , ( "selectedIndex", Json.Encode.int (Option.getOptionSelectedIndex option) )
        ]


type alias PortOption =
    { value : String
    , label : String
    , isValid : Bool
    , selectedIndex : Int
    }


optionsDecoder : Json.Decode.Decoder (List PortOption)
optionsDecoder =
    Json.Decode.list optionDecoder


optionDecoder : Json.Decode.Decoder PortOption
optionDecoder =
    Json.Decode.map4
        PortOption
        (Json.Decode.field "value" Json.Decode.string)
        (Json.Decode.field "label" Json.Decode.string)
        (Json.Decode.field "isValid" Json.Decode.bool)
        (Json.Decode.field "selectedIndex" Json.Decode.int)


port inputKeyUp : String -> Cmd msg


{-| This port is involved in caring out the blurring process.
-}
port blurInput : () -> Cmd msg


{-| This port is called after this much select has been blurred.
-}
port inputBlurred : () -> Cmd msg


{-| This port is involved in caring out the focusing process.
-}
port focusInput : () -> Cmd msg


{-| This port is called after this much select has been focused
-}
port inputFocused : () -> Cmd msg


port allOptions : Json.Decode.Value -> Cmd msg


port requestConfigState : (() -> msg) -> Sub msg


port dumpConfigState : Json.Decode.Value -> Cmd msg


port requestSelectedValues : (() -> msg) -> Sub msg


port dumpSelectedValues : Json.Decode.Value -> Cmd msg


port updateOptionsFromDom : () -> Cmd msg


port searchOptionsWithWebWorker : Json.Decode.Value -> Cmd msg


port updateOptionsInWebWorker : () -> Cmd msg


port sendCustomValidationRequest : ( String, Int ) -> Cmd msg


port customValidationReceiver : (Json.Decode.Value -> msg) -> Sub msg


port transformationAndValidationReceiver : (Json.Decode.Value -> msg) -> Sub msg


port requestAllOptionsReceiver : (() -> msg) -> Sub msg


{-| This is called when options have been updated, the bool is true if all the options have been "replaced" and it's
false if the have just been "tweaked"
-}
port optionsUpdated : Bool -> Cmd msg


port scrollDropdownToElement : String -> Cmd msg


port attributeChanged : (( String, String ) -> msg) -> Sub msg


port attributeRemoved : (String -> msg) -> Sub msg


port lightDomChange : Json.Decode.Value -> Cmd msg


valuesDecoder : Json.Decode.Decoder (List String)
valuesDecoder =
    Json.Decode.oneOf
        [ Json.Decode.list Json.Decode.string
        , Json.Decode.string
            |> Json.Decode.map
                List.singleton
        ]


valueDecoder : Json.Decode.Decoder (List String)
valueDecoder =
    Json.Decode.oneOf
        [ Json.Decode.string
            |> Json.Decode.map
                List.singleton
        , Json.Decode.list Json.Decode.string
            |> Json.Decode.andThen
                (\listOfString ->
                    case listOfString of
                        [ _ ] ->
                            Json.Decode.succeed listOfString

                        _ ->
                            Json.Decode.fail "Only 1 value is allowed when in single select mode."
                )
        , Json.Decode.null []
        ]


port valueChangedReceiver : (Json.Decode.Value -> msg) -> Sub msg


port optionsReplacedReceiver : (Json.Decode.Value -> msg) -> Sub msg


port addOptionsReceiver : (Json.Decode.Value -> msg) -> Sub msg


port removeOptionsReceiver : (Json.Decode.Value -> msg) -> Sub msg


port selectOptionReceiver : (Json.Decode.Value -> msg) -> Sub msg


port deselectOptionReceiver : (Json.Decode.Value -> msg) -> Sub msg


port placeholderChangedReceiver : (( Bool, String ) -> msg) -> Sub msg


port loadingChangedReceiver : (Bool -> msg) -> Sub msg


port disableChangedReceiver : (Bool -> msg) -> Sub msg


port multiSelectChangedReceiver : (Bool -> msg) -> Sub msg


port multiSelectSingleItemRemovalChangedReceiver : (Bool -> msg) -> Sub msg


port searchStringMinimumLengthChangedReceiver : (Int -> msg) -> Sub msg


port selectedItemStaysInPlaceChangedReceiver : (Bool -> msg) -> Sub msg


port maxDropdownItemsChangedReceiver : (String -> msg) -> Sub msg


port showDropdownFooterChangedReceiver : (Bool -> msg) -> Sub msg


port allowCustomOptionsReceiver : (( Bool, String ) -> msg) -> Sub msg


port customOptionHintReceiver : (String -> msg) -> Sub msg


port valueCasingDimensionsChangedReceiver : ({ width : Float, height : Float } -> msg) -> Sub msg


port selectedValueEncodingChangeReceiver : (String -> msg) -> Sub msg


port optionSortingChangedReceiver : (String -> msg) -> Sub msg


port outputStyleChangedReceiver : (String -> msg) -> Sub msg


port updateSearchResultDataWithWebWorkerReceiver : (Json.Encode.Value -> msg) -> Sub msg
