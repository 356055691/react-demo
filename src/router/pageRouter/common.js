import asyncComponent from '../../libs/AsyncComponent';
const Login = asyncComponent(() => import('../../pages/common/login'));

export default [
  {
    path: '/login',
    component: Login
  }
];
