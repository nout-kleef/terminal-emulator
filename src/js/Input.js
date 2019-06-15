class Input {
  constructor(input) {
    this._input = input; // Keystroke instance
  }
  emulate(emulator, output, queue) {
    emulator.changeState(1);
    const preEmulationHtml = $(emulator.element).html();
    this._input.emulate(emulator, output, queue, preEmulationHtml);
  }
  static get cursorHtml() {
    return "<div class='cursor" + (cursorsCurrentlyShown ? " shown" : "") +
    "'></div>";
  }
}

// "static properties"
Input.DOMOpen = "<div class='input'><div class='line'>";
Input.DOMClose = "</div></div>";
