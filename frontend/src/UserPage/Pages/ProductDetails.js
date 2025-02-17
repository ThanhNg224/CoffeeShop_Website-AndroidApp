import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../User.css';
import Head from '../partial/Head';
import Header from '../partial/Header';
import { AuthContext } from '../../AuthContext';

const ProductDetails = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [product, setProduct] = useState(null);
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(0);
    const [commentsList, setCommentsList] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [orderStatus, setOrderStatus] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProductDetails();
        fetchComments();
    }, [id]);

    const fetchProductDetails = () => {
        axios.get(`http://localhost:8080/menu/${id}`)
            .then(response => setProduct(response.data))
            .catch(error => console.error('Error fetching product details:', error));
    };

    const fetchComments = () => {
        axios.get(`http://localhost:8080/menu/${id}/comments`)
            .then(response => setCommentsList(response.data))
            .catch(error => console.error('Error fetching comments:', error));
    };

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (!user) {
            alert('You must be logged in to comment and rate.');
            return;
        }
        const newComment = { comment, userId: user.id, rating };
        axios.post(`http://localhost:8080/menu/${id}/comment`, newComment)
            .then(response => {
                if (response.data.success) {
                    alert('Comment and rating posted successfully!');
                    setComment('');
                    setRating(0);
                    fetchComments();
                } else {
                    alert('Error posting comment and rating.');
                }
            })
            .catch(error => console.error('Error posting comment and rating:', error));
    };

    const handleOrderSubmit = () => {
        if (!user) {
            alert('You must be logged in to place an order.');
            return;
        }
        axios.post(`http://localhost:8080/menu/${id}/order`, { userId: user.id, quantity })
            .then(response => {
                if (response.data.success) {
                    setOrderStatus('Order received. Thank you for choosing our service!');
                    setQuantity(1);
                } else {
                    setOrderStatus('Error placing order. Please try again.');
                }
            })
            .catch(error => {
                setOrderStatus('Error placing order. Please try again.');
                console.error('Error placing order:', error);
            });
    };


    if (!product) return <p>Loading...</p>;

    return (
        <>
            <div className="product-details-page" style={{ marginTop: '110px', padding: '20px'}}>
                <Head />
                <Header />
                <div className="product-details-item">
                    <h1>{product.name}</h1>
                </div>
                <div className="product-details-item-order">
                    <div className="product-page-image-order">
                        <img src={product.img} alt={product.name} />
                    </div>
                    <div className="product-page-description-order">
                        <p>{product.description}</p>
                        <div className="product-details-price">
                        <h3>Price: {product.price} VNĐ</h3>
                        </div>
                        <div className="product-details-item-order-section">
                    <h4>Order this product</h4>
                    <input 
                        type="number"
                        value={quantity}
                        min="1"
                        onChange={(e) => setQuantity(e.target.value)}
                    />
                    <button onClick={handleOrderSubmit} className="popup-button">Order</button>
                    {orderStatus && <p>{orderStatus}</p>}
                </div>
                    </div>
                </div>

                <div className="product-details-item comment-section">
                    <h4>Leave a Comment</h4>
                    <form onSubmit={handleCommentSubmit}>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            required
                        ></textarea>
                        <div className="rating-section">
                            <h4>Rate this product</h4>
                            <div>
                                {[...Array(5)].map((_, index) => (
                                    <button
                                        key={index + 1}
                                        className={`star-button ${rating >= index + 1 ? 'filled' : ''}`}
                                        onClick={() => setRating(index + 1)}
                                        type="button"
                                    >
                                        {index < rating ? '★' : '☆'}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <button type="submit" className="rating-button">Submit Comment</button>
                    </form>
                </div>
                <div className="comments-container">
                    <h4>Comments</h4>
                    {commentsList.map((comment, index) => (
                        <div key={index} className="comment-item">
                            <strong>{comment.username}</strong>: {comment.comment}
                            <div className="rating-display">
                                {[...Array(5)].map((_, i) => (
                                    <span
                                        key={i}
                                        style={{ color: i < comment.rating ? 'yellow' : 'gray' }}
                                    >
                                        ★
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div>  
                <div className="red-bar" style={{ marginTop: '50px'}}>
                    <span>Thank you for visiting our CoffeeShop!</span>
                </div>
            </div>
        </>
    );
};

export default ProductDetails;
