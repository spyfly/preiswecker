module.exports = {
    put: {
        tags: ["Price-alert client operations"],
        description: "Update existing price alert",
        operationId: "updatePriceAlert",
        security:{
            BearerAuth: []
        },
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
                        $ref: "#/components/schemas/PriceAlert",
                    },
                },
            },
        },
        responses: {
            200: {
                description: "Price alert was updated successfully",
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
            404: {
                description: "Price alert with given ID doesn't exist.",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/responses/Error",
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
        tags: ["Price-alert client operations"],
        description: "Get specific price alert",
        operationId: "getPriceAlert",
        security:{
            BearerAuth: []
        },
        parameters: [    {
            "name": "id",
            "in": "path",
            "description": "ID of the price alert",
            "required": true,
            "schema": {
              "type": "string"
            }
          }],
        responses: {
            200: {
                description: "Price alert for given ID.",
                content: {
                    "application/json": {
                        schema: {
                     
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
                                    example: "250,50",
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
                description: "Price alert with given ID doesn't exist.",
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
    delete: {
        tags: ["Price-alert client operations"],
        description: "De existing price alert",
        operationId: "updatePriceAlert",
        security:{
            BearerAuth: []
        },
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
                        $ref: "#/components/schemas/PriceAlert",
                    },
                },
            },
        },
        responses: {
            200: {
                description: "Price alert was deleted successfully",
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
            404: {
                description: "Price alert with given ID doesn't exist.",
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