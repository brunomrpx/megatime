import React, { Component } from 'react';

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
    let hours = date.getHours();
    let minutes = date.getMinutes();

    hours = hours >= 10 ? hours : ('0' + hours);
    minutes = minutes >= 10 ? minutes : ('0' + minutes);

    return hours + ':' + minutes;
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
