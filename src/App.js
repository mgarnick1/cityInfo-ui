import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./App.css";
import "./bootstrap.min.css";

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const REDIRECT_URI = "http://localhost:3000/Home";

class App extends PureComponent {
  state = {
    cities: [],
    isLoading: false,
    error: null,
    token: null
  };

  componentDidMount() {
    this.fetchCities();
    const code =
      window.location.href.match(/\?code=(.*)/) &&
      window.location.href.match(/\?code=(.*)/)[1];
    if (code) {
      fetch(`http://localhost:52179/api/cities/signin/${code}`)
        .then(response => response.json())
        .then(({ token }) => {
          this.setState({
            token
          });
        });
    }
  }

  async fetchCities() {
    await fetch("http://localhost:52179/api/cities")
      .then(response => response.json())
      .then(data => this.setState({ cities: data, isLoading: false }))
      .catch(error =>
        this.setState({
          error,
          isLoading: false
        })
      );
  }

  render() {
    const { cities, isLoading, error } = this.state;
    return (
      <div className="App container=fluid">
        <div>
          <Link className="signout" to="/">
            Sign Out
          </Link>
        </div>
        <h1 className="header">City Info App</h1>
        <h2 className="center offset-1">
          <button type="button" className="btn btn-primary offset-1">
            <Link style={{ color: "#fff" }} to="/PointsOfInterestsNY">
              Points Of Interest New York
            </Link>
          </button>
          <button type="button" className="btn btn-primary offset-1">
            <Link style={{ color: "#fff" }} to="/PointsOfInterestsAntwerp">
              Points Of Interest Antwerp
            </Link>
          </button>
          <button type="button" className="btn btn-primary offset-1">
            <Link style={{ color: "#fff" }} to="/PointsOfInterestsParis">
              Points Of Interest Paris
            </Link>
          </button>
        </h2>
        {error ? <p>{error.message}</p> : null}
        {!isLoading &&
          cities.map(city => {
            const { id, name, description } = city;
            return (
              <div className="offset-1 space" key={id}>
                <h2 className="wrapper">{name}</h2>
                <p>{description}</p>
                <hr />
              </div>
            );
          })}
      </div>
    );
  }
}

export default App;
