const express = require('express');
const listontroller = require('../controllers/listController');
const authenticate  = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/list', listontroller.List);
router.post('/intrested',listontroller.interested)
router.post('/intreted_user',listontroller.getInterests)
router.get('/getalluser',listontroller.getAllUser)
router.post('/get_user_id',listontroller.get_particularUser)
router.post('/hidestatus/update',listontroller.hidestatusUpdate)
router.post('/user/delete',listontroller.oneUserDelete)
router.post('/block/user',listontroller.activestatusUpdate)
router.post('/remove_intrested_user',listontroller.remove_interested_user)
router.get('/get_block',listontroller.get_block_unblock)

module.exports = router;