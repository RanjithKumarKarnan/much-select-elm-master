module OptionList exposing (OptionList(..), activateOptionInListByOptionValue, addAdditionalOptionsToOptionList, addAdditionalOptionsToOptionListWithAutoSortRank, addAdditionalSelectedOptionWithStringValue, addAndSelectOptionsInOptionsListByString, addNewSelectedEmptyOptionAtIndex, all, allOptionsAreValid, andMap, any, append, appendOptions, changeHighlightedOption, changeHighlightedOptionByValue, cleanupEmptySelectedOptions, concatMap, customSelectedOptions, decoder, decoderWithAge, deselect, deselectAll, deselectAllButTheFirstSelectedOptionInList, deselectAllSelectedHighlightedOptions, deselectEveryOptionExceptOptionsInList, deselectLastSelectedOption, deselectOptionByValue, drop, encode, encodeSearchResults, filter, findByValue, findClosestHighlightableOptionGoingDown, findClosestHighlightableOptionGoingUp, findHighestAutoSortRank, findHighlightedOption, findHighlightedOptionIndex, findHighlightedOrSelectedOptionIndex, findLowestSearchScore, findOptionByValue, findSelectedOption, getOptions, hasAnyPendingValidation, hasAnyValidationErrors, hasOptionByValueString, hasSelectedHighlightedOptions, hasSelectedOption, head, highlightOption, isEmpty, isSlottedOptionList, length, map, mergeTwoListsOfOptionsPreservingSelectedOptions, optionsPlusOne, optionsValuesAsStrings, organizeNewDatalistOptions, prependCustomOption, reIndexSelectedOptions, removeOptionFromOptionListBySelectedIndex, removeOptionsFromOptionList, removeUnselectedCustomOptions, replaceOptions, selectHighlightedOption, selectOption, selectOptionByOptionValue, selectOptionByOptionValueWithIndex, selectOptionIByValueStringWithIndex, selectOptions, selectOptionsInOptionsListByString, selectSingleOption, selectSingleOptionByValue, selectedOptionValuesAreEqual, selectedOptions, selectedOptionsToTuple, setAge, sort, sortBy, sortOptionsByBestScore, take, test_newDatalistOptionList, test_newFancyOptionList, toDatalistOptionList, toggleSelectedHighlightByOptionValue, unhighlightOptionByValue, unhighlightSelectedOptions, uniqueBy, unselectedOptions, updateAge, updateDatalistOptionWithValueBySelectedValueIndex, updateDatalistOptionsWithPendingValidation, updateDatalistOptionsWithValue, updateDatalistOptionsWithValueAndErrors, updateOptionsWithNewSearchResults, updatedDatalistSelectedOptions)

import DatalistOption
import FancyOption
import Json.Decode
import Json.Encode
import List.Extra
import Maybe.Extra
import Option exposing (Option)
import OptionDisplay
import OptionLabel exposing (OptionLabel)
import OptionSearchFilter exposing (OptionSearchFilterWithValue)
import OptionSorting exposing (OptionSort(..))
import OptionValue exposing (OptionValue)
import OutputStyle exposing (SelectedItemPlacementMode(..))
import PositiveInt exposing (PositiveInt)
import SearchString exposing (SearchString)
import SelectionMode exposing (OutputStyle(..), SelectionConfig, SelectionMode(..))
import SortRank exposing (SortRank)
import TransformAndValidate exposing (ValidationFailureMessage)


type OptionList
    = FancyOptionList (List Option)
    | DatalistOptionList (List Option)
    | SlottedOptionList (List Option)


getOptions : OptionList -> List Option
getOptions optionList =
    case optionList of
        FancyOptionList options ->
            options

        DatalistOptionList options ->
            options

        SlottedOptionList options ->
            options


map : (Option -> Option) -> OptionList -> OptionList
map function optionList =
    case optionList of
        FancyOptionList options ->
            FancyOptionList (List.map function options)

        DatalistOptionList options ->
            DatalistOptionList (List.map function options)

        SlottedOptionList options ->
            SlottedOptionList (List.map function options)


andMap : (Option -> a) -> OptionList -> List a
andMap function optionList =
    case optionList of
        FancyOptionList options ->
            List.map function options

        DatalistOptionList options ->
            List.map function options

        SlottedOptionList options ->
            List.map function options


concatMap : (Option -> List a) -> OptionList -> List a
concatMap function optionList =
    andMap function optionList
        |> List.concat


indexedMap : (Int -> Option -> Option) -> OptionList -> OptionList
indexedMap function optionList =
    case optionList of
        FancyOptionList options ->
            FancyOptionList (List.indexedMap function options)

        DatalistOptionList options ->
            DatalistOptionList (List.indexedMap function options)

        SlottedOptionList options ->
            SlottedOptionList (List.indexedMap function options)


mapValues : (Option -> Maybe Option) -> OptionList -> OptionList
mapValues function optionList =
    case optionList of
        FancyOptionList options ->
            FancyOptionList (List.map function options |> Maybe.Extra.values)

        DatalistOptionList options ->
            DatalistOptionList (List.map function options |> Maybe.Extra.values)

        SlottedOptionList options ->
            SlottedOptionList (List.map function options |> Maybe.Extra.values)


head : OptionList -> Maybe Option
head optionList =
    case optionList of
        FancyOptionList options ->
            List.head options

        DatalistOptionList options ->
            List.head options

        SlottedOptionList options ->
            List.head options


last : OptionList -> Maybe Option
last optionList =
    case optionList of
        FancyOptionList options ->
            List.Extra.last options

        DatalistOptionList options ->
            List.Extra.last options

        SlottedOptionList options ->
            List.Extra.last options


length : OptionList -> Int
length optionList =
    case optionList of
        FancyOptionList options ->
            List.length options

        DatalistOptionList options ->
            List.length options

        SlottedOptionList options ->
            List.length options


isEmpty : OptionList -> Bool
isEmpty optionList =
    case optionList of
        FancyOptionList options ->
            List.isEmpty options

        DatalistOptionList options ->
            List.isEmpty options

        SlottedOptionList options ->
            List.isEmpty options


foldl : (Option -> b -> b) -> b -> OptionList -> b
foldl function b optionList =
    case optionList of
        FancyOptionList options ->
            List.foldl function b options

        DatalistOptionList options ->
            List.foldl function b options

        SlottedOptionList options ->
            List.foldl function b options


