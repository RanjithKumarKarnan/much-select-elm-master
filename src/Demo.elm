module Demo exposing (main)

import Browser
import DemoData
    exposing
        ( LordOfTheRingsCharacter(..)
        , allOptions
        , filteredOptions
        , makeOptionElement
        , raceToString
        , wizards
        )
import Html
    exposing
        ( Attribute
        , Html
        , br
        , button
        , div
        , fieldset
        , form
        , input
        , label
        , legend
        , select
        , table
        , td
        , text
        , tr
        )
import Html.Attributes
    exposing
        ( attribute
        , checked
        , disabled
        , for
        , id
        , name
        , type_
        , value
        )
import Html.Attributes.Extra exposing (attributeIf)
import Html.Events exposing (on, onCheck, onClick, onInput, targetValue)
import Html.Events.Extra exposing (onChange)
import Json.Decode
import Json.Encode
import List.Extra
import Process
import Task
import Url


type alias Flags =
    ()


type alias Model =
    { allowCustomOptions : Bool
    , customOptionsHint : Maybe String
    , allowMultiSelect : Bool
    , outputStyle : String
    , customValidationResult : ValidationResult
    , optionDemo : OptionDemo
    , selectedValueEncoding : String
    , selectedValues : List MuchSelectValue
    , placeholder : ( String, Bool )
    , showLoadingIndicator : Bool
    , filteredOptions : ( String, List DemoOption )
    , validators : List ( Bool, Validator )
    , isDisabled : Bool
    }


type OptionDemo
    = StaticOptions
    | AllOptions
    | FilteredOptions


stringToMaybeOptionDemo : String -> Maybe OptionDemo
stringToMaybeOptionDemo string =
    case string of
        "static-options" ->
            Just StaticOptions

        "all-options" ->
            Just AllOptions

        "filtered-options" ->
            Just FilteredOptions

        _ ->
            Nothing


optionDemoDecoder : Json.Decode.Decoder OptionDemo
optionDemoDecoder =
    targetValue
        |> Json.Decode.andThen
            (\str ->
                case stringToMaybeOptionDemo str of
                    Just optionDemo ->
                        Json.Decode.succeed optionDemo

                    Nothing ->
                        Json.Decode.fail ("Unable to figure out an option demo to match: " ++ str)
            )


type alias DemoOption =
    { label : String
    , value : String
    , description : Maybe String
    , optGroup : Maybe String
    }


type Msg
    = MuchSelectReady
    | ValueChanged (List MuchSelectValue)
    | InvalidValueChanged (List MuchSelectValue)
    | ValueCleared
    | OptionSelected
    | BlurOrUnfocusedValueChanged String
    | InputKeyUpDebounced String
    | InputKeyUp String
    | OptionsUpdated
    | OptionDeselected
    | CustomValueSelected String
    | CustomValidationRequest String Int
    | ToggleAllowCustomValues
    | ToggleMultiSelect
    | ChangeOutputStyle String
    | ChangeSelectedValueEncoding String
    | TogglePlaceholder Bool
    | UpdatePlaceholderString String
    | ToggleLoadingIndicator Bool
    | ChangeOptionDemo OptionDemo
    | FilterOptions String
    | ToggleValidation Validator Bool
    | ToggleDisabled Bool
    | ChangeSelectedValue (List MuchSelectValue)
    | ChangeCustomOptionsHint String


main : Program Flags Model Msg
main =
    Browser.element
        { init = init
        , update = update
        , subscriptions = subscriptions
        , view = view
        }


