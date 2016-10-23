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

  calcEntriesTime() {
    let entries = this.props.entries;

    let milliseconds = entries.reduce((prev, e) => {
      if (!e.start || !e.stop) {
        return prev;
      }

      let startDate = new Date(JSON.parse(e.start));
      let stopDate = new Date(JSON.parse(e.stop));

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

