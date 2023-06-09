import React, { Component } from 'react';
import Page from './PageComponent';
import BookingContainer from './bookingContainer';

class BookingPage extends Component {
  render() {
    return (
      <Page title="booking">
        <h2 className="card-title">Bookings</h2>
        <BookingContainer />
      </Page>
    );
  }
}

export default BookingPage;