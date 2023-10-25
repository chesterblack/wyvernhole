/**
 * Return the total of each numerical value in an array
 * 
 * @param {array} array Array to sum the values of
 * @returns {number}
 */
export function sumOfArray( array ) {
  let total = 0;
  array.forEach(element => {
    if (typeof element === 'number') {
      total += element;
    }
  });
  
  return total;
}

/**
 * Return the total of each numerical value in an object
 * 
 * @param {object} object Object to sum the values of
 * @returns {number}
 */
export function sumOfObject( object ) {
  return sumOfArray(Object.values(object));
}

/**
 * Return a number with a +/- before it according to it's type
 * 
 * @param {number} num
 * @returns {string} The modifier with a +/- before it
 */
export function getTypedNumber ( num ) {
  if (num > 0) {
    return `+${num}`;
  } else if (num === 0) {
    return '-';
  } else {
    return `${num}`;
  }
}

/**
 * Randomise a number under the dice max
 * 
 * @param {integer} dice Maximum number
 * @returns {integer} 
 */
export function roll( dice ) {
  return Math.floor(Math.random() * (dice - 1) + 1);
}
