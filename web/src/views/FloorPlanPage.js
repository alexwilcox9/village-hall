import React, { Component } from 'react';
import Page from './PageComponent';
import ImageGallery from 'react-image-gallery';

class FloorPlanPage extends Component {

    constructor(props) {
        super(props);

        this.element = null;

        this.containerRef = element => {
            this.element = element;
        }
        this.state = {
            width: 0
        }
    }

    componentDidMount() {
        this.setState({ width: this.element.clientWidth });
    }

    floorPlanImage = [
        {
            original: `${process.env.PUBLIC_URL}/images/floorPlan.svg`,
            originalAlt: "Floor Plan for Willand Village Hall"
        }

    ]

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
            <Page title="floorplan">
                <div ref={this.containerRef} >
                    {(this.state.width < 700) && <div className="alert alert-info">Mobile users: pinch to zoom in on floorplan</div>}
                    <div className="card">
                    <div className="card-body">
                     <h3 className="card-title" >Floor Plan Diagram</h3>
                        <ImageGallery
                            showFullscreenButton={(this.state.width > 700) ? true : false}
                            renderFullscreenButton={this.renderFullscreenButton}
                            showPlayButton={false}
                            showThumbnails={false}
                            items={this.floorPlanImage}
                        />
                        </div>
                    </div>

                    <div className="card">
                    <div className="card-body">
                        <h3 className="card-title" >Tables (available for any room)</h3>
                        <table className="table table-sm col-3">
                            <caption className="sr-only">Available tables and their dimensions</caption>
                            <thead>
                            <tr>
                                <th scope="col">Dimensions</th> 
                                <th scope="col">Quantity</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>6ft x 2ft</td>
                                <td>3</td> 
                            </tr>
                            <tr>
                                <td>6ft x 2.5ft</td>
                                <td>18</td> 
                            </tr>
                            <tr>
                                <td>2ft x 2ft</td>
                                <td>34</td> 
                            </tr>
                            <tr>
                                <td>3ft x 3ft</td>
                                <td>6</td> 
                            </tr>
                            </tbody>
                        </table>
                        <p className="lead text-center">Also available: 265 chairs</p>
                        </div>
                    </div>
                </div>
            </Page>
        );
    }
}

export default FloorPlanPage;