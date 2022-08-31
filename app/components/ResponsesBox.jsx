import Button from './Buttons';

export default function ResponsesBox() {
  return (
    <Button
      label="Walk in"
      onClick={() => {
        console.log('walk in');
      }}
    />
  );
}