foldr : (Option -> b -> b) -> b -> OptionList -> b
foldr function b optionList =
    case optionList of
        FancyOptionList options ->
            List.foldr function b options

        DatalistOptionList options ->
            List.foldr function b options

        SlottedOptionList options ->
            List.foldr function b options


filter : (Option -> Bool) -> OptionList -> OptionList
filter function optionList =
    case optionList of
        FancyOptionList options ->
            FancyOptionList (List.filter function options)

        DatalistOptionList options ->
            DatalistOptionList (List.filter function options)

        SlottedOptionList options ->
            SlottedOptionList (List.filter function options)


sort : OptionSort -> OptionList -> OptionList
sort sorting optionList =
    case optionList of
        FancyOptionList options ->
            case sorting of
                NoSorting ->
                    FancyOptionList (List.sortBy (Option.getOptionLabel >> OptionLabel.getSortRank >> SortRank.getAutoIndexForSorting) options)

                SortByOptionLabel ->
                    FancyOptionList (List.sortBy (Option.getOptionLabel >> OptionLabel.optionLabelToString) options)

        DatalistOptionList options ->
            case sorting of
                NoSorting ->
                    DatalistOptionList (List.sortBy (Option.getOptionLabel >> OptionLabel.getSortRank >> SortRank.getAutoIndexForSorting) options)

                SortByOptionLabel ->
                    DatalistOptionList (List.sortBy (Option.getOptionLabel >> OptionLabel.optionLabelToString) options)

        SlottedOptionList options ->
            case sorting of
                NoSorting ->
                    SlottedOptionList (List.sortBy (Option.getOptionLabel >> OptionLabel.getSortRank >> SortRank.getAutoIndexForSorting) options)

                SortByOptionLabel ->
                    SlottedOptionList (List.sortBy (Option.getOptionLabel >> OptionLabel.optionLabelToString) options)


sortBy : (Option -> comparable) -> OptionList -> OptionList
sortBy function optionList =
    case optionList of
        FancyOptionList options ->
            FancyOptionList (List.sortBy function options)

        DatalistOptionList options ->
            DatalistOptionList (List.sortBy function options)

        SlottedOptionList options ->
            SlottedOptionList (List.sortBy function options)


any : (Option -> Bool) -> OptionList -> Bool
any function optionList =
    case optionList of
        FancyOptionList options ->
            List.any function options

        DatalistOptionList options ->
            List.any function options

        SlottedOptionList options ->
            List.any function options


all : (Option -> Bool) -> OptionList -> Bool
all function optionList =
    case optionList of
        FancyOptionList options ->
            List.all function options

        DatalistOptionList options ->
            List.all function options

        SlottedOptionList options ->
            List.all function options


uniqueBy : (Option -> comparable) -> OptionList -> OptionList
uniqueBy function optionList =
    case optionList of
        FancyOptionList options ->
            FancyOptionList (List.Extra.uniqueBy function options)

        DatalistOptionList options ->
            DatalistOptionList (List.Extra.uniqueBy function options)

        SlottedOptionList options ->
            SlottedOptionList (List.Extra.uniqueBy function options)


find : (Option -> Bool) -> OptionList -> Maybe Option
find function optionList =
    case optionList of
        FancyOptionList options ->
            List.Extra.find function options

        DatalistOptionList options ->
            List.Extra.find function options

        SlottedOptionList options ->
            List.Extra.find function options


findIndex : (Option -> Bool) -> OptionList -> Maybe Int
findIndex function optionList =
    case optionList of
        FancyOptionList options ->
            List.Extra.findIndex function options

        DatalistOptionList options ->
            List.Extra.findIndex function options

        SlottedOptionList options ->
            List.Extra.findIndex function options


findByValue : OptionValue -> OptionList -> Maybe Option
findByValue optionValue optionList =
    find (Option.optionEqualsOptionValue optionValue) optionList


findOptionByValue : Option -> OptionList -> Maybe Option
findOptionByValue option optionList =
    findByValue (Option.getOptionValue option) optionList


append : OptionList -> OptionList -> OptionList
append optionListA optionListB =
    case optionListA of
        FancyOptionList options ->
            case optionListB of
                FancyOptionList optionsB ->
                    FancyOptionList (options ++ optionsB)

                _ ->
                    optionListA

        DatalistOptionList optionsA ->
            case optionListB of
                DatalistOptionList optionsB ->
                    DatalistOptionList (optionsA ++ optionsB)

                _ ->
                    optionListA

        SlottedOptionList options ->
            case optionListB of
                SlottedOptionList optionsB ->
                    SlottedOptionList (options ++ optionsB)

                _ ->
                    optionListA


appendOptions : List Option -> List Option -> OptionList
appendOptions optionsA optionsB =
    if allFancyOptions optionsA then
        FancyOptionList (optionsA ++ optionsB)

    else if allDatalistOptions optionsA then
        DatalistOptionList (optionsA ++ optionsB)

    else if allSlottedOptions optionsA then
        SlottedOptionList (optionsA ++ optionsB)

    else
        FancyOptionList []


optionsPlusOne : Option -> List Option -> OptionList
optionsPlusOne option options =
    appendOptions [ option ] options


allFancyOptions : List Option -> Bool
allFancyOptions options =
    List.all
        (\option ->
            case option of
                Option.FancyOption _ ->
                    True

                _ ->
                    False
        )
        options


allDatalistOptions : List Option -> Bool
allDatalistOptions options =
    List.all
        (\option ->
            case option of
                Option.DatalistOption _ ->
                    True

                _ ->
                    False
        )
        options


allSlottedOptions : List Option -> Bool
allSlottedOptions options =
    List.all
        (\option ->
            case option of
                Option.SlottedOption _ ->
                    True

                _ ->
                    False
        )
        options


take : Int -> OptionList -> OptionList
take int optionList =
    case optionList of
        FancyOptionList options ->
            List.take int options
                |> FancyOptionList

        DatalistOptionList options ->
            List.take int options
                |> DatalistOptionList

        SlottedOptionList options ->
            List.take int options
                |> SlottedOptionList


drop : Int -> OptionList -> OptionList
drop int optionList =
    case optionList of
        FancyOptionList options ->
            List.drop int options
                |> FancyOptionList

        DatalistOptionList options ->
            List.drop int options
                |> DatalistOptionList

        SlottedOptionList options ->
            List.drop int options
                |> SlottedOptionList


findClosestHighlightableOptionGoingUp : SelectionMode -> Int -> OptionList -> Maybe Option
findClosestHighlightableOptionGoingUp selectionMode index list =
    List.Extra.splitAt index (getOptions list)
        |> Tuple.first
        |> List.reverse
        |> List.Extra.find (Option.isHighlightable selectionMode)


