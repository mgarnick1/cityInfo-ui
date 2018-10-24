import React, { Component, Fragment, PureComponent } from 'react';
import './bootstrap.min.css';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
//import axios from 'axios';

class PointsOfInterestAntwerp extends PureComponent {
  state = {
    pointsOfInterest: [],
    isLoading: false,
    error: null
  }

  componentDidMount() {
    this.fetchPOI();

  }

  async fetchPOI() {
    await fetch("http://localhost:52179/api/cities/2/pointsofinterest/")
      .then(response => response.json())
      .then(data => this.setState({ pointsOfInterest: data, isLoading: false }))
      .catch(error => this.setState({
        error, isLoading: false
      }));
  }





  render() {
    const { pointsOfInterest, isLoading, error } = this.state;
    return (
      <div className="App container=fluid">
        <h1 className="header">Points Of Interest (POI)</h1>
        {error ? <p>{error.message}</p> : null}
        {!isLoading && (
          pointsOfInterest.map(poi => {
            const { id, name, description } = poi;
            return (
              <div className="offset-1 space" key={id}>
                <div>
                  <h2 className="wrapper">{name}</h2>
                  <p>{description}</p>
                  <button type="button" className="btn btn-primary offset-1">
                    <Link style={{ color: '#fff' }} to="/AddPOIAntwerp">Add POI</Link>
                  </button>
                  <hr />
                </div>
              </div>
            );
          })
        )}
      </div>
    );
  }
}

export default withRouter(PointsOfInterestAntwerp);