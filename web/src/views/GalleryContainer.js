import React, { Component } from 'react';
import ImageGallery from 'react-image-gallery';
import { fetchImageUrls } from '../services/dataService';

class GalleryContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            images: []
        }
    }

    componentDidMount() {
        fetchImageUrls( (resp) => {
            this.setState({images: resp});
        } )
    }
    /**
     * This will take an array of image objects and convert it into the format that ImageGallery is after:
     * @param {string} imageArray array of image names, in string form. They must all be located in the images folder
     */
    _buildProperArray(imageArray) {
        const finalArray = [];
        imageArray.forEach(image => {
            finalArray.push({
                original: `${process.env.PUBLIC_URL}/images/${image.fileName}`,
                thumbnail: `${process.env.PUBLIC_URL}/images/${image.fileName}`,
                originalTitle: image.title,
                description: image.title
            })
        });
        return finalArray;
    }

    renderPlayPauseButton(onClick, isPlaying) {
        return (
          <button
            type='button'
            className={
              `btn btn-primary m-3 image-gallery-play-button${isPlaying ? ' active' : ''}`}
            onClick={onClick}
          />
        );
    }

    renderFullscreenButton(onClick, isFullscreen) {
        return (
          <button
            type='button'
            className={
              `btn btn-primary m-3 image-gallery-fullscreen-button${isFullscreen ? ' active' : ''}`}
            onClick={onClick}
          />
        );
    }

    render() {
        return (
            <ImageGallery 
            renderFullscreenButton={this.renderFullscreenButton}
            renderPlayPauseButton={this.renderPlayPauseButton}
            showPlayButton={false}
            thumbnailPosition="top" 
            showBullets={true} 
            items={this._buildProperArray(this.state.images)} />
        );
    }

}

export default GalleryContainer;