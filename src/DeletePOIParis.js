import React, { PureComponent } from 'react';
import './bootstrap.min.css';
//import { Link } from 'react-router-dom';
//import { withRouter } from 'react-router-dom';
import './App.css';
import axios from 'axios';

class DeletePOIParis extends PureComponent {
  state = {
    id: '',
    pointsOfInterest: [],
    isLoading: false,
    error: null
  }

  componentDidMount() {
    this.fetchPOI();
  }

  async fetchPOI() {
    await fetch("http://localhost:52179/api/cities/3/pointsofinterest/")
      .then(response => response.json())
      .then(data => this.setState({ pointsOfInterest: data, isLoading: false }))
      .catch(error => this.setState({
        error, isLoading: false
      }));
  }



  handleChange = event => {
    this.setState({ id: event.target.value });
  }

  handleSubmit = event => {
    event.preventDefault();

    axios.delete(`http://localhost:52179/api/cities/3/pointsofinterest/${this.state.id}`)
      .then(res => {
        console.log(res);
        console.log(res.data);
      });
  }

  render() {
    const { pointsOfInterest, isLoading, error } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Point Of Interest ID:
            <input type="text" name="id" onChange={this.handleChange} />
          </label>
          <button type="submit">Delete</button>
        </form>
        {error ? <p>{error.message}</p> : null}
        {!isLoading && (
          pointsOfInterest.map(poi => {
            const { id, name, description } = poi;
            return (
              <div className="offset-1 space" key={id}>
                <div>
                  <p>id: {id}, {name}: {description}</p>
                </div>
              </div>
            );
          }
          ))}
      </div>
    );
  }
}
  export default DeletePOIParis;

