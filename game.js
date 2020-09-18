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

let speed = 10;
let gold = 10;
let drunkenness = 0;

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

function createDialogueBox(speaker) {
    let span = document.createElement("span");
    span.classList.add("speaker");
    span.style.color = speaker.color;
    dialogueBox.appendChild(span);
    return span;
}

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
            if (drunkenness == 0) {
                drunkennessBox.style.display = "none";
            }
        } else {
            drunkennessBox.style.display = "none";
        }
        if (roomData.effects && roomData.effects.gold) {
            if ((gold += roomData.effects.gold) < 0) {
                moneyMessageBox.innerHTML = "Insufficient Gold";
                writeOutRoom(roomData.effects.fallback);
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
}