findClosestHighlightableOptionGoingDown : SelectionMode -> Int -> OptionList -> Maybe Option
findClosestHighlightableOptionGoingDown selectionMode index list =
    List.Extra.splitAt index (getOptions list)
        |> Tuple.second
        |> List.Extra.find (Option.isHighlightable selectionMode)


findHighlightedOption : OptionList -> Maybe Option
findHighlightedOption optionList =
    find (\option -> Option.isHighlighted option) optionList


findHighlightedOptionIndex : OptionList -> Maybe Int
findHighlightedOptionIndex optionList =
    findIndex (\option -> Option.isHighlighted option) optionList


findHighlightedOrSelectedOptionIndex : OptionList -> Maybe Int
findHighlightedOrSelectedOptionIndex optionList =
    case findHighlightedOptionIndex optionList of
        Just index ->
            Just index

        Nothing ->
            findSelectedOptionIndex optionList


selectedOptions : OptionList -> OptionList
selectedOptions options =
    options
        |> filter Option.isSelected
        |> sortBy Option.getOptionSelectedIndex


unselectedOptions : OptionList -> OptionList
unselectedOptions options =
    options
        |> filter (\option -> Option.isSelected option |> not)


customOptions : OptionList -> OptionList
customOptions optionList =
    optionList |> filter Option.isCustomOption


customSelectedOptions : OptionList -> OptionList
customSelectedOptions =
    customOptions >> selectedOptions


optionsValuesAsStrings : OptionList -> List String
optionsValuesAsStrings optionList =
    andMap Option.getOptionValueAsString optionList


hasSelectedOption : OptionList -> Bool
hasSelectedOption optionList =
    optionList
        |> selectedOptions
        |> length
        |> (\length_ -> length_ > 0)


{-| Look through the list of options, if we find one that matches the given option value select it.

Pick a selection index that is the same as the selection index of the option.

-}
selectOption : Option -> OptionList -> OptionList
selectOption optionToSelect options =
    selectOptionByOptionValue (Option.getOptionValue optionToSelect) options


{-| Look through the list of options, if we find one that matches the given option value
then select it and return a new list of options with the found option selected.

And deselect all other options in the list.

-}
selectSingleOptionByValue : OptionValue -> OptionList -> OptionList
selectSingleOptionByValue optionValue options =
    options
        |> map
            (\option_ ->
                if Option.optionEqualsOptionValue optionValue option_ then
                    Option.select 0 option_

                else
                    Option.deselect option_
            )


selectSingleOption : Option -> OptionList -> OptionList
selectSingleOption option optionList =
    selectSingleOptionByValue (Option.getOptionValue option) optionList


{-| Look through the list of options, if we find one that matches the given option value
then select it and return a new list of options with the found option selected.

If we do not find the option value return the same list of options.

-}
selectOptionByOptionValue : OptionValue -> OptionList -> OptionList
selectOptionByOptionValue value list =
    let
        nextSelectedIndex =
            foldl
                (\selectedOption highestIndex ->
                    if Option.getOptionSelectedIndex selectedOption > highestIndex then
                        Option.getOptionSelectedIndex selectedOption

                    else
                        highestIndex
                )
                -1
                list
                + 1
    in
    selectOptionByOptionValueWithIndex nextSelectedIndex value list


selectOptionByOptionValueWithIndex : Int -> OptionValue -> OptionList -> OptionList
selectOptionByOptionValueWithIndex index optionValue optionList =
    map
        (\option_ ->
            if Option.optionEqualsOptionValue optionValue option_ then
                option_ |> Option.select index

            else
                option_
        )
        optionList


selectOptionIByValueStringWithIndex : Int -> String -> OptionList -> OptionList
selectOptionIByValueStringWithIndex int string optionList =
    selectOptionByOptionValueWithIndex int (OptionValue.stringToOptionValue string) optionList


{-| Select all the options in a "list" of options in an OptionList.

While we do this we're going to try to be smart with the selection index. We're going to get the selection index from the option.

If it's -1 then we're going to use 0. If it's 0 or greater we're going to use that.

-}
selectOptions : List Option -> OptionList -> OptionList
selectOptions optionsToSelect optionList =
    let
        helper : OptionList -> Option -> ( OptionList, List Option )
        helper newOptions optionToSelect =
            let
                selectionIndex =
                    if Option.getOptionSelectedIndex optionToSelect < 0 then
                        0

                    else
                        Option.getOptionSelectedIndex optionToSelect
            in
            ( selectOptionByOptionValueWithIndex
                selectionIndex
                (Option.getOptionValue optionToSelect)
                newOptions
            , []
            )
    in
    List.Extra.mapAccuml helper optionList optionsToSelect
        |> Tuple.first


selectHighlightedOption : SelectionMode -> OptionList -> OptionList
selectHighlightedOption selectionMode optionList =
    case selectionMode of
        SingleSelect ->
            optionList
                |> filter
                    (\option ->
                        Option.isHighlighted option
                    )
                |> head
                |> Maybe.map (\option -> selectSingleOption option optionList)
                |> Maybe.withDefault optionList
                |> clearAnyUnselectedCustomOptions

        MultiSelect ->
            optionList
                |> filter
                    (\option ->
                        Option.isHighlighted option
                    )
                |> head
                |> Maybe.map (\option -> selectOption option optionList)
                |> Maybe.withDefault optionList


{-| Look through the list of options, if we find one that matches the given option value
then select it and return a new list of options with the found option selected.

If we do not find the option value return the same list of options.

-}
activateOptionInListByOptionValue : OptionValue -> OptionList -> OptionList
activateOptionInListByOptionValue value options =
    map
        (Option.activateIfEqualRemoveHighlightElse value)
        options


clearAnyUnselectedCustomOptions : OptionList -> OptionList
clearAnyUnselectedCustomOptions optionsList =
    filter (\option -> not (Option.isCustomOption option && not (Option.isSelected option))) optionsList


hasOptionValue : OptionValue -> OptionList -> Bool
hasOptionValue optionValue optionsList =
    any (Option.optionEqualsOptionValue optionValue) optionsList


hasOptionByValue : Option -> OptionList -> Bool
hasOptionByValue option optionsList =
    hasOptionValue (Option.getOptionValue option) optionsList


hasOptionByValueString : String -> OptionList -> Bool
hasOptionByValueString string optionList =
    hasOptionValue (OptionValue.stringToOptionValue string) optionList


