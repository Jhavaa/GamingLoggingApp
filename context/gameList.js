import { getSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";

export const getUserGameList = async (userID) => {
  const res = await fetch("/api/list/get", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userID }),
  });
  const pulledList = await res.json();
  return pulledList.gameList;
};

const GameListContext = createContext();

export const getCurrUser = async () => {
  const sess = await getSession();
  return sess?.user;
};

export function GameListProvider({ children }) {
  const [user, setUser] = useState([]);
  const [gameList, setGameList] = useState([]);

  useEffect(() => {
    getCurrUser().then((user) => {
      setUser(user);

      getUserGameList(user?.id).then((gameList) => {
        setGameList(gameList || []);
      });
    });
  }, []);

  let sharedState = {
    /* whatever you want */
    user: user,
    gameList: gameList,
    setGameList,
  };

  return (
    <GameListContext.Provider value={sharedState}>
      {children}
    </GameListContext.Provider>
  );
}

export function useGameListContext() {
  return useContext(GameListContext);
}
