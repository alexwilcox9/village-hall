import React, { Component } from 'react';

class CalendarContainer extends Component {
    render() {
      return (
        <div id="calendar-container">
            <iframe title="village hall test calendar" 
            src="https://v2.hallmaster.co.uk/Scheduler/View/11938?startRoom=0" 
            width="100%" height="2500"
            ></iframe> 
        </div>
      );
    }
  }
  
export default CalendarContainer;