import express from 'express';
import { addLogger } from '../middlewares/logger.middleware.js';
import {
  renderHome,
  renderRealTimeProducts,
  renderProductsPage,
  addToCart,
  renderCart,
  renderChat,
  renderRegister,
  renderLogin,
  insertMockProducts,
  loggerTest,
} from '../controllers/views.controller.js';

const router = express.Router();
router.use(addLogger);

router.get('/', renderHome);
router.get('/realtimeproducts', renderRealTimeProducts);
router.get('/products', renderProductsPage);
router.post('/products/:productId/add-to-cart', addToCart);
router.get('/cart/:cid', renderCart);
router.get('/chat', renderChat);
router.get('/register', renderRegister);
router.get('/login', renderLogin);
router.get('/insertMockProducts', insertMockProducts);
router.get('/loggerTest', loggerTest);

export default router;



