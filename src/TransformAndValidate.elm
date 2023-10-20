module TransformAndValidate exposing (..)

import Json.Decode
import Json.Decode.Extra
import List.Extra
import SearchString exposing (SearchString)


type ValueTransformAndValidate
    = ValueTransformAndValidate (List Transformer) (List Validator)


empty =
    ValueTransformAndValidate [] []


type Transformer
    = ToLowercase


type Validator
    = NoWhiteSpace ValidationReportLevel ValidationErrorMessage
    | MinimumLength ValidationReportLevel ValidationErrorMessage Int
    | Custom


type ValidationReportLevel
    = SilentError
    | ShowError


type ValidationErrorMessage
    = ValidationErrorMessage String


type ValidationResult
    = ValidationPass String Int
    | ValidationFailed String Int (List ValidationFailureMessage)
    | ValidationPending String Int


type ValidationStatus
    = InputHasBeenValidated
    | InputHasValidationPending
    | InputHasFailedValidation
    | InputValidationIsNotHappening


getSelectedIndexFromValidationResult : ValidationResult -> Int
getSelectedIndexFromValidationResult validationResult =
    case validationResult of
        ValidationPass _ selectedIndex ->
            selectedIndex

        ValidationFailed _ selectedIndex _ ->
            selectedIndex

        ValidationPending _ selectedIndex ->
            selectedIndex


type CustomValidationResult
    = CustomValidationPass String Int
    | CustomValidationFailed String Int (List ValidationFailureMessage)


getValueStringFromCustomValidationResult : CustomValidationResult -> String
getValueStringFromCustomValidationResult customValidationResult =
    case customValidationResult of
        CustomValidationPass string _ ->
            string

        CustomValidationFailed string _ _ ->
            string


getSelectedValueIndexFromCustomValidationResult : CustomValidationResult -> Int
getSelectedValueIndexFromCustomValidationResult customValidationResult =
    case customValidationResult of
        CustomValidationPass _ selectedValueIndex ->
            selectedValueIndex

        CustomValidationFailed _ selectedValueIndex _ ->
            selectedValueIndex


hasValidationFailed : ValidationResult -> Bool
hasValidationFailed validationResult =
    case validationResult of
        ValidationPass _ _ ->
            False

        ValidationFailed _ _ _ ->
            True

        ValidationPending _ _ ->
            False


hasValidationPending : ValidationResult -> Bool
hasValidationPending validationResult =
    case validationResult of
        ValidationPass _ _ ->
            False

        ValidationFailed _ _ _ ->
            False

        ValidationPending _ _ ->
            True


getValidationFailures : ValidationResult -> List ValidationFailureMessage
getValidationFailures validationResult =
    case validationResult of
        ValidationPass _ _ ->
            []

        ValidationFailed _ _ validationFailures ->
            validationFailures

        ValidationPending _ _ ->
            []


type ValidationFailureMessage
    = ValidationFailureMessage ValidationReportLevel ValidationErrorMessage


transform : Transformer -> String -> String
transform transformer string =
    case transformer of
        ToLowercase ->
            String.toLower string


validate : Validator -> String -> Int -> ValidationResult
validate validator string selectedValueIndex =
    case validator of
        NoWhiteSpace level validationErrorMessage ->
            let
                stringWithNoWhiteSpace =
                    String.replace " " "" string
            in
            if String.length stringWithNoWhiteSpace == String.length string then
                ValidationPass string selectedValueIndex

            else
                ValidationFailed string selectedValueIndex [ ValidationFailureMessage level validationErrorMessage ]

        MinimumLength level validationErrorMessage int ->
            if String.length string >= int then
                ValidationPass string selectedValueIndex

            else
                ValidationFailed string selectedValueIndex [ ValidationFailureMessage level validationErrorMessage ]

        Custom ->
            ValidationPending string selectedValueIndex


transformAndValidateFirstPass : ValueTransformAndValidate -> String -> Int -> ValidationResult
transformAndValidateFirstPass (ValueTransformAndValidate transformers validators) string selectedValueIndex =
    let
        transformedString =
            List.Extra.mapAccuml
                (\str t -> ( transform t str, t ))
                string
                transformers
                |> Tuple.first
    in
    List.map (\validator -> validate validator transformedString selectedValueIndex) validators
        |> rollUpErrors transformedString


transformAndValidateSecondPass : ValueTransformAndValidate -> CustomValidationResult -> ValidationResult
transformAndValidateSecondPass (ValueTransformAndValidate transformers validators) customValidationResult =
    let
        valueString =
            getValueStringFromCustomValidationResult customValidationResult

        selectedValueIndex =
            getSelectedValueIndexFromCustomValidationResult customValidationResult

        transformedString =
            List.Extra.mapAccuml
                (\str t -> ( transform t str, t ))
                valueString
                transformers
                |> Tuple.first
    in
    List.map (\validator -> validate validator transformedString selectedValueIndex) validators
        |> List.map
            (\result ->
                case result of
                    ValidationPass _ _ ->
                        result

                    ValidationFailed _ _ _ ->
                        result

                    ValidationPending _ _ ->
                        case customValidationResult of
                            CustomValidationPass _ selectedValueIndex_ ->
                                ValidationPass valueString selectedValueIndex_

                            CustomValidationFailed valueString_ selectedValueIndex_ errorMessage ->
                                ValidationFailed valueString_ selectedValueIndex_ errorMessage
            )
        |> rollUpErrors transformedString


