import React, { Component } from 'react';
import Time from '../../helpers/Time';

class NextTime extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nextTime: null
    };
  }

  calcNextTime(remainingTime) {
    if (remainingTime === '00:00:00') {
      return;
    }

    let now = new Date();
    let [rHours, rMinutes, rSeconds] = remainingTime.split(':');

    rHours = parseInt(rHours, 10);
    rMinutes = parseInt(rMinutes, 10);
    rSeconds = parseInt(rSeconds, 10);

    now.setHours(now.getHours() + rHours);
    now.setMinutes(now.getMinutes() + rMinutes);
    now.setSeconds(now.getSeconds()+ rSeconds);

    let nextTime = Time.getTimeFromDate(now);

    this.setState({
      nextTime: nextTime
    });

    return nextTime;
  }

  render() {
    return (
      <div>{ this.state.nextTime ? this.state.nextTime : '00:00:00' }</div>
    );
  }
}

NextTime.defaultProps = {};

export default NextTime;

