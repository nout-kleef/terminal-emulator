const PACKAGE_TAG = "[terminal-emulator] - ";
let cursorsCurrentlyShown = true;
let cursorBlinking;

// event listeners
if (document.addEventListener)
  document.addEventListener("DOMContentLoaded", terminalEmulatorInit, false);
else if (document.attachEvent)
  document.attachEvent("onreadystatechange", terminalEmulatorInit);
else window.onload = terminalEmulatorInit;

// calls client's implementations at right times
function terminalEmulatorInit() {
  if (DEBUG) console.log(PACKAGE_TAG + "DOM ready; initialising ...");
  // simulate cursor blinking
  cursorBlinking = setInterval(cursorBlink, Emulator.cursorInterval);
  // wait for page load
  if (window.addEventListener)
    window.addEventListener("load", terminalEmulatorPageloadedWrapper, false);
  else if (window.attachEvent)
    window.attachEvent("onload", terminalEmulatorPageloadedWrapper);
  // call DOMReady
  if (typeof terminalEmulatorDOMReady === "function")
    return terminalEmulatorDOMReady();
  else {
    console.warn(PACKAGE_TAG +
      "terminalEmulatorDOMReady() should be defined!");
    return 1;
  }
}

function terminalEmulatorPageloadedWrapper() {
  if (DEBUG) console.log(PACKAGE_TAG +
    "Page loaded; initialising trigger(s) ...");
  if (typeof $ !== "function")
    console.error(PACKAGE_TAG + "you need to load JQuery before loading me!");
  if (typeof terminalEmulatorPageloaded === "function")
    return terminalEmulatorPageloaded();
  else {
    console.warn(PACKAGE_TAG +
      "terminalEmulatorPageLoaded() should be defined!");
    return 1;
  }
}

function cursorBlink() {
  if (cursorsCurrentlyShown) {
    $(".input .line .cursor").removeClass("shown");
    cursorsCurrentlyShown = false;
  } else {
    $(".input .line .cursor").addClass("shown");
    cursorsCurrentlyShown = true;
  }
}