init : Flags -> ( Model, Cmd Msg )
init _ =
    ( { allowCustomOptions = False
      , customOptionsHint = Nothing
      , allowMultiSelect = False
      , outputStyle = "custom-html"
      , customValidationResult = NothingToValidate
      , optionDemo = StaticOptions
      , selectedValueEncoding = "json"
      , selectedValues = []
      , placeholder = ( "Enter a value", False )
      , showLoadingIndicator = False
      , isDisabled = False
      , filteredOptions =
            ( ""
            , filteredOptions "" 10
                |> List.map lordOfTheRingsCharacterToDemoOption
            )
      , validators =
            [ ( False, defaultNoWhitespaceValidator )
            , ( False, defaultMinimumLengthValidator )
            ]
      }
    , Cmd.none
    )


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        ValueChanged selectedValues ->
            ( { model | selectedValues = selectedValues }, Cmd.none )

        InvalidValueChanged _ ->
            ( model, Cmd.none )

        ValueCleared ->
            ( model, Cmd.none )

        BlurOrUnfocusedValueChanged _ ->
            ( model, Cmd.none )

        InputKeyUpDebounced searchString ->
            case model.optionDemo of
                StaticOptions ->
                    ( model, Cmd.none )

                AllOptions ->
                    ( model, Cmd.none )

                FilteredOptions ->
                    if (searchString |> String.trim |> String.length) > 2 then
                        ( { model | showLoadingIndicator = True }
                        , Process.sleep 2000
                            |> Task.perform (always (FilterOptions searchString))
                        )

                    else
                        ( model, Cmd.none )

        ToggleAllowCustomValues ->
            ( { model | allowCustomOptions = not model.allowCustomOptions }, Cmd.none )

        ToggleMultiSelect ->
            ( { model | allowMultiSelect = not model.allowMultiSelect }, Cmd.none )

        ChangeOutputStyle string ->
            ( { model | outputStyle = string }, Cmd.none )

        MuchSelectReady ->
            ( model, Cmd.none )

        OptionSelected ->
            ( model, Cmd.none )

        OptionDeselected ->
            ( model, Cmd.none )

        OptionsUpdated ->
            ( model, Cmd.none )

        InputKeyUp _ ->
            ( model, Cmd.none )

        CustomValueSelected _ ->
            ( model, Cmd.none )

        CustomValidationRequest string int ->
            let
                isValid =
                    not (String.startsWith "asdf" string)

                customValidationResult =
                    if isValid then
                        ValidationPass string int

                    else
                        ValidationFailed string int [ ( "Come on, you can do better than 'asdf'", "error" ) ]
            in
            ( { model | customValidationResult = customValidationResult }, Cmd.none )

        ChangeSelectedValueEncoding string ->
            ( { model | selectedValueEncoding = string }, Cmd.none )

        TogglePlaceholder showPlaceholder ->
            ( { model | placeholder = Tuple.mapSecond (always showPlaceholder) model.placeholder }, Cmd.none )

        UpdatePlaceholderString str ->
            ( { model | placeholder = Tuple.mapFirst (always str) model.placeholder }, Cmd.none )

        ToggleLoadingIndicator showLoadingIndicator ->
            ( { model | showLoadingIndicator = showLoadingIndicator }, Cmd.none )

        ChangeOptionDemo optionDemo ->
            ( { model | optionDemo = optionDemo }, Cmd.none )

        FilterOptions searchString ->
            let
                newFilteredOptions =
                    filteredOptions searchString 10
                        |> List.map lordOfTheRingsCharacterToDemoOption
            in
            ( { model
                | showLoadingIndicator = False
                , filteredOptions = ( searchString, newFilteredOptions )
              }
            , Cmd.none
            )

        ToggleValidation validator bool ->
            let
                maybeIndexToUpdate : Maybe Int
                maybeIndexToUpdate =
                    case validator of
                        NoWhiteSpace _ _ ->
                            model.validators
                                |> List.map Tuple.second
                                |> List.Extra.findIndex isNoWhiteSpaceValidator

                        MinimumLength _ _ _ ->
                            model.validators
                                |> List.map Tuple.second
                                |> List.Extra.findIndex isMinimumLengthValidator

                        Custom ->
                            Nothing
            in
            case maybeIndexToUpdate of
                Just indexToUpdate ->
                    ( { model | validators = List.Extra.setAt indexToUpdate ( bool, validator ) model.validators }
                    , Cmd.none
                    )

                Nothing ->
                    ( model, Cmd.none )

        ToggleDisabled bool ->
            ( { model | isDisabled = bool }, Cmd.none )

        ChangeSelectedValue muchSelectValues ->
            ( { model | selectedValues = muchSelectValues }, Cmd.none )

        ChangeCustomOptionsHint string ->
            case string of
                "" ->
                    ( { model | customOptionsHint = Nothing }, Cmd.none )

                _ ->
                    ( { model | customOptionsHint = Just string }, Cmd.none )


