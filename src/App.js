import React, { Component } from 'react';
import './App.css';

import Table from './components/Timesheet/Table';
import NewEntryButton from './components/Timesheet/NewEntryButton';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      entries: []
    };

    this.updateEntries = this.updateEntries.bind(this);
  }

  updateEntries(entries) {
    console.log('updating entries', entries);
    this.setState({ entries: entries });
  }

  render() {
    return (
      <div>
        <h1>Megaquality</h1>
        <table>
          <thead>
            <tr>
              <th colSpan="4">Marcações</th>
            </tr>
            <tr>
              <th>Meta</th>
              <th>Tempo marcado</th>
              <th>Tempo restante</th>
              <th>Proxima marcação</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>08:50</td>
              <td>05:00</td>
              <td>03:48</td>
              <td>18:00</td>
            </tr>
          </tbody>
        </table>
        <br/>
        <br/>
        <NewEntryButton entries={this.state.entries} onEntriesUpdate={this.updateEntries} />
        <br/>
        <br/>
        <Table entries={this.state.entries} />
      </div>
    );
  }
}

export default App;

