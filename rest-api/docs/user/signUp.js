module.exports = {
    post: {
        tags: ["User operations"],
        description: "Create user",
        operationId: "createUser",
        parameters: [],
        requestBody: {
            content: {
                "application/x-www-form-urlencoded": {
                    schema: {
                        $ref: "#/components/schemas/User",
                    },
                },
            },
        },
        responses: {
            201: {
                description: "User was registered successfully",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/responses/Success",
                        },
                    },
                },
            },
            409: {
                description: "Username/Email already exists",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/responses/ExtendedError",
                        },
                    },
                },
            },
            422: {
                description: "Problem with username/email/password, e.g. something is missing or unsupported characters are used",
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