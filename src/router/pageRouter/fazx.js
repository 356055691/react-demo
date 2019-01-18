import asyncComponent from '../../libs/AsyncComponent';
const DivisionList = asyncComponent(() => import('../../pages/fazx/ajzx/division_list'));

export default [
  {
    path: '/page/division/list',
    component: DivisionList
  }
];
