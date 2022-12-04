import React, { Component } from 'react';

import PhotoSphereViewer from 'photo-sphere-viewer';

class PanoContainer extends Component {

    constructor(props) {
        super(props);

            this.panoElement = null;

            this.panoContainerRef = element => {
                this.panoElement = element;
            }
    }

    componentDidMount() {
        var PSV = new PhotoSphereViewer({ // eslint-disable-line no-unused-vars
            panorama: `${process.env.PUBLIC_URL}/images/${this.props.image}`,
            container: this.panoElement.id,
            loading_img: 'https://raw.githubusercontent.com/mistic100/Photo-Sphere-Viewer/3.1.0/example/photosphere-logo.gif',
            navbar: 'autorotate zoom fullscreen caption',
            caption: this.props.caption,
            default_fov: 65,
            gyroscope: "true",
            mousewheel: true,
            move_speed: (this.panoElement.clientWidth > 700) ? 1 : 3,
            size: {
              height: 600
            }
          }); 
    }

    render() {
        return (
            <div id={Math.random()} ref={this.panoContainerRef} />
        );
    }

}

export default PanoContainer;