equal : OptionList -> OptionList -> Bool
equal optionListA optionListB =
    getOptions optionListA == getOptions optionListB


addAdditionalSelectedOptionWithStringValue : String -> OptionList -> OptionList
addAdditionalSelectedOptionWithStringValue string optionList =
    case optionList of
        FancyOptionList _ ->
            let
                newOption =
                    FancyOption.new string Nothing
                        |> FancyOption.select 0
                        |> Option.FancyOption
            in
            addAdditionalOption newOption optionList

        DatalistOptionList _ ->
            let
                newOption =
                    DatalistOption.newSelected (OptionValue.stringToOptionValue string) 0
                        |> Option.DatalistOption
            in
            addAdditionalOption newOption optionList

        SlottedOptionList _ ->
            -- TODO This situation is tricky because we don't know what the slot should be.
            optionList


addAdditionalOption : Option -> OptionList -> OptionList
addAdditionalOption option optionList =
    if optionTypeMatches option optionList then
        case optionList of
            FancyOptionList options ->
                FancyOptionList (option :: options)

            DatalistOptionList options ->
                DatalistOptionList (option :: options)

            SlottedOptionList options ->
                SlottedOptionList (option :: options)

    else
        optionList


addAdditionalOptionsToOptionList : OptionList -> OptionList -> OptionList
addAdditionalOptionsToOptionList currentOptions newOptions =
    let
        currentOptionsWithUpdates =
            map
                (\currentOption ->
                    case findByValue (Option.getOptionValue currentOption) newOptions of
                        Just newOption_ ->
                            Option.merge currentOption newOption_

                        Nothing ->
                            currentOption
                )
                currentOptions

        reallyNewOptions : OptionList
        reallyNewOptions =
            filter (\newOption_ -> not (hasOptionByValue newOption_ currentOptions)) newOptions
    in
    append reallyNewOptions currentOptionsWithUpdates


addAdditionalOptionsToOptionListWithAutoSortRank : OptionList -> OptionList -> OptionList
addAdditionalOptionsToOptionListWithAutoSortRank currentOptions newOptions =
    let
        nextHighestAutoSortRank : Int
        nextHighestAutoSortRank =
            findHighestAutoSortRank currentOptions + 1
    in
    indexedMap
        (\index option ->
            let
                maybeNewSortRank : Maybe SortRank
                maybeNewSortRank =
                    SortRank.newMaybeAutoSortRank (nextHighestAutoSortRank + index)

                optionLabel : OptionLabel
                optionLabel =
                    Option.getOptionLabel option

                updatedOptionLabel : OptionLabel
                updatedOptionLabel =
                    case maybeNewSortRank of
                        Just newSortRank ->
                            OptionLabel.setSortRank newSortRank optionLabel

                        Nothing ->
                            optionLabel
            in
            Option.setLabel updatedOptionLabel option
        )
        newOptions
        |> addAdditionalOptionsToOptionList currentOptions


findHighestAutoSortRank : OptionList -> Int
findHighestAutoSortRank optionList =
    foldr
        (\option currentMax ->
            max
                (option
                    |> Option.getOptionLabel
                    |> OptionLabel.getSortRank
                    |> SortRank.getAutoIndexForSorting
                )
                currentMax
        )
        0
        optionList


removeOptionsFromOptionList : OptionList -> OptionList -> OptionList
removeOptionsFromOptionList optionList optionsToRemove =
    filter (\option -> not (hasOptionByValue option optionsToRemove)) optionList


removeOptionFromOptionListBySelectedIndex : Int -> OptionList -> OptionList
removeOptionFromOptionListBySelectedIndex selectedIndex options =
    filter (\option -> Option.getOptionSelectedIndex option /= selectedIndex) options
        |> reIndexSelectedOptions


{-| Clean up custom options, remove all the custom options that are not selected.
-}
removeUnselectedCustomOptions : OptionList -> OptionList
removeUnselectedCustomOptions optionList =
    let
        unselectedCustomOptions =
            optionList
                |> filter Option.isCustomOption
                |> filter (Option.isSelected >> not)
    in
    removeOptionsFromOptionList optionList unselectedCustomOptions


removeEmptyOptions : OptionList -> OptionList
removeEmptyOptions optionList =
    filter (Option.isEmpty >> not) optionList


{-| Take a list of option. Pull out the selected options and the unselected option.
Reindex the selected options, keep their order but if there are any gaps collapse
those. Finally append the unselected options to the end of the selected options.

I think this should only be used for datalist options.

TODO: check to make sure this is only datalist options

-}
reIndexSelectedOptions : OptionList -> OptionList
reIndexSelectedOptions optionList =
    let
        selectedOptions_ =
            optionList
                |> selectedOptions

        nonSelectedOptions =
            optionList
                |> unselectedOptions
    in
    append
        (indexedMap (\index option -> Option.select index option) selectedOptions_)
        nonSelectedOptions


{-| Find an option with the selection index and deselect it.
-}
deselect : PositiveInt -> OptionList -> OptionList
deselect selectionIndex optionList =
    map
        (\option ->
            if Option.getOptionSelectedIndex option == PositiveInt.toInt selectionIndex then
                Option.deselect option

            else
                option
        )
        optionList


deselectOptionByValue : OptionValue -> OptionList -> OptionList
deselectOptionByValue optionValue optionList =
    map
        (\option_ ->
            if Option.optionEqualsOptionValue optionValue option_ then
                Option.deselect option_

            else
                option_
        )
        optionList


{-| Deselect all the options.
For a datalist this a little bit different because all selected options need to be removed.
-}
deselectAll : OptionList -> OptionList
deselectAll optionList =
    case optionList of
        FancyOptionList _ ->
            map Option.deselect optionList

        DatalistOptionList _ ->
            map Option.deselect optionList
                |> uniqueBy Option.getOptionValueAsString
                |> removeEmptyOptions

        SlottedOptionList _ ->
            map Option.deselect optionList


{-| Deselect all the options that are selected AND highlighted.
-}
deselectAllSelectedHighlightedOptions : OptionList -> OptionList
deselectAllSelectedHighlightedOptions optionList =
    optionList
        |> map
            (\option ->
                if Option.isSelected option && Option.isHighlighted option then
                    Option.deselect option

                else
                    option
            )


