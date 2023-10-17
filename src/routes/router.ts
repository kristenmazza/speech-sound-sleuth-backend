import { Router } from 'express';
import * as validation from '../controllers/validation';
export const router = Router();

router.get('/', validation.test);
