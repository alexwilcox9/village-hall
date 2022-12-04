import React, { Component } from 'react';

const facebookUrl = "https://www.facebook.com/WillandVillageHall/";

class FacebookContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      width: "300"
    }

    this.facebookContainerElement = null;

    this.facebookContainer = element => {
      this.facebookContainerElement = element;
    }
  }

  componentDidMount() {
    this.updateDimensions();

    window.addEventListener("resize", this.updateDimensions.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }

  updateDimensions() {
    const containerWidth = (this.facebookContainerElement) ? this.facebookContainerElement.clientWidth : "300" ;
    this.setState({width: containerWidth});
    this.url = `https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FWillandVillageHall&tabs=timeline&width=${containerWidth}&height=500&small_header=false&adapt_container_width=true&hide_cover=true&show_facepile=true&appId`
  }

  render() {
    return (
      <div id="facebook-container">
            <div ref={this.facebookContainer} className="big-facebook">
            <iframe title="facebook-page" className="facebook-frame" width={this.state.width} src={this.url}></iframe>
            </div>
            <div className="small-facebook">
              <a target="_blank" rel="noopener noreferrer" href={facebookUrl}><span className="btn btn-primary col-12">Visit Our Facebook Page</span></a>
            </div>

      </div>
    );
  }
}
  
export default FacebookContainer;