import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const PageViewTracker = () => {
  const location = useLocation();

  useEffect(() => {
    axios.post('http://localhost:8080/api/track-page-view', { path: location.pathname })
      .catch(err => console.error('Error tracking page view:', err));
  }, [location]);

  return null;
};

export default PageViewTracker;
