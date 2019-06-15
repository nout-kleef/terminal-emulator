class Output {
  constructor(output) {
    this.readLength = 0;
    this._output = output; // array of Line instances
    for(let i = 0; i < output.length; i++)
      this.readLength += output[i].readLength;
  }
  toString() {
    let representation = Output._DOMOpen;
    for(let i = 0; i < this._output.length; i++)
      representation += this._output[i].toString();
    return representation + Output._DOMClose;
  }
  pauseDuration() {
    const duration = this.readLength * Emulator.readingSpeed;
    return DEBUG ? duration * .3 : duration;
  }
  emulate(emulator, preEmulationHtml, inputRepresentation) {
    emulator.changeState(2);
    this.write(emulator, preEmulationHtml, inputRepresentation);
    // on to the next round
    emulator.changeState(3);
    if(emulator.commands.length > 0) {
      const nextCommand = emulator.commands.splice(0, 1);
      setTimeout(function() {
        nextCommand[0].emulate(emulator, emulator.commands);
      }, this.pauseDuration());
    }
  }
  write(emulator, preEmulationHtml, inputRepresentation) {
    $(emulator.element).html(
      preEmulationHtml + Command.DOMOpen(false) + inputRepresentation +
      this.toString() + Command.DOMClose + Command.pendingCommand(emulator)
    );
    emulator.scrollBottom();
  }
}

// "static properties"
Output._DOMOpen = "<div class='output'>";
Output._DOMClose = "</div>";
