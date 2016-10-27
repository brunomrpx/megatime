import React, { Component } from 'react';
import Time from '../../helpers/Time';

class EntryRow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editingStart: false,
      editingStop: false
    };

    this.formatTime = this.formatTime.bind(this);
    this.startEditingStartTime = this.startEditingStartTime.bind(this);
    this.finishEditingStartTime = this.finishEditingStartTime.bind(this);
    this.startEditingStopTime = this.startEditingStopTime.bind(this);
    this.finishEditingStopTime = this.finishEditingStopTime.bind(this);
    this.setTimeToDate = this.setTimeToDate.bind(this);
  }

  formatTime(time) {
    if (!time) {
      return;
    }

    let date = new Date(JSON.parse(time));
    let formatedDate = Time.getTimeFromDate(date);

    return formatedDate;
  }

  startEditingStopTime() {
    console.log('-> start editing stop time');
    this.setState({ editingStop: true });
  }

  finishEditingStopTime(event) {
    console.log('-> finish editing stop time');

    let time = event.target.value.split(':');
    let stopDate = new Date(JSON.parse(this.props.stop));
    let modifiedDate = this.setTimeToDate(stopDate, ...time);
    let newStopValue = JSON.stringify(modifiedDate);

    this.setState({ editingStop: false });

    this.props.onUpdateRow({ stop: newStopValue });
  }

  startEditingStartTime() {
    console.log('-> start editing start time');
    this.setState({ editingStart: true });
  }

  setTimeToDate(date, ...time) {
    let [tHours, tMinutes, tSeconds] = time.map(t => parseInt(t, 10));

    date = new Date(date.getTime());
    date.setHours(tHours);
    date.setMinutes(tMinutes);
    date.setSeconds(tSeconds);

    return date;
  }

  finishEditingStartTime(event) {
    console.log('-> finish editing start time');

    let time = event.target.value.split(':');
    let startDate = new Date(JSON.parse(this.props.start));
    let modifiedDate = this.setTimeToDate(startDate, ...time);
    let newStartValue = JSON.stringify(modifiedDate);

    this.setState({ editingStart: false });

    this.props.onUpdateRow({ start: newStartValue });
  }

  componentDidUpdate() {
    if (this.state.editingStart) {
      this.refs.startInputElement.focus();
    }
  }

  render() {
    let startValue = this.formatTime(this.props.start);
    let startElement;

    let stopValue = this.formatTime(this.props.stop);
    let stopElement;

    if (!this.state.editingStart) {
      startElement = <span>{startValue}</span>;
    } else {
      startElement = <input type="text" defaultValue={startValue} ref="startInputElement" onBlur={this.finishEditingStartTime} />
    }

    if (!this.state.editingStop) {
      stopElement = <span>{stopValue}</span>;
    } else {
      stopElement = <input type="text" defaultValue={stopValue} ref="stopInputElement" onBlur={this.finishEditingStopTime} />
    }

    return (
      <tr className="entry-row">
        <td onDoubleClick={this.startEditingStartTime}>{startElement}</td>
        <td onDoubleClick={this.startEditingStopTime}>{stopElement}</td>
        <td><button className="button" onClick={this.props.onDeleteRow}>Delete</button></td>
      </tr>
    );
  }
}

EntryRow.defaultProps = {
  start: null,
  stop: null,
  onDeleteRow: null,
  onUpdateRow: null
};

export default EntryRow;

