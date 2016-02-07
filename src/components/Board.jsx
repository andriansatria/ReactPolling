import React from 'react'
import Display from './parts/Display.jsx'
import {BarChart} from 'react-d3'



var Board = React.createClass({
  barGraphData(results) {
    var barData = [
      {
        "values": []
      }
    ];

    var data =  Object.keys(results).map(function(choice) {
      return {
        'x' : choice,
        'y' : results[choice]
      }
    });
    console.log(data);
    barData[0].values = data;
    return barData;
  },

  render() {
    return(
      <div id="scoreboard">
        <Display if={this.props.appState.status === 'connected' && this.props.appState.currentQuestion}>
          <h3>{this.props.appState.currentQuestion.q}</h3>
          {/*<p>{JSON.stringify(this.props.appState.results)}</p>*/}
          <BarChart data={this.barGraphData(this.props.appState.results)} title={this.props.appState.currentQuestion.q} height={window.innerHeight*0.6} width={window.innerWidth*0.5}/>
        </Display>
        <Display if={this.props.appState.status === 'connected' && !this.props.appState.currentQuestion}>
          <h3>Awaiting a Question..</h3>
      </Display>
      </div>
    );
  }
});

module.exports = Board;
