import asyncComponent from '../../libs/AsyncComponent';
const DivisionList = asyncComponent(() => import('../../pages/fazx/ajzx/division_list'));

export default [
  {
    path: '/division/list',
    component: DivisionList
  }
];
