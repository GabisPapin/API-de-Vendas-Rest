export default {
  jwt: {
    secret: process.env.APP_SECRET || '811c747f02cafa35fb7628a1d6c6fbe4',
    expiresIn: '1d',
  },
};
