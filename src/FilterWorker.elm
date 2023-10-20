port module FilterWorker exposing (..)

import DropdownOptions
import Json.Decode
import Json.Encode
import OptionList exposing (OptionList(..))
import OptionSearcher exposing (decodeSearchParams)
import Platform
import SelectionMode exposing (SelectionConfig)


type Msg
    = UpdateOptions Json.Decode.Value
    | UpdateSearchString Json.Decode.Value


init : () -> ( OptionList, Cmd msg )
init _ =
    ( FancyOptionList [], Cmd.none )


update : Msg -> OptionList -> ( OptionList, Cmd msg )
update msg options =
    case msg of
        UpdateOptions optionsJson ->
            case Json.Decode.decodeValue (OptionList.decoder SelectionMode.CustomHtml) optionsJson of
                Ok newOptions ->
                    ( newOptions, Cmd.none )

                Err error ->
                    ( FancyOptionList [], sendErrorMessage (Json.Decode.errorToString error) )

        UpdateSearchString jsonSearchParams ->
            case Json.Decode.decodeValue decodeSearchParams jsonSearchParams of
                Ok searchParams ->
                    let
                        newOptions =
                            OptionSearcher.updateOptionsWithSearchString searchParams.searchString
                                searchParams.searchStringMinimumLength
                                options

                        optionsToSend =
                            DropdownOptions.filterOptionsToShowInDropdownBySearchScore newOptions
                                -- TODO this number is arbitrary.
                                |> OptionList.take 100
                    in
                    ( newOptions
                    , sendSearchResults
                        (OptionList.encodeSearchResults optionsToSend
                            searchParams.searchNonce
                            searchParams.clearingSearch
                        )
                    )

                Err error ->
                    ( options, sendErrorMessage (Json.Decode.errorToString error) )


subscriptions : OptionList -> Sub Msg
subscriptions _ =
    Sub.batch
        [ receiveOptions UpdateOptions
        , receiveSearchString UpdateSearchString
        ]


main : Program () OptionList Msg
main =
    Platform.worker { init = init, update = update, subscriptions = subscriptions }


port receiveOptions : (Json.Decode.Value -> msg) -> Sub msg


port receiveSearchString : (Json.Decode.Value -> msg) -> Sub msg


port sendSearchResults : Json.Encode.Value -> Cmd msg


port sendErrorMessage : String -> Cmd msg
