import express from 'express';
import multerMiddleware from '../middlewares/multer.middleware.js';
import {
    changeUserRoleToPremium,
    uploadFiles
} from '../controllers/users.controller.js';

const router = express.Router();

router.post('/change-role/:userId', changeUserRoleToPremium);
router.post('/:uid/documents', multerMiddleware.array('documents'), uploadFiles);

export default router;