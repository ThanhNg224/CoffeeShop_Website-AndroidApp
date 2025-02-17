import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthContext';
import logo from './images/logo.png';
import "../User.css"
 
const Header = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
 
    const handleSignOut = () => {
        logout();
        navigate('/');
    };
 
    return (
<div className="head">
<div className="head_logo">
<img src={logo} alt="Logo" className="logo" />
</div>
<nav className="head_ul">
<ul>
<li>
                        {user ? (
<Link to={`/user/${user.id}`}>Home</Link>
                        ) : (
<Link to="/">Home</Link>
                        )}
</li>

<li><Link to={`/user/${user?.id}/info`}>About Us</Link></li>
</ul>
</nav>
<div className="head_logout">
                <span>{user ? `Welcome ${user.username}` : 'Welcome to CoffeeShop!'}</span>
                {user && <button className="signout-button" onClick={handleSignOut}>Sign Out</button>}
</div>
</div>
    );
};
 
export default Header;