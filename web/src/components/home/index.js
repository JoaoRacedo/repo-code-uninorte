import React, { Component } from 'react';

import {
  AppName,
} from '../../constants';

export default class HomeContainer extends Component {
  state = {
    count: 3
  };

  render() {
    return (
      <div className='home'>
        <div>
          Hello World!
        </div>
        <div>
          {AppName}
        </div>
        <div>
          {this.getCount()}
        </div>
      </div>
    );
  }

  getCount = () => {
    return this.state.count;
  }
}
