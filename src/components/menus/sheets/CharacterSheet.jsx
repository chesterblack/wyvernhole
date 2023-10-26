import { useContext } from "react";
import { getTypedNumber } from "../../../utilities";
import GlobalContext from "@/globalContext";

export default function CharacterSheet({ character = null }) {
  const { currentPlayer } = useContext(GlobalContext);
  character = character === 'player' ? currentPlayer : character;

  if (!character) {
    return (
      <div className="character-sheet">
        Character not found
      </div>
    )
  }

  return (
    <div className='character-sheet'>
      <div>
        <h2>{character.name}</h2>
        <span>Level {character.level} {character.tier.title} {character.race} {character.job}</span>
      </div>
      <hr />
      <div>
        <h2>Attributes</h2>
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