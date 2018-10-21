import React, { PureComponent } from 'react';
//import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './App.css';
import './bootstrap.min.css';
//import CitiesAPIData from './Background';

class App extends PureComponent {
  state = {
    cities: [],
    isLoading: false,
    error: null
  }

  componentDidMount() {
    this.fetchCities();
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
    const { cities, isLoading, error } = this.state;
    return (
      <div className="App container=fluid">
        <h1 className="header">City Info App</h1>
        {error ? <p>{error.message}</p> : null}
        {!isLoading && (
          cities.map(city => {
            const { id, name, description } = city;
            return (
              <div className="offset-1 space" key={id}>
                <h2 className="wrapper">{name}</h2>
                <p>{description}</p>
                <button type="button" className="btn btn-primary offset-1">
                  <Link style={{ color: '#fff' }} to="/PointsOfInterest">Points Of Interest</Link>
                </button>
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
