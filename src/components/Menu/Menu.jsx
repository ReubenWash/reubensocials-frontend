import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faStream,         
    faUserCircle,     
    faExchangeAlt,    
    faCrown,          
    faCog,            
    faSignOutAlt      
} from '@fortawesome/free-solid-svg-icons'; 
import './Menu.css';
import { getCurrentUser } from '../../api/authApi';

const Menu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate();

    // Load current user from API (better than localStorage)
    useEffect(() => {
        const loadUser = async () => {
            try {
                const userData = await getCurrentUser();
                console.log('Menu - Current user:', userData);
                setCurrentUser(userData);
            } catch (error) {
                console.error('Menu - Error loading user:', error);
                // Fallback to localStorage
                const storedUser = localStorage.getItem('user');
                if (storedUser) {
                    setCurrentUser(JSON.parse(storedUser));
                }
            }
        };
        loadUser();
    }, []);

    const toggleMenu = (event) => {
        event.stopPropagation(); 
        setIsOpen(!isOpen);
    };

    const handleSwitchAccount = () => {
        console.log('Switching account...'); 
        alert('Switch account feature coming soon!');
        setIsOpen(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
        setIsOpen(false);
        navigate('/login');
    };

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = () => {
            if (isOpen) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('click', handleClickOutside);
        }

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div className="menu-container">
            <div className="nav-link" onClick={toggleMenu}>
                <FontAwesomeIcon icon={faStream} />
                <span className="nav-label">Menu</span>
            </div>

            {isOpen && (
                <div className="dropdown-menu" onClick={(e) => e.stopPropagation()}>
                    {/* My Profile - FIXED */}
                    {currentUser && currentUser.username ? (
                        <Link 
                            to={`/user/${currentUser.username}`}  
                            className="menu-item" 
                            onClick={() => setIsOpen(false)}
                        >
                            <FontAwesomeIcon icon={faUserCircle} className="menu-icon" />
                            <span className="menu-label">My Profile</span>
                        </Link>
                    ) : (
                        <div className="menu-item" style={{ opacity: 0.5, cursor: 'not-allowed' }}>
                            <FontAwesomeIcon icon={faUserCircle} className="menu-icon" />
                            <span className="menu-label">My Profile (Loading...)</span>
                        </div>
                    )}

                    {/* Switch Account */}
                    <div className="menu-item action-item" onClick={handleSwitchAccount}>
                        <FontAwesomeIcon icon={faExchangeAlt} className="menu-icon" />
                        <span className="menu-label">Switch Account</span>
                    </div>

                    <hr className="menu-separator" />

                    {/* Upgrade to Pro */}
                    <Link to="/upgrade" className="menu-item pro-item" onClick={() => setIsOpen(false)}>
                        <FontAwesomeIcon icon={faCrown} className="menu-icon" />
                        <span className="menu-label">Upgrade to Pro</span>
                    </Link>

                    {/* Settings */}
                    <Link to="/settings" className="menu-item" onClick={() => setIsOpen(false)}>
                        <FontAwesomeIcon icon={faCog} className="menu-icon" />
                        <span className="menu-label">Settings</span>
                    </Link>

                    {/* Logout */}
                    <div className="menu-item logout-item" onClick={handleLogout}>
                        <FontAwesomeIcon icon={faSignOutAlt} className="menu-icon" />
                        <span className="menu-label">Logout</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Menu;