import React, { Component } from 'react';

class CompletedTime extends Component {
  render() {
    console.log('entries: ', this.props.entries);

    let entries = this.props.entries;

    let timeInMiliseconds = entries.reduce((prev, e) => {
      if (!e.start || !e.stop) {
        return 0;
      }

      let startDate = new Date(JSON.parse(e.start));
      let stopDate = new Date(JSON.parse(e.stop));

      return prev + (stopDate - startDate);
    }, 0);

    return (
      <div>{timeInMiliseconds}</div>
    );
  }
}

CompletedTime.defaultProps = {
  entries: [],
};

export default CompletedTime;

