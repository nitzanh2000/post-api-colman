export const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Posts API",
      version: "1.0.0",
      description: "API for managing posts",
    },
    components: {
      schemas: {
        User: {
          type: "object",
          properties: {
            email: { type: "string" },
            password: { type: "string" },
            username: { type: "string" },
          },
          required: ["email", "password", "username"],
        },
        Post: {
          type: "object",
          properties: {
            title: { type: "string" },
            content: { type: "string" },
            user: { $ref: "#/components/schemas/User" }, // Referencing User schema
          },
          required: ["title", "content", "user"],
        },
        Comment: {
          type: "object",
          properties: {
            content: { type: "string" },
            user: { $ref: "#/components/schemas/User" }, // Referencing User schema
            post: { $ref: "#/components/schemas/Post" }, // Referencing Post schema
          },
          required: ["content", "user", "post"],
        },
      },
    },
    paths: {
      "/posts": {
        get: {
          summary: "Get all posts",
          tags: ["posts"],
          parameters: [
            {
              name: "sender",
              in: "query",
              required: false,
              description: "sender name",
              schema: {
                type: "string",
              },
            },
          ],
          responses: {
            200: {
              description: "A list of posts",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: { $ref: "#/components/schemas/Post" },
                  },
                },
              },
            },
          },
        },
        post: {
          summary: "Create a new post",
          tags: ["posts"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Post" },
              },
            },
          },
          responses: {
            201: {
              description: "Post created",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Post" },
                },
              },
            },
          },
        },
      },
      "/posts/{id}": {
        get: {
          summary: "Get post by id",
          tags: ["posts"],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              description: "The id of the post",
              schema: {
                type: "string",
              },
            },
          ],
          responses: {
            200: {
              description: "Post found",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Post" },
                },
              },
            },
            404: {
              description: "Post not found",
            },
          },
        },
        delete: {
          summary: "Delete post by id",
          tags: ["posts"],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              description: "The id of the post",
              schema: {
                type: "string",
              },
            },
          ],
          responses: {
            200: {
              description: "The post deleted",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Post" },
                },
              },
            },
            404: {
              description: "Post not found",
            },
          },
        },
        put: {
          summary: "Update post by id",
          tags: ["posts"],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              description: "The id of the post",
              schema: {
                type: "string",
              },
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Post" },
              },
            },
          },
          responses: {
            200: {
              description: "Post updated",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Post" },
                },
              },
            },
            404: {
              description: "Post not found",
            },
          },
        },
      },
      "/comments": {
        get: {
          summary: "Get all comments",
          tags: ["comments"],
          responses: {
            200: {
              description: "A list of comments",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: { $ref: "#/components/schemas/Comment" },
                  },
                },
              },
            },
          },
        },
        post: {
          summary: "Create a new comment",
          tags: ["comments"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Comment" },
              },
            },
          },
          responses: {
            201: {
              description: "Comment created",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Comment" },
                },
              },
            },
          },
        },
      },
      "/comments/{id}": {
        get: {
          summary: "Get comment by id",
          tags: ["comments"],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              description: "The id of the comment",
              schema: {
                type: "string",
              },
            },
          ],
          responses: {
            200: {
              description: "Comment found",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Comment" },
                },
              },
            },
            404: {
              description: "Comment not found",
            },
          },
        },
        put: {
          summary: "Update comment by id",
          tags: ["comments"],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              description: "The id of the comment",
              schema: {
                type: "string",
              },
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Comment" },
              },
            },
          },
          responses: {
            200: {
              description: "Comment updated",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Comment" },
                },
              },
            },
            404: {
              description: "Comment not found",
            },
          },
        },
        delete: {
          summary: "Delete comment by id",
          tags: ["comments"],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              description: "The id of the comment",
              schema: {
                type: "string",
              },
            },
          ],
          responses: {
            200: {
              description: "Comment found",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Comment" },
                },
              },
            },
            404: {
              description: "Comment not found",
            },
          },
        },
      },
      "/comments/post/{id}": {
        get: {
          summary: "Get comments by post id",
          tags: ["comments"],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              description: "The id of the post",
              schema: {
                type: "string",
              },
            },
          ],
          responses: {
            200: {
              description: "Comments found",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: { $ref: "#/components/schemas/Comment" },
                  },
                },
              },
            },
            404: {
              description: "No comments found for the given post",
            },
          },
        },
      },
      "/auth/register": {
        post: {
          summary: "Register new user",
          tags: ["auth"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/User" },
              },
            },
          },
          responses: {
            201: {
              description: "User created",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/User" },
                },
              },
            },
          },
        },
      },
      "/auth/login": {
        post: {
          summary: "Get jwt token",
          tags: ["auth"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    email: { type: "string" },
                    password: { type: "string" },
                  },
                  required: ["email", "password"],
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: "User created",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/User" },
              },
            },
          },
        },
      },
      "/auth/logout": {
        post: {
          summary: "Get jwt token",
          tags: ["auth"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    email: { type: "string" },
                    password: { type: "string" },
                  },
                  required: ["email", "password"],
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: "User created",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/User" },
              },
            },
          },
        },
      },
      "/users": {
        get: {
          summary: "Get all users",
          tags: ["users"],
          responses: {
            200: {
              description: "A list of users",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: { $ref: "#/components/schemas/User" },
                  },
                },
              },
            },
          },
        },
        post: {
          summary: "Create a new user",
          tags: ["users"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/User" },
              },
            },
          },
          responses: {
            201: {
              description: "User created",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/User" },
                },
              },
            },
          },
        },
      },
      "/users/{id}": {
        get: {
          summary: "Get user by id",
          tags: ["users"],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              description: "The id of the users",
              schema: {
                type: "string",
              },
            },
          ],
          responses: {
            200: {
              description: "User found",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/User" },
                },
              },
            },
            404: {
              description: "User not found",
            },
          },
        },
        delete: {
          summary: "Delete user by id",
          tags: ["users"],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              description: "The id of the user",
              schema: {
                type: "string",
              },
            },
          ],
          responses: {
            200: {
              description: "The user deleted",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/User" },
                },
              },
            },
            404: {
              description: "User not found",
            },
          },
        },
        put: {
          summary: "Update user by id",
          tags: ["users"],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              description: "The id of the user",
              schema: {
                type: "string",
              },
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/User" },
              },
            },
          },
          responses: {
            200: {
              description: "User updated",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/User" },
                },
              },
            },
            404: {
              description: "User not found",
            },
          },
        },
      },
    },
  },
  // Path to the API specs
  apis: ["./routes/*.ts"],
};
