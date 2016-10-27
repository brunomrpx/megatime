import React, { Component } from 'react';

import Time from '../../helpers/Time';

class CompletedTime extends Component {
  constructor(props) {
    super(props);

    this.state = {
      completedTime: null
    };

    this.calcEntriesTime = this.calcEntriesTime.bind(this);
  }

  calcEntriesTime(estimate = false) {
    let entries = this.props.entries;
    let stopDate, startDate;

    let milliseconds = entries.reduce((prev, e) => {
      if (!e.start) {
        return prev;
      }

      if (!e.stop) {
        if (estimate) {
          stopDate = new Date();
        } else {
          return prev;
        }
      } else {
        stopDate = new Date(JSON.parse(e.stop));
      }

      startDate = new Date(JSON.parse(e.start));

      return prev + (stopDate - startDate);
    }, 0);

    let completedTime = Time.msToTime(milliseconds);

    this.setState({ completedTime: completedTime });

    return completedTime;
  }


  render() {
    return (
      <div>{this.state.completedTime ? this.state.completedTime : '00:00:00'}</div>
    );
  }
}

CompletedTime.defaultProps = {
  entries: []
};

export default CompletedTime;

