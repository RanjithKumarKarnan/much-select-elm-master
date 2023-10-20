module OutputStyle exposing (..)

import Json.Decode
import Json.Encode
import PositiveInt exposing (PositiveInt)
import TransformAndValidate exposing (ValueTransformAndValidate)


type MaxDropdownItems
    = FixedMaxDropdownItems PositiveInt
    | NoLimitToDropdownItems


defaultMaxDropdownItemsNum : PositiveInt
defaultMaxDropdownItemsNum =
    PositiveInt.new 1000


defaultMaxDropdownItems : MaxDropdownItems
defaultMaxDropdownItems =
    FixedMaxDropdownItems defaultMaxDropdownItemsNum


minimMaxDropdownItemsNum : PositiveInt
minimMaxDropdownItemsNum =
    PositiveInt.new 2


stringToMaxDropdownItems : String -> Result String MaxDropdownItems
stringToMaxDropdownItems str =
    case PositiveInt.fromString str of
        Just int ->
            if PositiveInt.isZero int then
                Ok NoLimitToDropdownItems

            else if PositiveInt.lessThan int minimMaxDropdownItemsNum then
                Err
                    "Invalid value for the max-dropdown-items attribute. It needs to be greater than 2"

            else
                Ok (FixedMaxDropdownItems int)

        Nothing ->
            Err
                "Invalid value for the max-dropdown-items attribute."


type SearchStringMinimumLength
    = FixedSearchStringMinimumLength PositiveInt
    | NoMinimumToSearchStringLength


defaultSearchStringMinimumLength =
    FixedSearchStringMinimumLength (PositiveInt.new 2)


encodeSearchStringMinimumLength : SearchStringMinimumLength -> Json.Encode.Value
encodeSearchStringMinimumLength searchStringMinimumLength =
    case searchStringMinimumLength of
        FixedSearchStringMinimumLength positiveInt ->
            PositiveInt.encode positiveInt

        NoMinimumToSearchStringLength ->
            Json.Encode.int 0


decodeSearchStringMinimumLength : Json.Decode.Decoder SearchStringMinimumLength
decodeSearchStringMinimumLength =
    PositiveInt.decode
        |> Json.Decode.andThen
            (\positiveInt ->
                if PositiveInt.isZero positiveInt then
                    Json.Decode.succeed NoMinimumToSearchStringLength

                else
                    Json.Decode.succeed (FixedSearchStringMinimumLength positiveInt)
            )


type alias CustomOptionHint =
    Maybe String


type EventsMode
    = EventsOnly
    | AllowLightDomChanges


type DropdownState
    = Expanded
    | Collapsed
    | NotManagedByMe


type DropdownStyle
    = NoFooter
    | ShowFooter


type CustomOptions
    = AllowCustomOptions CustomOptionHint ValueTransformAndValidate
    | NoCustomOptions


type SelectedItemPlacementMode
    = SelectedItemStaysInPlace
    | SelectedItemMovesToTheTop
    | SelectedItemIsHidden


type SingleItemRemoval
    = EnableSingleItemRemoval
    | DisableSingleItemRemoval


type alias SingleSelectCustomHtmlFields =
    { customOptions : CustomOptions
    , selectedItemPlacementMode : SelectedItemPlacementMode
    , maxDropdownItems : MaxDropdownItems
    , searchStringMinimumLength : SearchStringMinimumLength
    , dropdownState : DropdownState
    , dropdownStyle : DropdownStyle
    , eventsMode : EventsMode
    }


defaultSingleSelectCustomHtmlFields : SingleSelectCustomHtmlFields
defaultSingleSelectCustomHtmlFields =
    { customOptions = NoCustomOptions
    , selectedItemPlacementMode = SelectedItemStaysInPlace
    , maxDropdownItems = NoLimitToDropdownItems
    , searchStringMinimumLength = FixedSearchStringMinimumLength (PositiveInt.new 2)
    , dropdownState = Collapsed
    , dropdownStyle = NoFooter
    , eventsMode = AllowLightDomChanges
    }


type alias MultiSelectCustomHtmlFields =
    { customOptions : CustomOptions
    , singleItemRemoval : SingleItemRemoval
    , maxDropdownItems : MaxDropdownItems
    , searchStringMinimumLength : SearchStringMinimumLength
    , dropdownState : DropdownState
    , dropdownStyle : DropdownStyle
    , eventsMode : EventsMode
    }


