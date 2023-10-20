module PositiveInt exposing (PositiveInt, decode, encode, fromString, isZero, lessThan, lessThanOrEqualTo, maybeNew, new, test_new, toInt)

import Json.Decode
import Json.Encode


type PositiveInt
    = PositiveInt Int


new : Int -> PositiveInt
new int =
    PositiveInt (abs int)


fromString : String -> Maybe PositiveInt
fromString str =
    String.toInt str
        |> Maybe.andThen maybeNew


maybeNew : Int -> Maybe PositiveInt
maybeNew int =
    if int >= 0 then
        Just (PositiveInt int)

    else
        Nothing


toInt : PositiveInt -> Int
toInt positiveInt =
    case positiveInt of
        PositiveInt int ->
            int


lessThanOrEqualTo : PositiveInt -> Int -> Bool
lessThanOrEqualTo (PositiveInt a) b =
    a <= b


lessThan : PositiveInt -> PositiveInt -> Bool
lessThan (PositiveInt a) (PositiveInt b) =
    a < b


isZero : PositiveInt -> Bool
isZero (PositiveInt positiveInt) =
    positiveInt == 0


encode : PositiveInt -> Json.Encode.Value
encode (PositiveInt positiveInt) =
    Json.Encode.int positiveInt


decode : Json.Decode.Decoder PositiveInt
decode =
    Json.Decode.int
        |> Json.Decode.andThen
            (\int ->
                case maybeNew int of
                    Just positiveInt ->
                        Json.Decode.succeed positiveInt

                    Nothing ->
                        Json.Decode.fail ("This is not a positive int " ++ String.fromInt int)
            )


test_new : Int -> PositiveInt
test_new int =
    PositiveInt int
