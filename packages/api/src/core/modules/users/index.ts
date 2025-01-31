// import UserController from './index.controller'

import { routeGroup } from '@/common/route-group'
// import ValidationHelper from '@/common/validators'

import auth from '@/middlewares/auth'

// const controller = UserController.getController()
export default routeGroup(
  {
    name: 'users',
    prefix: '/users'
  },
  [
    {
      method: 'get',
      path: '/',
      middlewares: [auth],
      validators: [],
      controllers: [],
    },
    // {
    //   method: 'get',
    //   path: '/:id',
    //   middlewares: [auth],
    //   validators: [],
    //   controllers: [],
    // },
    // {
    //   method: 'post',
    //   path: '/',
    //   middlewares: [auth],
    //   validators: [
    //     ValidationHelper.isNotEmpty('email'),
    //     ValidationHelper.isEmail('email'),
    //     ValidationHelper.isNotEmpty('name'),
    //     ValidationHelper.isNotEmpty('password'),
    //   ],
    //   controllers: [],
    // },
    // {
    //   method: 'patch',
    //   path: '/:id',
    //   middlewares: [auth],
    //   validators: [
    //     ValidationHelper.isNotEmpty('email', true),
    //     ValidationHelper.isEmail('email', true),
    //     ValidationHelper.isNotEmpty('name', true),
    //     ValidationHelper.isNotEmpty('password', true),
    //   ],
    //   controllers: [],
    // },
    // {
    //   method: 'delete',
    //   path: '/:id',
    //   middlewares: [auth],
    //   validators: [],
    //   controllers: [],
    // },
  ]
)
