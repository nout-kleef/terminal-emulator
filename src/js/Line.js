class Line {
  constructor(keystrokes) {
    this.readLength = 0;
    this._keystrokes = keystrokes;
    for(let i = 0; i < keystrokes.length; i++)
      this.readLength += keystrokes[i].readLength;
  }
  toString(cutoff, displayCursor) {
    let representation = Line._DOMOpen;
    for(let i = 0; i < this._keystrokes.length; i++)
      representation += this._keystrokes[i].toString();
    if(displayCursor) representation += Input.cursorHtml();
    return representation + Line._DOMClose;
  }
}

// "static properties"
Line._DOMOpen = "<div class='line'>";
Line._DOMClose = "</div>";