lordOfTheRingsCharacterToDemoOption : LordOfTheRingsCharacter -> DemoOption
lordOfTheRingsCharacterToDemoOption character =
    case character of
        LordOfTheRingsCharacter name description race ->
            let
                maybeDescription =
                    if String.length description > 0 then
                        Just description

                    else
                        Nothing
            in
            DemoOption name name maybeDescription (race |> raceToString |> Just)


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.none


slot : String -> Attribute msg
slot string =
    attribute "slot" string


onInputKeyupDebounced : Attribute Msg
onInputKeyupDebounced =
    on "inputKeyUpDebounced"
        (Json.Decode.at
            [ "detail", "searchString" ]
            Json.Decode.string
            |> Json.Decode.map InputKeyUpDebounced
        )


onInputKeyUp : Attribute Msg
onInputKeyUp =
    on "inputKeyUp"
        (Json.Decode.at
            [ "detail", "searchString" ]
            Json.Decode.string
            |> Json.Decode.map InputKeyUp
        )


onReady : Attribute Msg
onReady =
    on "muchSelectReady" (Json.Decode.succeed MuchSelectReady)


type alias MuchSelectValue =
    { value : String
    , label : String
    , selectedIndex : Int
    }


valueDecoder : Json.Decode.Decoder MuchSelectValue
valueDecoder =
    Json.Decode.map3
        MuchSelectValue
        (Json.Decode.field "value" Json.Decode.string)
        (Json.Decode.field "label" Json.Decode.string)
        (Json.Decode.field "selectedIndex" Json.Decode.int)


onValueChanged : Attribute Msg
onValueChanged =
    on "valueChanged" (Json.Decode.map ValueChanged (Json.Decode.at [ "detail", "values" ] (Json.Decode.list valueDecoder)))


onInvalidValueChanged : Attribute Msg
onInvalidValueChanged =
    on "invalidValueChange" (Json.Decode.map InvalidValueChanged (Json.Decode.at [ "detail", "values" ] (Json.Decode.list valueDecoder)))


onValueCleared : Attribute Msg
onValueCleared =
    on "valueCleared" (Json.Decode.succeed ValueCleared)


onOptionSelected : Attribute Msg
onOptionSelected =
    on "optionSelected" (Json.Decode.succeed OptionSelected)


onCustomValueSelected : Attribute Msg
onCustomValueSelected =
    on "customValueSelected"
        (Json.Decode.at
            [ "detail", "value" ]
            Json.Decode.string
            |> Json.Decode.map CustomValueSelected
        )


onOptionDeselected : Attribute Msg
onOptionDeselected =
    on "optionDeselected" (Json.Decode.succeed OptionDeselected)


onBlurOrUnfocusedValueChanged : Attribute Msg
onBlurOrUnfocusedValueChanged =
    on "blurOrUnfocusedValueChanged"
        (Json.Decode.map BlurOrUnfocusedValueChanged
            (Json.Decode.at [ "detail", "value" ]
                Json.Decode.string
            )
        )


onOptionsUpdated : Attribute Msg
onOptionsUpdated =
    on "optionsUpdated" (Json.Decode.succeed OptionsUpdated)


onCustomValidationRequest : Attribute Msg
onCustomValidationRequest =
    on "customValidateRequest"
        (Json.Decode.map2 CustomValidationRequest
            (Json.Decode.at [ "detail", "stringToValidate" ]
                Json.Decode.string
            )
            (Json.Decode.at [ "detail", "selectedValueIndex" ]
                Json.Decode.int
            )
        )


allowCustomOptionsAttribute : Bool -> Maybe String -> Attribute msg
allowCustomOptionsAttribute bool maybeHint =
    if bool then
        case maybeHint of
            Just hint ->
                attribute "allow-custom-options" hint

            Nothing ->
                attribute "allow-custom-options" ""

    else
        Html.Attributes.Extra.empty


multiSelectAttribute : Bool -> Attribute msg
multiSelectAttribute bool =
    if bool then
        attribute "multi-select" ""

    else
        Html.Attributes.Extra.empty


outputStyleAttribute : String -> Attribute msg
outputStyleAttribute string =
    attribute "output-style" string


