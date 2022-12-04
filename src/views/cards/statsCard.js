import React from 'react';

const StatsCard = () => {
    return (
        <div className="card">
            <div className="card-body">
                <h2>Available Rooms</h2>
                <div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                            <h3>Main Hall - Capacity 300 people</h3>
                            <ul>
                                <li>Social Distancing Capacity - 50 people</li>
                                <li>Stage (with Spot and Stage Lighting)</li>
                                <li>PA System</li>
                                <li>Loop Hearing System</li>
                                <li>Use of main kitchen</li>
                                <li>Use of tables and chairs</li>
                                <li>4K Lumen Projector available to hire @ £6.50 per hour</li>
                                <li>Guest WiFi (free)</li>
                            </ul>
                        </li>
                        <li className="list-group-item">
                            <h3>Club Room - Capacity 40 people</h3>
                            <ul>
                                <li>Social Distancing Capacity - 13 people</li>
                                <li>Use of main kitchen</li>
                                <li>Use of tables and chairs</li>
                                <li>3K Lumen Projector available to hire @ £5 per hour</li>
                                <li>Guest WiFi (free)</li>
                            </ul>
                        </li>
                        <li className="list-group-item">
                            <h3>Committee Room - Capacity 30 people</h3>
                            <ul>
                                <li>Social Distancing Capacity - 9 people</li>
                                <li>Use of main kitchen</li>
                                <li>Use of tables and chairs</li>
                                <li>Guest WiFi (free)</li>
                            </ul>
                        </li>
                        <li className="list-group-item">
                            <h3>Annex Room - Capacity 30 people</h3>
                            <ul>
                                <li>Social Distancing Capacity - 8 people</li>
                                <li>Small kitchen for refreshments</li>
                                <li>Use of tables and chairs</li>
                                <li>Guest WiFi (free)</li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default StatsCard;