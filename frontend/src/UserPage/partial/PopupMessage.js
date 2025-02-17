import React from 'react';
import ads1 from './images/ads1.png';
import ads2 from './images/ads2.png';
import '../User.css';

const PopupMessage = ({ onClose }) => {
    return (
        <div className="ads-popup-overlay">
            <div className="ads-popup">
                <span className="ads-close" onClick={onClose}>&times;</span>
                <img src={ads1} alt="Popup" className="ads-popup-image" />
            </div>
        </div>
    );
};

export default PopupMessage;