selectedValueEncodingAttribute : String -> Attribute msg
selectedValueEncodingAttribute encoding =
    attribute "selected-value-encoding" encoding


selectedValueAttribute : String -> List MuchSelectValue -> Attribute msg
selectedValueAttribute encoding muchSelectValues =
    let
        selectedValueStr =
            if encoding == "json" then
                muchSelectValues
                    |> List.sortBy .selectedIndex
                    |> List.map .value
                    |> Json.Encode.list Json.Encode.string
                    |> Json.Encode.encode 0
                    |> Url.percentEncode

            else
                muchSelectValues
                    |> List.sortBy .selectedIndex
                    |> List.map .value
                    |> String.join ","
    in
    attribute "selected-value" selectedValueStr


placeholderAttribute : ( String, Bool ) -> Attribute msg
placeholderAttribute ( placeholderString, isShown ) =
    if isShown then
        attribute "placeholder" placeholderString

    else
        Html.Attributes.Extra.empty


loadingAttribute : Bool -> Attribute msg
loadingAttribute bool =
    attributeIf bool (attribute "loading" "")


disabledAttribute : Bool -> Attribute msg
disabledAttribute bool =
    attributeIf bool (attribute "disabled" "")


view : Model -> Html Msg
view model =
    let
        transformers =
            [-- Lowercase
            ]

        validators =
            List.filterMap
                (\( shouldInclude, validator ) ->
                    if shouldInclude then
                        Just validator

                    else
                        Nothing
                )
                model.validators
    in
    div []
        [ Html.node "much-select"
            [ attribute "events-only" ""
            , selectedValueAttribute model.selectedValueEncoding model.selectedValues
            , selectedValueEncodingAttribute model.selectedValueEncoding
            , allowCustomOptionsAttribute model.allowCustomOptions model.customOptionsHint
            , multiSelectAttribute model.allowMultiSelect
            , outputStyleAttribute model.outputStyle
            , placeholderAttribute model.placeholder
            , loadingAttribute model.showLoadingIndicator
            , disabledAttribute model.isDisabled
            , onValueChanged
            , onInvalidValueChanged
            , onCustomValidationRequest
            , onCustomValueSelected
            , onBlurOrUnfocusedValueChanged
            , onValueCleared
            , onInputKeyupDebounced
            , onInputKeyUp
            , onReady
            , onOptionSelected
            , onOptionDeselected
            , onOptionsUpdated
            ]
            [ select [ slot "select-input" ]
                (optionsHtml model.optionDemo (Tuple.second model.filteredOptions))
            , Html.node "script"
                [ slot "transformation-validation"
                , type_ "application/json"
                ]
                [ text (Json.Encode.encode 0 (encode transformers validators)) ]
            , case model.customValidationResult of
                NothingToValidate ->
                    text ""

                _ ->
                    Html.node "script"
                        [ slot "custom-validation-result"
                        , type_ "application/json"
                        ]
                        [ text (Json.Encode.encode 0 (encodeCustomValidateResult model.customValidationResult)) ]
            ]
        , form []
            [ fieldset []
                [ legend [] [ text "Input Methods" ]
                , table []
                    [ tr []
                        [ td [] [ text "Allow Custom Options" ]
                        , td []
                            [ if model.allowCustomOptions then
                                text "ON"

                              else
                                text "OFF"
                            ]
                        , td []
                            [ button [ onClick ToggleAllowCustomValues, type_ "button" ] [ text "toggle" ]
                            ]
                        ]
                    , tr []
                        [ td [] [ text "Multi Select" ]
                        , td []
                            [ if model.allowMultiSelect then
                                text "ON"

                              else
                                text "OFF"
                            ]
                        , td []
                            [ button [ onClick ToggleMultiSelect, type_ "button" ] [ text "toggle" ]
                            ]
                        ]
                    ]
                ]
            , fieldset []
                [ legend [] [ text "Current Value" ]
                , table []
                    [ tr []
                        [ td [] [ text "Clear" ]
                        , td []
                            [ if List.isEmpty model.selectedValues then
                                button [ type_ "button", disabled True ] [ text "clear selected value" ]

                              else
                                button [ onClick (ChangeSelectedValue []), type_ "button" ] [ text "clear selected value" ]
                            ]
                        ]
                    ]
                ]
            , fieldset []
                [ legend []
                    [ text "Output Style"
                    ]
                , input
                    [ type_ "radio"
                    , name "output-style"
                    , id "output-style-custom-html"
                    , value "custom-html"
                    , checked (model.outputStyle == "custom-html")
                    , onChange ChangeOutputStyle
                    ]
                    []
                , label [ for "output-style-custom-html" ] [ text "Custom HTML" ]
                , input
                    [ type_ "radio"
                    , name "output-style"
                    , id "output-style-datalist"
                    , value "datalist"
                    , checked (model.outputStyle == "datalist")
                    , onChange ChangeOutputStyle
                    ]
                    []
                , label [ for "output-style-datalist" ] [ text "datalist" ]
                ]
            , fieldset []
                [ legend []
                    [ text "Option Demos"
                    ]
                , input
                    [ type_ "radio"
                    , name "option-demos"
                    , id "option-demos-static"
                    , value "static"
                    , checked (model.optionDemo == StaticOptions)
                    , on "change" <| Json.Decode.map ChangeOptionDemo optionDemoDecoder
                    ]
                    []
                , label [ for "option-demos-static" ] [ text "Static Options (Wizards) " ]
                , br [] []
                , input
                    [ type_ "radio"
                    , name "option-demos"
                    , id "option-demos-all"
                    , value "all-options"
                    , checked (model.optionDemo == AllOptions)
                    , on "change" <| Json.Decode.map ChangeOptionDemo optionDemoDecoder
                    ]
                    []
                , label [ for "option-demos-all" ] [ text "All Options with Groups" ]
                , br [] []
                , input
                    [ type_ "radio"
                    , name "option-demos"
                    , id "option-demos-filtered"
                    , value "filtered-options"
                    , checked (model.optionDemo == FilteredOptions)
                    , on "change" <| Json.Decode.map ChangeOptionDemo optionDemoDecoder
                    ]
                    []
                , label [ for "option-demos-filtered" ] [ text "Filtered Options" ]
                ]
            , fieldset []
                [ legend []
                    [ text "Selected Value Encoding"
                    ]
                , input
                    [ type_ "radio"
                    , name "selected-value-encoding"
                    , id "selected-value-encoding-comma"
                    , value "comma"
                    , checked (model.selectedValueEncoding == "comma")
                    , onChange ChangeSelectedValueEncoding
                    ]
                    []
                , label [ for "selected-value-encoding-comma" ] [ text "Commas" ]
                , input
                    [ type_ "radio"
                    , name "selected-value-encoding"
                    , id "selected-value-encoding-json"
                    , value "json"
                    , checked (model.selectedValueEncoding == "json")
                    , onChange ChangeSelectedValueEncoding
                    ]
                    []
                , label [ for "selected-value-encoding-json" ] [ text "JSON" ]
                ]
            , fieldset []
                [ legend []
                    [ text "Placeholder"
                    ]
                , input
                    [ type_ "radio"
                    , name "placeholder-is-set"
                    , id "placeholder-is-set-false"
                    , value "false"
                    , checked (not (Tuple.second model.placeholder))
                    , onCheck (\_ -> TogglePlaceholder False)
                    ]
                    []
                , label [ for "placeholder-is-set-false" ] [ text "Hide" ]
                , input
                    [ type_ "radio"
                    , name "placeholder-is-set"
                    , id "placeholder-is-set-true"
                    , value "true"
                    , checked (Tuple.second model.placeholder)
                    , onChange (\_ -> TogglePlaceholder True)
                    ]
                    []
                , label [ for "placeholder-is-set-true" ] [ text "Show" ]
                , br [] []
                , label [ for "placeholder-input" ] [ text "Placeholder copy: " ]
                , input
                    [ type_ "text"
                    , name "placeholder"
                    , id "placeholder-input"
                    , value (Tuple.first model.placeholder)
                    , onInput UpdatePlaceholderString
                    , disabled (not (Tuple.second model.placeholder))
                    ]
                    []
                ]
            , fieldset []
                [ legend []
                    [ text "Loading"
                    ]
                , input
                    [ type_ "radio"
                    , name "loading-indicator"
                    , id "loading-indicator-is-off"
                    , value "false"
                    , checked (not model.showLoadingIndicator)
                    , onChange (\_ -> ToggleLoadingIndicator False)
                    ]
                    []
                , label [ for "loading-indicator-is-off" ] [ text "Hide" ]
                , input
                    [ type_ "radio"
                    , name "loading-indicator"
                    , id "loading-indicator-is-on"
                    , value "true"
                    , checked model.showLoadingIndicator
                    , onCheck (\_ -> ToggleLoadingIndicator True)
                    ]
                    []
                , label [ for "loading-indicator-is-on" ] [ text "Show" ]
                ]
            , fieldset []
                [ legend []
                    [ text "Disabled"
                    ]
                , input
                    [ type_ "radio"
                    , name "disabled-indicator"
                    , id "disabled-is-off"
                    , value "false"
                    , checked (not model.isDisabled)
                    , onChange (\_ -> ToggleDisabled False)
                    ]
                    []
                , label [ for "disabled-is-off" ] [ text "Not Disabled" ]
                , input
                    [ type_ "radio"
                    , name "disabled-indicator"
                    , id "disabled-is-on"
                    , value "true"
                    , checked model.isDisabled
                    , onCheck (\_ -> ToggleDisabled True)
                    ]
                    []
                , label [ for "disabled-is-on" ] [ text "Disabled" ]
                ]
            , fieldset []
                [ legend []
                    [ text "Validation"
                    ]
                , input
                    [ type_ "checkbox"
                    , name "no-white-space"
                    , id "no-white-space-checkbox"
                    , checked (isNoWhiteSpaceValidatorActive model)
                    , onCheck (ToggleValidation (getNoWhiteSpaceValidator model))
                    ]
                    []
                , label [ for "no-white-space-checkbox" ] [ text "No White Space" ]
                , br [] []
                , input
                    [ type_ "checkbox"
                    , name "minimum-length"
                    , id "minimum-length-checkbox"
                    , checked (isMinimumLengthValidatorActive model)
                    , onCheck (ToggleValidation (getMinimumLengthValidator model))
                    ]
                    []
                , label [ for "minimum-length-checkbox" ] [ text "Minimum Length" ]
                ]
            , fieldset []
                [ legend []
                    [ text "Custom Option Hint"
                    ]
                , label
                    [ for "custom-option-hint" ]
                    [ text "Custom Option Hint: " ]
                , input
                    [ type_ "text"
                    , name "custom-option-hint"
                    , id "custom-option-input"
                    , disabled (not model.allowCustomOptions)
                    , onChange ChangeCustomOptionsHint
                    ]
                    []
                ]
            ]
        ]


