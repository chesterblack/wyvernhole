// ----- ----- ----- //
//    GLOBAL VARS    //
// ----- ----- ----- //
const textBox = document.getElementById("text");
const responseBox = document.getElementById("responses");
const dialogueBox = document.getElementById("dialogue");

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
 * @param {boolean} clear Whether the existing text should be cleared first
 * @param {object} target Where the text needs to go
 * @param {function} callback What to do once the text has been typed
 */
function typeWriter(txt, clear = true, target, callback) {
    responseBox.innerHTML = "";
    if (clear) {
        target.innerHTML = "";
    }

    let i = 0;
    let speed = 20;

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
    for (let i = 0; i < choices.length; i++) {
        responseBox.innerHTML += createChoiceBox(choices[i].text, choices[i].id);
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
    var url = '/game.php?function=fetchRoom&room=' + id;

    ajax(url, (response) => {
        roomData = JSON.parse(response);
        typeWriter(roomData.message, true, textBox, () => {
            presentChoices(roomData.options);
        });
    });
}