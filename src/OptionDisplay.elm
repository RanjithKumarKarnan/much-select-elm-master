module OptionDisplay exposing
    ( OptionAge(..)
    , OptionDisplay(..)
    , activate
    , addHighlight
    , decoder
    , default
    , deselect
    , disabled
    , getErrors
    , getSelectedIndex
    , isHighlightable
    , isHighlighted
    , isHighlightedSelected
    , isInvalid
    , isPendingValidation
    , isSelected
    , removeHighlight
    , select
    , selected
    , selectedAndInvalid
    , selectedAndPendingValidation
    , setAge
    , setErrors
    , setSelectedIndex
    )

import Json.Decode
import SelectionMode exposing (SelectionMode)
import TransformAndValidate exposing (ValidationFailureMessage)


type OptionDisplay
    = OptionShown OptionAge
    | OptionHidden
    | OptionSelected Int OptionAge
    | OptionSelectedAndInvalid Int (List ValidationFailureMessage)
    | OptionSelectedPendingValidation Int
    | OptionSelectedHighlighted Int
    | OptionHighlighted
    | OptionActivated
    | OptionDisabled OptionAge


type OptionAge
    = NewOption
    | MatureOption


default : OptionDisplay
default =
    OptionShown MatureOption


selected : Int -> OptionDisplay
selected index =
    OptionSelected index MatureOption


selectedAndInvalid : Int -> List ValidationFailureMessage -> OptionDisplay
selectedAndInvalid index validationFailureMessages =
    OptionSelectedAndInvalid index validationFailureMessages


selectedAndPendingValidation : Int -> OptionDisplay
selectedAndPendingValidation index =
    OptionSelectedPendingValidation index


disabled : OptionDisplay
disabled =
    OptionDisabled MatureOption


isSelected : OptionDisplay -> Bool
isSelected optionDisplay =
    case optionDisplay of
        OptionShown _ ->
            False

        OptionHidden ->
            False

        OptionSelected _ _ ->
            True

        OptionSelectedPendingValidation _ ->
            True

        OptionSelectedAndInvalid _ _ ->
            True

        OptionSelectedHighlighted _ ->
            True

        OptionHighlighted ->
            False

        OptionDisabled _ ->
            False

        OptionActivated ->
            False


setSelectedIndex : Int -> OptionDisplay -> OptionDisplay
setSelectedIndex selectedIndex optionDisplay =
    case optionDisplay of
        OptionShown _ ->
            optionDisplay

        OptionHidden ->
            optionDisplay

        OptionSelected _ age ->
            OptionSelected selectedIndex age

        OptionSelectedPendingValidation _ ->
            OptionSelectedPendingValidation selectedIndex

        OptionSelectedAndInvalid _ errors ->
            OptionSelectedAndInvalid selectedIndex errors

        OptionSelectedHighlighted _ ->
            OptionSelectedHighlighted selectedIndex

        OptionHighlighted ->
            optionDisplay

        OptionDisabled _ ->
            optionDisplay

        OptionActivated ->
            optionDisplay


getSelectedIndex : OptionDisplay -> Int
getSelectedIndex optionDisplay =
    case optionDisplay of
        OptionShown _ ->
            -1

        OptionHidden ->
            -1

        OptionSelected int _ ->
            int

        OptionSelectedPendingValidation int ->
            int

        OptionSelectedAndInvalid int _ ->
            int

        OptionSelectedHighlighted int ->
            int

        OptionHighlighted ->
            -1

        OptionDisabled _ ->
            -1

        OptionActivated ->
            -1


select : Int -> OptionDisplay -> OptionDisplay
select selectedIndex optionDisplay =
    case optionDisplay of
        OptionShown age ->
            OptionSelected selectedIndex age

        OptionHidden ->
            OptionSelected selectedIndex MatureOption

        OptionSelected _ age ->
            OptionSelected selectedIndex age

        OptionSelectedPendingValidation _ ->
            optionDisplay

        OptionSelectedAndInvalid _ _ ->
            optionDisplay

        OptionSelectedHighlighted _ ->
            OptionSelectedHighlighted selectedIndex

        OptionHighlighted ->
            OptionSelected selectedIndex MatureOption

        OptionDisabled _ ->
            optionDisplay

        OptionActivated ->
            OptionSelected selectedIndex MatureOption


