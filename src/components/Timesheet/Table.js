import React, { Component } from 'react';

import EntryRow from './EntryRow';

class Table extends Component {
  constructor(props) {
    super(props);

    this.state = {
      entries: this.props.entries
    };

    this.handleDeleteRow = this.handleDeleteRow.bind(this);
    this.handleOnUpdateRow = this.handleOnUpdateRow.bind(this);
  }

  handleDeleteRow(event, rowIndex) {
    let entries = this.state.entries;
    entries.splice(rowIndex, 1);

    this.setState({ entries: entries });
    if (this.props.onEntriesUpdate) {
      this.props.onEntriesUpdate(entries);
    }
  }

  handleOnUpdateRow(row, rowIndex) {
    console.log('-> handle on update row: ', this.state.entries);
    let entries = this.state.entries;
    let entry = entries[rowIndex];
    let property = row.start ? 'start' : 'stop';

    entry[property] = row[property];

    this.props.onEntriesUpdate(this.state.entries);
  }

  render() {
    let rows;

    if (this.state.entries.length > 0) {
      rows = this.props.entries.map((e, i) => {
        return (
          <EntryRow start={e.start} stop={e.stop} key={i} onDeleteRow={(event) => this.handleDeleteRow(event, i)} onUpdateRow={(event) => this.handleOnUpdateRow(event, i)} />
        );
      })
    } else {
      rows = (
        <tr>
          <td colSpan="3">No entries found</td>
        </tr>
      );
    }

    return (
      <table className="timesheet">
        <thead>
          <tr>
            <th colSpan="3">Timesheet</th>
          </tr>
          <tr>
            <th>Start</th>
            <th>Stop</th>
          </tr>
        </thead>
        <tbody>
          { rows }
        </tbody>
      </table>
    );
  }
}

Table.defaultProps = {
  entries: [],
  onEntriesUpdate: null
};

export default Table;

