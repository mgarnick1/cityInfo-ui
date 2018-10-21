
import React, { PureComponent } from 'react';
import './bootstrap.min.css';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import './App.css';

class AddPOI extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      name: " ",
      description: " ",
      pointsOfInterest: [],
      poiTemp: ' ',
    };
    this.onFieldChange = this.onFieldChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };

  onFieldChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onAddAuthor(this.state);
  }

  handleAddPOI() {
    return;
  }



  render() {
    return (
      <div className="App container=fluid">
        <h1 className="header">Add Points Of Interest (POI)</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="AddPOIForm_input">
            <label htmlFor="name">Name</label>
            <input type="text" name="name" value={this.state.name} onChange={this.onFieldChange} />
          </div>
          <div className="AddPOIForm_input">
            <label htmlFor="description">Description</label>
            <input type="text" name="description" value={this.state.description} onChange={this.onFieldChange} />
          </div>
          <div className="AddPOIForm_input">
            {this.state.pointsOfInterest.map((poi) => <p key={poi}>{poi}</p>)}
            <label htmlFor="poiTemp">Point of Interest</label>
            <input type="text" name="poiTemp" value={this.state.poiTemp} onChange={this.onFieldChange} />
            <input type="button" value="+" onClick={this.handleAddPOI} />
          </div>
          <button className="AddPOIForm_input" type="submit" value="Add">Submit</button>
        </form>
        <button className="AddPOIForm_input" type="home" value="Home">
          <Link style={{ color: '#393939' }} to="/">Home</Link>
        </button>
      </div>
    );
  }
};
export default withRouter(AddPOI);