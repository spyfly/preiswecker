module.exports = {
    get: {
        tags: ["Price-alert backend operations"],
        description: "Get all price alerts from all users",
        operationId: "getPriceAlerts",
        parameters: [],
        responses: {
            200: {
                description: "Price alerts with corresponding userIDs",
                content: {
                    "application/json": {
                        schema: {
                            type: "array",
                            items:
                            {
                                type: "object",
                                properties: {
                                    userID: {
                                        type: "string",
                                        description: "ID of the user who price alerts in the array.",
                                        example: "...",
                                    },
                                    priceAlerts: {
                                        type: "array",
                                        items: {
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
                                                reachedPrice: {
                                                    type: "string",
                                                    description: "Lowest price of the filter, set when the price-alert is reached.",
                                                    example: "120,50",
                                                },
                                                reached: {
                                                    type: "boolean",
                                                    description: "Is the target price of the price alert reached?",
                                                    example: "false",
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
                                            }
                                        }
                                    }
                                },
                            }
                        },
                    },
                },
            },
            404: {
                description: "No price alerts available.",
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