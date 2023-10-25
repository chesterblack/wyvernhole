import GlobalContext from "@/globalContext";
import { useContext } from "react";
import StatRow from "../StatRow";

export default function StatSheet({ character = null }) {
  const { currentPlayer } = useContext(GlobalContext);
  character = character === 'player' ? currentPlayer : character;

  if (!character) {
    return (
      <div className="character-sheet">
        Character not found
      </div>
    )
  }

  const { stats } = character;

  return (
    <div className="stat-sheet">
      {Object.keys(stats).map((statGroup) => {
        if (statGroup !== 'character') {
          return (
            <div key={statGroup} className="stat-group">
              <h2>{stats[statGroup].title}</h2>
              {Object.keys(stats[statGroup]).map((stat) => {
                if (stat !== 'title') {
                  return <StatRow key={stat} stat={stats[statGroup][stat]} />;
                }
              })}
            </div>
          );
        }
      })}
    </div>
  );
}