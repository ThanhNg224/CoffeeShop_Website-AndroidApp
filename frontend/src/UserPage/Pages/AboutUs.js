import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Head from '../partial/Head';
import Header from '../partial/Header';
import vink from '../partial/images/vink.jpg';
import thanh from '../partial/images/thanh.jpg';
import trung from '../partial/images/trung.jpg';
import '../User.css'; // Import your CSS file

const AboutUs = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8080/user/${id}`)
          .then(response => {
            setUser(response.data);
          })
          .catch(error => {
            console.error('Error fetching user data:', error);
            navigate('/');
          });
    }, [id, navigate]);

    const handleContactUs = () => {
        navigate(`/user/${id}/contact`);
    };

    return (
        <div>
            <Head />
            <header>
                <Header />
            </header>
            <div className="info-container">
                <div style={{ marginTop: '200px'}}></div>
                <h1 className="large-title">About Us</h1>
                <p className="large-text">Welcome to our small Coffee Shop! We are not only dedicated to providing high-quality coffee and delicious drinks, but also fantastic fast foods for our customers.</p>
                <p className="large-text">Our Coffee Shop was constructed by the united effort of three members, and we take great pride in what we've built.</p>
                <p className="large-text">Our Team members are:</p>
                <div className="image-container">
                    <div className="image-wrapper">
                        <img src={thanh} alt="Thanh" className="group-image" />
                        <p className="image-title">Thanh</p>
                    </div>
                    <div className="image-wrapper">
                        <img src={vink} alt="Vink" className="group-image" />
                        <p className="image-title">Vink</p>
                    </div>
                    <div className="image-wrapper">
                        <img src={trung} alt="Trung" className="group-image" />
                        <p className="image-title">Trung</p>
                    </div>
                </div>
                <p className="large-text">Thank you for choosing our service. We look forward to leaving you an experience you won't be able to forget!</p>
                <button className="detail-button" onClick={handleContactUs}>Contact Us</button>
            </div>
            <div className="red-bar" style={{ marginTop: '80px'}}>
                <span>This is our Detail Page. If there's anything you need to know/ask, feel free!</span>
            </div>
        </div>
    );
};

export default AboutUs;
