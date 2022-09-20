const express = require('express')
const router = express.Router()

const {firebaseAuth} = require('./../middleware/isAuthenticated.middleware')

const {
    me,
    getAllDeals,
    getAllBusiness,
    getDeal,
    getBusiness
} = require("../controller/user")

router.use(firebaseAuth)

/**
 * @swagger
 * /api/me:
 *   get:
 *     description: Get the current user
 *     tags: [Mobile App API]
 *     responses:
 *       200:
 *         description: Mobile_User
 */

router.get('/me', me)


/**
 * @swagger
 * /api/deals:
 *   get:
 *     summary: Get all Business Deals
 *     tags: [Mobile App API]
 *     responses:
 *       200:
 *         description: All Business Deals
 *       400:
 *         description: deals can not be found
 *       401:
 *         description: Unauthorized
 */
router.get('/deals', getAllDeals)

/**
 * @swagger
 * /api/deal/{id}:
 *   get:
 *     summary: Get Business Deal by ID
 *     tags: [Mobile App API]
 *     parameters:
 *       - in : path
 *         name: id
 *         description: id of deal
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: deal by its id
 *         content:
 *           application/json:
 *       400:
 *         description: deal can not be found
 *       401:
 *          description: Unauthorized
 */
router.get('/deal/:id', getDeal)


/**
 * @swagger
 * /api/business:
 *   get:
 *     summary: Get all Businesses
 *     tags: [Mobile App API]
 *     responses:
 *       200:
 *         description: All Businesses
 *       400:
 *         description: businesses can not be found
 *       401:
 *         description: Unauthorized
 */
router.get('/businesses', getAllBusiness)


/**
 * @swagger
 * /api/business/{id}:
 *   get:
 *     summary: Get Business by ID
 *     tags: [Mobile App API]
 *     parameters:
 *       - in : path
 *         name: id
 *         description: id of business
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: business by its id
 *         content:
 *           application/json:
 *       400:
 *         description: business can not be found
 *       401:
 *         description: Unauthorized
 */
router.get('/business/:id', getBusiness)


module.exports = router