getNoWhiteSpaceValidator : Model -> Validator
getNoWhiteSpaceValidator model =
    model.validators
        |> List.map Tuple.second
        |> List.Extra.find isNoWhiteSpaceValidator
        |> Maybe.withDefault defaultNoWhitespaceValidator


isNoWhiteSpaceValidatorActive : Model -> Bool
isNoWhiteSpaceValidatorActive model =
    let
        maybeIndex =
            getNoWhiteSpaceValidatorIndex model
    in
    case maybeIndex of
        Just index ->
            List.Extra.getAt index model.validators
                |> Maybe.map Tuple.first
                |> Maybe.withDefault False

        Nothing ->
            False


isNoWhiteSpaceValidator : Validator -> Bool
isNoWhiteSpaceValidator validator =
    case validator of
        NoWhiteSpace _ _ ->
            True

        MinimumLength _ _ _ ->
            False

        Custom ->
            False


getNoWhiteSpaceValidatorIndex : Model -> Maybe Int
getNoWhiteSpaceValidatorIndex model =
    model.validators
        |> List.map Tuple.second
        |> List.Extra.findIndex isNoWhiteSpaceValidator


defaultNoWhitespaceValidator =
    NoWhiteSpace ShowError "White space is not allowed"


getMinimumLengthValidator : Model -> Validator
getMinimumLengthValidator model =
    model.validators
        |> List.map Tuple.second
        |> List.Extra.find isMinimumLengthValidator
        |> Maybe.withDefault defaultMinimumLengthValidator


