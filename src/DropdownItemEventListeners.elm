module DropdownItemEventListeners exposing (DropdownItemEventListeners)

import OptionValue exposing (OptionValue)


type alias DropdownItemEventListeners msg =
    { mouseOverMsgConstructor : OptionValue -> msg
    , mouseOutMsgConstructor : OptionValue -> msg
    , mouseDownMsgConstructor : OptionValue -> msg
    , mouseUpMsgConstructor : OptionValue -> msg
    , noOpMsgConstructor : msg
    }
