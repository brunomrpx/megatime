import React, { Component } from 'react';

class NewEntryButtonRow extends Component {
  constructor(props) {
    super(props);
    this.addNewEntry = this.addNewEntry.bind(this);
  }

  addNewEntry() {
    let now = JSON.stringify(new Date());
    let entries = this.props.entries;
    let emptyList = entries.length === 0;
    let lastItem = entries[entries.length - 1];

    if (emptyList || typeof lastItem.stop !== 'undefined') {
      entries.push({ start: now });
    } else {
      lastItem.stop = now;
    }

    this.props.onEntriesUpdate(entries);
  }

  render() {
    return (
      <button onClick={this.addNewEntry}>Inserir Marcação</button>
    );
  }
}

NewEntryButtonRow.defaultProps = {
  entries: [],
};

export default NewEntryButtonRow;
