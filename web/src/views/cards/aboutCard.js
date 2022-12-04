import React from 'react';

const AboutCard = () => {
    const HallImage = `${process.env.PUBLIC_URL}/images/coverImage.png`;
    return (
        <div className="card">
            <img className="card-img-top" src={HallImage} alt="The outside of the village hall" />
            <div className="card-body">
                <h2 className="card-title">About Us</h2>
                <p className="card-text">
                Willand Village Hall, one of the largest in Devon, is situated just off the B3181, in Gables road, Willand.
                The idea for the hall was conceived in 1944 and officially opened in 1957 after using contract and a considerable amount of voluntary labour. 
                It has been in its present form since 1976. The hall has a public entertainment and theatre licence under the licensing act 2003.
                <br/>
                <br/>
                The hall benefits from solar panels and is currently half way through a 3 year refurbishment programme, which includes a new floor in the main hall, new lighting, internal & external doors, along with re decoration throughout.
                <br/>
                A tarmac car park has approx 49 spaces and is available for separate hire for car boot sales etc (please contact secretary for pricing)

                </p>
            </div>
        </div>
    )
}

export default AboutCard;