class Command {
  constructor(input, output) {
    this.readLength = 0;
    this._i = input; // Input instance
    this._o = output; // Output instance
    this.readLength = input.readLength + output.readLength;
  }
  emulate(emulator, queue) {
    /* emulating _i asynchronously takes care of _o, and all
    following commands. */
    this._i.emulate(emulator, this._o, queue);
  }
  fastEmulate(emulator) {
    $(emulator.element).append(Command.DOMOpen(false) +
    this._i._input.toString(this._i._input._text.length - 1,
      true, emulator, false) + this._o.toString() + Command.DOMClose +
    Command.pendingCommand(emulator));
  }
  static pendingCommand(emulator) {
    return Command.DOMOpen(true) + Input.DOMOpen + Keystroke.prompt(emulator) +
    Keystroke.location(emulator) + emulator.pendingInput + Input.cursorHtml +
    Input.DOMClose + Command.DOMClose;
  }
  static DOMOpen(isTemp) {
    return "<div class='command-container" +
    (isTemp ? " temp" : "") + "'>";
  }
}

// "static properties"
Command.DOMClose = "</div>";
