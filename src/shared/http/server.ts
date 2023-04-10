import 'reflect-metadata';
import 'dotenv/config';
import { app } from '@shared/http/app';
import { dataSource } from '@shared/typeorm';

const PORT = 3333;

dataSource.initialize().then(() => {
  const server = app.listen(PORT, () => {
    return console.log('Server started on port 3333!');
  });
});
