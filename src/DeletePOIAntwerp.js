import React, { PureComponent } from 'react';
import './bootstrap.min.css';
//import { Link } from 'react-router-dom';
//import { withRouter } from 'react-router-dom';
import './App.css';
import axios from 'axios';

class DeletePOIAntwerp extends PureComponent {
  state = {
    id: ''
  }

  handleChange = event => {
    this.setState({ id: event.target.value });
  }

  handleSubmit = event => {
    event.preventDefault();

    axios.delete(`http://localhost:52179/api/cities/2/pointsofinterest/${this.state.id}`)
      .then(res => {
        console.log(res);
        console.log(res.data);
      });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Point Of Interest ID:
            <input type="text" name="id" onChange={this.handleChange} />
          </label>
          <button type="submit">Delete</button>
        </form>
      </div>
    );
  }
}
export default DeletePOIAntwerp;


