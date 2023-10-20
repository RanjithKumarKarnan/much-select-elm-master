module FancyOption exposing (FancyOption, activate, decoder, decoderWithAge, deselect, encode, getMaybeOptionSearchFilter, getOptionDescription, getOptionDisplay, getOptionGroup, getOptionLabel, getOptionSelectedIndex, getOptionValue, getOptionValueAsString, highlightOption, isCustomOption, isEmptyOption, isOptionHighlighted, isOptionSelectedHighlighted, isSelected, merge, new, newCustomOption, newDisabledOption, newSelectedOption, optionIsHighlightable, removeHighlightFromOption, select, setDescription, setLabel, setOptionDisplay, setOptionGroup, setOptionLabelToValue, setOptionSearchFilter, setOptionSelectedIndex, setOptionValue, setPart, test_optionToDebuggingString, toDropdownHtml, toMultiSelectValueHtml, toSingleSelectValueHtml, toSingleSelectValueNoValueSelected)

import DropdownItemEventListeners exposing (DropdownItemEventListeners)
import Events exposing (mouseDownPreventDefault, mouseUpPreventDefault, onClickPreventDefault, onClickPreventDefaultAndStopPropagation)
import Html exposing (Html, div, span, text)
import Html.Attributes exposing (class, classList, id)
import Html.Events exposing (onMouseEnter, onMouseLeave)
import Html.Extra
import Json.Decode
import Json.Encode
import OptionDescription exposing (OptionDescription(..))
import OptionDisplay exposing (OptionDisplay(..))
import OptionGroup exposing (OptionGroup(..))
import OptionLabel exposing (OptionLabel, optionLabelToString)
import OptionPart exposing (OptionPart)
import OptionPresentor exposing (tokensToHtml)
import OptionSearchFilter exposing (OptionSearchFilter)
import OptionValue exposing (OptionValue(..))
import OutputStyle exposing (SingleItemRemoval(..))
import SelectionMode exposing (OutputStyle, SelectionConfig, SelectionMode)


type FancyOption
    = FancyOption OptionDisplay OptionLabel OptionValue OptionDescription OptionGroup OptionPart (Maybe OptionSearchFilter)
    | CustomFancyOption OptionDisplay OptionLabel OptionValue (Maybe OptionSearchFilter)
    | EmptyFancyOption OptionDisplay OptionLabel


new : String -> Maybe String -> FancyOption
new value maybeCleanLabel =
    case value of
        "" ->
            EmptyFancyOption OptionDisplay.default (OptionLabel.newWithCleanLabel "" maybeCleanLabel)

        _ ->
            FancyOption
                OptionDisplay.default
                (OptionLabel.newWithCleanLabel value maybeCleanLabel)
                (OptionValue value)
                OptionDescription.noDescription
                NoOptionGroup
                (OptionPart.fromStringOrEmpty value)
                Nothing


newCustomOption : String -> String -> Maybe String -> FancyOption
newCustomOption valueString labelString maybeCleanLabel =
    CustomFancyOption
        OptionDisplay.default
        (OptionLabel.newWithCleanLabel labelString maybeCleanLabel)
        (OptionValue.stringToOptionValue valueString)
        Nothing


newSelectedOption : Int -> String -> Maybe String -> FancyOption
newSelectedOption index valueString maybeString =
    FancyOption
        (OptionDisplay.select index OptionDisplay.default)
        (OptionLabel.newWithCleanLabel valueString maybeString)
        (OptionValue.stringToOptionValue valueString)
        OptionDescription.noDescription
        NoOptionGroup
        (OptionPart.fromStringOrEmpty valueString)
        Nothing


newDisabledOption : String -> Maybe String -> FancyOption
newDisabledOption valueString maybeString =
    FancyOption OptionDisplay.disabled
        (OptionLabel.newWithCleanLabel valueString maybeString)
        (OptionValue valueString)
        OptionDescription.noDescription
        NoOptionGroup
        (OptionPart.fromStringOrEmpty valueString)
        Nothing


getOptionDisplay : FancyOption -> OptionDisplay
getOptionDisplay option =
    case option of
        FancyOption display _ _ _ _ _ _ ->
            display

        CustomFancyOption optionDisplay _ _ _ ->
            optionDisplay

        EmptyFancyOption optionDisplay _ ->
            optionDisplay


