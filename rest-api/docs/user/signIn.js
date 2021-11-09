module.exports = {
    post: {
        tags: ["User operations"],
        description: "Sign in",
        operationId: "signIn",
        parameters: [],
        requestBody: {
            content: {
                "application/x-www-form-urlencoded": {
                    schema: {
                        type: "object",
                        properties: {
                            identifier: {
                                type: "string",
                                description: "Username/Email of the user.",
                                example: "maxMustermann",
                            },
                            password: {
                                type: "string",
                                description: "Password of the user.",
                                example: "superSafePassword20389475",
                            },
                        },
                    }
                },
            },
        },
        responses: {
            202: {
                description: "User-sign-in was successful",
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                id: {
                                    type: "string",
                                    description: "User-id.",
                                    example: "...",
                                },
                                username: {
                                    type: "string",
                                    description: "Username of the user.",
                                    example: "maxMustermann",
                                },
                                email: {
                                    type: "string",
                                    description: "Email of the user.",
                                    example: "maxMustermann@email.cool",
                                },
                                accessToken: {
                                    type: "string",
                                    description: "Authorization token for future requests.",
                                    example: "...",
                                },
                            },
                        },
                    },
                },
            },
            401: {
                description: "Wrong password",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/responses/ExtendedError",
                        },
                    },
                },
            },
            404: {
                description: "No user with this identifier found",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/responses/ExtendedError",
                        },
                    },
                },
            },
            422: {
                description: "No identifier (username/email) or/and password given",
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