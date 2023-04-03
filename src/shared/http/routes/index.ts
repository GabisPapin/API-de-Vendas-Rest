import { Router } from 'express';
import productsRouter from '@modules/products/routes/productsRoutes';
import usersRouter from '@modules/users/routes/usersRoutes';
import sessionsRouter from '@modules/users/routes/sessionsRoutes';
import passwordRouter from '@modules/users/routes/passwordRoutes';
import profileRouter from '@modules/users/routes/profileRoutes';
import customersRouter from '@modules/customers/routes/customersRoutes';
import ordersRouter from '@modules/orders/routes/ordersRoutes';

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/customers', customersRouter);
routes.use('/orders', ordersRouter);

export default routes;
