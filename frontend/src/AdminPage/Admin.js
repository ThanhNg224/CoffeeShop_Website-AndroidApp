import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Head from '../UserPage/partial/Head';
import Header from '../UserPage/partial/Header';
import Slider from '../UserPage/partial/Slider';
import ProductInfo from '../UserPage/ProductInfo';
import PageViewsSection from './PageViewsSection';
import FeedbackSection from './FeedbackSection';
import AddProductSection from './AddProductSection';
import MenuItemsSection from './MenuItemsSection';
import CommentsSection from './CommentsSection';
import './Admin.css';
import '../UserPage/User.css';

const Admin = () => {
  const { id } = useParams();
  const [menuItems, setMenuItems] = useState([]);
  const [currentPage, setCurrentPage] = useState({});
  const [categories, setCategories] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [user, setUser] = useState(null);
  const [pageViews, setPageViews] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [newProductData, setNewProductData] = useState({
    name: '',
    price: '',
    img: '',
    category: '',
    description: ''
  });
  const [comments, setComments] = useState([]);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const navigate = useNavigate();

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

  axios.get('http://localhost:8080/api/feedback')
  .then(response => {
    setFeedbacks(response.data);
  })
  .catch(error => {
    console.error('Error fetching feedback data:', error);
  });


  useEffect(() => {
    axios.get('http://localhost:8080/api/page-views')
      .then(response => {
        setPageViews(response.data);
      })
      .catch(error => {
        console.error('Error fetching page views:', error);
      });

    axios.get('http://localhost:8080/comments')
      .then(response => {
        setComments(response.data);
      })
      .catch(error => {
        console.error('Error fetching comments:', error);
      });
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

  const handleDeleteItem = (itemId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this item?");
    if (!confirmDelete) {
      return;
    }

    axios.delete(`http://localhost:8080/menu/${itemId}`)
      .then(() => {
        setMenuItems(prevMenuItems => prevMenuItems.filter(item => item.id !== itemId));
      })
      .catch(error => {
        console.error('Error deleting menu item:', error);
        alert("Failed to delete the item. Please try again.");
      });
  };

  const handleInputChange = (e) => {
    setNewProductData({
      ...newProductData,
      [e.target.name]: e.target.value
    });
  };

  const handleAddProduct = (e) => {
    e.preventDefault();

    axios.post('http://localhost:8080/menu/add', newProductData)
      .then(response => {
        console.log('Product added successfully:', response.data);
        setNewProductData({
          name: '',
          price: '',
          img: '',
          category: '',
          description: ''
        });
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
      })
      .catch(error => {
        console.error('Error adding product:', error);
        alert("Failed to add the product. Please try again.");
      });
  };

  const handleDeleteComment = (commentId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this comment?");
    if (!confirmDelete) {
      return;
    }

    axios.delete(`http://localhost:8080/comments/${commentId}`)
      .then(() => {
        setComments(prevComments => prevComments.filter(comment => comment.id !== commentId));
      })
      .catch(error => {
        console.error('Error deleting comment:', error);
        alert("Failed to delete the comment. Please try again.");
      });
  };

  const handleCancelAddProduct = () => {
    setShowAddProduct(false);
    setNewProductData({
      name: '',
      price: '',
      img: '',
      category: '',
      description: ''
    });
  };

  return (
    <div>
      <Head />
      <header>
        <Header />
      </header>
      <Slider />
      <div className="spacer"></div>
      <main>
        <PageViewsSection pageViews={pageViews} />
        <FeedbackSection feedbacks={feedbacks} />
        <CommentsSection
          comments={comments}
          handleDeleteComment={handleDeleteComment}
        />
        <button className="add-new-item-button" onClick={() => setShowAddProduct(true)}>Add New Product</button>
        {showAddProduct && (
          <AddProductSection
            newProductData={newProductData}
            handleInputChange={handleInputChange}
            handleAddProduct={handleAddProduct}
            handleCancel={handleCancelAddProduct}
          />
        )}
        <MenuItemsSection
          menuItems={menuItems}
          currentPage={currentPage}
          categories={categories}
          handleDetailsClick={handleDetailsClick}
          handleDeleteItem={handleDeleteItem}
          handleNextPage={handleNextPage}
          handlePrevPage={handlePrevPage}
        />
      </main>
      {selectedProduct && <ProductInfo product={selectedProduct} onClose={handleClosePopup} />}
      <div className="red-bar">
        <span>Welcome to OurCoffeeShop. Please Enjoy!</span>
      </div>
    </div>
  );
};

export default Admin;
