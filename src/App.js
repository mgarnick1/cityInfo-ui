import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './App.css';
import './bootstrap.min.css';
import { STATUS, Loading, Avatar, Container, Header } from "gitstar-components";
import dotenv from 'dotenv';


const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const REDIRECT_URI = "http://localhost:3000/";


class App extends PureComponent {
  static propTypes = {
    isLoggedIn: PropTypes.bool
  }
  state = {
    cities: [],
    isLoading: false,
    error: null,
    status: STATUS.INITIAL,
    token: null
  }



  

  componentDidMount() {
    const { isLoggedIn } = this.props;
    this.fetchCities();
    const code = window.location.href.match(/\?code=(.*)/) && window.location.href.match(/\?code=(.*)/)[1];
    console.log(code);
    if (code) {
      this.setState({ status: STATUS.LOADING });
      fetch(`https://city-info-api.herokuapp.com/authenticate/${code}`)
        .then(response => response.json())
        .then(({ token }) => {
          this.setState({
            token,
            status: STATUS.FINISHED_LOADING
          });
          console.log({token})
        });
    }
  }


  async fetchCities() {
    await fetch("http://localhost:52179/api/cities")
      .then(response => response.json())
      .then(data => this.setState({ cities: data, isLoading: false }))
      .catch(error => this.setState({
        error, isLoading: false
      }));
  }


  render() {
    const { cities, isLoading, error, token } = this.state;
    return (
      <div className="App container=fluid">
        <Container>
          <Header>
            <div style={{ display: "flex", alignItems: "center" }}>
            </div>
            <Avatar
                style={{
                  transform: `scale(${this.state.status === STATUS.AUTHENTICATED ? "1" : "0"})`
              }}
            />
            <a style={{ display: this.state.status === STATUS.INITIAL ? "inline" : "none" }}
                href={`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=user&redirect_uri=${REDIRECT_URI}`}
            >
            Login
          </a>
          </Header>
          <Loading status={this.state.status} callback={() => {
            if (this.state.status !== STATUS.AUTHENTICATED) {
              this.setState({ status: STATUS.AUTHENTICATED });
            }
          }}
          />
        </Container>
        <h1 className="header">City Info App</h1>
        <h2 className="center offset-1">
          <button type="button" className="btn btn-primary offset-1">
            <Link style={{ color: '#fff' }} to="/PointsOfInterestsNY">Points Of Interest New York</Link>
          </button>
          <button type="button" className="btn btn-primary offset-1">
            <Link style={{ color: '#fff' }} to="/PointsOfInterestsAntwerp">Points Of Interest Antwerp</Link>
          </button>
          <button type="button" className="btn btn-primary offset-1">
            <Link style={{ color: '#fff' }} to="/PointsOfInterestsParis">Points Of Interest Paris</Link>
          </button>
        </h2>
        {error ? <p>{error.message}</p> : null}
        {!isLoading && (
          cities.map(city => {
            const { id, name, description } = city;
            return (
              <div className="offset-1 space" key={id}>
                <h2 className="wrapper">{name}</h2>
                <p>{description}</p>
                <hr />
              </div>
            );
          })
        )}

      </div>
    );
  }
}

export default App;
