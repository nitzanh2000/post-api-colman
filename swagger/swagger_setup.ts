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
        Post: {
          type: "object",
          properties: {
            title: { type: "string" },
            content: { type: "string" },
            sender: { type: "string" },
          },
          required: ["title", "content", "sender"],
        },
        Comment: {
          type: "object",
          properties: {
            content: { type: "string" },
            user: { type: "string" },
            post: { $ref: "#/components/schemas/Post" },
          },
          required: ["content", "post"],
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
      "/posts/{postId}": {
        get: {
          summary: "Get post by ID",
          tags: ["posts"],
          parameters: [
            {
              name: "postId",
              in: "path",
              required: true,
              description: "The ID of the post",
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
      "/comments/{commentId}": {
        get: {
          summary: "Get comment by ID",
          tags: ["comments"],
          parameters: [
            {
              name: "commentId",
              in: "path",
              required: true,
              description: "The ID of the comment",
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
          summary: "Update comment by ID",
          tags: ["comments"],
          parameters: [
            {
              name: "commentId",
              in: "path",
              required: true,
              description: "The ID of the comment",
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
          summary: "DELETE comment by ID",
          tags: ["comments"],
          parameters: [
            {
              name: "commentId",
              in: "path",
              required: true,
              description: "The ID of the comment",
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
      "/comments/post/{postId}": {
        get: {
          summary: "Get comments by post ID",
          tags: ["comments"],
          parameters: [
            {
              name: "postId",
              in: "path",
              required: true,
              description: "The ID of the post",
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
    },
  },
  // Path to the API specs
  apis: ["./routes/*.ts"],
};