deselectLastSelectedOption : OptionList -> OptionList
deselectLastSelectedOption optionList =
    let
        maybeLastSelectionOption =
            optionList
                |> selectedOptions
                |> last

        maybeLastSelectionIndex : Maybe PositiveInt
        maybeLastSelectionIndex =
            case maybeLastSelectionOption of
                Just lastSelectionOption ->
                    PositiveInt.maybeNew (Option.getOptionSelectedIndex lastSelectionOption)

                Nothing ->
                    Nothing
    in
    case maybeLastSelectionIndex of
        Just lastSelectionIndex ->
            deselect lastSelectionIndex optionList

        Nothing ->
            optionList


{-| This is kind of a strange one it takes a list of options to leave selected and
deselects all the rest.

It decides if 2 options are the same based on their values.

-}
deselectEveryOptionExceptOptionsInList : List Option -> OptionList -> OptionList
deselectEveryOptionExceptOptionsInList optionsNotToDeselect optionList =
    map
        (\option ->
            let
                test : Option -> Bool
                test optionNotToDeselect =
                    Option.optionsHaveEqualValues optionNotToDeselect option
            in
            if List.any test optionsNotToDeselect then
                option

            else
                Option.deselect option
        )
        optionList


deselectAllButTheFirstSelectedOptionInList : OptionList -> OptionList
deselectAllButTheFirstSelectedOptionInList optionList =
    case head (selectedOptions optionList) of
        Just oneOptionToLeaveSelected ->
            selectSingleOptionByValue (Option.getOptionValue oneOptionToLeaveSelected) optionList

        Nothing ->
            optionList


findSelectedOption : OptionList -> Maybe Option
findSelectedOption optionList =
    find Option.isSelected optionList


findSelectedOptionIndex : OptionList -> Maybe Int
findSelectedOptionIndex optionList =
    findIndex Option.isSelected optionList


highlightOptionByValue : OptionValue -> OptionList -> OptionList
highlightOptionByValue optionValue optionList =
    optionList
        |> map
            (\option ->
                if Option.optionEqualsOptionValue optionValue option then
                    Option.highlight option

                else
                    option
            )


highlightOption : Option -> OptionList -> OptionList
highlightOption option optionList =
    -- TODO I'm not sure I should have this, unless as a setter for tests.
    highlightOptionByValue (Option.getOptionValue option) optionList


changeHighlightedOption : Option -> OptionList -> OptionList
changeHighlightedOption option optionList =
    changeHighlightedOptionByValue (Option.getOptionValue option) optionList


changeHighlightedOptionByValue : OptionValue -> OptionList -> OptionList
changeHighlightedOptionByValue optionValue optionList =
    optionList
        |> map
            (\option_ ->
                if Option.optionEqualsOptionValue optionValue option_ then
                    Option.highlight option_

                else
                    Option.removeHighlight option_
            )


toggleSelectedHighlightByOptionValue : OptionValue -> OptionList -> OptionList
toggleSelectedHighlightByOptionValue optionValue optionList =
    optionList
        |> map
            (\option ->
                if Option.optionEqualsOptionValue optionValue option then
                    Option.toggleHighlight option

                else
                    option
            )


hasSelectedHighlightedOptions : OptionList -> Bool
hasSelectedHighlightedOptions optionList =
    any Option.isSelectedHighlighted optionList


unhighlightSelectedOptions : OptionList -> OptionList
unhighlightSelectedOptions optionList =
    map
        (\option_ ->
            if Option.isSelected option_ then
                Option.removeHighlight option_

            else
                option_
        )
        optionList


{-| Look through the list of options for one with the matching value.
If we find it remove the highlight from it.
-}
unhighlightOptionByValue : OptionValue -> OptionList -> OptionList
unhighlightOptionByValue optionValue optionList =
    map
        (\option_ ->
            if Option.optionEqualsOptionValue optionValue option_ then
                Option.removeHighlight option_

            else
                option_
        )
        optionList


{-| Clean up options. This function is designed for the datalist mode.
The idea is that there should only be at most 1 empty option.
-}
cleanupEmptySelectedOptions : OptionList -> OptionList
cleanupEmptySelectedOptions options =
    let
        selectedOptions_ =
            options
                |> selectedOptions

        selectedOptionsSansEmptyOptions =
            options
                |> selectedOptions
                |> filter (Option.isEmptyOrHasEmptyValue >> not)
    in
    if length selectedOptions_ > 1 && length selectedOptionsSansEmptyOptions > 1 then
        selectedOptionsSansEmptyOptions

    else if length selectedOptions_ > 1 then
        take 1 selectedOptions_

    else
        options


organizeNewDatalistOptions : OptionList -> OptionList
organizeNewDatalistOptions optionList =
    let
        selectedOptions_ =
            optionList |> selectedOptions

        optionsForTheDatasetHints =
            optionList
                |> filter (Option.isSelected >> not)
                |> map Option.deselect
                |> uniqueBy Option.getOptionValueAsString
                |> removeEmptyOptions
    in
    append selectedOptions_ optionsForTheDatasetHints |> reIndexSelectedOptions


updatedDatalistSelectedOptions : List OptionValue -> OptionList -> OptionList
updatedDatalistSelectedOptions selectedValues optionList =
    let
        newSelectedOptions : OptionList
        newSelectedOptions =
            selectedValues
                |> List.indexedMap (\i selectedValue -> DatalistOption.newSelected selectedValue i)
                |> List.map Option.DatalistOption
                |> DatalistOptionList

        oldSelectedOptions : OptionList
        oldSelectedOptions =
            optionList
                |> selectedOptions

        oldSelectedOptionsCleanedUp : OptionList
        oldSelectedOptionsCleanedUp =
            oldSelectedOptions
                |> cleanupEmptySelectedOptions

        selectedOptions_ =
            if equal newSelectedOptions oldSelectedOptionsCleanedUp then
                oldSelectedOptions

            else
                newSelectedOptions

        optionsForTheDatasetHints =
            optionList
                |> filter (Option.isSelected >> not)
                |> map Option.deselect
                |> uniqueBy Option.getOptionValueAsString
                |> removeEmptyOptions
    in
    append selectedOptions_ optionsForTheDatasetHints


prependCustomOption : Maybe String -> SearchString -> OptionList -> OptionList
prependCustomOption maybeCustomOptionHint searchString options =
    let
        label : String
        label =
            case maybeCustomOptionHint of
                Just customOptionHint ->
                    let
                        parts =
                            String.split "{{}}" customOptionHint
                    in
                    case parts of
                        [] ->
                            "Add " ++ SearchString.toString searchString ++ "…"

                        [ _ ] ->
                            customOptionHint ++ SearchString.toString searchString

                        first :: second :: _ ->
                            first ++ SearchString.toString searchString ++ second

                Nothing ->
                    "Add " ++ SearchString.toString searchString ++ "…"

        valueString =
            SearchString.toString searchString
    in
    append
        (FancyOptionList
            [ Option.FancyOption
                (FancyOption.newCustomOption valueString label (Just valueString))
            ]
        )
        options


