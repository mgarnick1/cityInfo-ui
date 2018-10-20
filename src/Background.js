import React, { Component, Fragment, PureComponent } from 'react';
import './bootstrap.min.css';
//import axios from 'axios';

class CitiesAPIData extends PureComponent {
  
  


  render() {
    const { names, descriptions, isLoading } = this.state;
    return (
      <Fragment>
        <h1>City Info</h1>
        {!isLoading ? (
          names.map(city => {
            const { names, descriptions } = city;
            return (
              <div key={names}>
                <p>City: {names}</p>
                <p>Points Of Interest: {descriptions}</p>
                <hr />
              </div>
            );
          })
        ) : (
            <h3> Loading ... </h3>
          )}
      </Fragment>
    );
  }
}

export default CitiesAPIData;