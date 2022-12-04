import React, {Component} from 'react';

import { fetchWordOfTheDay } from '../services/funService';

class Footer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            word: {
                word: undefined,
                definitions: []
            }
        }
    }

    componentDidMount() {
        (this.props.isFun) && fetchWordOfTheDay((resp) => {
            this.setState({word: resp});
        });
    }

    componentDidUpdate(prevProps) {
        if(this.props.isFun !== prevProps.isFun) {
            fetchWordOfTheDay((resp) => {
                this.setState({word: resp});
            });
        }
    }

    render() {

        return (<footer className="footer">
        <div className="container-fluid">
        <div className="m-2">
                {(this.props.isFun && this.state.word.word) && <p>Word of the day is <b title={(this.state.word.definitions[0]) && this.state.word.definitions[0].text}>{this.state.word.word}</b> </p> }
              <p> <a className="badge badge-light" rel="noopener noreferrer" target="_blank" href="mailto:michaelpaulhoe+willandvillagehall@gmail.com">Website built by Michael Hoe</a></p>
              </div>
              </div>
        </footer>)
    }

}

export default Footer;