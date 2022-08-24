/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       required:
 *         - user_id
 *         - title
 *         - description
 *       properties:
 *         id:
 *           type: integer
 *           description: The Auto-generated id of a project
 *         user_id:
 *           type: integer
 *           description: id of user
 *         title:
 *           type: string
 *           description: title of project
 *         description:
 *           type: string
 *           descripton: description of project *
 *       example:
 *         id: 1
 *         user_id: 1
 *         title: my project
 *         description: short summary of project
 *
 */
