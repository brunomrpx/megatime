import React, { Component } from 'react';

class GoalTime extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false,
      goalTime: this.props.value
    };

    this.startEditing = this.startEditing.bind(this);
    this.finishEditing = this.finishEditing.bind(this);
    this.handleGoalTimeChange = this.handleGoalTimeChange.bind(this);
  }

  startEditing() {
    console.log('-> start editing!');
    this.setState({ editing: true });
  }

  finishEditing() {
    console.log('-> finish editing!');
    this.setState({ editing: false });
    if (this.props.onGoalTimeUpdate) {
      this.props.onGoalTimeUpdate(this.state.goalTime);
    }
  }

  componentDidUpdate() {
    if (this.state.editing) {
      this.refs.goalTimeInput.focus();
    }
  }

  handleGoalTimeChange(event) {
    this.setState({ goalTime: event.target.value });
  }

  render() {
    if (this.state.editing) {
      return <input type="text" defaultValue={this.state.goalTime} ref="goalTimeInput" onBlur={this.finishEditing} onChange={this.handleGoalTimeChange} />;
    } 

    return <div onDoubleClick={this.startEditing}>{this.props.value}</div>;
  }
}

GoalTime.defaultProps = {
  value: null,
  onGoalTimeUpdate: null
};

export default GoalTime;