setOptionDisplay : OptionDisplay -> FancyOption -> FancyOption
setOptionDisplay optionDisplay option =
    case option of
        FancyOption _ optionLabel optionValue optionDescription optionGroup optionPart search ->
            FancyOption
                optionDisplay
                optionLabel
                optionValue
                optionDescription
                optionGroup
                optionPart
                search

        CustomFancyOption _ optionLabel optionValue maybeOptionSearchFilter ->
            CustomFancyOption optionDisplay optionLabel optionValue maybeOptionSearchFilter

        EmptyFancyOption _ optionLabel ->
            EmptyFancyOption optionDisplay optionLabel


isSelected : FancyOption -> Bool
isSelected fancyOption =
    fancyOption |> getOptionDisplay |> OptionDisplay.isSelected


getOptionSelectedIndex : FancyOption -> Int
getOptionSelectedIndex option =
    option |> getOptionDisplay |> OptionDisplay.getSelectedIndex


setOptionSelectedIndex : Int -> FancyOption -> FancyOption
setOptionSelectedIndex selectedIndex option =
    setOptionDisplay (option |> getOptionDisplay |> OptionDisplay.setSelectedIndex selectedIndex) option


getOptionLabel : FancyOption -> OptionLabel
getOptionLabel fancyOption =
    case fancyOption of
        FancyOption _ optionLabel _ _ _ _ _ ->
            optionLabel

        CustomFancyOption _ optionLabel _ _ ->
            optionLabel

        EmptyFancyOption _ optionLabel ->
            optionLabel


setLabel : OptionLabel -> FancyOption -> FancyOption
setLabel label option =
    case option of
        FancyOption optionDisplay _ optionValue description group part search ->
            FancyOption
                optionDisplay
                label
                optionValue
                description
                group
                part
                search

        CustomFancyOption optionDisplay _ optionValue maybeOptionSearchFilter ->
            CustomFancyOption optionDisplay label optionValue maybeOptionSearchFilter

        EmptyFancyOption optionDisplay _ ->
            EmptyFancyOption optionDisplay label


getOptionValue : FancyOption -> OptionValue
getOptionValue option =
    case option of
        FancyOption _ _ optionValue _ _ _ _ ->
            optionValue

        CustomFancyOption _ _ optionValue _ ->
            optionValue

        EmptyFancyOption _ _ ->
            EmptyOptionValue


getOptionValueAsString : FancyOption -> String
getOptionValueAsString option =
    case option |> getOptionValue of
        OptionValue string ->
            string

        EmptyOptionValue ->
            ""


setOptionValue : OptionValue -> FancyOption -> FancyOption
setOptionValue optionValue option =
    case option of
        FancyOption display label _ description group part maybeSearchFilter ->
            FancyOption display label optionValue description group part maybeSearchFilter

        CustomFancyOption display label _ maybeSearchFilter ->
            CustomFancyOption display label optionValue maybeSearchFilter

        EmptyFancyOption _ _ ->
            option


getOptionDescription : FancyOption -> OptionDescription
getOptionDescription option =
    --TODO Rename this to getDescription
    case option of
        FancyOption _ _ _ description _ _ _ ->
            description

        CustomFancyOption _ _ _ _ ->
            OptionDescription.noDescription

        EmptyFancyOption _ _ ->
            OptionDescription.noDescription


hasDescription : FancyOption -> Bool
hasDescription option =
    option |> getOptionDescription |> OptionDescription.toBool


setDescription : OptionDescription -> FancyOption -> FancyOption
setDescription description option =
    case option of
        FancyOption optionDisplay label optionValue _ group part search ->
            FancyOption optionDisplay
                label
                optionValue
                description
                group
                part
                search

        CustomFancyOption _ _ _ _ ->
            option

        EmptyFancyOption _ _ ->
            option


getOptionGroup : FancyOption -> OptionGroup
getOptionGroup fancyOption =
    case fancyOption of
        FancyOption _ _ _ _ group _ _ ->
            group

        CustomFancyOption _ _ _ _ ->
            NoOptionGroup

        EmptyFancyOption _ _ ->
            NoOptionGroup


setOptionGroup : OptionGroup -> FancyOption -> FancyOption
setOptionGroup optionGroup option =
    case option of
        FancyOption optionDisplay label optionValue description _ part search ->
            FancyOption optionDisplay
                label
                optionValue
                description
                optionGroup
                part
                search

        CustomFancyOption _ _ _ _ ->
            option

        EmptyFancyOption _ _ ->
            option


