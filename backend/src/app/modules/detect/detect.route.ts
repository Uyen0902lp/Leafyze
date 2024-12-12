// src/modules/detect/detect.routes.ts
import express from 'express';
import { DetectController } from './detect.controller';
import multer from 'multer';
import auth from '../../../middleware/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();
// const upload = multer({ dest: 'uploads/' });
const upload = multer({ storage: multer.memoryStorage() });

// router.post('/', auth(), upload.single('file'), DetectController.detectAndSave);
// router.post('/', upload.single('file'), DetectController.detectDisease); 
router.post('/', auth(), upload.single('file'), DetectController.detectAndSave);
router.get('/disease-info/:disease_id', DetectController.getDiseaseInfo); 
router.get('/all-predictions', DetectController.getAllPredictions); 
router.get('/user-history/:userId', auth(), DetectController.getUserPredictionHistory); 
router.get('/disease-list', DetectController.getDiseaseList);
router.patch('/update-disease/:disease_id', auth(ENUM_USER_ROLE.ADMIN), DetectController.updateDisease);

export const DetectRoutes = router;