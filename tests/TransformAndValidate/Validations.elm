module TransformAndValidate.Validations exposing (suite)

import Expect
import Test exposing (Test, describe, test)
import TransformAndValidate
    exposing
        ( ValidationErrorMessage(..)
        , ValidationFailureMessage(..)
        , ValidationReportLevel(..)
        , ValidationResult(..)
        , Validator(..)
        , ValueTransformAndValidate(..)
        , transformAndValidateFirstPass
        )


suite : Test
suite =
    describe "Validate"
        [ describe "that a string has no white space in it"
            [ test "the string has no white space so it should pass" <|
                \_ ->
                    Expect.equal
                        (transformAndValidateFirstPass
                            (ValueTransformAndValidate []
                                [ NoWhiteSpace ShowError (ValidationErrorMessage "No white space allowed")
                                ]
                            )
                            "Wolf"
                            0
                        )
                        (ValidationPass "Wolf" 0)
            , test "the string has white space so it should not pass" <|
                \_ ->
                    Expect.equal
                        (transformAndValidateFirstPass
                            (ValueTransformAndValidate []
                                [ NoWhiteSpace ShowError (ValidationErrorMessage "No white space allowed")
                                ]
                            )
                            "I'm starting to worry about you Ed."
                            0
                        )
                        (ValidationFailed
                            "I'm starting to worry about you Ed."
                            0
                            [ ValidationFailureMessage ShowError
                                (ValidationErrorMessage "No white space allowed")
                            ]
                        )
            ]
        , describe "the string is longer than a minimum length"
            [ test "and it's long enough" <|
                \_ ->
                    Expect.equal
                        (transformAndValidateFirstPass
                            (ValueTransformAndValidate []
                                [ MinimumLength ShowError (ValidationErrorMessage "The value is too short") 3
                                ]
                            )
                            "Sheep"
                            0
                        )
                        (ValidationPass "Sheep" 0)
            , test "and it's not long enough" <|
                \_ ->
                    Expect.equal
                        (transformAndValidateFirstPass
                            (ValueTransformAndValidate []
                                [ MinimumLength ShowError (ValidationErrorMessage "The value is too short") 20
                                ]
                            )
                            "Sheep"
                            0
                        )
                        (ValidationFailed "Sheep"
                            0
                            [ ValidationFailureMessage ShowError (ValidationErrorMessage "The value is too short")
                            ]
                        )
            ]
        ]
