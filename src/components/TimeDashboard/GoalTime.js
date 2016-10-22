import React, { Component } from 'react';

class GoalTime extends Component {
  render() {
    return (
      <div>{this.props.value}</div>
    );
  }
}

GoalTime.defaultProps = {
  value: null,
};

export default GoalTime;

