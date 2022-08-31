/**
 * Removes an option from a room's list of options
 *
 * @param {int} parentid ID of the room that holds the option
 * @param {int} childid ID of the room that will be removed from the list of options
 * @param {string} text Text that is being used on the button
 * @param {node}  button Button element that was clicked
 */
function removeRoomOption(parentid, childid, text, button) {
  let data = {
    parentid: parentid,
    childid: childid,
    text: text,
  };
  data = JSON.stringify(data);

  fetch('/admin/_utilities/remove-option.php', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: data,
  }).then((response) => {
    button.parentElement.remove();
  });
}

/**
 * Adds an option to a room's list of options
 *
 * @param {int} parentid ID of the room that is having a new option added
 * @param {int} childid ID of the room that the option should go to
 * @param {string} text Text to use on the button
 */
function addRoomOption(parentid, childid, text) {
  let data = {
    parentid: parentid,
    childid: childid,
    text: text,
  };
  let JSONdata = JSON.stringify(data);

  fetch('/admin/_utilities/add-option.php', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSONdata,
  })
    .then((response) => response.json())
    .then((response) => {
      if (response == 'no room') {
        addInputID.classList.add('error');
        addInputID.value = '';
        addInputID.placeholder = 'Invalid Id';

        return false;
      } else {
        let newRoomContainer = document.createElement('div');
        newRoomContainer.classList.add('admin-option');

        let newRoomButton = document.createElement('a');
        newRoomButton.classList.add('btn');
        newRoomButton.href = `/admin/rooms/edit/${data.childid}`;
        newRoomButton.innerHTML = `${data.text} [${data.childid}]`;

        let newRoomDelete = document.createElement('button');
        newRoomDelete.classList.add('delete-option');
        newRoomDelete.dataset.roomid = data.childid;
        newRoomDelete.innerHTML = '-';
        newRoomDelete.addEventListener('click', () => {
          deleteRoom(parentid, childid, text, newRoomDelete);
        });

        newRoomContainer.appendChild(newRoomButton);
        newRoomContainer.appendChild(newRoomDelete);
        document
          .querySelector('.existing-options')
          .appendChild(newRoomContainer);
      }

      return true;
    });
}

function removeDialogueOption(parentid, speaker, color, message, parent) {
  let data = {
    parentid: parentid,
    speaker: speaker,
    color: color,
    message: message,
  };
  let JSONdata = JSON.stringify(data);

  fetch('/admin/_utilities/remove-dialogue.php', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSONdata,
  }).then((response) => {
    parent.remove();
  });
}

function addDialogueOption(parentid, speaker, color, message) {
  let data = {
    parentid: parentid,
    speaker: speaker,
    color: color,
    message: message,
  };
  let JSONdata = JSON.stringify(data);

  fetch('/admin/_utilities/add-dialogue.php', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSONdata,
  })
    .then((response) => response.json())
    .then((response) => {
      let newDiaContainer = document.createElement('div');
      newDiaContainer.classList.add('dialogue-option');

      let newOptionContainer = document.createElement('div');
      newOptionContainer.classList.add('admin-option');

      let deleteButton = document.createElement('button');
      deleteButton.classList.add('delete-dia');
      deleteButton.innerHTML = '-';
      deleteButton.addEventListener('click', () => {
        removeDialogueOption(
          parentid,
          speaker,
          color,
          message,
          newDiaContainer
        );
      });

      let speakerContainer = document.createElement('div');
      speakerContainer.classList.add('speaker');
      speakerContainer.style.color = color;
      speakerContainer.innerHTML = speaker;

      let messageContainer = document.createElement('div');
      messageContainer.classList.add('message');
      messageContainer.innerHTML = `<div>${message}</div>`;

      newOptionContainer.appendChild(deleteButton);
      newOptionContainer.appendChild(speakerContainer);
      newDiaContainer.appendChild(newOptionContainer);
      newDiaContainer.appendChild(messageContainer);
      document.querySelector('.existing-dialogue').appendChild(newDiaContainer);
    });
}

function colorToHex(color) {
  var hexadecimal = color.toString(16);
  return hexadecimal.length == 1 ? '0' + hexadecimal : hexadecimal;
}

function rgbToHex(rgb) {
  rgb = rgb.replace('rgb(', '');
  rgb = rgb.replace(')', '');
  rgb = rgb.replaceAll(' ', '');
  rgb = rgb.split(',');
  rgbObj = {};
  rgbObj.red = parseInt(rgb[0]);
  rgbObj.green = parseInt(rgb[1]);
  rgbObj.blue = parseInt(rgb[2]);
  color =
    '#' +
    colorToHex(rgbObj.red) +
    colorToHex(rgbObj.green) +
    colorToHex(rgbObj.blue);
  return color;
}
