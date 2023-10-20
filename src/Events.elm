module Events exposing (..)

{-| Performs the mousedown event, but also prevent default.

We used to also stop propagation but that is actually a problem because that stops all the click events
default actions from being suppressed (I think).

-}

import Html
import Html.Events
import Json.Decode


mouseDownPreventDefault : msg -> Html.Attribute msg
mouseDownPreventDefault message =
    Html.Events.custom "mousedown"
        (Json.Decode.succeed
            { message = message
            , stopPropagation = False
            , preventDefault = True
            }
        )


{-| Performs the mousedown event, but also prevent default.

We used to also stop propagation but that is actually a problem because that stops all the click events
default actions from being suppressed (I think).

-}
mouseUpPreventDefault : msg -> Html.Attribute msg
mouseUpPreventDefault message =
    Html.Events.custom "mouseup"
        (Json.Decode.succeed
            { message = message
            , stopPropagation = False
            , preventDefault = True
            }
        )


{-| Performs the event onClick, but also prevent default.

We used to also stop propagation but that is actually a problem because we want

-}
onClickPreventDefault : msg -> Html.Attribute msg
onClickPreventDefault message =
    Html.Events.custom "click"
        (Json.Decode.succeed
            { message = message
            , stopPropagation = False
            , preventDefault = True
            }
        )


onClickPreventDefaultAndStopPropagation : msg -> Html.Attribute msg
onClickPreventDefaultAndStopPropagation message =
    Html.Events.custom "click"
        (Json.Decode.succeed
            { message = message
            , stopPropagation = True
            , preventDefault = True
            }
        )


onMouseDownStopPropagationAndPreventDefault : msg -> Html.Attribute msg
onMouseDownStopPropagationAndPreventDefault message =
    Html.Events.custom "mousedown"
        (Json.Decode.succeed
            { message = message
            , stopPropagation = True
            , preventDefault = True
            }
        )


onMouseDownStopPropagation : msg -> Html.Attribute msg
onMouseDownStopPropagation message =
    Html.Events.custom "mousedown"
        (Json.Decode.succeed
            { message = message
            , stopPropagation = True
            , preventDefault = False
            }
        )


onMouseUpStopPropagationAndPreventDefault : msg -> Html.Attribute msg
onMouseUpStopPropagationAndPreventDefault message =
    Html.Events.custom "mouseup"
        (Json.Decode.succeed
            { message = message
            , stopPropagation = True
            , preventDefault = True
            }
        )


onMouseUpStopPropagation : msg -> Html.Attribute msg
onMouseUpStopPropagation message =
    Html.Events.custom "mouseup"
        (Json.Decode.succeed
            { message = message
            , stopPropagation = True
            , preventDefault = False
            }
        )
