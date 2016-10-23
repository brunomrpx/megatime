import React, { Component } from 'react';
import Time from '../../helpers/Time';

class EntryRow extends Component {
  constructor(props) {
    super(props);
    this.formatTime = this.formatTime.bind(this);
  }

  formatTime(time) {
    if (!time) {
      return;
    }

    let date = new Date(JSON.parse(time));
    let formatedDate = Time.getTimeFromDate(date);

    return formatedDate;
  }

  render() {
    return (
      <tr>
        <td>{ this.formatTime(this.props.start) }</td>
        <td>{ this.formatTime(this.props.stop) }</td>
      </tr>
    );
  }
}

EntryRow.defaultProps = {
  start: null,
  stop: null
};

export default EntryRow;
