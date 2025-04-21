import express from 'express';
import { addItem, getMenuItems } from '../controllers/menu.controller.js';

const itemRouter = express.Router();

itemRouter.post('/', addItem);
itemRouter.get('/', getMenuItems);

export default itemRouter;