const Game = require("../models/gameModel");

exports.renameWordCountToAdditionalInfo = async (req, res) => {
  try {
    const result = await Game.updateMany(
      { "main.data.details.wordCount": { $exists: true } },
      [
        {
          $set: {
            main: {
              $map: {
                input: "$main",
                as: "mainEntry",
                in: {
                  $mergeObjects: [
                    "$$mainEntry",
                    {
                      data: {
                        $map: {
                          input: "$$mainEntry.data",
                          as: "dataEntry",
                          in: {
                            $mergeObjects: [
                              "$$dataEntry",
                              {
                                details: {
                                  $mergeObjects: [
                                    "$$dataEntry.details",
                                    {
                                      additionalInfo: {
                                        $cond: [
                                          {
                                            $or: [
                                              {
                                                $eq: [
                                                  "$$dataEntry.details.wordCount",
                                                  null,
                                                ],
                                              },
                                              {
                                                $not: [
                                                  {
                                                    $ifNull: [
                                                      "$$dataEntry.details.wordCount",
                                                      false,
                                                    ],
                                                  },
                                                ],
                                              },
                                              {
                                                $eq: [
                                                  "$$dataEntry.details.wordCount",
                                                  "",
                                                ],
                                              },
                                            ],
                                          },
                                          "",
                                          "$$dataEntry.details.wordCount",
                                        ],
                                      },
                                    },
                                  ],
                                },
                              },
                            ],
                          },
                        },
                      },
                    },
                  ],
                },
              },
            },
          },
        },
        {
          $unset: "main.data.details.wordCount",
        },
      ]
    );
    res
      .status(200)
      .json({ message: `Updated ${result.modifiedCount} document(s)` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to rename field" });
  }
};
