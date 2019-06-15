class Keystroke {
  constructor(text, css, tabs) {
    const realText = text; // prevent replacement changes
    this.readLength = text.replace(/\s/g, '').length;
    this._text = realText;
    this._css = css;
    this._tabs = tabs;
  }
  toString(cutoff, isInput, emulator, insertCursor) {
    let representation = isInput ? Input.DOMOpen + Keystroke.prompt(emulator) +
    Keystroke.location(emulator) : "";
    representation += Keystroke._DOMOpen(this._css);
    if(typeof cutoff === "number") {
      // used for emulation (input)
      representation += this._text.substring(0, cutoff + 1);
    } else {
      // used for simple display calls (output)
      representation += this._text + Keystroke._tabString(this._tabs);
    }
    representation += Keystroke._DOMClose; // close off keystroke
    representation += insertCursor ? Input.cursorHtml : ""; // add cursor
    representation += isInput ? Input.DOMClose : "";
    return representation;
  }
  emulate(emulator, output, queue, preEmulationHtml) {
    this._type(emulator, output, queue, preEmulationHtml, 0);
  }
  _type(emulator, output, queue, preEmulationHtml, currentCutoff) {
    // update emulator html
    const representation = Command.DOMOpen(false) +
    this.toString(currentCutoff, true, emulator, true) + Command.DOMClose;
    $(emulator.element).html(preEmulationHtml + representation);
    // update & callback
    if(currentCutoff >= this._text.length - 1) {
      // end reached. pause and show output
      setTimeout(function() {
        output.emulate(
          emulator, preEmulationHtml, this.toString(void(0), true, emulator)
        );
      }.bind(this), Emulator.enterPause);
    } else {
      const lottery = Math.random();
      let newCutoff = currentCutoff;
      if(lottery < Emulator.backspaceProb) {
        // undo last character
        newCutoff = Math.max(0, currentCutoff - 1);
      } else if(lottery >= Emulator.backspaceProb + Emulator.idleProb) {
        // "type"
        newCutoff = Math.min(currentCutoff + 1, this._text.length - 1);
      } // else: idle
      setTimeout(function() {
        this._type(emulator, output, queue, preEmulationHtml, newCutoff);
      }.bind(this), Emulator.emulationSpeed);
    }
  }
  static prompt(emulator) {
    return "<span class='prompt'>" + emulator.user + "@" + emulator.sys + "</span>:";
  }
  static location(emulator) {
    return "<span class='location'>" + emulator.location + "</span>&nbsp;";
  }
  static _DOMOpen(css) {
    return "<span class='" + css + "'>";
  }
  static _tabString(n) {
    return "&nbsp;".repeat(4 * n);
  }
}

// "static properties"
Keystroke._DOMClose = "</span>";