findLowestSearchScore : OptionList -> Maybe Int
findLowestSearchScore optionList =
    let
        lowSore =
            optionList
                |> filter (\option -> not (Option.isCustomOption option))
                |> optionSearchResultsBestScore
                |> List.foldl
                    (\optionBestScore lowScore ->
                        if optionBestScore < lowScore then
                            optionBestScore

                        else
                            lowScore
                    )
                    OptionSearchFilter.impossiblyLowScore
    in
    if lowSore == OptionSearchFilter.impossiblyLowScore then
        Nothing

    else
        Just lowSore


optionSearchResultsBestScore : OptionList -> List Int
optionSearchResultsBestScore optionList =
    optionList
        |> getOptions
        |> List.map Option.getMaybeOptionSearchFilter
        |> Maybe.Extra.values
        |> List.map .bestScore


sortOptionsByBestScore : OptionList -> OptionList
sortOptionsByBestScore optionList =
    sortBy
        (\option ->
            if Option.isCustomOption option then
                1

            else
                Option.getMaybeOptionSearchFilter option
                    |> Maybe.map .bestScore
                    |> Maybe.withDefault OptionSearchFilter.impossiblyLowScore
        )
        optionList


updateDatalistOptionsWithValue : OptionValue -> Int -> OptionList -> OptionList
updateDatalistOptionsWithValue optionValue selectedValueIndex optionList =
    if any (Option.hasSelectedItemIndex selectedValueIndex) optionList then
        updateDatalistOptionWithValueBySelectedValueIndex [] optionValue selectedValueIndex optionList

    else
        append
            (DatalistOptionList
                [ Option.DatalistOption (DatalistOption.newSelected optionValue selectedValueIndex)
                ]
            )
            optionList


updateDatalistOptionsWithPendingValidation : OptionValue -> Int -> OptionList -> OptionList
updateDatalistOptionsWithPendingValidation optionValue selectedValueIndex optionList =
    if any (Option.hasSelectedItemIndex selectedValueIndex) optionList then
        updateDatalistOptionWithValueBySelectedValueIndexPendingValidation optionValue selectedValueIndex optionList

    else
        append
            (DatalistOptionList
                [ Option.DatalistOption
                    (DatalistOption.newSelectedDatalistOptionPendingValidation optionValue selectedValueIndex)
                ]
            )
            optionList


updateDatalistOptionsWithValueAndErrors : List ValidationFailureMessage -> OptionValue -> Int -> OptionList -> OptionList
updateDatalistOptionsWithValueAndErrors errors optionValue selectedValueIndex optionList =
    if any (Option.hasSelectedItemIndex selectedValueIndex) optionList then
        updateDatalistOptionWithValueBySelectedValueIndex errors optionValue selectedValueIndex optionList

    else
        append
            (DatalistOptionList
                [ Option.DatalistOption
                    (DatalistOption.newSelectedDatalistOptionWithErrors errors optionValue selectedValueIndex)
                ]
            )
            optionList


updateDatalistOptionWithValueBySelectedValueIndex : List ValidationFailureMessage -> OptionValue -> Int -> OptionList -> OptionList
updateDatalistOptionWithValueBySelectedValueIndex errors optionValue selectedIndex optionList =
    if List.isEmpty errors then
        map
            (\option ->
                if Option.getOptionSelectedIndex option == selectedIndex then
                    Option.setOptionValue optionValue option
                        |> Option.setOptionDisplay (OptionDisplay.OptionSelected selectedIndex OptionDisplay.MatureOption)

                else
                    option
            )
            optionList

    else
        map
            (\option ->
                if Option.getOptionSelectedIndex option == selectedIndex then
                    option
                        |> Option.setOptionValue optionValue
                        |> Option.setOptionValueErrors errors

                else
                    option
            )
            optionList


updateDatalistOptionWithValueBySelectedValueIndexPendingValidation : OptionValue -> Int -> OptionList -> OptionList
updateDatalistOptionWithValueBySelectedValueIndexPendingValidation optionValue selectedIndex optionList =
    map
        (\option ->
            if Option.getOptionSelectedIndex option == selectedIndex then
                Option.setOptionValue optionValue option
                    |> Option.setOptionDisplay (OptionDisplay.OptionSelectedPendingValidation selectedIndex)

            else
                option
        )
        optionList


addNewSelectedEmptyOptionAtIndex : Int -> OptionList -> OptionList
addNewSelectedEmptyOptionAtIndex index optionList =
    let
        firstPart =
            take index optionList

        secondPart =
            drop index optionList
    in
    append
        (append
            firstPart
            (DatalistOptionList
                [ Option.newSelectedEmptyDatalistOption index
                ]
            )
        )
        secondPart
        |> reIndexSelectedOptions


replaceOptions : SelectionConfig -> OptionList -> OptionList -> OptionList
replaceOptions selectionConfig oldOptions newOptions =
    let
        oldSelectedOptions : OptionList
        oldSelectedOptions =
            case SelectionMode.getSelectionMode selectionConfig of
                SelectionMode.SingleSelect ->
                    if hasSelectedOption newOptions then
                        case oldOptions of
                            FancyOptionList _ ->
                                FancyOptionList []

                            DatalistOptionList _ ->
                                DatalistOptionList []

                            SlottedOptionList _ ->
                                SlottedOptionList []

                    else
                        selectedOptions oldOptions

                SelectionMode.MultiSelect ->
                    selectedOptions oldOptions
                        |> transformOptionsToOutputStyle (SelectionMode.getOutputStyle selectionConfig)
    in
    case SelectionMode.getOutputStyle selectionConfig of
        SelectionMode.CustomHtml ->
            case SelectionMode.getSelectionMode selectionConfig of
                SelectionMode.SingleSelect ->
                    mergeTwoListsOfOptionsPreservingSelectedOptions
                        (SelectionMode.getSelectionMode selectionConfig)
                        (SelectionMode.getSelectedItemPlacementMode selectionConfig)
                        oldSelectedOptions
                        newOptions

                SelectionMode.MultiSelect ->
                    mergeTwoListsOfOptionsPreservingSelectedOptions
                        (SelectionMode.getSelectionMode selectionConfig)
                        SelectedItemStaysInPlace
                        oldSelectedOptions
                        newOptions

        SelectionMode.Datalist ->
            let
                optionsForTheDatasetHints =
                    newOptions
                        |> filter (Option.isSelected >> not)
                        |> map Option.deselect
                        |> uniqueBy Option.getOptionValueAsString
                        |> removeEmptyOptions

                newSelectedOptions =
                    oldSelectedOptions
                        |> toDatalistOptionList
            in
            case append newSelectedOptions optionsForTheDatasetHints of
                DatalistOptionList datalistOptions ->
                    DatalistOptionList datalistOptions

                FancyOptionList options ->
                    DatalistOptionList options

                SlottedOptionList options ->
                    DatalistOptionList options


