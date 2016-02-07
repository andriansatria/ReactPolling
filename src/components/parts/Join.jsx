import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'

var Join = React.createClass({
  join() {
    var memberName = React.findDOMNode(this.refs.name).value;
    this.props.emit('join', {name : memberName});
  },
  render() {
    return(
      <form action="javascript:void(0)" onSubmit={this.join}>

        <label>Full Name</label>
        <input ref="name" className="form-control" placeholder="Enter your full name..." required />
        <button className="btn btn-primary">Join</button>
        <Link to='/Speaker'>Start the presentation</Link>
        <Link to='/Board'>To the board</Link>
      </form>
    )
  }
});

module.exports =  Join;
