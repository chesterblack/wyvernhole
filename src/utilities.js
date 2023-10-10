export function sumOfArray( array ) {
  let total = 0;
  array.forEach(element => {
    if (typeof element === 'number') {
      total += element;
    }
  });
  
  return total;
}

export function getTypedMod ( mod ) {
  if (mod > 0) {
    return `+${mod}`;
  } else if (mod === 0) {
    return '-';
  } else {
    return `${mod}`;
  }
}