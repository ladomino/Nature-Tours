const express = require('express');
const reviewController = require('../controllers/reviewController');
const authController = require('../controllers/authController');

// we need access to the tourid so we need merge params.
const router = express.Router({ mergeParams: true });

router.use(authController.protect);

// POST /tour/234fad4/reviews
// GET /tour/234fad4/reviews
// POST /reviews

// Need to restrict routes to certain users - users can create.
router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(
    authController.restrictTo('user'),
    reviewController.setTourUserIds,
    reviewController.createReview
  );

// User can update and delete as well as admin.
router
  .route('/:id')
  .get(reviewController.getReview)
  .patch(
    authController.restrictTo('user', 'admin'),
    reviewController.updateReview
  )
  .delete(
    authController.restrictTo('user', 'admin'),
    reviewController.deleteReview
  );

module.exports = router;
