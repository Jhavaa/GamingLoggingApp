// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Games from "../../../database/user_data/model/Games";

export default async function handler(req, res) {
  // Update Translation:
  const updateTranslation = ["remove", "status"];

  // Status Translation:
  const statusTranslation = ["Backlog", "In Progress", "Finished", "Retired"];

  const gameData = req.body;
  /** Request Body is expected to look like this:
   * {
   *     userID: ID of current user
   *     gameID: selected game ID
   *     updateAction: what kind of update we want to perform
   *     statusChangeTo: <OPTIONAL> If the update action is a status change, then the status is updated to this value.
   * }
   */

  // Verify user session
  if (!gameData.userID) {
    return res
      .status(400)
      .json({ message: "Error in request to update game on user list." });
  }

  // If POST request...
  if (req.method === "POST") {
    // Verify req body
    if (!gameData) {
      return res
        .status(400)
        .json({ message: "Error in request to update game on user list." });
    }
    const gameEntry = await Games.findOne({
      userID: gameData.userID,
      gameID: gameData.gameID,
      dateRemoved: { $exists: false },
    });

    if (!gameEntry || gameEntry.dateRemoved) {
      return res.status(400).json({
        message:
          "Game was not found in the user's list, or has been removed already.",
      });
    }

    switch (gameData.updateAction) {
      case 0:
        // remove
        gameEntry.dateRemoved = new Date();
        break;
      case 1:
        // status change
        gameEntry.status = gameData.statusChangeTo;
        break;
      default:
        return res.status(401).json({
          message: "Error in completing request: invalid update action.",
        });
    }

    await gameEntry.save((err) => {
      if (err) {
        return res.status(401).json({
          message: "Error in completing request: can not save to database.",
          error: err,
        });
      }
    });

    return res.status(200).json({
      message: `Game ${gameData.gameID} was successfully updated (${
        updateTranslation[gameData.updateAction]
      })!`,
    });
  } else {
    return res.status(401).json({
      message: "Error in completing request: invalid request method.",
    });
  }
}
