import { useContext } from "react";
import { getTypedNumber } from "../utilities";
import GlobalContext from "@/globalContext";

export default function CharacterSheet({ character = null }) {
  const { currentPlayer } = useContext(GlobalContext);

  if (!character) {
    return (
      <div className="character-sheet">
        Character not found
      </div>
    )
  }

  character = character === 'player' ? currentPlayer : character;

  return (
    <div className='character-sheet'>
      <div>
        {character.name} - Level {character.level} {character.tier.title} {character.race} {character.job}
      </div>
      <hr />
      <div>
        {Object.keys(character.attributes).map((key) => {
          const attribute = character.attributes[key];
          return (
            <div key={key}>
              {key}: {attribute.score}
              <span className="attribute-modifier">
                {getTypedNumber(attribute.modifier)}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  );
}