getOptionPart : FancyOption -> OptionPart
getOptionPart fancyOption =
    case fancyOption of
        FancyOption _ _ _ _ _ part _ ->
            part

        CustomFancyOption _ _ _ _ ->
            OptionPart.empty

        EmptyFancyOption _ _ ->
            OptionPart.empty


setPart : OptionPart -> FancyOption -> FancyOption
setPart part fancyOption =
    case fancyOption of
        FancyOption display label value description group _ maybeSearchFilter ->
            FancyOption display label value description group part maybeSearchFilter

        CustomFancyOption _ _ _ _ ->
            fancyOption

        EmptyFancyOption _ _ ->
            fancyOption


getMaybeOptionSearchFilter : FancyOption -> Maybe OptionSearchFilter
getMaybeOptionSearchFilter option =
    case option of
        FancyOption _ _ _ _ _ _ maybeSearchFilter ->
            maybeSearchFilter

        CustomFancyOption _ _ _ _ ->
            Nothing

        EmptyFancyOption _ _ ->
            Nothing


setOptionSearchFilter : Maybe OptionSearchFilter -> FancyOption -> FancyOption
setOptionSearchFilter searchFilter option =
    case option of
        FancyOption display label value description group part _ ->
            FancyOption display label value description group part searchFilter

        CustomFancyOption display label value _ ->
            CustomFancyOption display label value searchFilter

        EmptyFancyOption _ _ ->
            option


merge : FancyOption -> FancyOption -> FancyOption
merge optionA optionB =
    let
        optionLabel =
            orOptionLabel optionA optionB

        optionDescription =
            orOptionDescriptions optionA optionB

        optionGroup =
            orOptionGroup optionA optionB

        selectedIndex =
            orSelectedIndex optionA optionB
    in
    optionA
        |> setDescription optionDescription
        |> setLabel optionLabel
        |> setOptionGroup optionGroup
        |> setOptionSelectedIndex selectedIndex


{-| A utility helper, the idea is that an option's label is going to match it's value by default.

If a label does not match the value then it's probably a label that's been set and it something we should
preserver (all else being equal).

TODO: Perhaps this could be addresses with types. Maybe there should be an option label variation that specifies it's a default label.

-}
orOptionLabel : FancyOption -> FancyOption -> OptionLabel
orOptionLabel optionA optionB =
    if isOptionValueEqualToOptionLabel optionA then
        if isOptionValueEqualToOptionLabel optionB then
            getOptionLabel optionA

        else
            getOptionLabel optionB

    else
        getOptionLabel optionA


isOptionValueEqualToOptionLabel : FancyOption -> Bool
isOptionValueEqualToOptionLabel option =
    let
        optionValueString =
            option
                |> getOptionValueAsString

        optionLabelString =
            option
                |> getOptionLabel
                |> optionLabelToString
    in
    optionValueString == optionLabelString


orOptionDescriptions : FancyOption -> FancyOption -> OptionDescription
orOptionDescriptions optionA optionB =
    OptionDescription.orOptionDescriptions
        (getOptionDescription optionA)
        (getOptionDescription optionB)


orOptionGroup : FancyOption -> FancyOption -> OptionGroup
orOptionGroup optionA optionB =
    case getOptionGroup optionA of
        OptionGroup _ ->
            getOptionGroup optionA

        NoOptionGroup ->
            case getOptionGroup optionB of
                OptionGroup _ ->
                    getOptionGroup optionB

                NoOptionGroup ->
                    getOptionGroup optionA


orSelectedIndex : FancyOption -> FancyOption -> Int
orSelectedIndex optionA optionB =
    if getOptionSelectedIndex optionA == getOptionSelectedIndex optionB then
        getOptionSelectedIndex optionA

    else if getOptionSelectedIndex optionA > getOptionSelectedIndex optionB then
        getOptionSelectedIndex optionA

    else
        getOptionSelectedIndex optionB


highlightOption : FancyOption -> FancyOption
highlightOption option =
    setOptionDisplay (OptionDisplay.addHighlight (getOptionDisplay option)) option


