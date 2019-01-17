import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon } from 'antd';
import { POST } from '../../libs/http';

const SubMenu = Menu.SubMenu;

class MenuList extends Component {
  state = {
    menuList: []
  };
  componentDidMount(){
    this.getList();
  };
  getList = () => {
    let params = {};
    POST('/index', params, true).then((res) => {
      if (res && res.code === 1000) {
        this.setState({
          menuList: res.data.muenList
        });
      }
    });
  };
  menuContent = () => {
    return (
      <div>
        <Menu
          theme="dark"
          defaultOpenKeys={['sub1']}
          mode="inline">
          {
            !this.state.menuList
            ? <div>加载中。。。</div>
            : (
              this.state.menuList.map((level1, level1Index) => (
                level1.children && level1.children.length > 0 ?
                <SubMenu key={level1.muenName + level1Index} title={<span><Icon type="bars" /><span>{level1.muenName}</span></span>}>
                  {
                    level1.children.map((level2, level2Index) => (
                      level2.children && level2.children.length > 0 ?
                      <SubMenu key={level2.muenName + level2Index} title={level2.muenName}>
                        {
                          level2.children.map((level3, level3Index) => (
                            <Menu.Item key={level3Index}><Link to={level3.uri}>{level3.muenName}</Link></Menu.Item>
                          ))
                        }
                      </SubMenu>
                      :
                      <Menu.Item key={level2.muenName + level2Index}><Link to={level2.uri}>{level2.muenName}</Link></Menu.Item>
                    ))
                  }
                </SubMenu>
                :
                <Menu.Item key={level1.muenName + level1Index}><Link to={level1.uri}>{level1.muenName}</Link></Menu.Item>
              ))
            )
          }
        </Menu>
      </div>
    );
  };
  render() {
    return (
      <div>
        {this.menuContent()}
      </div>
    );
  }
}

export default MenuList;
