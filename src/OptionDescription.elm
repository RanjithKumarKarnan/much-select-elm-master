module OptionDescription exposing (OptionDescription, decoder, new, noDescription, orOptionDescriptions, toBool, toSearchString, toString)

import Json.Decode


type OptionDescription
    = OptionDescription String (Maybe String)
    | NoDescription


new : String -> OptionDescription
new string =
    OptionDescription string Nothing


noDescription : OptionDescription
noDescription =
    NoDescription


toString : OptionDescription -> String
toString optionDescription =
    case optionDescription of
        OptionDescription string _ ->
            string

        NoDescription ->
            ""


toSearchString : OptionDescription -> String
toSearchString optionDescription =
    case optionDescription of
        OptionDescription description maybeCleanDescription ->
            case maybeCleanDescription of
                Just cleanDescription ->
                    cleanDescription

                Nothing ->
                    String.toLower description

        NoDescription ->
            ""


toBool : OptionDescription -> Bool
toBool optionDescription =
    case optionDescription of
        OptionDescription _ _ ->
            True

        NoDescription ->
            False


orOptionDescriptions : OptionDescription -> OptionDescription -> OptionDescription
orOptionDescriptions optionDescriptionA optionDescriptionB =
    case optionDescriptionA of
        OptionDescription _ _ ->
            optionDescriptionA

        NoDescription ->
            case optionDescriptionB of
                OptionDescription _ _ ->
                    optionDescriptionB

                NoDescription ->
                    optionDescriptionB


decoder : Json.Decode.Decoder OptionDescription
decoder =
    Json.Decode.oneOf
        [ Json.Decode.map2 OptionDescription
            (Json.Decode.field "description" Json.Decode.string)
            (Json.Decode.field "descriptionClean" (Json.Decode.nullable Json.Decode.string))
        , Json.Decode.succeed NoDescription
        ]
