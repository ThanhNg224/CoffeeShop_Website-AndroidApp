import React from 'react';
import { Link } from 'react-router-dom';
import './User.css';

const ProductInfo = ({ product, onClose }) => {
    return (
        <div className="popup-overlay">
            <div className="popup">
                <span className="close" onClick={onClose}>&times;</span>
                <div className="popup-content">
                    <h2>{product.name}</h2>
                    <p>Price: {product.price}</p>
                    <div className="product-details">
                        <div className="product-image">
                            <img src={product.img} alt={product.name} />
                        </div>
                        <div className="product-description">
                            <p>{product.description}</p>
                            <div className="buttons">
                                <Link to={`/menu/${product.id}`} className="popup-button">Order</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductInfo;
