import MuchSelect from "./much-select.js";

import makeLogEventHandler from "./event-logger.js";

if (!customElements.get("much-select")) {
  // Putting guard rails around this because browsers do not like
  //  having the same custom element defined more than once.
  window.customElements.define("much-select", MuchSelect);
}

window.makeLogEventHandler = makeLogEventHandler;
