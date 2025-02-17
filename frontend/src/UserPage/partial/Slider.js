import React from 'react';
import { Carousel } from 'react-bootstrap';
import image3 from './images/image3.png';
import image5 from './images/image5.png';
import image4 from './images/image4.png';


const Slider = () => {
    return (
        <Carousel id="slider">
            <Carousel.Item>
                <img className="d-block w-100" src={image3} alt="First slide" />
            </Carousel.Item>
            <Carousel.Item>
                <img className="d-block w-100" src={image4} alt="Second Slide" />
            </Carousel.Item>
            <Carousel.Item>
                <img className="d-block w-100" src={image5} alt="Third slide" />
            </Carousel.Item>
        </Carousel>
    );
};

export default Slider;
