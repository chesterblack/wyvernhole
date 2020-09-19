// ----- ----- ----- //
//    GLOBAL VARS    //
// ----- ----- ----- //
const body = document.getElementById("body");
const textBox = document.getElementById("text");
const responseBox = document.getElementById("responses");
const dialogueBox = document.getElementById("dialogue");
const goldBox = document.getElementById("gold");
const moneyMessageBox = document.getElementById("money-message");
const drunkennessBox = document.getElementById("drunkenness-counter");
const drunkBox = document.getElementById("drunk");
const optionsMenu = document.getElementById('options');
const textSpeedInput = document.getElementById('text-speed');
const saveGameOutput = document.getElementById('save-game');
const loadGameInput = document.getElementById('load-game');

let speed = 10;
let health = 100;
let gold = 10;
let drunkenness = 0;

let saveCode = {
    r: 1,
    h: health,
    g: gold,
    s: speed,
    d: drunkenness
};

// ----- ----- ----- //
//     FUNCTIONS     //
// ----- ----- ----- //
function ajax(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.send(null);

    xhr.onreadystatechange = function () {
        var DONE = 4;
        var OK = 200;
        if (xhr.readyState === DONE) {
            if (xhr.status === OK) {
                callback(xhr.responseText);
            } else {
                console.log('Error: ' + xhr.status);
            }
        }
    };
}

/**
 * 
 * Types out the text given one letter at a time like a typewriter
 * 
 * @param {string} txt Text to be typewritered out
 * @param {object} target Where the text needs to go
 * @param {function} callback What to do once the text has been typed
 */
function typeWriter(txt, target, callback) {
    responseBox.innerHTML = "";
    let i = 0;
    typeText();
    function typeText() {
        if (i < txt.length) {
            target.innerHTML += txt.charAt(i);
            i++;
            setTimeout(typeText, speed);
        } else {
            callback();
        }
    }
}

/**
 * 
 * Creates an option button
 * 
 * @param {string} text the text to go in the button
 * @param {integer} id the room id of where the button goes
 * 
 * @returns {string} the button HTML
 */
function createChoiceBox(text, id) {
    return "<button onclick=\"writeOutRoom("+id+")\">"+text+"</button>";
}

/**
 * 
 * Adds the option buttons to the responses div
 * 
 * @param {array} choices array of objects with text and ids to create the option buttons
 */
function presentChoices(choices) {
    setTimeout(() => {
        for (let i = 0; i < choices.length; i++) {
            responseBox.innerHTML += createChoiceBox(choices[i].text, choices[i].id);
        }
    }, speed*20);
}

/**
 * 
 * Creates empty HTML element of the correct colour
 * 
 * @param {object} speaker speaker obj containing color (for text)
 * @returns {element} span element
 */
function createDialogueBox(speaker) {
    let span = document.createElement("span");
    span.classList.add("speaker");
    span.style.color = speaker.color;
    dialogueBox.appendChild(span);
    return span;
}

/**
 * 
 * Write out the i of an array of dialogue objects, then callback itself until all the dialogues are done
 * 
 * @param {array} dialogue array of objects containing speaker obj and message string
 * @param {integer} i which index of the array are we up to
 * @param {function} callback what to do once all the dialogue texts have been written
 */
function writeOutDialogue(dialogue, i, callback) {
    let target;
    if (dialogue.length == i) {
        callback();
    } else {
        target = createDialogueBox(dialogue[i].speaker);
        typeWriter(
            dialogue[i].speaker.name+": "+dialogue[i].message, 
            target, 
            () => {
                writeOutDialogue(dialogue, i+1, callback);
            }
        )
    }
}

/**
 * 
 * Fetches room data from the database based on id given, then prints out the message and presents the options of a room
 * 
 * @param {integer} id the id of the room to present
 * 
 */
