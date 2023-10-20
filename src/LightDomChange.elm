module LightDomChange exposing (..)

import Json.Encode


type LightDomChange
    = AddUpdateAttribute String String
    | RemoveAttribute String
    | UpdateSelectedValue Json.Encode.Value


encode : LightDomChange -> Json.Encode.Value
encode lightDomChange =
    case lightDomChange of
        AddUpdateAttribute name value ->
            Json.Encode.object
                [ ( "changeType", Json.Encode.string "add-update-attribute" )
                , ( "name", Json.Encode.string name )
                , ( "value", Json.Encode.string value )
                ]

        RemoveAttribute name ->
            Json.Encode.object
                [ ( "changeType", Json.Encode.string "remove-attribute" )
                , ( "name", Json.Encode.string name )
                ]

        UpdateSelectedValue data ->
            Json.Encode.object
                [ ( "changeType", Json.Encode.string "update-selected-value" )
                , ( "data", data )
                ]
