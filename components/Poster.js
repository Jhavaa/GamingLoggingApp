import { useEffect, useState } from "react";

// Icon Imports
import { FcPlus } from "react-icons/fc";
import { CgPlayListRemove } from "react-icons/cg";
import { IconContext } from "react-icons/lib";

// NextJS Imports
import Image from "next/image";

// Context
import { useGameListContext } from "../context/gameList";

function Poster({ game, imageClass = "smImage" }) {
  const { user, gameList } = useGameListContext();
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    gameList.forEach((g) => {
      if (g.id === game.id) {
        setIsAdded(true);
      }
    });
  }, [gameList, isAdded]);

  const addGameToList = async () => {
    const userID = user.id;
    const gameID = game.id;
    const status = 0; // Default to 'backlog'

    const res = await fetch("/api/list/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userID, gameID, status }),
    });

    // Status Translation:
    const statusTranslation = ["Backlog", "In Progress", "Finished", "Retired"];

    let { message } = await res.json();

    if (
      message ===
      `Game ID ${gameID} successfully added to user's ${statusTranslation[status]} list.`
    ) {
      return true;
    } else return false;
  };

  return (
    <div className="posterItem">
      <div className={`image ${imageClass}`}>
        <Image
          src={
            game.cover
              ? "https:" + game.cover.url.replace("t_thumb", "t_720p")
              : "https://bulma.io/images/placeholders/128x128.png"
          }
          // layout="fill"
          objectFit="contain"
          // layout="intrinsic"
          width={300}
          height={400}
        />
      </div>
      {isAdded ? (
        <IconContext.Provider value={{ color: "black", className: "remove" }}>
          <div className="cursor-pointer">
            <CgPlayListRemove style={{ position: "absolute" }} />
          </div>
        </IconContext.Provider>
      ) : (
        <div className="cursor-pointer">
          <FcPlus
            style={{ position: "absolute" }}
            onClick={() => {
              setIsAdded(addGameToList());
            }}
          />
        </div>
      )}
    </div>
  );
}

export default Poster;
