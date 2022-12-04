import React from 'react';

const BookingCard = () => {
    return (
        <div className="card">
            <div className="card-body">
                <h2 className="card-title">Booking the Hall</h2>
                <p>Please read <a target="_blank" rel="noopener noreferrer" href={`${process.env.PUBLIC_URL}/Documents/Wvh_Hire_Conditions.pdf`}>Our Hire Conditions</a></p>
                <div className="form-link-container">
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item"><a href={`${process.env.PUBLIC_URL}/Documents/Wvh_Booking_Form_single_Event.pdf`} target="_blank" rel="noopener noreferrer" id="booking-btn">Single Event Bookings</a></li>
                        <li className="list-group-item"><a href={`${process.env.PUBLIC_URL}/Documents/Wvh_Regular_Booking_Form.pdf`} target="_blank" rel="noopener noreferrer" id="booking-btn">Reoccuring Events Bookings</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default BookingCard;