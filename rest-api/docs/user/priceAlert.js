module.exports = {
    post: {
        tags: ["Price-alert operations"],
        description: "Create new price alert",
        operationId: "createPriceAlert",
        security:{
            bearerAuth: []
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
};