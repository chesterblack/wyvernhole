import { getTypedMod } from "../utilities";

export default function CharacterSheet({ character }) {
  return (
    <div className='character-sheet'>
      <div>
        {character.name} - Level {character.level} {character.tier.title} {character.race} {character.job}
      </div>
      <hr />
      <div>
        {Object.keys(character.attributes).map((key) => {
          const attribute = character.attributes[key];
          return <div key={key}>{key}: {attribute.score} [{getTypedMod(attribute.modifier)}]</div>;
        })}
      </div>
    </div>
  );
}