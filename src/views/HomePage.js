import React, { Component } from 'react';
import Page from './PageComponent';

import AboutCard from './cards/aboutCard';
import FacebookContainer from './facebookContainer';
import HallUsersCard from './cards/hallUsersCard';
import BookingCard from './cards/bookingCard';
import StatsCard from './cards/statsCard';



class HomePage extends Component {
    render() {
        return (
            <Page title="home">
                <div className="row">
                    <div id="home-main" className="col-lg-7">
                        <AboutCard />

                        <StatsCard />

                    </div>
                    <div id="home-sidebar" className="col-lg-5 align-content-center">
                        <div className="col-12">
                            <BookingCard />
                            <HallUsersCard />
                            <FacebookContainer />
                        </div>
                    </div>
                </div>
            </Page>
        );
    }
}

export default HomePage;