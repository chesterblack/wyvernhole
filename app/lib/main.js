/**
 * Adds a little message to an element that fades away to nothing
 *
 * @param {element} element element getting the ping
 * @param {string} message what does the ping say?
 */
export function pingUpdateMessage(parentElement, message) {
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

/**
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

export function typeWriter(txt, setText, stats, textSpeed) {
  setText('');
  let currentText = '';
  let i = 0;
  typeText();
  function typeText() {
    if (i < txt.length) {
      let slurChance = Math.random() * 80;
      if (slurChance > stats.drunkenness) {
        currentText += txt.charAt(i);
      } else {
        currentText += slur(txt.charAt(i));
      }

      setText(currentText);

      i++;
      setTimeout(typeText, textSpeed);
    }
  }
}