deselect : OptionDisplay -> OptionDisplay
deselect optionDisplay =
    case optionDisplay of
        OptionShown _ ->
            optionDisplay

        OptionHidden ->
            optionDisplay

        OptionSelected _ age ->
            OptionShown age

        OptionSelectedPendingValidation _ ->
            OptionShown MatureOption

        OptionSelectedAndInvalid _ _ ->
            OptionShown MatureOption

        OptionSelectedHighlighted _ ->
            OptionShown MatureOption

        OptionHighlighted ->
            optionDisplay

        OptionDisabled _ ->
            optionDisplay

        OptionActivated ->
            OptionShown MatureOption


addHighlight : OptionDisplay -> OptionDisplay
addHighlight optionDisplay =
    case optionDisplay of
        OptionShown _ ->
            OptionHighlighted

        OptionHidden ->
            optionDisplay

        OptionSelected selectedIndex _ ->
            OptionSelectedHighlighted selectedIndex

        OptionSelectedPendingValidation _ ->
            optionDisplay

        OptionSelectedAndInvalid _ _ ->
            optionDisplay

        OptionSelectedHighlighted _ ->
            optionDisplay

        OptionHighlighted ->
            optionDisplay

        OptionDisabled _ ->
            optionDisplay

        OptionActivated ->
            OptionHighlighted


removeHighlight : OptionDisplay -> OptionDisplay
removeHighlight optionDisplay =
    case optionDisplay of
        OptionShown _ ->
            optionDisplay

        OptionHidden ->
            optionDisplay

        OptionSelected _ _ ->
            optionDisplay

        OptionSelectedPendingValidation _ ->
            optionDisplay

        OptionSelectedAndInvalid _ _ ->
            optionDisplay

        OptionSelectedHighlighted selectedIndex ->
            OptionSelected selectedIndex MatureOption

        OptionHighlighted ->
            OptionShown MatureOption

        OptionDisabled _ ->
            optionDisplay

        OptionActivated ->
            optionDisplay


isHighlighted : OptionDisplay -> Bool
isHighlighted optionDisplay =
    case optionDisplay of
        OptionShown _ ->
            False

        OptionHidden ->
            False

        OptionSelected _ _ ->
            False

        OptionSelectedAndInvalid _ _ ->
            False

        OptionSelectedPendingValidation _ ->
            False

        OptionSelectedHighlighted _ ->
            True

        OptionHighlighted ->
            True

        OptionDisabled _ ->
            False

        OptionActivated ->
            False


isHighlightable : SelectionMode -> OptionDisplay -> Bool
isHighlightable selectionMode optionDisplay =
    case optionDisplay of
        OptionShown _ ->
            True

        OptionHidden ->
            False

        OptionSelected _ _ ->
            case selectionMode of
                SelectionMode.SingleSelect ->
                    True

                SelectionMode.MultiSelect ->
                    False

        OptionSelectedPendingValidation _ ->
            False

        OptionSelectedAndInvalid _ _ ->
            False

        OptionSelectedHighlighted _ ->
            False

        OptionHighlighted ->
            False

        OptionDisabled _ ->
            False

        OptionActivated ->
            True


isHighlightedSelected : OptionDisplay -> Bool
isHighlightedSelected optionDisplay =
    case optionDisplay of
        OptionShown _ ->
            False

        OptionHidden ->
            False

        OptionSelected _ _ ->
            False

        OptionSelectedAndInvalid _ _ ->
            False

        OptionSelectedPendingValidation _ ->
            False

        OptionSelectedHighlighted _ ->
            True

        OptionHighlighted ->
            False

        OptionDisabled _ ->
            False

        OptionActivated ->
            False


setErrors : List ValidationFailureMessage -> OptionDisplay -> OptionDisplay
setErrors validationErrorMessages optionDisplay =
    case optionDisplay of
        OptionShown _ ->
            optionDisplay

        OptionHidden ->
            optionDisplay

        OptionSelected selectedIndex _ ->
            if List.length validationErrorMessages > 0 then
                OptionSelectedAndInvalid selectedIndex validationErrorMessages

            else
                optionDisplay

        OptionSelectedPendingValidation selectedIndex ->
            if List.length validationErrorMessages > 0 then
                OptionSelectedAndInvalid selectedIndex validationErrorMessages

            else
                optionDisplay

        OptionSelectedAndInvalid selectedIndex _ ->
            OptionSelectedAndInvalid selectedIndex validationErrorMessages

        OptionSelectedHighlighted _ ->
            optionDisplay

        OptionHighlighted ->
            optionDisplay

        OptionDisabled _ ->
            optionDisplay

        OptionActivated ->
            optionDisplay


