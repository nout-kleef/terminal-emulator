class Emulator {
  constructor(commands, element, user, machine, emulationSpeed, readingSpeed) {
    this.user = user;
    this.sys = machine;
    this.location = "~";
    this.pendingInput = "";
    this.commands = commands;
    this.element = element;
    this.emulationSpeed = emulationSpeed;
    this.readingSpeed = readingSpeed;
  }
  emulate() {
    if (this.commands.length === 0) {
      console.log("Emulate called on empty emulator. Aborting..");
      return 1;
    }
    // split into current and tail
    const currentCommand = this.commands.splice(0, 1);
    currentCommand[0].emulate(this, this.commands);
  }
  fastEmulate() {
    if (this.commands.length === 0) {
      console.log("Fast emulate called on empty emulator. Aborting..");
      return 1;
    }
    while (this.commands.length > 0) {
      this.changeState(1);
      this.changeState(2);
      const currentCommand = this.commands.splice(0, 1);
      currentCommand[0].fastEmulate(this);
      this.scrollBottom();
      this.changeState(3);
    }
  }
  readUserInput(e) {
    switch (true) {
      case e.keyCode === 8: // backspace
        this.scrollBottom();
        this.undoChar(1);
        break;
      case e.keyCode >= 65 && e.keyCode <= 90: // a-Z
        this.scrollBottom();
        this.read(e.key);
        break;
      case e.keyCode === 32: // space
        this.scrollBottom();
        this.read(" ");
        break;
      case e.keyCode === 13: // enter key
        this.scrollBottom();
        this.evaluate(this.pendingInput);
        // this.changeState(2);
        break;
      default:
        if (DEBUG) console.log("unknown key pressed", e.keyCode, e);
    }
  }
  scrollBottom() {
    // scroll to bottom of container
    if (DEBUG) console.log("scrolling to bottom of container");
    let container = $(this.element).parent();
    container.scrollTop(container.prop("scrollHeight"));
  }
  undoChar(n) {
    this.pendingInput.slice(0, -n);
  }
  read(input) {
    if (this._state !== 3) return -1;
    if (DEBUG) console.log("reading '" + input + "'..");
    this.pendingInput += input;
    // update current
    $(".command-container.temp").replaceWith(Command.pendingCommand(emulator));
  }
  evaluate(input) {
    if (DEBUG) console.info("[EMULATOR] evaluating '" + input + "'..");
    // temporary solution, see issue #3
    const output = "That didn't work..<br>Try something else?";
    // $(this.element).find(".command-container.temp").removeClass("temp");
    this.commands.push(
      new Command(
        new Input(new Keystroke(input, "white", 0)),
        new Output([
          new Line([new Keystroke(output, "yellow", 0)])
        ])
      )
    );
    this.fastEmulate();
  }
  changeState(newState) {
    this._state = newState;
    switch (newState) {
      case 1: // emulating input
        // get rid of aesthetic, temporary commands
        $(".command-container.temp").remove();
        Emulator.logState(newState, "emulating");
        $(this.element)
          .removeClass("hidden writing reading idle")
          .addClass("emulating");
        break;
      case 2: // writing output
        Emulator.logState(newState, "writing");
        this.pendingInput = "";
        $(this.element)
          .removeClass("hidden emulating reading idle")
          .addClass("writing");
        break;
      case 3: // reading input
        Emulator.logState(newState, "reading");
        $(this.element)
          .removeClass("hidden emulating writing idle")
          .addClass("reading");
        break;
      case 4: // hidden
        Emulator.logState(newState, "hidden");
        $(this.element)
          .removeClass("emulating writing reading idle")
          .addClass("hidden");
        break;
      default: // idle
        this._state = -1;
        Emulator.logState(newState, "idle");
        $(this.element)
          .removeClass("hidden emulating writing reading")
          .addClass("idle");
    }
  }
  static logState(stateId, stateName) {
    if (DEBUG) console.info("[EMULATOR] changing state to '" + stateId +
      "',\n i.e.: '" + stateName + "'..");
  }
}

// "static properties"
Emulator.enterPause = 500; // timeout before "pressing enter"
Emulator.backspaceProb = 0.1; // probability of undoing a character
Emulator.idleProb = 0.2; // probability of doing nothing
Emulator.cursorInterval = 700; // blinking interval (ms)
