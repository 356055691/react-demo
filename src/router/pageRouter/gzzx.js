import asyncComponent from '../../libs/AsyncComponent';
const UndoneList = asyncComponent(() => import('../../pages/gzzx/undone_list'));
const PhonecollectionList = asyncComponent(() => import('../../pages/gzzx/phonecollection_list'));

export default [
  {
    path: '/page/undone/list',
    component: UndoneList
  },
  {
    path: '/page/phonecollection/list',
    component: PhonecollectionList
  }
];

