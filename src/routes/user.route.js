const express = require('express')
const router = express.Router()

const {firebaseAuth} = require('./../middleware/isAuthenticated.middleware')

const {
    me,
    getAllDeals,
    getAllBusiness,
    getDeal,
    getBusiness,
    favoriteBusiness,
    removeFavoriteBusiness,
    saveDeal,
    removeSaveDeal,
    getDealOfTheDay
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
 * /api/dotd:
 *   get:
 *     summary: Get Deal of the day
 *     tags: [Mobile App API]
 *     responses:
 *       200:
 *         description: Deal of the Day
 *       400:
 *         description: deal can not be found
 *       401:
 *         description: Unauthorized
 */
 router.get('/dotd', getDealOfTheDay)

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


/**
 * @swagger
 * /api/favorite-business/{id}:
 *   patch:
 *     summary: Mark as favorite the business
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
 router.patch('/favorite-business/:id', favoriteBusiness)

 /**
 * @swagger
 * /api/unfavorite-business/{id}:
 *   patch:
 *     summary: Remove business to favorite
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
router.patch('/remove-favorite-business/:id', removeFavoriteBusiness)


 /**
 * @swagger
 * /api/save-deal/{id}:
 *   patch:
 *     summary: Save deal to the user collection
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
router.patch('/save-deal/:id', saveDeal)

   /**
 * @swagger
 * /api/remove-save-deal/{id}:
 *   patch:
 *     summary: Remove deal to the save deals collection
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
router.patch('/remove-save-deal/:id', removeSaveDeal)


module.exports = router