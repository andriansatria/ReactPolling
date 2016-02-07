import React from 'react'

import Display from './parts/Display.jsx'
import Join from './parts/Join.jsx'
import Ask from './parts/Ask.jsx'


var Audience = React.createClass({
  render() {
    // return(<h1>Audience : {this.props.appState.title}</h1>);

    return(
      <div>
        <Display if={this.props.appState.status==='connected'}>
          <Display if={this.props.appState.member.name}>
            <Display if={!this.props.currentQuestion}>
              <h2>Welcome {this.props.appState.member.name}</h2>
              <p>{this.props.appState.audience.length} audience is connected</p>
              <p>Question will apear here.</p>
            </Display>
            <Display if={this.props.appState.currentQuestion}>
              <Ask question={this.props.appState.currentQuestion} emit={this.props.emit} />
            </Display>
          </Display>

          <Display if={!this.props.appState.member.name}>
            <h1>Join the Session</h1>
            <Join emit={this.props.emit}/>
          </Display>
        </Display>
      </div>
    )
  }
});

module.exports = Audience;
