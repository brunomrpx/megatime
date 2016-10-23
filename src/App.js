import React, { Component } from 'react';
import './App.css';

import Table from './components/Timesheet/Table';
import NewEntryButton from './components/Timesheet/NewEntryButton';
import GoalTime from './components/TimeDashboard/GoalTime'
import CompletedTime from './components/TimeDashboard/CompletedTime';
import RemainingTime from './components/TimeDashboard/RemainingTime';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      entries: [],
      goalTime: '08:00:00'
    };

    this.handleOnEntriesUpdate = this.handleOnEntriesUpdate.bind(this);
  }

  handleOnEntriesUpdate(entries) {
    console.log('updating entries: ', entries);
    this.setState({ entries: entries });

    let completedTimeRef = this.refs.completedTime;
    let remainingTimeRef = this.refs.remainingTime;
    let completedTime = completedTimeRef.calcEntriesTime();

    remainingTimeRef.calcRemainingTime(completedTime);
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
              <td>
                <GoalTime value={this.state.goalTime} />
              </td>
              <td>
                <CompletedTime entries={this.state.entries} ref="completedTime" />
              </td>
              <td>
                <RemainingTime goalTime={this.state.goalTime} ref="remainingTime" />
              </td>
              <td>18:00</td>
            </tr>
          </tbody>
        </table>
        <br/>
        <br/>
        <NewEntryButton entries={this.state.entries} onEntriesUpdate={this.handleOnEntriesUpdate} />
        <br/>
        <br/>
        <Table entries={this.state.entries} />
      </div>
    );
  }
}

export default App;

