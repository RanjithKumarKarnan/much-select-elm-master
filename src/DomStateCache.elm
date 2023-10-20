module DomStateCache exposing (CustomOptionsAttribute(..), DisabledAttribute(..), DomStateCache, OutputStyleAttribute(..), test_defaultDomStateCache, updateAllowCustomOptions, updateDisabledAttribute, updateOutputStyle)


type alias DomStateCache =
    { allowCustomOptions : CustomOptionsAttribute
    , outputStyle : OutputStyleAttribute
    , disabled : DisabledAttribute

    -- loading
    -- show-dropdown-footer
    }


type CustomOptionsAttribute
    = CustomOptionsNotAllowed
    | CustomOptionsAllowed
    | CustomOptionsAllowedWithHint String


type OutputStyleAttribute
    = OutputStyleDatalist
    | OutputStyleCustomHtml


type DisabledAttribute
    = HasDisabledAttribute
    | NoDisabledAttribute


updateAllowCustomOptions : CustomOptionsAttribute -> DomStateCache -> DomStateCache
updateAllowCustomOptions customOptions domStateCache =
    { domStateCache | allowCustomOptions = customOptions }


updateOutputStyle : OutputStyleAttribute -> DomStateCache -> DomStateCache
updateOutputStyle outputStyleAttribute domStateCache =
    { domStateCache | outputStyle = outputStyleAttribute }


updateDisabledAttribute : DisabledAttribute -> DomStateCache -> DomStateCache
updateDisabledAttribute disabledAttribute domStateCache =
    { domStateCache | disabled = disabledAttribute }


test_defaultDomStateCache : DomStateCache
test_defaultDomStateCache =
    { allowCustomOptions = CustomOptionsNotAllowed
    , outputStyle = OutputStyleCustomHtml
    , disabled = NoDisabledAttribute
    }