removeHighlightFromOption : FancyOption -> FancyOption
removeHighlightFromOption option =
    setOptionDisplay (OptionDisplay.removeHighlight (getOptionDisplay option)) option


isOptionHighlighted : FancyOption -> Bool
isOptionHighlighted option =
    OptionDisplay.isHighlighted (getOptionDisplay option)


optionIsHighlightable : SelectionMode -> FancyOption -> Bool
optionIsHighlightable selectionMode option =
    OptionDisplay.isHighlightable selectionMode (getOptionDisplay option)


{-| Custom options are special. We need to reset their label to their value when we select them.
-}
select : Int -> FancyOption -> FancyOption
select selectionIndex option =
    case option of
        FancyOption _ _ _ _ _ _ _ ->
            setOptionDisplay (OptionDisplay.select selectionIndex (getOptionDisplay option)) option

        CustomFancyOption _ _ _ _ ->
            option
                |> setOptionDisplay (OptionDisplay.select selectionIndex (getOptionDisplay option))
                |> setOptionLabelToValue

        EmptyFancyOption _ _ ->
            setOptionDisplay (OptionDisplay.select selectionIndex (getOptionDisplay option)) option


deselect : FancyOption -> FancyOption
deselect option =
    setOptionDisplay (OptionDisplay.deselect (getOptionDisplay option)) option


isOptionSelectedHighlighted : FancyOption -> Bool
isOptionSelectedHighlighted option =
    OptionDisplay.isHighlightedSelected (getOptionDisplay option)


activate : FancyOption -> FancyOption
activate option =
    setOptionDisplay (getOptionDisplay option |> OptionDisplay.activate) option


isEmptyOption : FancyOption -> Bool
isEmptyOption option =
    case option of
        FancyOption _ _ _ _ _ _ _ ->
            False

        CustomFancyOption _ _ _ _ ->
            False

        EmptyFancyOption _ _ ->
            True


isCustomOption : FancyOption -> Bool
isCustomOption option =
    case option of
        FancyOption _ _ _ _ _ _ _ ->
            False

        CustomFancyOption _ _ _ _ ->
            True

        EmptyFancyOption _ _ ->
            False


setOptionLabelToValue : FancyOption -> FancyOption
setOptionLabelToValue fancyOption =
    case fancyOption of
        CustomFancyOption optionDisplay _ optionValue maybeOptionSearchFilter ->
            CustomFancyOption optionDisplay (OptionValue.toOptionLabel optionValue) optionValue maybeOptionSearchFilter

        _ ->
            fancyOption



-- JSON (Decoders and Encoders)


decoder : Json.Decode.Decoder FancyOption
decoder =
    decoderWithAge OptionDisplay.MatureOption


decoderWithAge : OptionDisplay.OptionAge -> Json.Decode.Decoder FancyOption
decoderWithAge optionAge =
    Json.Decode.oneOf
        [ decodeEmptyOptionValue optionAge
        , decoderOptionWithAValueAndPart optionAge
        , decoderOptionWithAValue optionAge
        ]


decodeEmptyOptionValue : OptionDisplay.OptionAge -> Json.Decode.Decoder FancyOption
decodeEmptyOptionValue age =
    Json.Decode.field
        "value"
        OptionValue.decoder
        |> Json.Decode.andThen
            (\value ->
                case value of
                    OptionValue _ ->
                        Json.Decode.fail "It can not be an option without a value because it has a value."

                    EmptyOptionValue ->
                        Json.Decode.map2
                            EmptyFancyOption
                            (OptionDisplay.decoder age)
                            OptionLabel.labelDecoder
            )


decoderOptionWithAValue : OptionDisplay.OptionAge -> Json.Decode.Decoder FancyOption
decoderOptionWithAValue age =
    Json.Decode.map7 FancyOption
        (OptionDisplay.decoder age)
        OptionLabel.labelDecoder
        (Json.Decode.field
            "value"
            OptionValue.decoder
        )
        OptionDescription.decoder
        OptionGroup.decoder
        (Json.Decode.field "value" OptionPart.valueDecoder)
        (Json.Decode.succeed Nothing)


decoderOptionWithAValueAndPart : OptionDisplay.OptionAge -> Json.Decode.Decoder FancyOption
decoderOptionWithAValueAndPart age =
    Json.Decode.map7 FancyOption
        (OptionDisplay.decoder age)
        OptionLabel.labelDecoder
        (Json.Decode.field
            "value"
            OptionValue.decoder
        )
        OptionDescription.decoder
        OptionGroup.decoder
        (Json.Decode.field "part" OptionPart.decoder)
        (Json.Decode.succeed Nothing)


