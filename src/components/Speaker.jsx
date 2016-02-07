import React from 'react'
import Display from './parts/Display.jsx'
import JoinSpeaker from './parts/JoinSpeaker.jsx'
import Attendance from './parts/Attendance.jsx'
import Questions from './parts/Questions.jsx'

var Speaker = React.createClass({
  render() {
    console.log(this.props);
    return(
      <div>
        <Display if={this.props.appState.status==='connected'}>
          <Display if={this.props.appState.member.name && this.props.appState.member.type === 'speaker'} >
            <Questions questions={this.props.appState.questions} emit={this.props.emit} />
            <Attendance audience={this.props.appState.audience} />
          </Display>
          <Display if={!this.props.appState.member.name}>
            <h2>Start the Presentation</h2>
            <JoinSpeaker emit={this.props.emit}/>
          </Display>
        </Display>
      </div>
    );
  }
});

module.exports = Speaker;
