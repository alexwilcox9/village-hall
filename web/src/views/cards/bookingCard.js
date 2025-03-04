import React from 'react';

const BookingCard = () => {
    return (
        <div className="card">
            <div className="card-body">
                <h2 className="card-title">Booking the Hall</h2>
                <p>Please read <a target="_blank" rel="noopener noreferrer" href={`${process.env.PUBLIC_URL}/Documents/Wvh_Hire_Conditions.pdf`}>Our Hire Conditions</a></p>
                <div className="form-link-container">
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item"><a href={`${process.env.PUBLIC_URL}/booking`} id="booking-btn">Single Event Bookings</a></li>
                        <li className="list-group-item"><a href={`https://v2.hallmaster.co.uk/Account/Login?hid=11938`} target="_blank" rel="noopener noreferrer" id="booking-btn">Regular Events Bookings</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default BookingCard;