encode : FancyOption -> Json.Decode.Value
encode option =
    Json.Encode.object
        [ ( "value", Json.Encode.string (getOptionValueAsString option) )
        , ( "label", Json.Encode.string (getOptionLabel option |> optionLabelToString) )
        , ( "labelClean", Json.Encode.string (getOptionLabel option |> OptionLabel.optionLabelToSearchString) )
        , ( "group", Json.Encode.string (getOptionGroup option |> OptionGroup.toString) )
        , ( "description", Json.Encode.string (getOptionDescription option |> OptionDescription.toString) )
        , ( "descriptionClean", Json.Encode.string (getOptionDescription option |> OptionDescription.toSearchString) )
        , ( "isSelected", Json.Encode.bool (isSelected option) )
        ]



-- HTML (View Helpers)


toSingleSelectValueHtml : FancyOption -> Html msg
toSingleSelectValueHtml option =
    span
        [ id "selected-value"
        , OptionPart.toSelectedValueAttribute (getOptionPart option)
        ]
        [ text (option |> getOptionLabel |> optionLabelToString) ]


toSingleSelectValueNoValueSelected : Html msg
toSingleSelectValueNoValueSelected =
    span
        [ id "selected-value"
        , Html.Attributes.attribute "part" "selected-value"
        ]
        [ text "" ]


toMultiSelectValueHtml : (OptionValue -> msg) -> (OptionValue -> msg) -> SingleItemRemoval -> FancyOption -> Html msg
toMultiSelectValueHtml toggleSelectedMsg deselectOptionInternal enableSingleItemRemoval fancyOption =
    let
        removalHtml optionValue =
            case enableSingleItemRemoval of
                EnableSingleItemRemoval ->
                    span [ mouseUpPreventDefault <| deselectOptionInternal optionValue, class "remove-option" ] [ text "" ]

                DisableSingleItemRemoval ->
                    text ""
    in
    case fancyOption of
        FancyOption optionDisplay optionLabel optionValue _ _ _ _ ->
            case optionDisplay of
                OptionShown _ ->
                    Html.Extra.nothing

                OptionHidden ->
                    Html.Extra.nothing

                OptionSelected _ _ ->
                    div
                        [ class "value"
                        , OptionPart.toSelectedValueAttribute (getOptionPart fancyOption)
                        ]
                        [ valueLabelHtml
                            toggleSelectedMsg
                            (OptionLabel.getLabelString optionLabel)
                            optionValue
                        , removalHtml optionValue
                        ]

                OptionSelectedAndInvalid _ _ ->
                    Html.Extra.nothing

                OptionSelectedPendingValidation _ ->
                    Html.Extra.nothing

                OptionSelectedHighlighted _ ->
                    div
                        [ classList
                            [ ( "value", True )
                            , ( "highlighted-value", True )
                            ]
                        , OptionPart.toSelectedHighlightedValueAttribute (getOptionPart fancyOption)
                        ]
                        [ valueLabelHtml toggleSelectedMsg (OptionLabel.getLabelString optionLabel) optionValue, removalHtml optionValue ]

                OptionHighlighted ->
                    Html.Extra.nothing

                OptionActivated ->
                    Html.Extra.nothing

                OptionDisabled _ ->
                    Html.Extra.nothing

        CustomFancyOption optionDisplay optionLabel optionValue _ ->
            case optionDisplay of
                OptionShown _ ->
                    Html.Extra.nothing

                OptionHidden ->
                    Html.Extra.nothing

                OptionSelected _ _ ->
                    div
                        [ class "value"
                        , OptionPart.toSelectedValueAttribute (getOptionPart fancyOption)
                        ]
                        [ valueLabelHtml toggleSelectedMsg (OptionLabel.getLabelString optionLabel) optionValue, removalHtml optionValue ]

                OptionSelectedAndInvalid _ _ ->
                    Html.Extra.nothing

                OptionSelectedPendingValidation _ ->
                    Html.Extra.nothing

                OptionSelectedHighlighted _ ->
                    div
                        [ classList
                            [ ( "value", True )
                            , ( "highlighted-value", True )
                            ]
                        , OptionPart.toSelectedHighlightedValueAttribute (getOptionPart fancyOption)
                        ]
                        [ valueLabelHtml toggleSelectedMsg (OptionLabel.getLabelString optionLabel) optionValue, removalHtml optionValue ]

                OptionHighlighted ->
                    Html.Extra.nothing

                OptionActivated ->
                    Html.Extra.nothing

                OptionDisabled _ ->
                    Html.Extra.nothing

        EmptyFancyOption optionDisplay optionLabel ->
            case optionDisplay of
                OptionShown _ ->
                    Html.Extra.nothing

                OptionHidden ->
                    Html.Extra.nothing

                OptionSelected _ _ ->
                    div
                        [ class "value"
                        , OptionPart.toSelectedValueAttribute (getOptionPart fancyOption)
                        ]
                        [ text (OptionLabel.getLabelString optionLabel) ]

                OptionSelectedAndInvalid _ _ ->
                    Html.Extra.nothing

                OptionSelectedPendingValidation _ ->
                    Html.Extra.nothing

                OptionSelectedHighlighted _ ->
                    Html.Extra.nothing

                OptionHighlighted ->
                    Html.Extra.nothing

                OptionActivated ->
                    Html.Extra.nothing

                OptionDisabled _ ->
                    Html.Extra.nothing


