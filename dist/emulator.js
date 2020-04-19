let emulator;

function terminalEmulatorDOMReady() {
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
    ], $("#emulator0"), "root", "localhost", 160, 200);
    // hide by default
    $(".emulator-container .emulator").addClass("hidden");
    $(".emulator-container .emulator.hidden .command-container")
        .not(":last")
        .addClass("hidden");
    return 0;
}

function terminalEmulatorPageloaded() {
    // you have many options when deciding when to start emulation:

    /* SCROLLING - once emulator-container is in view
        note that this requires content to actually fill up more
        than the window's height */
    // $(window).scroll(emulatorBehaviour);

    // DELAY - simply wait for a bit
    setTimeout(emulatorBehaviour, 2500);

    /* ANYTHING ELSE - obviously, you can use whatever you fancy.
        if you're feeling particularly generous, you
        could add some implementation here and submit a pull request! */

    return 0;
}

// trigger handler example
function emulatorBehaviour() {
    // emulator animations
    $(".emulator-container .emulator.hidden").each(function () {
        if (elementInView($(this).parent())) {
            emulator.changeState();
            emulator.emulate(this);
        }
    });

    // helper function: determine whether a (DOM) Emulator is in view
    function elementInView(elem) {
        const docViewTop = $(window).scrollTop(); // distance to top of doc
        const docViewBottom = docViewTop + $(window).height();
        const elemTop = $(elem).offset().top; // distance to top of doc
        const elemHeight = $(elem).height();
        return docViewTop <= elemTop && docViewBottom >= elemTop + elemHeight;
    }
}
