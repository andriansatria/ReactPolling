import React from 'react'
import { Link } from 'react-router'

var NotFound404 = React.createClass({
  render() {
    return(
      <div id="not-found">
        <h1>Page Not Found</h1>
        <p>We Cannot find the page that you have requested.
        were you looking for one of these : </p>
        <Link to="/"> Join as Audience </Link>
        <Link to="/speaker"> Start a Presentation </Link>
        <Link to="/board"> View the board </Link>
      </div>
    )
  }
});

module.exports = NotFound404;
