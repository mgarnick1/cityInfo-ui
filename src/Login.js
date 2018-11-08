import React, { Fragment, PureComponent } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import axios from "axios";
import "./App.css";
import "./bootstrap.min.css";

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const REDIRECT_URI = "http://localhost:52179/signin";

class LoginPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      sessionToken: null,
      error: null,
      username: "",
      password: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    axios({
      method: "post",
      url: "http://localhost:52179/api/cities/signin",
      data: {
        username: this.state.username,
        password: this.state.password
      }
    });
  }

  handleUsernameChange(e) {
    this.setState({ username: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  render() {
    if (this.state.sessionToken) {
      this.props.auth.redirect({ sessionToken: this.state.sessionToken });
      return null;
    }

    const errorMessage = this.state.error ? (
      <span className="error-message">{this.state.error}</span>
    ) : null;

    return (
      <Fragment>
        <form onSubmit={this.handleSubmit} className="login">
          {errorMessage}
          <div className="form-element">
            <label>Username:</label>
            <input
              id="username"
              type="text"
              value={this.state.username}
              onChange={this.handleUsernameChange}
            />
          </div>

          <div className="form-element">
            <label>Password:</label>
            <input
              id="password"
              type="password"
              value={this.state.password}
              onChange={this.handlePasswordChange}
            />
          </div>
          <div className="form-actions">
            <input id="submit" type="submit" value="Submit" />
          </div>
        </form>
        <button className="btn btn-submit GitHub-Login">
          <a
            href={`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=user&redirect_uri=${REDIRECT_URI}`}
          >
            Login with GitHub
          </a>
          <img src={require("./assets/GitHub-Mark.png")} />
        </button>
      </Fragment>
    );
  }
}

export default withRouter(LoginPage);
