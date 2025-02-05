import AuthController from './auth.controller'

import { routeGroup } from '@/common/route-group'
import ValidationHelper from '@/common/validators'

const controller = AuthController.getInstance()
export default routeGroup(
  {
    name: 'auth',
    prefix: '/auth',
  },
  [
    {
      method: 'post',
      path: '/login',
      middlewares: [],
      validators: [
        ValidationHelper.isNotEmpty('email'),
        ValidationHelper.isNotEmpty('key'),
        ValidationHelper.isEmail('email'),
      ],
      controllers: [controller.login],
    },
  ],
)
