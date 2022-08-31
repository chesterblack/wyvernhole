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