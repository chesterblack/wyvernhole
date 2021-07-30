// ----- ----- ----- //
//    GLOBAL VARS    //
// ----- ----- ----- //
const body = document.getElementById('body');
const textBox = document.getElementById('text');
const responseBox = document.getElementById('responses');
const dialogueBox = document.getElementById('dialogue');
const drunkennessBox = document.getElementById('drunkenness-counter');
const inventoryBox = document.getElementById('inventory');
const textSpeedInput = document.getElementById('text-speed');
const saveGameOutput = document.getElementById('save-game');
const loadGameInput = document.getElementById('load-game');

const startingRoom = 3;

let stopTyping = false;
let uniqueID = 0;
let speed = 10;
let openInfoBox = false;

let stats = {
  health: 100,
  maxHealth: 100,
  gold: 50,
  drunkenness: 0,
  attack: 0,
  defence: 0,
};

let inventory = [];

let equipped = {
  hands: [null, null],
  armour: null,
  boots: null,
  gloves: null,
  head: null,
  rings: [null, null, null, null],
  amulet: null,
};

let roomData;
let autosave = true;

let stock = {};

let saveCode = {
  r: 1,
  h: stats.health,
  mh: stats.maxHealth,
  g: stats.gold,
  s: speed,
  d: stats.drunkenness,
  i: inventory,
  e: equipped,
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
 * Percentage chance of slurring each character based on drunkenness
 *
 * @param {string} txt Text to be typewritered out
 * @param {object} target Where the text needs to go
 * @param {function} callback What to do once the text has been typed
 */
function typeWriter(txt, target, callback) {
  responseBox.innerHTML = '';
  let i = 0;
  typeText();
  function typeText() {
    if (!stopTyping) {
      if (i < txt.length) {
        let slurChance = Math.random() * 80;
        if (slurChance > stats.drunkenness) {
          target.innerHTML += txt.charAt(i);
        } else {
          target.innerHTML += slur(txt.charAt(i));
        }
        i++;
        setTimeout(typeText, speed);
      } else {
        callback();
      }
    }
  }
}

/**
 *
 * Takes a character and either removes it, duplicates it, shifts it or replaces it with a space
 *
 * @param {string} letter single character to be slurred
 * @return {string} slurred character
 */
function slur(letter) {
  let rando = Math.random();

  if (rando < 0.25) {
    return '';
  } else if (rando < 0.5) {
    return letter + letter;
  } else if (rando < 0.75) {
    if (letter.match(/[a-z]/i)) {
      return String.fromCharCode(letter.charCodeAt(0) + 1);
    } else {
      return letter;
    }
  } else {
    return ' ';
  }
}

/**
 *
 * Creates an option button
 *
 * @param {string} text the text to go in the button
 * @param {integer} id the room id of where the button goes
 *
 * @returns {HTMLElement} the button
 */
function createChoiceBox(text, id) {
  let optionButton = document.createElement('button');
  optionButton.innerHTML = text;
  optionButton.addEventListener('click', () => {
    writeOutRoom(id);
  });
  return optionButton;
}

/**
 *
 * Creates a button to purchase an item
 *
 * @param {object} item object containing id, price and name of item
 *
 * @returns {HTMLElement} the button
 */
function createPurchaseBox(item) {
  let buyButton = document.createElement('button');
  buyButton.innerHTML = item.name + ' (' + item.price + 'gp)';
  buyButton.addEventListener('click', () => {
    buyItem(item.id, item.price);
  });
  return buyButton;
}

/**
 *
 * Adds the option buttons to the responses div
 *
 * @param {array} options array of objects to create the option buttons
 */
function presentChoices(options) {
  setTimeout(() => {
    for (let option of options) {
      if (option.type == 'option') {
        responseBox.appendChild(createChoiceBox(option.text, option.id));
      } else if (option.type == 'item') {
        let buttonContainer = document.createElement('div');
        buttonContainer.classList.add('shop-button');
        let itemInfoButton = document.createElement('button');
        let itemInfoBox = createItemDescriptionBox(option);
        itemInfoButton.innerHTML = '?';
        itemInfoButton.addEventListener('click', () => {
          let infoBoxes = document.getElementsByClassName('item-info-box');
          for (let box of infoBoxes) {
            box.style.display = 'none';
          }
          itemInfoBox.style.display = 'block';
        });
        responseBox.appendChild(itemInfoBox);

        buttonContainer.appendChild(createPurchaseBox(option));
        buttonContainer.appendChild(itemInfoButton);
        responseBox.appendChild(buttonContainer);
      }
    }
  }, speed * 20);
}

/**
 *
 * Creates empty HTML element of the correct colour
 *
 * @param {object} speaker speaker obj containing color (for text)
 * @returns {element} span element
 */
function createDialogueBox(speaker) {
  let span = document.createElement('span');
  span.classList.add('speaker');
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
      dialogue[i].speaker.name + ': ' + dialogue[i].message,
      target,
      () => {
        writeOutDialogue(dialogue, i + 1, callback);
      }
    );
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
  stopTyping = true;
  let url = '/game.php?function=fetchRoom&room=' + id;
  responseBox.innerHTML = '';
  textBox.innerHTML = '';
  dialogueBox.innerHTML = '';

  ajax(url, (response) => {
    stopTyping = false;
    roomData = JSON.parse(response);

    let roomOptions = roomData.options;
    let priceMod = roomData.priceMod ?? 1;
    let shopItems = roomData.shop ?? [];

    if (roomOptions) {
      for (let choice of roomOptions) {
        choice.type = 'option';
      }
    }

    getItems(shopItems, (response) => {
      if (response) {
        response = JSON.parse(response);
        for (let item of response) {
          item.type = 'item';
          item.price = Math.round(item.basePrice * priceMod);
          roomOptions.unshift(item);
        }
      }

      typeWriter(roomData.message, textBox, () => {
        if (roomData.dialogue) {
          writeOutDialogue(roomData.dialogue, 0, () => {
            presentChoices(roomOptions, priceMod);
          });
        } else {
          presentChoices(roomOptions, priceMod);
        }
      });
    });
  });

  endTurn(id);
}

