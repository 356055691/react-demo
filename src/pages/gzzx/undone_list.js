import React, { Component } from 'react';
import CommonForm from '../common/form';
import { Link } from 'react-router-dom';
import '../../scss/undone_list.scss';

class UndoneList extends Component {
  state = {
    formTitle: [
      {title: 'APP名称', key: 'app_name', dataIndex: 'app_name'},
      {title: 'APP类型', key: 'app_type', dataIndex: 'app_type'},
      {title: '姓名', key: 'user_name', dataIndex: 'user_name'},
      {title: '借款金额（元）', key: 'borrow_amt', dataIndex: 'borrow_amt'},
      {title: '借款日期', key: 'borrow_time', dataIndex: 'borrow_time'}
    ]
  };
  render() {
    return (
      <div>
        <Link to="/page/phonecollection/list">phonecollection_list</Link>
        <CommonForm formTitle={this.state.formTitle}></CommonForm>
      </div>
    );
  }
}

export default UndoneList;
