import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Head from '../UserPage/partial/Head';
import Header from '../UserPage/partial/Header';
import Slider from '../UserPage/partial/Slider';
import ProductInfo from './ProductInfo';
import PopupMessage from '../UserPage/partial/PopupMessage';
import './User.css';

const User = () => {
  const { id } = useParams();
  const [menuItems, setMenuItems] = useState([]);
  const [currentPage, setCurrentPage] = useState({});
  const [categories, setCategories] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showPopupMessage, setShowPopupMessage] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data based on the ID
    axios.get(`http://localhost:8080/user/${id}`)
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
        navigate('/');
      });
  }, [id, navigate]);

  useEffect(() => {
    axios.get('http://localhost:8080/menu')
      .then(response => {
        setMenuItems(response.data);
        const categories = {};
        response.data.forEach(item => {
          categories[item.category] = (categories[item.category] || 0) + 1;
        });
        setCategories(categories);
        const initialPages = {};
        Object.keys(categories).forEach(category => {
          initialPages[category] = 0;
        });
        setCurrentPage(initialPages);
      })
      .catch(error => console.error('Error fetching menu items:', error));
  }, []);

  useEffect(() => {
    const popupShown = sessionStorage.getItem('popupShown');
    if (!popupShown) {
      const timer = setTimeout(() => {
        setShowPopupMessage(true);
        sessionStorage.setItem('popupShown', true);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleDetailsClick = (product) => {
    setSelectedProduct(product);
  };

  const handleClosePopup = () => {
    setSelectedProduct(null);
  };

  const handleNextPage = (category) => {
    setCurrentPage(prevPage => ({
      ...prevPage,
      [category]: (prevPage[category] + 1) % Math.ceil(categories[category] / 3)
    }));
  };

  const handlePrevPage = (category) => {
    setCurrentPage(prevPage => ({
      ...prevPage,
      [category]: (prevPage[category] - 1 + Math.ceil(categories[category] / 3)) % Math.ceil(categories[category] / 3)
    }));
  };

  const handleClosePopupMessage = () => {
    setShowPopupMessage(false);
  };

  return (
    <div>
      <Head />
      <header>
        <Header />
      </header>
      <Slider />
      <div className="spacer"></div>
      <h1>MENU:</h1>
      <main>
        {Object.keys(categories).map(category => (
          <div key={category} className="menu-category">
            <h2>{category}</h2>
            <div className="item-container">
              {menuItems
                .filter(item => item.category === category)
                .slice(currentPage[category] * 3, (currentPage[category] + 1) * 3)
                .map(item => (
                  <div key={item.id} className="item">
                    <img src={item.img} alt={item.name} />
                    <p>{item.name}</p>
                    <button className="detail-button" onClick={() => handleDetailsClick(item)}>Details</button>
                  </div>
                ))}
            </div>
            {currentPage[category] > 0 &&
              <button className="popup-button detail-button prev" onClick={() => handlePrevPage(category)}>{'<'}</button>
            }
            {currentPage[category] < Math.ceil(categories[category] / 3) - 1 &&
              <button className="popup-button detail-button next" onClick={() => handleNextPage(category)}>{'>'}</button>
            }
          </div>
        ))}
      </main>
      {selectedProduct && <ProductInfo product={selectedProduct} onClose={handleClosePopup} />}
      {showPopupMessage && <PopupMessage onClose={handleClosePopupMessage} imageSrc="/UserPage/partial/images/ads1.png" />}
      <div className="red-bar">
        <span>Welcome to OurCoffeeShop. Please Enjoy!</span>
      </div>
    </div>
  );
};

export default User;