/**
 *
 * Sobers up by 1, reduces hp by 5 if overhealed
 *
 * @param {integer} id optional, current room id to pass through to saveGame()
 */
function endTurn(id) {
  if (stats.drunkenness > 0) {
    stats.drunkenness--;
  }
  if (stats.health > stats.maxHealth) {
    stats.health -= 5;
  }
  updateStats();
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
  saveCode.g = stats.gold;
  saveCode.d = stats.drunkenness;
  saveCode.h = stats.health;
  saveCode.mh = stats.maxHealth;
  saveCode.s = speed;

  saveCode.e = equipped;
  saveCode.i = inventory;

  saveGameOutput.value = btoa(JSON.stringify(saveCode));
  if (autosave) {
    document.cookie = 'saveCode=' + btoa(JSON.stringify(saveCode));
  } else {
    document.getElementById('autosave').innerHTML = 'off';
    document.cookie = 'saveCode=; Max-Age=-1;';
  }
}

/**
 *
 * Open/close the options menu
 */
function toggleMenu(id) {
  let menu = document.getElementById(id);
  if (menu.classList.contains('closed')) {
    menu.classList.remove('closed');
  } else {
    menu.classList.add('closed');
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
  stats.gold = loadedOptions.g;
  stats.drunkenness = loadedOptions.d;
  stats.health = loadedOptions.h;
  stats.maxHealth = loadedOptions.mh;
  inventory = loadedOptions.i;
  equipped = loadedOptions.e;
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
  document.execCommand('copy');
}

/**
 *
 * Loads a new game using the default options
 */
function newGame() {
  loadGame(
    'eyJyIjoxLCJoIjoxMDAsImciOjUwLCJzIjoxMCwiZCI6MCwiaSI6W3siaWQiOjQsIm5hbWUiOiJEYWdnZXIiLCJlZmZlY3RzIjpbeyJhdHRhY2siOjV9XSwicXVhbnRpdHkiOjF9XX0='
  );
}

/**
 *
 * Update the speed variable that determines how fast the text will type
 */
textSpeedInput.addEventListener('change', () => {
  speed = textSpeedInput.value;
  saveGame();
});

/**
 *
 * Autoload a game saved to the cookie, otherwise load the first room and give a free dagger
 */
window.onload = () => {
  let autosaveSet = document.cookie.match(new RegExp('(^| )autosave=([^;]+)'));
  if (autosaveSet && autosaveSet[2] == 'true') {
    let savedGame = document.cookie.match(new RegExp('(^| )saveCode=([^;]+)'));
    autosave = true;
    if (savedGame) {
      loadGame(savedGame[2]);
    } else {
      buyItem(2, 0, true);
      writeOutRoom(startingRoom);
    }
  } else {
    autosave = false;
    buyItem(2, 0, true);
    writeOutRoom(startingRoom);
  }

  updateStats();
};

/**
 *
 * Toggles whether data is saved into a cookie to be automatically loaded
 */
function toggleAutosave() {
  autosave = autosave ? false : true;
  document.cookie = 'autosave=' + autosave;
  if (autosave) {
    document.getElementById('autosave').innerHTML = 'on';
  } else {
    document.getElementById('autosave').innerHTML = 'off';
  }
}

function toggleEquipped(item) {
  let inventoryItem =
    inventory[
      inventory.findIndex((invItem) => {
        return invItem.uid == item.uid;
      })
    ];

  if (inventoryItem.equipped) {
    if (equipped[item.slot] != null && Array.isArray(equipped[item.slot])) {
      for (let i in equipped[item.slot]) {
        if (equipped[item.slot][i] && equipped[item.slot][i].uid == item.uid) {
          equipped[item.slot][i] = null;
          break;
        }
      }
    } else {
      equipped[item.slot] = null;
    }
    applyItem(item, false);
    inventoryItem.equipped = false;
  } else {
    let freeSlot = checkSlotIsFree(item.slot);
    if (freeSlot === true) {
      applyItem(item);
      inventoryItem.equipped = true;
      equipped[item.slot] = item;
    } else if (freeSlot !== false) {
      applyItem(item);
      inventoryItem.equipped = true;
      equipped[item.slot][freeSlot] = item;
    } else {
      alert(
        "Sorry, you can't equip another item in the " + item.slot + ' slot'
      );
    }
  }
  updateStats();
}

function checkSlotIsFree(slot) {
  if (equipped[slot] != null && Array.isArray(equipped[slot])) {
    for (let item in equipped[slot]) {
      if (equipped[slot][item] == null) {
        return item;
      }
    }
    return false;
  } else {
    return equipped[slot] == null;
  }
}

/**
 *
 * Updates visible stat counters (gold, health etc.) and inventory
 */
function updateStats() {
  for (let key in stats) {
    document.getElementById(key).innerHTML = stats[key];
  }

  let newItems = false;

  inventoryBox.innerHTML = '';
  if (inventory[0]) {
    inventory.forEach((item, i, inv) => {
      let newItem = document.createElement('div');
      newItem.classList.add('item');
      newItem.innerHTML = item.name;
      if (item.quantity > 1) {
        newItem.innerHTML += ' x' + item.quantity;
      }
      newItem.dataset.itemid = item.id;
      newItem.dataset.invIndex = i;
      if (item.equippable) {
        let equipButton = document.createElement('button');
        if (item.equipped) {
          newItem.classList.add('equipped');
          equipButton.innerHTML = 'Unequip';
        } else {
          newItem.classList.remove('equipped');
          equipButton.innerHTML = 'Equip';
        }
        equipButton.classList.add('equip');
        equipButton.addEventListener('click', (e) => {
          toggleEquipped(item);
        });
        newItem.appendChild(equipButton);
      }
      if (item.consumable) {
        let consumeButton = document.createElement('button');
        consumeButton.innerHTML = 'Use';
        consumeButton.addEventListener('click', (e) => {
          applyItem(item);
          deleteItem(item);
        });
        newItem.appendChild(consumeButton);
      }

      let itemInfoBox = createItemDescriptionBox(item, newItem);
      let itemInfoButton = document.createElement('button');
      itemInfoButton.classList.add('info-button');
      itemInfoButton.innerHTML = '?';
      itemInfoButton.addEventListener('click', () => {
        let infoBoxes = document.getElementsByClassName('item-info-box');
        for (let box of infoBoxes) {
          box.style.display = 'none';
        }
        itemInfoBox.style.display = 'block';
      });

      if (item.new) {
        addNewTag(newItem);
        newItem.addEventListener('mouseover', () => {
          removeNewTag(newItem);
        });
        newItems = true;
      }

      newItem.appendChild(itemInfoButton);
      newItem.appendChild(itemInfoBox);
      inventoryBox.appendChild(newItem);
    });
  }

  let inventoryButton = document.getElementById('inv-button');
  if (newItems && !inventoryButton.getElementsByClassName('new-item')[0]) {
    addNewTag(inventoryButton);
  }

  if (stats.drunkenness > 0) {
    body.style.filter = 'blur(' + stats.drunkenness / 10 + 'px)';
    drunkennessBox.style.display = 'block';
  } else {
    body.style.filter = 'blur(0)';
    drunkennessBox.style.display = 'none';
  }

  saveGame();
}

/**
 *
 * Adds a span to an element that says 'New'
 *
 * @param {HTMLelement} element element to add the span to
 */
function addNewTag(element) {
  let newBox = document.createElement('span');
  newBox.classList.add('new-item');
  newBox.innerHTML = 'New';
  element.appendChild(newBox);
}

/**
 *
 * Removes a span with the class 'new-item' from an element
 *
 * @param {HTMLelement} element element to remove the span from
 */
function removeNewTag(element) {
  if (element.dataset.invIndex) {
    let index = element.dataset.invIndex;
    inventory[index].new = false;
  }

  if (element.getElementsByClassName('new-item')[0]) {
    let newTag = element.getElementsByClassName('new-item')[0];
    newTag.remove();
  }

  if (
    !document.getElementsByClassName('new-item')[1] &&
    document.getElementsByClassName('new-item')[0]
  ) {
    let newTag = document.getElementsByClassName('new-item')[0];
    newTag.remove();
  }
}

/**
 *
 * Removes an item from the inventory based on it's id
 *
 * @param {object} item only required attribute is id
 */
function deleteItem(item) {
  let invItem = inventory.find((invItem) => invItem.id == item.id);
  if (invItem.quantity > 1) {
    invItem.quantity--;
  } else {
    inventory = inventory.filter((i) => i.id != invItem.id);
  }

  updateStats();
}

/**
 *
 * Applies any effects an item has
 *
 * @param {object} item containing array of effects
 */
function applyItem(item, positive = true) {
  for (let effect of item.effects) {
    for (let stat in effect) {
      if (positive) {
        stats[stat] += effect[stat];
      } else {
        stats[stat] -= effect[stat];
      }
    }
  }

  updateStats();
}

/**
 *
 * Creates and returns a div with all the info on an item to be shown in a popup
 *
 * @param {object} item full object with all data on the item as pulled from db
 *
 * @returns {HTMLElement} the info box HTML element to be appended wherever
 */
function createItemDescriptionBox(item) {
  let itemInfoBox = document.createElement('div');
  itemInfoBox.classList.add('item-info-box');

  let itemTitle = document.createElement('h2');
  itemTitle.innerHTML = item.name;
  itemInfoBox.appendChild(itemTitle);

  if (item.quantity > 1) {
    let itemQuantity = document.createElement('span');
    itemQuantity.classList.add('quantity');
    itemQuantity.innerHTML = 'x' + item.quantity;
    itemInfoBox.appendChild(itemQuantity);
  }

  if (item.description) {
    let itemDesc = document.createElement('p');
    itemDesc.innerHTML = itemDesc;
    itemInfoBox.appendChild(itemDesc);
  }

  let itemCategory = document.createElement('h3');
  itemCategory.classList.add('item-slot');
  if (item.slot) {
    itemCategory.innerHTML = item.slot;
  }
  if (item.consumable) {
    itemCategory.innerHTML = 'Consumable';
  }
  itemInfoBox.appendChild(itemCategory);

  let effectsList = document.createElement('ul');
  for (let effect in item.effects) {
    effect = Object.entries(item.effects[effect])[0];
    let effectElement = document.createElement('li');
    let modifier;
    if (effect[1] > 0) {
      modifier = '+';
    }
    effectElement.innerHTML = effect[0] + ': ' + modifier + effect[1];
    effectsList.appendChild(effectElement);
  }
  itemInfoBox.appendChild(effectsList);

  let closeButton = document.createElement('button');
  closeButton.classList.add('close-button');
  closeButton.innerHTML = 'close';
  closeButton.addEventListener('click', () => {
    itemInfoBox.style.display = 'none';
  });

  itemInfoBox.prepend(closeButton);

  return itemInfoBox;
}

/**
 *
 * Add an item to the inventory and reduce current money by it's price
 *
 * @param {integer} itemID The id of the item being purchased
 * @param {integer} price how much the item costs
 */
function buyItem(itemID, price, autoequip = false) {
  let url = '/game.php?function=fetchItem&item=' + itemID;

  ajax(url, (response) => {
    item = JSON.parse(response);
    item.uid = uniqueID;
    uniqueID++;

    if (stats.gold < price) {
      alert('Insufficient funds');
    } else {
      stats.gold -= price;

      let alreadyOwns = inventory.find((invItem) => invItem.id == item.id);
      if (alreadyOwns && item.consumable) {
        alreadyOwns.quantity++;
      } else {
        item.quantity = 1;
        item.new = true;
        inventory.push(item);
      }

      if (price != 0) {
        pingUpdateMessage('gold', '-' + price + 'gp');
      }

      if (autoequip) {
        toggleEquipped(item);
      } else {
        pingUpdateMessage('inv-button', '+ ' + item.name);
      }

      updateStats();
    }
  });
}

/**
 *
 * Grabs all available data from the db for a particular item
 *
 * @param {integer} id id of the item
 * @param {function} callback the callback function to run once the data is returned
 */
function getItem(id, callback) {
  let url = '/game.php?function=fetchItem&item=' + id;
  ajax(url, (response) => {
    callback(response);
  });
}

/**
 *
 * Grabs all available data from the db for a several items
 *
 * @param {array} items array of objects
 * @param {function} callback the callback function to run once the data is returned
 */
function getItems(items, callback) {
  if (items[0]) {
    let url = '/game.php?function=fetchItems';
    for (let item of items) {
      url += '&item[]=' + item.id;
    }
    ajax(url, (response) => {
      callback(response);
    });
  } else {
    callback(null);
  }
}

/**
 *
 * Adds a little message to an element that fades away to nothing
 *
 * @param {string} id id of the element getting the ping
 * @param {string} message what does the ping say?
 */
function pingUpdateMessage(id, message) {
  let parentElement = document.getElementById(id);
  let grandparentElement = parentElement.parentElement;
  let element = document.createElement('div');
  element.classList.add('ping');
  element.innerHTML = message;
  grandparentElement.appendChild(element);
  setTimeout(() => {
    element.classList.add('fade');
    setTimeout(() => {
      grandparentElement.removeChild(element);
    }, 1500);
  }, 100);
}
