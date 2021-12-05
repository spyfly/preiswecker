module.exports = {
    post: {
        tags: ["Price-alert operations"],
        description: "Create new price alert",
        operationId: "createPriceAlert",
        security:{
            BearerAuth: []
        },
        parameters: [],
        requestBody: {
            content: {
                "application/x-www-form-urlencoded": {
                    schema: {
                        $ref: "#/components/schemas/PriceAlert",
                    },
                },
            },
        },
        responses: {
            201: {
                description: "Price alert was created successfully",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/responses/Success",
                        },
                    },
                },
            },
            401: {
                description: "Wrong token provided.",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/responses/WrongTokenError",
                        },
                    },
                },
            },
            403: {
                description: "No (Bearer) token provided.",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/responses/MissingTokenError",
                        },
                    },
                },
            },
            422: {
                description: "Problem with name/filterUrl/targetPrice, e.g. something is missing",
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
    },
    get: {
        tags: ["Price-alert operations"],
        description: "Get all price alerts from user",
        operationId: "getPriceAlerts",
        security:{
            BearerAuth: []
        },
        parameters: [],
        responses: {
            200: {
                description: "Price alert was updated successfully",
                content: {
                    "application/json": {
                        schema: {
                            PriceAlert: {
                                type: "object",
                                properties: {
                                  name: {
                                    type: "string",
                                    description: "Name of the price alert.",
                                    example: "Price alert for Nintendo Switch",
                                  },
                                  filterUrl: {
                                    type: "string",
                                    description: "Filter url of the price alert.",
                                    example: "...",
                                  },
                                  targetPrice: {
                                    type: "string",
                                    description: "Target price of the price alert.",
                                    example: "250,50€",
                                  },
                                  id: {
                                    type: "string",
                                    description: "ID of the price alert.",
                                    example: "...",
                                  },
                                  created: {
                                    type: "string",
                                    description: "Date of the price alert creation.",
                                    example: "...",
                                  }
                                },
                              },
                        },
                    },
                },
            },
            401: {
                description: "Wrong token provided.",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/responses/WrongTokenError",
                        },
                    },
                },
            },
            403: {
                description: "No (Bearer) token provided.",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/responses/MissingTokenError",
                        },
                    },
                },
            },
            404: {
                description: "No price alerts saved for this user.",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/responses/Error",
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
    },
};