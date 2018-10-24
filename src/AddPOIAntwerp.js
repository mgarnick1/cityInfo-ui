
import React, { PureComponent } from 'react';
import './bootstrap.min.css';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import './App.css';
import axios from 'axios';

class AddPOIAntwerp extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: " ",
      description: " ",
    };
    this.onFieldChange = this.onFieldChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };

  onFieldChange(event) {
    this.setState({
      [event.target.city]: event.target.value,
      [event.target.name]: event.target.value,
      [event.target.description]: event.target.description
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    axios({
      method: 'post',
      url: 'http://localhost:52179/api/cities/2/pointsofinterest/',
      data: {
        name: this.state.name,
        description: this.state.description
      }
    });
  }


  render() {
    return (
      <div className="App container=fluid">
        <h1 className="header">Add Points Of Interest (POI) Antwerp</h1>
        <form onSubmit={this.handleSubmit}>

          <div className="AddPOIForm_input">
            <label htmlFor="name">POI Name</label>
            <input type="text" name="name" value={this.state.name} onChange={this.onFieldChange} />
          </div>
          <div className="AddPOIForm_input">
            <label htmlFor="description">Description</label>
            <input type="text" name="description" value={this.state.description} onChange={this.onFieldChange} />
          </div>
          <button className="AddPOIForm_input" type="submit" value="Add">Submit</button>
          <button className="submit-btn" type="home" value="Home">
            <Link style={{ color: '#393939' }} to="/">Home</Link>
          </button>
        </form>

      </div>
    );
  }
};
export default withRouter(AddPOIAntwerp);