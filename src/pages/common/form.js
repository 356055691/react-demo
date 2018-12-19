import React, { Component } from 'react';
import { Table } from 'antd';
import { POST } from '../../libs/http';

class CommonForm extends Component {
  state = {
    formParams: {
      pageSize: 10,
      pageNum: 1,
      total: 0,
      rows: {}
    },
    formData: []
  };
  componentDidMount(){
    this.getData();
  };
  getData = () => {
    POST('/CXWB/nocollection/list', this.state.formParams).then((res) => {
      if (res && res.code === 1000 && res.data && res.data.rows) {
        this.setState({
          formData: res.data.rows,
          formParams: {
            pageSize: 10,
            pageNum: res.data.currentPage,
            total: res.data.total,
            rows: {}
          }
        });
      }
    });
  };
  changePage = (page) => {
    this.setState({
      formParams: {
        pageSize: 10,
        pageNum: page,
        total: this.state.formParams.total,
        rows: {}
      }
    }, () => {
      this.getData();
    })
  }
  render() {
    return (
      <Table
        rowKey={record => record.wid}
        key="CommonForm"
        columns={this.props.formTitle}
        dataSource={this.state.formData}
        pagination={{
          current: this.state.formParams.pageNum,
          total: this.state.formParams.total,
          onChange: this.changePage,
        }}/>
    );
  }
}

export default CommonForm;
