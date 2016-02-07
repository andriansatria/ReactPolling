import React from 'react'

var Questions = React.createClass({
  ask(question) {
    this.props.emit('ask', question);
  },
  addQuestion(question, i) {
    return(
      <div key={i} className="col-xs-12 col-sm-3">
        <span onClick={this.ask.bind(null, question)}>{question.q}</span>
      </div>
    );
  },
  render() {
    return(
      <div id="questions" className="row">
        <h2>Questions</h2>
        {this.props.questions.map(this.addQuestion)}
      </div>
    );
  }
});

module.exports = Questions;
