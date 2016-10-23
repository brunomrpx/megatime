import React, { Component } from 'react';

import Time from '../../helpers/Time';

class RemainingTime extends Component {
  constructor(props) {
    super(props);

    this.state = {
      remainingTime: null
    };

    this.calcRemainingTime = this.calcRemainingTime.bind(this);
  }

  calcRemainingTime(completedTime) {
    let goalTime = this.props.goalTime;

    if (!goalTime) {
      return;
    }

    let [cHours, cMinutes, cSeconds] = completedTime.split(':');
    let [gHours, gMinutes, gSeconds] = goalTime.split(':');

    cHours = parseInt(cHours, 10);
    cMinutes = parseInt(cMinutes, 10);
    cSeconds = parseInt(cSeconds, 10);

    gHours = parseInt(gHours, 10);
    gMinutes = parseInt(gMinutes, 10);
    gSeconds = parseInt(gSeconds, 10);


    let completedTimeDate = new Date(
      null, null, null, cHours, cMinutes, cSeconds
    );

    let goalTimeDate = new Date(
      null, null, null, gHours, gMinutes, gSeconds
    );

    let remainingTime = Time.msToTime(goalTimeDate - completedTimeDate);

    this.setState({
      remainingTime: remainingTime
    });
  }

  render() {
    return (
      <div>{this.state.remainingTime ? this.state.remainingTime : '00:00:00'}</div>
    );
  }
}

RemainingTime.defaultProps = {
  goalTime: null
};

export default RemainingTime;

