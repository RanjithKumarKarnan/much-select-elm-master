module TransformAndValidate.Transfroms exposing (suite)

import Expect
import Test exposing (Test, describe, test)
import TransformAndValidate exposing (Transformer(..), ValidationResult(..), ValueTransformAndValidate(..), transformAndValidateFirstPass)


suite : Test
suite =
    describe "Transforming"
        [ test "a string to all lower case" <|
            \_ ->
                Expect.equal
                    (transformAndValidateFirstPass (ValueTransformAndValidate [ ToLowercase ] []) "HELLO" 0)
                    (ValidationPass "hello" 0)
        , test "a string to all lower case if it's already lower case should leave it the same" <|
            \_ ->
                Expect.equal
                    (transformAndValidateFirstPass (ValueTransformAndValidate [ ToLowercase ] []) "bugs" 0)
                    (ValidationPass "bugs" 0)
        ]