function writeOutRoom(id) {
    let url = '/game.php?function=fetchRoom&room=' + id;
    responseBox.innerHTML = "";
    textBox.innerHTML = "";
    dialogueBox.innerHTML = "";
    moneyMessageBox.innerHTML = "";

    ajax(url, (response) => {
        roomData = JSON.parse(response);
        if (roomData.effects && roomData.effects.drunk) {
            drunkenness += roomData.effects.drunk;
            body.style.filter = "blur("+(drunkenness / 10)+"px)";
            drunk.innerHTML = drunkenness;
            drunkennessBox.style.display = "block";
        } else if (drunkenness > 0) {
            drunkenness -= 1;
            body.style.filter = "blur("+(drunkenness / 10)+"px)";
            drunk.innerHTML = drunkenness;
            drunkennessBox.style.display = "block";
            if (drunkenness == 0) {
                body.style.filter = "blur(0)";
                drunkennessBox.style.display = "none";
            }
        } else {
            body.style.filter = "blur(0)";
            drunkennessBox.style.display = "none";
        }
        if (roomData.effects && roomData.effects.gold) {
            if ((gold += roomData.effects.gold) < 0) {
                moneyMessageBox.innerHTML = "Insufficient Gold";
                writeOutRoom(roomData.effects.fallback);
                saveGame(fallback);
                return;
            } else {
                moneyMessageBox.classList.add("active");
                moneyMessageBox.innerHTML = roomData.effects.gold + "gp";
                goldBox.innerHTML = gold + "gp";
                setTimeout(() => {
                    moneyMessageBox.innerHTML = "";
                    moneyMessageBox.classList.remove("active");
                }, 1000);
            }
        }

        typeWriter(roomData.message, textBox, () => {
            if (roomData.dialogue) {
                writeOutDialogue(roomData.dialogue, 0, () => {
                    presentChoices(roomData.options);
                });
            } else {
                presentChoices(roomData.options);
            }
        });
    });

    saveGame(id);
}

/**
 * 
 * Save the current gold, room id, health etc. as a base64 encoded json object
 * 
 * @param {integer} room what room id are we on (optional)
 */
function saveGame(room) {
    if (room) {
        saveCode.r = room;
    }
    saveCode.g = gold;
    saveCode.d = drunkenness;
    saveCode.h = health;
    saveCode.s = speed;

    saveGameOutput.value = btoa(JSON.stringify(saveCode));
    document.cookie = "saveCode="+btoa(JSON.stringify(saveCode));
}

/**
 * 
 * Open/close the options menu
 */
function toggleOptions() {
    if (optionsMenu.classList.contains("closed")) {
        optionsMenu.classList.remove("closed");
    } else {
        optionsMenu.classList.add("closed");
    }
}

/**
 * 
 * Replace current gold, room etc. with loaded base64 encoded string pasted into the load input
 */
function loadGame(saveCode) {
    if (!saveCode) {
        saveCode = loadGameInput.value;
    }
    let decodedOptions = atob(saveCode);
    let loadedOptions = JSON.parse(decodedOptions);
    gold = loadedOptions.g;
    drunkenness = loadedOptions.d;
    health = loadedOptions.h;
    speed = loadedOptions.s;
    textSpeedInput.value = speed;
    writeOutRoom(loadedOptions.r);
}

/**
 * 
 * Copy what's currently in the save input to the clipboard
 */
function copySaveCode() {
  let copyText = saveGameOutput;
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  document.execCommand("copy");
}

/**
 * 
 * Loads a new game using the default options
 */
function newGame() {
    loadGame("eyJyIjoxLCJoIjoxMDAsImciOjEwLCJzIjoxMCwiZCI6MH0=");
}

/**
 * 
 * Update the speed variable that determines how fast the text will type
 */
textSpeedInput.addEventListener("change", () => {
    speed = textSpeedInput.value;
    saveGame();
})

window.onload = () => {
    let match = document.cookie.match(new RegExp('(^| )saveCode=([^;]+)'));
    if (match) {
        loadGame(match[2]);
    } else {
        writeOutRoom(1);
    }
}