isMinimumLengthValidatorActive : Model -> Bool
isMinimumLengthValidatorActive model =
    let
        maybeIndex =
            getMinimumLengthValidatorIndex model
    in
    case maybeIndex of
        Just index ->
            List.Extra.getAt index model.validators
                |> Maybe.map Tuple.first
                |> Maybe.withDefault False

        Nothing ->
            False


isMinimumLengthValidator : Validator -> Bool
isMinimumLengthValidator validator =
    case validator of
        NoWhiteSpace _ _ ->
            False

        MinimumLength _ _ _ ->
            True

        Custom ->
            False


getMinimumLengthValidatorIndex : Model -> Maybe Int
getMinimumLengthValidatorIndex model =
    model.validators
        |> List.map Tuple.second
        |> List.Extra.findIndex isMinimumLengthValidator


defaultMinimumLengthValidator =
    MinimumLength ShowError "The value is too short" 4


optionsHtml : OptionDemo -> List DemoOption -> List (Html Msg)
optionsHtml optionDemo knownOptions =
    case optionDemo of
        StaticOptions ->
            wizards

        AllOptions ->
            allOptions

        FilteredOptions ->
            List.map
                (\knownOption ->
                    makeOptionElement
                        knownOption.label
                        knownOption.value
                        knownOption.description
                )
                knownOptions


