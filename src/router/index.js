import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import FazxRoute from './pageRouter/fazx';
import GzzxRoute from './pageRouter/gzzx';
// import CommonRoute from './pageRouter/common';

const routerList = [].concat(
  // CommonRoute,
  FazxRoute,
  GzzxRoute
);

class RouterList extends Component {
  state = {
    routerList: routerList
  };
  render() {
    return (
      <div>
        <Switch>
          {
            this.state.routerList.map((val) => (
              <Route key={val.path} exact path={val.path} component={ val.component }/>
            ))
          }
        </Switch>
      </div>
    );
  }
}

export default RouterList;
