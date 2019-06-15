let emulator;
let cursorsCurrentlyShown = true;
let cursorBlinking;

function emulatorInit() {
  // initiate
  emulator = new Emulator([
    new Command(
      new Input(
        new Keystroke("init", "white", 0)
      ),
      new Output([
        new Line([
          new Keystroke("good&nbsp;", "white", 0),
          new Keystroke("morning ", "white", 0),
          new Keystroke("fellow ", "green", 0),
          new Keystroke("internet ", "blue", 0),
          new Keystroke("user", "red", 0),
          new Keystroke("!!! ", "yellow", 0)
        ]), new Line([
          new Keystroke("I am ", "magenta", 0),
          new Keystroke("noot-noot ", "cyan", 0)
        ])
      ])
    ), new Command(
      new Input(
        new Keystroke("ls", "magenta", 0)
      ),
      new Output([
        new Line([
          new Keystroke("css", "blue", 1),
          new Keystroke("index.html", "white", 1),
          new Keystroke("less", "blue", 0)
        ]), new Line([
          new Keystroke("node_modules", "blue", 1),
          new Keystroke("package.json", "white", 1)
        ]), new Line([
          new Keystroke("node_modules", "blue", 1),
          new Keystroke("package.json", "white", 1)
        ]), new Line([
          new Keystroke("node_modules", "blue", 1),
          new Keystroke("package.json", "white", 1)
        ]), new Line([
          new Keystroke("node_modules", "blue", 1),
          new Keystroke("package.json", "white", 1)
        ]), new Line([
          new Keystroke("node_modules", "blue", 1),
          new Keystroke("package.json", "white", 1)
        ]), new Line([
          new Keystroke("node_modules", "blue", 1),
          new Keystroke("package.json", "white", 1)
        ]), new Line([
          new Keystroke("website", "blue", 1),
          new Keystroke("js", "blue", 0)
        ])
      ])
    ), new Command(
      new Input(
        new Keystroke("init", "white", 0)
      ),
      new Output([
        new Line([
          new Keystroke("goo d&nbsp;", "white", 0),
          new Keystroke("morning ", "white", 0),
          new Keystroke("fellow ", "green", 0),
          new Keystroke("internet ", "blue", 0),
          new Keystroke("user", "red", 0),
          new Keystroke("!!! ", "yellow", 0)
        ]), new Line([
          new Keystroke("I am ", "magenta", 0),
          new Keystroke("noot-noot ", "cyan", 0)
        ])
      ])
    )
  ], $("#emulator0"));
  // hide by default
  $(".emulator-container .emulator").addClass("hidden");
  $(".emulator-container .emulator.hidden .command-container")
  .not(":last")
  .addClass("hidden");
  // simulate cursor blinking
  cursorBlinking = setInterval(cursorBlink, Emulator.cursorInterval);
  // set up the possibility of user input
  $(document).keyup(emulator.readUserInput.bind(emulator));
  return 0;
}

function cursorBlink() {
  if(cursorsCurrentlyShown) {
    $(".input .line .cursor").removeClass("shown");
    cursorsCurrentlyShown = false;
  } else {
    $(".input .line .cursor").addClass("shown");
    cursorsCurrentlyShown = true;
  }
}
