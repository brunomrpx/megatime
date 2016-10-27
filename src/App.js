import React, { Component } from 'react';
import './reset.css';

import Table from './components/Timesheet/Table';
import NewEntryButton from './components/Timesheet/NewEntryButton';
import GoalTime from './components/TimeDashboard/GoalTime'
import CompletedTime from './components/TimeDashboard/CompletedTime';
import RemainingTime from './components/TimeDashboard/RemainingTime';
import NextTime from './components/TimeDashboard/NextTime';
import LocalStorage from './helpers/LocalStorage';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      entries: LocalStorage.get('entries') || [],
      goalTime: LocalStorage.get('goalTime') || '00:00:00',
      nextTime: LocalStorage.get('nextTime') || null
    };

    this.interval = null;

    this.handleOnEntriesUpdate = this.handleOnEntriesUpdate.bind(this);
    this.handleOnUpdateNextTime = this.handleOnUpdateNextTime.bind(this);
    this.handleOnGoalTimeUpdate = this.handleOnGoalTimeUpdate.bind(this);
    this.updateEntries = this.updateEntries.bind(this);
    this.updateNextTime = this.updateNextTime.bind(this);
    this.updateGoalTime = this.updateGoalTime.bind(this);
    this.updateTimeDashboard= this.updateTimeDashboard.bind(this);
    this.startOrClearInterval = this.startOrClearInterval.bind(this);
  }

  componentDidMount() {
    this.startOrClearInterval(this.state.entries);
  }

  updateEntries(entries) {
    console.log('updating entries: ', entries);
    this.setState({ entries: entries });
    LocalStorage.set('entries', entries);
  }

  updateNextTime(nextTime) {
    console.log('updating next time: ', nextTime);
    this.setState({ nextTime: nextTime });
    LocalStorage.set('nextTime', nextTime);
  }

  updateGoalTime(goalTime) {
    console.log('updating goal time: ', goalTime);
    this.setState({ goalTime: goalTime });
    LocalStorage.set('goalTime', goalTime);
  }

  handleOnUpdateNextTime(nextTime) {
    let entries = this.state.entries;
    let lastEntry = entries[entries.length - 1];

    if (lastEntry && !lastEntry.stop) {
      this.updateNextTime(nextTime);
    }
  }

  handleOnGoalTimeUpdate(newGoalTime) {
    this.updateGoalTime(newGoalTime);
  }

  handleOnEntriesUpdate(entries) {
    this.updateEntries(entries);
    this.startOrClearInterval(entries);
  }

  startOrClearInterval(entries) {
    let lastEntry = entries[entries.length - 1];

    if (lastEntry && !lastEntry.stop) {
      if (!this.interval) {
        console.log('starting interval');
        this.interval = setInterval(this.updateTimeDashboard, 1000);
      }
    } else {
      if (this.interval) {
        console.log('clearing interval');
        clearInterval(this.interval);
        this.interval = null;
      }
      this.updateTimeDashboard();
    }
  }

  updateTimeDashboard() {
    console.log('updating dashboard time', this.state);

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
        <h1 className="logo">Megaquality</h1>
        <div className="padding">
          <NewEntryButton entries={this.state.entries} onEntriesUpdate={this.handleOnEntriesUpdate} />
        </div>
        <table className="dashboard-time">
          <thead>
            <tr>
              <th colSpan="4">
                <h2 className="title">Dashboard</h2>
              </th>
            </tr>
            <tr>
              <th>Goal time</th>
              <th>Completed time</th>
              <th>Remaining time</th>
              <th>Next time</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <GoalTime value={this.state.goalTime} onGoalTimeUpdate={this.handleOnGoalTimeUpdate} />
              </td>
              <td>
                <CompletedTime entries={this.state.entries} ref="completedTime" />
              </td>
              <td>
                <RemainingTime goalTime={this.state.goalTime} ref="remainingTime" />
              </td>
              <td>
                <NextTime nextTime={this.state.nextTime} onUpdateNextTime={this.handleOnUpdateNextTime} ref="nextTime" />
              </td>
            </tr>
          </tbody>
        </table>
        <br/>
        <br/>
        <br/>
        <br/>
        <Table entries={this.state.entries} onEntriesUpdate={this.handleOnEntriesUpdate} />
      </div>
    );
  }
}

export default App;

