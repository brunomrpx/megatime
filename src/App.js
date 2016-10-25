import React, { Component } from 'react';
import './App.css';

import Table from './components/Timesheet/Table';
import NewEntryButton from './components/Timesheet/NewEntryButton';
import GoalTime from './components/TimeDashboard/GoalTime'
import CompletedTime from './components/TimeDashboard/CompletedTime';
import RemainingTime from './components/TimeDashboard/RemainingTime';
import NextTime from './components/TimeDashboard/NextTime';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      entries: [],
      goalTime: '00:00:30'
    };

    this.interval = null;

    this.handleOnEntriesUpdate = this.handleOnEntriesUpdate.bind(this);
    this.updateTimeDashboard= this.updateTimeDashboard.bind(this);
  }

  handleOnEntriesUpdate(entries) {
    console.log('updating entries: ', entries);
    this.setState({ entries: entries });

    let lastEntry = entries[entries.length - 1];

    if (lastEntry && !lastEntry.stop) {
      if (!this.interval) {
        console.log('starting interval');
        this.interval = setInterval(this.updateTimeDashboard, 1000);
      }
    } else {
      console.log('clearing interval');
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  updateTimeDashboard() {
    console.log('updating dashboard time');

    let completedTimeRef = this.refs.completedTime;
    let remainingTimeRef = this.refs.remainingTime;
    let nextTime = this.refs.nextTime;
    let completedTime = completedTimeRef.calcEntriesTime(true);
    let remainingTime = remainingTimeRef.calcRemainingTime(completedTime);

    nextTime.calcNextTime(remainingTime);
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
              <td>
                <NextTime ref="nextTime" />
              </td>
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

