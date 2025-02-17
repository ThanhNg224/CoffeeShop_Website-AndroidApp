import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Head from '../partial/Head';
import Header from '../partial/Header';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        feedback: ''
    });

    const [submitted, setSubmitted] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        axios.post('http://localhost:8080/feedback', formData)
            .then(response => {
                console.log('Feedback submitted successfully:', response.data);
                setFormData({
                    name: '',
                    email: '',
                    phoneNumber: '',
                    feedback: ''
                });
                setSubmitted(true);
                setTimeout(() => {
                    setSubmitted(false);
                }, 3000);
            })
            .catch(error => {
                console.error('Error submitting feedback:', error);
            });
    };
    
    return (
        <div>
            <Head />
            <header>
                <Header />
            </header>
            <div style={{ marginTop: '140px' }}></div>
            <div className="contact-container" style={{ padding: '40px', backgroundColor: '#800000', borderRadius: '10px', color: 'white', maxWidth: '600px', margin: '0 auto' }}>
    <h2>Contact Us</h2>
    {user && <p>{`Hello ${user.username}, what is your opinion?`}</p>}
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%' }}>
        <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '20px', width: '100%' }}>
            <label htmlFor="name" style={{ marginRight: '10px', minWidth: '150px', textAlign: 'right' }}>Name:</label>
            <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                style={{ flex: '1', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
            />
        </div>
        <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '20px', width: '100%' }}>
            <label htmlFor="email" style={{ marginRight: '10px', minWidth: '150px', textAlign: 'right' }}>Email Address:</label>
            <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                style={{ flex: '1', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
            />
        </div>
        <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '20px', width: '100%' }}>
            <label htmlFor="phoneNumber" style={{ marginRight: '10px', minWidth: '150px', textAlign: 'right' }}>Phone Number:</label>
            <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                style={{ flex: '1', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
            />
        </div>
        <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', marginBottom: '20px', width: '100%' }}>
            <label htmlFor="feedback" style={{ marginRight: '10px', minWidth: '150px', textAlign: 'right' }}>Feedback:</label>
            <textarea
                id="feedback"
                name="feedback"
                value={formData.feedback}
                onChange={handleChange}
                required
                style={{ flex: '1', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', minHeight: '100px' }}
            />
        </div>
        <button type="submit" style={{ alignSelf: 'center', backgroundColor: 'white', color: '#800000', border: 'none', padding: '10px 20px', cursor: 'pointer', borderRadius: '5px' }}>
            Submit
        </button>
        {submitted && <p>Thank you for your feedback</p>}
        </form>
    </div>
            <div className="red-bar" style={{ marginTop: '50px'}}>
                <span>Thank you for your Feedback. We will work harder to improve even more!</span>
            </div>
        </div>
    );
};

export default Contact;