valueLabelHtml : (OptionValue -> msg) -> String -> OptionValue -> Html msg
valueLabelHtml toggleSelectedMsg labelText optionValue =
    span
        [ class "value-label"
        , mouseUpPreventDefault
            (toggleSelectedMsg optionValue)
        ]
        [ text labelText ]


descriptionHtml : FancyOption -> Html msg
descriptionHtml fancyOption =
    if fancyOption |> hasDescription then
        case getMaybeOptionSearchFilter fancyOption of
            Just optionSearchFilter ->
                div
                    [ class "description"
                    , Html.Attributes.attribute "part" "dropdown-option-description"
                    ]
                    [ span [] (tokensToHtml optionSearchFilter.descriptionTokens)
                    ]

            Nothing ->
                div
                    [ class "description"
                    , Html.Attributes.attribute "part" "dropdown-option-description"
                    ]
                    [ span []
                        [ fancyOption
                            |> getOptionDescription
                            |> OptionDescription.toString
                            |> text
                        ]
                    ]

    else
        text ""


labelHtml : FancyOption -> Html msg
labelHtml option =
    case getMaybeOptionSearchFilter option of
        Just optionSearchFilter ->
            span [] (tokensToHtml optionSearchFilter.labelTokens)

        Nothing ->
            span [] [ getOptionLabel option |> optionLabelToString |> text ]


valueDataAttribute : FancyOption -> Html.Attribute msg
valueDataAttribute option =
    Html.Attributes.attribute "data-value" (getOptionValueAsString option)


