import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import PointsOfInterestNY from './Background';
import PointsOfInterestAntwerp from './PointsOfInterestAntwerp';
import PointsOfInterestParis from './PointsOfInterestParis';
import AddPOINY from './AddPOI';
import AddPOIAntwerp from './AddPOIAntwerp';
import AddPOIParis from './AddPOIParis';
import DeletePOIParis from './DeletePOIParis';
import DeletePOIAntwerp from './DeletePOIAntwerp';
import DeletePOINY from './DeletePOINY';
import LoginPage from './Login';


ReactDOM.render(
  <BrowserRouter>
    <Fragment>
      <Route exact path="/" component={LoginPage} />
      <Route path ="/Home" component={App} />
      <Route path="/PointsOfInterestsNY" component={PointsOfInterestNY} />
      <Route path="/PointsOfInterestsAntwerp" component={PointsOfInterestAntwerp} />
      <Route path="/PointsOfInterestsParis" component={PointsOfInterestParis} />
      <Route path="/AddPOINY" component={AddPOINY} />
      <Route path="/AddPOIAntwerp" component={AddPOIAntwerp} />
      <Route path="/AddPOIParis" component={AddPOIParis} />
      <Route path="/DeletePOIParis" component={DeletePOIParis} />
      <Route path="/DeletePOIAntwerp" component={DeletePOIAntwerp} />
      <Route path="/DeletePOINY" component={DeletePOINY} />
    </Fragment>
  </BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