transformAndValidateSearchString : ValueTransformAndValidate -> SearchString -> ValidationResult
transformAndValidateSearchString (ValueTransformAndValidate transformers validators) searchString =
    let
        transformedString =
            List.Extra.mapAccuml
                (\str t -> ( transform t str, t ))
                (SearchString.toString searchString)
                transformers
                |> Tuple.first
    in
    List.map (\validator -> validate validator transformedString 0) validators
        |> rollUpErrors transformedString


getSelectedIndexFromValidationResults : List ValidationResult -> Int
getSelectedIndexFromValidationResults validationResults =
    case List.head validationResults of
        Just firstResult ->
            getSelectedIndexFromValidationResult firstResult

        Nothing ->
            0


rollUpErrors : String -> List ValidationResult -> ValidationResult
rollUpErrors transformedString results =
    if List.any hasValidationFailed results then
        ValidationFailed
            transformedString
            (getSelectedIndexFromValidationResults results)
            (List.concatMap getValidationFailures results)

    else if List.any hasValidationPending results then
        ValidationPending
            transformedString
            (getSelectedIndexFromValidationResults results)

    else
        ValidationPass
            transformedString
            (getSelectedIndexFromValidationResults results)


is : a -> a -> Bool
is a b =
    a == b


decode : String -> Result Json.Decode.Error ValueTransformAndValidate
decode jsonString =
    if String.length jsonString > 1 then
        Json.Decode.decodeString decoder jsonString

    else
        Ok empty


decoder : Json.Decode.Decoder ValueTransformAndValidate
decoder =
    Json.Decode.map2
        ValueTransformAndValidate
        (Json.Decode.field "transformers" (Json.Decode.list transformerDecoder))
        (Json.Decode.field "validators" (Json.Decode.list validatorDecoder))


transformerDecoder : Json.Decode.Decoder Transformer
transformerDecoder =
    Json.Decode.oneOf
        [ toLowercaseDecoder
        ]


toLowercaseDecoder : Json.Decode.Decoder Transformer
toLowercaseDecoder =
    Json.Decode.succeed ToLowercase
        |> Json.Decode.Extra.when (Json.Decode.field "name" Json.Decode.string) (is "lowercase")


validatorDecoder : Json.Decode.Decoder Validator
validatorDecoder =
    Json.Decode.oneOf
        [ noWhiteSpaceDecoder
        , minimumLengthDecoder
        , customValidatorDecoder
        ]


noWhiteSpaceDecoder : Json.Decode.Decoder Validator
noWhiteSpaceDecoder =
    Json.Decode.map2
        NoWhiteSpace
        (Json.Decode.field "level" validationReportLevelDecoder)
        (Json.Decode.field "message" validationErrorMessageDecoder)
        |> Json.Decode.Extra.when (Json.Decode.field "name" Json.Decode.string) (is "no-white-space")


minimumLengthDecoder : Json.Decode.Decoder Validator
minimumLengthDecoder =
    Json.Decode.map3
        MinimumLength
        (Json.Decode.field "level" validationReportLevelDecoder)
        (Json.Decode.field "message" validationErrorMessageDecoder)
        (Json.Decode.field "minimum-length" Json.Decode.int)
        |> Json.Decode.Extra.when (Json.Decode.field "name" Json.Decode.string) (is "minimum-length")


customValidatorDecoder : Json.Decode.Decoder Validator
customValidatorDecoder =
    Json.Decode.succeed Custom
        |> Json.Decode.Extra.when (Json.Decode.field "name" Json.Decode.string) (is "custom")


validationReportLevelDecoder : Json.Decode.Decoder ValidationReportLevel
validationReportLevelDecoder =
    Json.Decode.string
        |> Json.Decode.andThen
            (\str ->
                case str of
                    "error" ->
                        Json.Decode.succeed ShowError

                    "silent" ->
                        Json.Decode.succeed SilentError

                    _ ->
                        Json.Decode.fail ("Unknown validation reporting level: " ++ str)
            )


validationErrorMessageDecoder : Json.Decode.Decoder ValidationErrorMessage
validationErrorMessageDecoder =
    Json.Decode.map
        ValidationErrorMessage
        Json.Decode.string


customValidationResultDecoder : Json.Decode.Decoder CustomValidationResult
customValidationResultDecoder =
    Json.Decode.oneOf
        [ customValidationPassedResultDecoder
        , customValidationFailedResultDecoder
        ]


customValidationPassedResultDecoder : Json.Decode.Decoder CustomValidationResult
customValidationPassedResultDecoder =
    Json.Decode.map2 CustomValidationPass
        (Json.Decode.field "value" Json.Decode.string)
        (Json.Decode.field "selectedValueIndex" Json.Decode.int)
        |> Json.Decode.Extra.when (Json.Decode.field "isValid" Json.Decode.bool) (is True)


customValidationFailedResultDecoder : Json.Decode.Decoder CustomValidationResult
customValidationFailedResultDecoder =
    Json.Decode.map3 CustomValidationFailed
        (Json.Decode.field "value" Json.Decode.string)
        (Json.Decode.field "selectedValueIndex" Json.Decode.int)
        (Json.Decode.field "errorMessages" (Json.Decode.list validationFailedMessageDecoder))
        |> Json.Decode.Extra.when (Json.Decode.field "isValid" Json.Decode.bool) (is False)


validationFailedMessageDecoder : Json.Decode.Decoder ValidationFailureMessage
validationFailedMessageDecoder =
    Json.Decode.map2 ValidationFailureMessage
        (Json.Decode.field "level" validationReportLevelDecoder)
        (Json.Decode.field "errorMessage" validationErrorMessageDecoder)
