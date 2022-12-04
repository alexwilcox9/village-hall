import React, { Component } from 'react';

class MapsContainer extends Component {
    render() {
      return (
        <div id="maps-container">
            <iframe className="maps-iframe" title="Google Map for Willand Village Hall" src="https://www.google.com/maps/embed/v1/place?q=Willand%20Village%20Hall,Willand,%20UK
                &zoom=17
                &key=AIzaSyDj4rRqRFNM2ARFRSf8CdR8vh7tB8FTOKw">
            </iframe>
        </div>
      );
    }
  }
export default MapsContainer;