{-| This function is a little strange but here's what it does. It takes 2 lists of options.
First it looks to see if any option values the second list match any option values in the first list
If they do it takes the label, description, and group from the option in second list and uses it to update
the option in the first list.

Then it concatenates the 2 lists together and filters them by unique option value, dropping identical
values later in the list.

The idea here is that the label, description, and group can be updated for existing option and new options
can be added at the same time.

One place this comes up is when we have an initial value for a MuchSelect, and then later the "full" list of options
comes in, including the extra stuff (like label, description, and group).
|

-}
mergeTwoListsOfOptionsPreservingSelectedOptions : SelectionMode.SelectionMode -> SelectedItemPlacementMode -> OptionList -> OptionList -> OptionList
mergeTwoListsOfOptionsPreservingSelectedOptions selectionMode selectedItemPlacementMode optionsA optionsB =
    let
        updatedOptionsA =
            map
                (\optionA ->
                    case findOptionByValue optionA optionsB of
                        Just optionB ->
                            Option.merge optionA optionB

                        Nothing ->
                            optionA
                )
                optionsA

        updatedOptionsB =
            map
                (\optionB ->
                    case findOptionByValue optionB optionsA of
                        Just optionA ->
                            Option.merge optionA optionB

                        Nothing ->
                            optionB
                )
                optionsB

        superList =
            case selectedItemPlacementMode of
                SelectedItemStaysInPlace ->
                    append updatedOptionsB updatedOptionsA

                SelectedItemMovesToTheTop ->
                    append updatedOptionsA updatedOptionsB

                SelectedItemIsHidden ->
                    append updatedOptionsB updatedOptionsA

        newOptions =
            uniqueBy Option.getOptionValueAsString superList
    in
    setSelectedOptionInNewOptions selectionMode superList newOptions


{-| This takes a list of strings and a list of options.
Then it selects any matching options (looking at values of the options).

It also deselects any options that are NOT in the the list of string.

-}
selectOptionsInOptionsListByString : List String -> OptionList -> OptionList
selectOptionsInOptionsListByString strings options =
    let
        optionsToSelect : List Option
        optionsToSelect =
            filter (Option.isValueInListOfStrings strings) options
                |> getOptions
    in
    selectOptions optionsToSelect options
        |> deselectEveryOptionExceptOptionsInList optionsToSelect


setSelectedOptionInNewOptions : SelectionMode.SelectionMode -> OptionList -> OptionList -> OptionList
setSelectedOptionInNewOptions selectionMode oldOptions newOptions =
    let
        oldSelectedOption : OptionList
        oldSelectedOption =
            oldOptions |> selectedOptions

        newSelectedOptions : OptionList
        newSelectedOptions =
            filter (\newOption_ -> hasOptionByValue newOption_ oldSelectedOption) newOptions
    in
    case selectionMode of
        SelectionMode.SingleSelect ->
            newOptions
                |> deselectAll
                |> selectOptions (take 1 newSelectedOptions |> getOptions)

        SelectionMode.MultiSelect ->
            selectOptions (newSelectedOptions |> getOptions) newOptions


transformOptionsToOutputStyle : SelectionMode.OutputStyle -> OptionList -> OptionList
transformOptionsToOutputStyle outputStyle options =
    mapValues (Option.transformOptionForOutputStyle outputStyle) options


selectedOptionsToTuple : OptionList -> List ( String, String )
selectedOptionsToTuple optionList =
    optionList |> selectedOptions |> getOptions |> List.map Option.toValueLabelTuple


{-| Take a list of string that are the values of options and an existing options list.
For each of these strings, if there is already an option with the same value, select it.
If there is not an option with the same value, create a new option with the value,
add it to the end of list of options and select it.

This function should be refactored because there is not enough information here to create
slotted lists. It should probably fail in the OptionsList type is not something this supports.

-}
addAndSelectOptionsInOptionsListByString : List String -> OptionList -> OptionList
addAndSelectOptionsInOptionsListByString strings optionList =
    let
        helper : Int -> List String -> OptionList -> OptionList
        helper index valueStrings optionList_ =
            case valueStrings of
                [] ->
                    optionList_

                [ valueString ] ->
                    if hasOptionByValueString valueString optionList_ then
                        selectOptionIByValueStringWithIndex index valueString optionList_

                    else
                        let
                            maybeSelectedOptions =
                                case optionList_ of
                                    FancyOptionList _ ->
                                        Just
                                            (FancyOptionList
                                                [ Option.FancyOption
                                                    (FancyOption.new valueString Nothing
                                                        |> FancyOption.select index
                                                    )
                                                ]
                                            )

                                    DatalistOptionList _ ->
                                        Just
                                            (DatalistOptionList
                                                [ Option.DatalistOption
                                                    (DatalistOption.newSelected (OptionValue.stringToOptionValue valueString) index)
                                                ]
                                            )

                                    SlottedOptionList _ ->
                                        Nothing
                        in
                        case maybeSelectedOptions of
                            Just selectedOptionsList_ ->
                                append optionList_ selectedOptionsList_

                            Nothing ->
                                optionList_

                valueString :: restOfValueStrings ->
                    if hasOptionByValueString valueString optionList_ then
                        helper (index + 1) restOfValueStrings (selectOptionIByValueStringWithIndex index valueString optionList_)

                    else
                        let
                            maybeSelectedOptions =
                                case optionList_ of
                                    FancyOptionList _ ->
                                        Just
                                            (FancyOptionList
                                                [ Option.FancyOption
                                                    (FancyOption.new valueString Nothing
                                                        |> FancyOption.select index
                                                    )
                                                ]
                                            )

                                    DatalistOptionList _ ->
                                        Just
                                            (DatalistOptionList
                                                [ Option.DatalistOption
                                                    (DatalistOption.newSelected (OptionValue.stringToOptionValue valueString) index)
                                                ]
                                            )

                                    SlottedOptionList _ ->
                                        Nothing
                        in
                        case maybeSelectedOptions of
                            Just selectedOptionsList_ ->
                                helper (index + 1) restOfValueStrings (append optionList_ selectedOptionsList_)

                            Nothing ->
                                optionList_
    in
    helper 0 strings optionList