getErrors : OptionDisplay -> List ValidationFailureMessage
getErrors optionDisplay =
    case optionDisplay of
        OptionShown _ ->
            []

        OptionHidden ->
            []

        OptionSelected _ _ ->
            []

        OptionSelectedPendingValidation _ ->
            []

        OptionSelectedAndInvalid _ validationFailures ->
            validationFailures

        OptionSelectedHighlighted _ ->
            []

        OptionHighlighted ->
            []

        OptionDisabled _ ->
            []

        OptionActivated ->
            []


isInvalid : OptionDisplay -> Bool
isInvalid optionDisplay =
    case optionDisplay of
        OptionShown _ ->
            False

        OptionHidden ->
            False

        OptionSelected _ _ ->
            False

        OptionSelectedPendingValidation _ ->
            False

        OptionSelectedAndInvalid _ _ ->
            True

        OptionSelectedHighlighted _ ->
            False

        OptionHighlighted ->
            False

        OptionDisabled _ ->
            False

        OptionActivated ->
            False


isPendingValidation : OptionDisplay -> Bool
isPendingValidation optionDisplay =
    case optionDisplay of
        OptionShown _ ->
            False

        OptionHidden ->
            False

        OptionSelected _ _ ->
            False

        OptionSelectedPendingValidation _ ->
            True

        OptionSelectedAndInvalid _ _ ->
            False

        OptionSelectedHighlighted _ ->
            False

        OptionHighlighted ->
            False

        OptionDisabled _ ->
            False

        OptionActivated ->
            False


setAge : OptionAge -> OptionDisplay -> OptionDisplay
setAge optionAge optionDisplay =
    case optionDisplay of
        OptionShown _ ->
            OptionShown optionAge

        OptionHidden ->
            optionDisplay

        OptionSelected int _ ->
            OptionSelected int optionAge

        OptionSelectedAndInvalid _ _ ->
            optionDisplay

        OptionSelectedPendingValidation _ ->
            optionDisplay

        OptionSelectedHighlighted _ ->
            optionDisplay

        OptionHighlighted ->
            optionDisplay

        OptionDisabled _ ->
            OptionDisabled optionAge

        OptionActivated ->
            OptionActivated


activate : OptionDisplay -> OptionDisplay
activate optionDisplay =
    case optionDisplay of
        OptionShown _ ->
            optionDisplay

        OptionHidden ->
            optionDisplay

        OptionSelected _ _ ->
            optionDisplay

        OptionSelectedAndInvalid _ _ ->
            optionDisplay

        OptionSelectedPendingValidation _ ->
            optionDisplay

        OptionSelectedHighlighted _ ->
            optionDisplay

        OptionHighlighted ->
            OptionActivated

        OptionActivated ->
            optionDisplay

        OptionDisabled _ ->
            optionDisplay


decoder : OptionAge -> Json.Decode.Decoder OptionDisplay
decoder age =
    Json.Decode.oneOf
        [ Json.Decode.field
            "selected"
            Json.Decode.string
            |> Json.Decode.andThen
                (\str ->
                    case str of
                        "true" ->
                            Json.Decode.succeed (OptionSelected 0 age)

                        _ ->
                            Json.Decode.fail "Option is not selected"
                )
        , Json.Decode.field
            "selected"
            Json.Decode.bool
            |> Json.Decode.andThen
                (\isSelected_ ->
                    if isSelected_ then
                        Json.Decode.succeed (OptionSelected 0 age)

                    else
                        Json.Decode.succeed (OptionShown age)
                )
        , Json.Decode.field
            "disabled"
            Json.Decode.bool
            |> Json.Decode.andThen
                (\isDisabled ->
                    if isDisabled then
                        Json.Decode.succeed (OptionDisabled age)

                    else
                        Json.Decode.fail "Option is not disabled"
                )
        , Json.Decode.succeed (OptionShown age)
        ]
