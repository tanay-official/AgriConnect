import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

import logoimg from "../images/logo.png";


const Navigation = () => {
    return (
        <div className='nabar'>
            <div>
                <img className="imgstyl" src={logoimg} alt="Logo not find" />
            </div>

            <ul className='uldesign'>
                <li>
                   <Link to="/" >Home</Link>
                </li>
                <li>
                   <Link to="/products">Add Product</Link>
                </li>
                <li>
                    <Link to="/Contact">About Us</Link>
                </li>

                <li>
                    <Link to="/addTocart">Add to cart</Link>
                </li>
                
            </ul>




            
        </div>
    );
};

export default Navigation;