defaultMultiSelectCustomHtmlFields : MultiSelectCustomHtmlFields
defaultMultiSelectCustomHtmlFields =
    { customOptions = NoCustomOptions
    , singleItemRemoval = EnableSingleItemRemoval
    , maxDropdownItems = NoLimitToDropdownItems
    , searchStringMinimumLength = FixedSearchStringMinimumLength (PositiveInt.new 2)
    , dropdownState = Collapsed
    , dropdownStyle = NoFooter
    , eventsMode = AllowLightDomChanges
    }


type SingleSelectOutputStyle
    = SingleSelectCustomHtml SingleSelectCustomHtmlFields
    | SingleSelectDatalist EventsMode ValueTransformAndValidate


type MultiSelectOutputStyle
    = MultiSelectCustomHtml MultiSelectCustomHtmlFields
    | MultiSelectDataList EventsMode ValueTransformAndValidate


singleToMulti : SingleSelectOutputStyle -> MultiSelectOutputStyle
singleToMulti singleSelectOutputStyle =
    case singleSelectOutputStyle of
        SingleSelectCustomHtml singleSelectCustomHtmlFields ->
            MultiSelectCustomHtml
                { customOptions = singleSelectCustomHtmlFields.customOptions
                , singleItemRemoval = DisableSingleItemRemoval
                , maxDropdownItems = singleSelectCustomHtmlFields.maxDropdownItems
                , searchStringMinimumLength = singleSelectCustomHtmlFields.searchStringMinimumLength
                , dropdownState = singleSelectCustomHtmlFields.dropdownState
                , dropdownStyle = singleSelectCustomHtmlFields.dropdownStyle
                , eventsMode = singleSelectCustomHtmlFields.eventsMode
                }

        SingleSelectDatalist eventsMode transformAndValidate ->
            MultiSelectDataList eventsMode transformAndValidate


multiToSingle : MultiSelectOutputStyle -> SingleSelectOutputStyle
multiToSingle multiSelectOutputStyle =
    case multiSelectOutputStyle of
        MultiSelectCustomHtml multiSelectCustomHtmlFields ->
            SingleSelectCustomHtml
                { customOptions = multiSelectCustomHtmlFields.customOptions
                , selectedItemPlacementMode = SelectedItemStaysInPlace
                , maxDropdownItems = multiSelectCustomHtmlFields.maxDropdownItems
                , searchStringMinimumLength = multiSelectCustomHtmlFields.searchStringMinimumLength
                , dropdownState = multiSelectCustomHtmlFields.dropdownState
                , dropdownStyle = multiSelectCustomHtmlFields.dropdownStyle
                , eventsMode = multiSelectCustomHtmlFields.eventsMode
                }

        MultiSelectDataList eventsMode transformAndValidate ->
            SingleSelectDatalist eventsMode transformAndValidate


getTransformAndValidateFromCustomOptions : CustomOptions -> ValueTransformAndValidate
getTransformAndValidateFromCustomOptions customOptions =
    case customOptions of
        AllowCustomOptions _ valueTransformAndValidate ->
            valueTransformAndValidate

        NoCustomOptions ->
            TransformAndValidate.empty


setTransformAndValidateFromCustomOptions : ValueTransformAndValidate -> CustomOptions -> CustomOptions
setTransformAndValidateFromCustomOptions newTransformAndValidate customOptions =
    case customOptions of
        AllowCustomOptions hint _ ->
            AllowCustomOptions hint newTransformAndValidate

        NoCustomOptions ->
            customOptions


setEventsModeSingleSelect : EventsMode -> SingleSelectOutputStyle -> SingleSelectOutputStyle
setEventsModeSingleSelect eventsMode singleSelectOutputStyle =
    case singleSelectOutputStyle of
        SingleSelectCustomHtml singleSelectCustomHtmlFields ->
            SingleSelectCustomHtml { singleSelectCustomHtmlFields | eventsMode = eventsMode }

        SingleSelectDatalist _ valueTransformAndValidate ->
            SingleSelectDatalist eventsMode valueTransformAndValidate


setEventsModeMultiSelect : EventsMode -> MultiSelectOutputStyle -> MultiSelectOutputStyle
setEventsModeMultiSelect eventsMode multiSelectOutputStyle =
    case multiSelectOutputStyle of
        MultiSelectCustomHtml multiSelectCustomHtmlFields ->
            MultiSelectCustomHtml { multiSelectCustomHtmlFields | eventsMode = eventsMode }

        MultiSelectDataList _ valueTransformAndValidate ->
            MultiSelectDataList eventsMode valueTransformAndValidate