type Transformer
    = Lowercase


type Validator
    = NoWhiteSpace ValidatorLevel String
    | MinimumLength ValidatorLevel String Int
    | Custom


type ValidatorLevel
    = ShowError
    | Silent


type ValidationResult
    = NothingToValidate
    | ValidationPass String Int
    | ValidationFailed String Int (List ( String, String ))


encode : List Transformer -> List Validator -> Json.Encode.Value
encode transformers validators =
    Json.Encode.object
        [ ( "transformers", Json.Encode.list encodeTransformer transformers )
        , ( "validators", Json.Encode.list encodeValidator validators )
        ]


encodeTransformer : Transformer -> Json.Encode.Value
encodeTransformer transformer =
    case transformer of
        Lowercase ->
            Json.Encode.object [ ( "name", Json.Encode.string "lowercase" ) ]


encodeValidator : Validator -> Json.Encode.Value
encodeValidator validator =
    case validator of
        NoWhiteSpace validatorLevel string ->
            Json.Encode.object
                [ ( "name", Json.Encode.string "no-white-space" )
                , ( "level", encodeValidatorLevel validatorLevel )
                , ( "message", Json.Encode.string string )
                ]

        MinimumLength validatorLevel string int ->
            Json.Encode.object
                [ ( "name", Json.Encode.string "minimum-length" )
                , ( "level", encodeValidatorLevel validatorLevel )
                , ( "message", Json.Encode.string string )
                , ( "minimum-length", Json.Encode.int int )
                ]

        Custom ->
            Json.Encode.object
                [ ( "name", Json.Encode.string "custom" )
                ]


encodeValidatorLevel : ValidatorLevel -> Json.Encode.Value
encodeValidatorLevel validatorLevel =
    case validatorLevel of
        ShowError ->
            Json.Encode.string "error"

        Silent ->
            Json.Encode.string "silent"


encodeCustomValidateResult : ValidationResult -> Json.Encode.Value
encodeCustomValidateResult validationResult =
    case validationResult of
        NothingToValidate ->
            Json.Encode.string ""

        ValidationPass string int ->
            Json.Encode.object
                [ ( "isValid", Json.Encode.bool True )
                , ( "value", Json.Encode.string string )
                , ( "selectedValueIndex", Json.Encode.int int )
                ]

        ValidationFailed string int errorMessages ->
            let
                encodeErrorMessage ( errorMessage, errorLevel ) =
                    Json.Encode.object
                        [ ( "errorMessage", Json.Encode.string errorMessage )
                        , ( "level", Json.Encode.string errorLevel )
                        ]
            in
            Json.Encode.object
                [ ( "isValid", Json.Encode.bool False )
                , ( "value", Json.Encode.string string )
                , ( "selectedValueIndex", Json.Encode.int int )
                , ( "errorMessages", Json.Encode.list encodeErrorMessage errorMessages )
                ]
