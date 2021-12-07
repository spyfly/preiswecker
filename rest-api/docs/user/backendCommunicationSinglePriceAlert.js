module.exports = {
    put: {
        tags: ["Price-alert backend operations"],
        description: "Set price alert reached status to true",
        operationId: "setPriceAlertReached",
        parameters: [    {
            "name": "id",
            "in": "path",
            "description": "ID of the price alert",
            "required": true,
            "schema": {
              "type": "string"
            }
          }],
        requestBody: {
            content: {
                "application/x-www-form-urlencoded": {
                    schema: {
                        type: "object",
                        required: ["userID", "reachedPrice"],
                        properties: {
                          userID: {
                            type: "string",
                            description: "ID of the user who created the price alert.",
                            example: "...",
                          },
                          reachedPrice: {
                            type: "string",
                            description: "Reached price of the price alert.",
                            example: "120,50",
                          },
                        },
                      },
                },
            },
        },
        responses: {
            200: {
                description: "Price alert reached-status was updated successfully!",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/responses/Success",
                        },
                    },
                },
            },
            404: {
                description: "Price alert with given price-alert-/user-ID doesn't exist!",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/responses/Error",
                        },
                    },
                },
            },
            422: {
                description: "Problem with userID/reachedPrice, e.g. something is missing",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/responses/ExtendedError",
                        },
                    },
                },
            },
            500: {
                description: "Server error",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/responses/Error",
                        },
                    },
                },
            },
        },
    }
};