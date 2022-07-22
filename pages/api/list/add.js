import Games from "../../../database/user_data/model/Games";

export default async function handler(req, res) {
  // Status Translation:
  const status = ["Backlog", "In Progress", "Finished", "Retired"];

  const gameData = req.body;
  /** Request Body is expected to look like this:
   * {
   *     userID: ID of current user
   *     gameID: selected game ID
   *     status: list we want to add game to
   * }
   */

  // Verify user session
  if (!gameData.userID) {
    return res
      .status(400)
      .json({ message: "Error in request to add game to user list." });
  }

  // If POST request...
  if (req.method === "POST") {
    // Verify req body
    if (!gameData) {
      return res
        .status(400)
        .json({ message: "Error in request to add game to user list." });
    }
    const gameEntryExist = await Games.findOne({
      userID: gameData.userID,
      gameID: gameData.gameID,
    });

    // Game entry exists AND game entry does not have a 'dateRemoved' field
    if (gameEntryExist && !gameEntryExist?.dateRemoved) {
      return res
        .status(200)
        .json({ message: "Game already added to user list." });
    }

    // If the game was removed previously
    if (gameEntryExist.dateRemoved) {
      gameEntryExist.dateRemoved = undefined;
      gameEntryExist.save((err) => {
        if (err) {
          return res.status(401).json({
            message:
              "Error in completing request: can not update to dateRemoved field.",
            error: err,
          });
        }
      });
    } else {
      const gameEntry = new Games({
        userID: gameData.userID,
        gameID: gameData.gameID,
        status: gameData.status, // status[gameData.status], // req status is a number index for the array above.
        dateAdded: new Date(),
        // dateRemoved not included, since we don't want that value to be filled
      });

      gameEntry.save((err) => {
        if (err) {
          return res.status(401).json({
            message: "Error in completing request: can not save to database.",
            error: err,
          });
        }
      });
    }

    return res.status(200).json({
      message: `Game ID ${gameData.gameID} successfully added to user's ${
        status[gameData.status]
      } list.`,
    });
  } else {
    return res.status(401).json({
      message: "Error in completing request: invalid request method.",
    });
  }
}
