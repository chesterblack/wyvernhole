export function sumOfArray( array ) {
  let total = 0;
  array.forEach(element => {
    if (typeof element === 'number') {
      total += element;
    }
  });
  
  return total;
}