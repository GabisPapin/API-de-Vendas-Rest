import { DataSource } from 'typeorm';

import User from '@modules/users/typeorm/entities/User';
import UserToken from '@modules/users/typeorm/entities/UserToken';
import Customer from '@modules/customers/typeorm/entities/Customer';
import Order from '@modules/orders/typeorm/entities/Order';
import OrdersProducts from '@modules/orders/typeorm/entities/OrdersProducts';
import Product from '@modules/products/typeorm/entities/Product';
import { CreateProducts1678486356895 } from '@shared/typeorm/migrations/1678486356895-CreateProducts';
import { CreateUsers1678913846006 } from '@shared/typeorm/migrations/1678913846006-CreateUsers';
import { CreateUserTokens1679359197166 } from '@shared/typeorm/migrations/1679359197166-CreateUserTokens';
import { CreateCustomers1679444395197 } from '@shared/typeorm/migrations/1679444395197-CreateCustomers';
import { CreateOrders1679448623535 } from '@shared/typeorm/migrations/1679448623535-CreateOrders';
import { AddCustomerIdToOrders1679448876274 } from '@shared/typeorm/migrations/1679448876274-AddCustomerIdToOrders';
import { CreateOrdersProducts1679518209730 } from '@shared/typeorm/migrations/1679518209730-CreateOrdersProducts';
import { AddOrderIdToOrdersProducts1679519015983 } from '@shared/typeorm/migrations/1679519015983-AddOrderIdToOrdersProducts';
import { AddProductIdToOrdersProducts1679521873180 } from '@shared/typeorm/migrations/1679521873180-AddProductIdToOrdersProducts';

export const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASS,
  database: process.env.POSTGRES_DB,
  entities: [User, UserToken, Customer, Order, OrdersProducts, Product],
  migrations: [
    CreateProducts1678486356895,
    CreateUsers1678913846006,
    CreateUserTokens1679359197166,
    CreateCustomers1679444395197,
    CreateOrders1679448623535,
    AddCustomerIdToOrders1679448876274,
    CreateOrdersProducts1679518209730,
    AddOrderIdToOrdersProducts1679519015983,
    AddProductIdToOrdersProducts1679521873180,
  ],
});
