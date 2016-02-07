import React from 'react'
import io from 'socket.io-client'
import Header from './parts/Header.jsx'

var APP = React.createClass({
    getInitialState() {
      return {
        status : 'disconnected',
        title : '',
        member : {},
        audience : [],
        speaker: '',//will be same on all member
        questions : [],
        currentQuestion : false,
        results : {}
      }
    },

    //all event from server here
    componentWillMount () {
      this.socket = io('http://localhost:3001');
      this.socket.on('connect', this.connect);
      this.socket.on('disconnect', this.disconnect);
      this.socket.on('welcome', this.updateState);
      this.socket.on('joined', this.joined);
      this.socket.on('audience', this.updateAudience);
      this.socket.on('started', this.started);
      this.socket.on('end', this.updateState);
      this.socket.on('ask', this.ask);
      this.socket.on('results', this.updateResult);
    },

    //all event from client
    emit(eventName, payLoad) {
      //send to the server
      this.socket.emit(eventName, payLoad);
    },

    connect() {
      var member = (sessionStorage.member) ? JSON.parse(sessionStorage.member): null;
      if(member && member.type === 'audience') {
        this.emit('join', member);
      } else if(member && member.type === 'speaker') {
        this.emit('start', {name: member.name, title:sessionStorage.title});
      }
      this.setState({status : 'connected'});
    },

    disconnect() {
      this.setState({
        status:'disconnected',
        title : 'disconnected',
        speaker : ''
      });
    },

    updateState(serverState) {
      console.log(serverState);
      this.setState(serverState);
    },

    joined(member) {
      sessionStorage.member = JSON.stringify(member);
      this.setState({member: member});
    },

    updateAudience(newAudience) {
      this.setState({audience:newAudience});
    },

    started(presentation) {
      if(this.state.member.type === 'speaker') {
        sessionStorage.title = presentation.title;
      }
      this.setState(presentation);
    },

    ask(question) {
      sessionStorage.answer = '';
      this.setState({currentQuestion:question, results: {a:0,b:0,c:0,d:0}});

    },

    updateResult(data) {
      this.setState({results : data});
    },

    render() {
      console.log(this.state);
        return (
          <div>
            <Header title={this.state.title} status={this.state.status} speaker={this.state.speaker} />
            {React.cloneElement(this.props.children, { appState: this.state, emit:this.emit })}
          </div>
         );
    }
});

module.exports = APP;
