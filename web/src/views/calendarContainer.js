import React, { Component } from 'react';

//RGBA hexcodes for colours of the calendars
const mainBG = "FFFFFF";
const annex = "004ff9";
const clubroom = "A32929";
const committee = "AB8B00";
const hall = "0D7813";

class CalendarContainer extends Component {
    render() {
      return (
        <div id="calendar-container">
            <div className="card">
              <div className="card-body row">
              <h3 className="key-list-title col-3">Key</h3>
              <dl className="key-list justify-content-between col-9 row">
                <div><dt>Annex</dt><dd><span className="key-square" style={{background: "#"+annex}} ></span></dd></div>
                <div><dt>Clubroom</dt><dd><span className="key-square" style={{background: "#"+clubroom}} ></span></dd></div>
                <div><dt>Committee</dt><dd><span className="key-square" style={{background: "#"+committee}} ></span></dd></div>
                <div><dt>Hall</dt><dd><span className="key-square"style={{background: "#"+hall}} ></span></dd></div>
              </dl>
              </div>
            </div>
            <iframe title="village hall calendar" 
            src={`https://www.google.com/calendar/embed?title=Willand%20Village%20Hall%20Calendar&height=600&wkst=1&bgcolor=%23${mainBG}&src=oq5iri42gjp5hsg38qhosfh000%40`
            +`group.calendar.google.com&color=%23${annex}&src=7vntgebe8mliqm7oj9q6ka7m78%40`
            +`group.calendar.google.com&color=%23${clubroom}&src=trqkqbalr8ks8ec8ocfeq5ouok%40`
            +`group.calendar.google.com&color=%23${committee}&src=hnjei5c8iqjdj3k2aqgeffceq0%40`
            +`group.calendar.google.com&color=%23${hall}&ctz=Europe%2FLondon`}
              width="800" height="600" frameBorder="0" scrolling="no"></iframe>
        </div>
      );
    }
  }
  
export default CalendarContainer;