selectedOptionValuesAreEqual : List String -> OptionList -> Bool
selectedOptionValuesAreEqual valuesAsStrings options =
    case options of
        FancyOptionList _ ->
            (options
                |> selectedOptions
                |> getOptions
                |> List.map Option.getOptionValue
                |> List.map OptionValue.optionValueToString
            )
                == valuesAsStrings

        DatalistOptionList _ ->
            (options
                |> selectedOptions
                |> filter (Option.isEmpty >> not)
                |> getOptions
                |> List.map Option.getOptionValue
                |> List.map OptionValue.optionValueToString
            )
                == valuesAsStrings

        SlottedOptionList _ ->
            (options
                |> selectedOptions
                |> getOptions
                |> List.map Option.getOptionValue
                |> List.map OptionValue.optionValueToString
            )
                == valuesAsStrings


updateOptionsWithNewSearchResults : List OptionSearchFilterWithValue -> OptionList -> OptionList
updateOptionsWithNewSearchResults optionSearchFilterWithValues optionList =
    let
        findNewSearchFilterResult : OptionValue -> List OptionSearchFilterWithValue -> Maybe OptionSearchFilterWithValue
        findNewSearchFilterResult optionValue results =
            List.Extra.find (\result -> result.value == optionValue) results
    in
    map
        (\option ->
            case findNewSearchFilterResult (Option.getOptionValue option) optionSearchFilterWithValues of
                Just result ->
                    Option.setOptionSearchFilter result.maybeSearchFilter option

                Nothing ->
                    Option.setOptionSearchFilter Nothing option
        )
        optionList


allOptionsAreValid : OptionList -> Bool
allOptionsAreValid optionList =
    all Option.isValid optionList


hasAnyPendingValidation : OptionList -> Bool
hasAnyPendingValidation optionList =
    any Option.isPendingValidation optionList


hasAnyValidationErrors : OptionList -> Bool
hasAnyValidationErrors optionList =
    any Option.isInvalid optionList


setAge : OptionDisplay.OptionAge -> OptionList -> OptionList
setAge optionAge optionList =
    map (Option.setOptionDisplayAge optionAge) optionList


updateAge : SelectionMode.OutputStyle -> SearchString -> OutputStyle.SearchStringMinimumLength -> OptionList -> OptionList
updateAge outputStyle searchString searchStringMinimumLength optionList =
    case outputStyle of
        SelectionMode.CustomHtml ->
            case searchStringMinimumLength of
                OutputStyle.FixedSearchStringMinimumLength min ->
                    if SearchString.length searchString > PositiveInt.toInt min then
                        optionList

                    else
                        setAge OptionDisplay.MatureOption optionList

                OutputStyle.NoMinimumToSearchStringLength ->
                    optionList

        SelectionMode.Datalist ->
            setAge OptionDisplay.MatureOption optionList


determineListType : List Option -> Result String OptionList
determineListType options =
    if allFancyOptions options then
        FancyOptionList [] |> Ok

    else if allDatalistOptions options then
        DatalistOptionList [] |> Ok

    else if allSlottedOptions options then
        SlottedOptionList [] |> Ok

    else
        Err "The list of options must be all FancyOptions, all DatalistOptions, or all SlottedOptions"


toDatalistOptionList : OptionList -> OptionList
toDatalistOptionList optionList =
    case optionList of
        FancyOptionList options ->
            DatalistOptionList (List.map Option.toDatalistOption options)

        DatalistOptionList _ ->
            optionList

        SlottedOptionList options ->
            DatalistOptionList (List.map Option.toDatalistOption options)


isSlottedOptionList : OptionList -> Bool
isSlottedOptionList optionList =
    case optionList of
        SlottedOptionList _ ->
            True

        _ ->
            False


decoder : OutputStyle -> Json.Decode.Decoder OptionList
decoder outputStyle =
    decoderWithAge OptionDisplay.MatureOption outputStyle


decoderWithAge : OptionDisplay.OptionAge -> OutputStyle -> Json.Decode.Decoder OptionList
decoderWithAge optionAge outputStyle =
    case outputStyle of
        CustomHtml ->
            Json.Decode.list (Option.decoderWithAgeAndOutputStyle optionAge outputStyle)
                |> Json.Decode.andThen
                    (\options ->
                        case determineListType options of
                            Ok optionList ->
                                case optionList of
                                    FancyOptionList _ ->
                                        Json.Decode.succeed (FancyOptionList options)

                                    DatalistOptionList _ ->
                                        Json.Decode.fail "If the output style is Custom HTML the list of options must FancyOptionList or SlottedOptionList"

                                    SlottedOptionList _ ->
                                        Json.Decode.succeed (SlottedOptionList options)

                            Err err ->
                                Json.Decode.fail err
                    )

        Datalist ->
            Json.Decode.map DatalistOptionList
                (Json.Decode.list
                    (Json.Decode.map
                        Option.DatalistOption
                        DatalistOption.decoder
                    )
                )


encode : OptionList -> Json.Encode.Value
encode optionList =
    Json.Encode.list Option.encode (getOptions optionList)


encodeSearchResults : OptionList -> Int -> Bool -> Json.Encode.Value
encodeSearchResults optionList nonce isClearingList =
    Json.Encode.object
        [ ( "searchNonce", Json.Encode.int nonce )
        , ( "clearingSearch", Json.Encode.bool isClearingList )
        , ( "options", Json.Encode.list Option.encodeSearchResult (getOptions optionList) )
        ]


optionTypeMatches : Option -> OptionList -> Bool
optionTypeMatches option optionList =
    case optionList of
        FancyOptionList _ ->
            case option of
                Option.FancyOption _ ->
                    True

                _ ->
                    False

        DatalistOptionList _ ->
            case option of
                Option.DatalistOption _ ->
                    True

                _ ->
                    False

        SlottedOptionList _ ->
            case option of
                Option.SlottedOption _ ->
                    True

                _ ->
                    False


test_newFancyOptionList : List Option -> OptionList
test_newFancyOptionList options =
    FancyOptionList options


test_newDatalistOptionList : List Option -> OptionList
test_newDatalistOptionList options =
    DatalistOptionList options
