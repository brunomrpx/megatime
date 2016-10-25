import React, { Component } from 'react';
import Time from '../../helpers/Time';

class NextTime extends Component {
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

    if (this.props.onUpdateNextTime) {
      this.props.onUpdateNextTime(nextTime);
    }

    return nextTime;
  }

  render() {
    return (
      <div>{ this.props.nextTime ? this.props.nextTime : '00:00:00' }</div>
    );
  }
}

NextTime.defaultProps = {
  nextTime: null,
  onUpdateNextTime: null
};

export default NextTime;

