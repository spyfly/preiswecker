module.exports = {
  components: {
    securitySchemes: {
      BearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      }
    },
    responses: {
      Success: {
        properties: {
          msg: {
            type: "string",
            description: "Success message.",
          },
        },
      },
      Error: {
        properties: {
          msg: {
            type: "string",
            description: "Error message.",
          },
        },
      },
      ExtendedError: {
        type: "array",
        items: {
          type: "object",
          properties: {
            msg: {
              type: "string",
              description: "Error message",
            },
            param: {
              type: "string",
              description: "The sent parameter causing the error.",
            },
            location: {
              type: "string",
              description: "Where was the parameter sent.",
            },
          },
        }
      },
      MissingTokenError: {
        properties: {
          msg: {
            type: "string",
            description: "No (Bearer) token provided.",
            example: "No token provided!",
          },
        },
      },
      WrongTokenError: {
        properties: {
          msg: {
            type: "string",
            description: "Wrong token provided.",
            example: "Unauthorized!",
          },
        },
      },
    },
    schemas: {
      User: {
        type: "object",
        required: ["username", "email", "password"],
        properties: {
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
          password: {
            type: "string",
            description: "Password of the user.",
            example: "superSafePassword20389475",
          },
        },
      },
      PriceAlert: {
        type: "object",
        required: ["name", "filterUrl", "targetPrice"],
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
        },
      },
    },
  },
};