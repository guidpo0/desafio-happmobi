// import express from 'express';
// import rescue from 'express-rescue';
// import UsersController from '../controllers/UsersController';
// import ErrorController from '../controllers/ErrorController';
// import validateUsersData from '../validators/usersValidators';

// class UsersRouter {
//   public router: express.Router;

//   public constructor() {
//     this.router = express.Router();
//     this.routes();
//     this.middlewares();
//   }

//   private routes(): void {
//     this.router.post('/', rescue(validateUsersData), rescue(UsersController.create));
//     this.router.get('/', rescue(UsersController.getAll));
//     this.router.get('/:id', rescue(UsersController.getById));
//     this.router.delete('/:id', rescue(UsersController.remove));
//     this.router.put('/:id', rescue(UsersController.update));
//   }

//   private middlewares(): void {
//     this.router.use(ErrorController);
//   }
// }

// export default new UsersRouter().router;
