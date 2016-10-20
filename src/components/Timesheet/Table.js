import React, { Component } from 'react';

import EntryRow from './EntryRow';

class Table extends Component {
  render() {
    let rows;

    if (this.props.entries.length > 0) {
      rows = this.props.entries.map((e, i) => {
        return (
          <EntryRow start={e.start} stop={e.stop} key={i} />
        );
      })
    } else {
      rows = (
        <tr>
          <td colSpan="2">No entries found</td>
        </tr>
      );
    }

    return (
      <table>
        <thead>
          <tr>
            <th colSpan="2">Timesheet</th>
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
  entries: []
};

export default Table;

