import React, { Component } from 'react';
import Page from './PageComponent';
import ContactCard from './cards/contactCard';
import MapsContainer from './mapsContainer';
import { fetchContacts } from '../services/dataService';
import AddressCard from './cards/addressCard';

class ContactPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            contacts: []
        }
    }

    componentDidMount() {
        fetchContacts( (resp) => {
            this.setState({contacts: resp});
        } )
    }

    render() {
        return (
            <Page title="contact-us">
            <div className="row">
            <div className="col-md-5">
                <h2>Contacts</h2>
                {this.state.contacts.map( (contact,idx) => {
                    return <div key={idx}>
                    <ContactCard {...contact} />
                    </div>
                })}
                </div>
                <div className="col-md-7">
                <h2>Find Us</h2>
                <AddressCard />
                <MapsContainer />
                </div>
                </div>
            </Page>
        );
    }
}

export default ContactPage;