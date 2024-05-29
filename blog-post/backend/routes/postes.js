const express = require('express');
const router = express.Router();
const {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
} = require('../controllers/postController');

router.post('/post', createPost);
router.get('/getall', getPosts);

router.get('/:id', getPost);
router.put('/edit/:id', updatePost);
router.delete('/delete/:id', deletePost);

module.exports = router;