toDropdownHtml : DropdownItemEventListeners msg -> SelectionMode -> FancyOption -> Html msg
toDropdownHtml eventHandlers selectionMode option =
    case getOptionDisplay option of
        OptionShown _ ->
            div
                [ onMouseEnter (option |> getOptionValue |> eventHandlers.mouseOverMsgConstructor)
                , onMouseLeave (option |> getOptionValue |> eventHandlers.mouseOutMsgConstructor)
                , mouseDownPreventDefault (option |> getOptionValue |> eventHandlers.mouseDownMsgConstructor)
                , mouseUpPreventDefault (option |> getOptionValue |> eventHandlers.mouseUpMsgConstructor)
                , onClickPreventDefault eventHandlers.noOpMsgConstructor
                , OptionPart.toDropdownAttribute (getOptionPart option)
                , class "option"
                , valueDataAttribute option
                ]
                [ labelHtml option, descriptionHtml option ]

        OptionHidden ->
            Html.Extra.nothing

        OptionSelected _ _ ->
            case selectionMode of
                SelectionMode.SingleSelect ->
                    toDropdownOptionSelectedHtml eventHandlers option

                SelectionMode.MultiSelect ->
                    Html.Extra.nothing

        OptionSelectedPendingValidation _ ->
            div
                [ Html.Attributes.attribute "part" "dropdown-option disabled pending-validation"
                , class "option disabled pending-validation"
                , OptionPart.toDropdownAttribute (getOptionPart option)
                , valueDataAttribute option
                ]
                [ labelHtml option, descriptionHtml option ]

        OptionSelectedAndInvalid _ _ ->
            Html.Extra.nothing

        OptionSelectedHighlighted _ ->
            case selectionMode of
                SelectionMode.SingleSelect ->
                    toDropdownOptionSelectedHighlightedHtml eventHandlers option

                SelectionMode.MultiSelect ->
                    Html.Extra.nothing

        OptionHighlighted ->
            div
                [ onMouseEnter (option |> getOptionValue |> eventHandlers.mouseOverMsgConstructor)
                , onMouseLeave (option |> getOptionValue |> eventHandlers.mouseOutMsgConstructor)
                , mouseDownPreventDefault (option |> getOptionValue |> eventHandlers.mouseDownMsgConstructor)
                , mouseUpPreventDefault (option |> getOptionValue |> eventHandlers.mouseUpMsgConstructor)
                , class "option highlighted"
                , OptionPart.toHighlightedDropdownAttribute (getOptionPart option)
                , valueDataAttribute option
                ]
                [ labelHtml option, descriptionHtml option ]

        OptionActivated ->
            div
                [ onMouseEnter (option |> getOptionValue |> eventHandlers.mouseOverMsgConstructor)
                , onMouseLeave (option |> getOptionValue |> eventHandlers.mouseOutMsgConstructor)
                , mouseDownPreventDefault (option |> getOptionValue |> eventHandlers.mouseDownMsgConstructor)
                , mouseUpPreventDefault (option |> getOptionValue |> eventHandlers.mouseUpMsgConstructor)
                , onClickPreventDefaultAndStopPropagation eventHandlers.noOpMsgConstructor
                , class "option active highlighted"
                , OptionPart.toActiveDropdownAttribute (getOptionPart option)
                , valueDataAttribute option
                ]
                [ labelHtml option, descriptionHtml option ]

        OptionDisabled _ ->
            div
                [ class "option disabled"
                , OptionPart.toDisabledDropdownAttribute (getOptionPart option)
                , valueDataAttribute option
                ]
                [ labelHtml option, descriptionHtml option ]


toDropdownOptionSelectedHtml : DropdownItemEventListeners msg -> FancyOption -> Html msg
toDropdownOptionSelectedHtml eventHandlers option =
    div
        [ onMouseEnter (option |> getOptionValue |> eventHandlers.mouseOverMsgConstructor)
        , onMouseLeave (option |> getOptionValue |> eventHandlers.mouseOutMsgConstructor)
        , mouseDownPreventDefault (option |> getOptionValue |> eventHandlers.mouseDownMsgConstructor)
        , mouseUpPreventDefault (option |> getOptionValue |> eventHandlers.mouseUpMsgConstructor)
        , Html.Attributes.attribute "part" "dropdown-option selected"
        , OptionPart.toDropdownAttribute (getOptionPart option)
        , class "option selected"
        , valueDataAttribute option
        ]
        [ labelHtml option, descriptionHtml option ]


toDropdownOptionSelectedHighlightedHtml : DropdownItemEventListeners msg -> FancyOption -> Html msg
toDropdownOptionSelectedHighlightedHtml eventHandlers option =
    div
        [ onMouseEnter (option |> getOptionValue |> eventHandlers.mouseOverMsgConstructor)
        , onMouseLeave (option |> getOptionValue |> eventHandlers.mouseOutMsgConstructor)
        , mouseDownPreventDefault (option |> getOptionValue |> eventHandlers.mouseDownMsgConstructor)
        , mouseUpPreventDefault (option |> getOptionValue |> eventHandlers.mouseUpMsgConstructor)
        , Html.Attributes.attribute "part" "dropdown-option selected highlighted"
        , OptionPart.toDropdownAttribute (getOptionPart option)
        , class "option selected highlighted"
        , valueDataAttribute option
        ]
        [ labelHtml option, descriptionHtml option ]



-- TEST HELPERS


test_optionToDebuggingString : FancyOption -> String
test_optionToDebuggingString fancyOption =
    case fancyOption |> getOptionGroup |> OptionGroup.toString of
        "" ->
            fancyOption |> getOptionLabel |> optionLabelToString

        group ->
            group ++ " - " ++ (fancyOption |> getOptionLabel |> optionLabelToString)
