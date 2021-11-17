import React from 'react';
import { Link } from 'react-router-dom';
import './menu-list-item.scss';

// const getCategoryImg = (category) =>{
//     switch(category){
//         case
//     }
// }

const MenuListItem = ( {menuItem, onAddToCart}) => {
    const {title, price, url} = menuItem;

    return (
        <>
            <li className="menu__item">
                <Link style={{textDecoration:'none'}} to = {`/shop/${menuItem.id}`}>
                    <img className="menu__img" src={url} alt={title}></img>
                    <div className="menu__title">{title}</div>
                </Link>
                    <div className="menu__price-wrapper">
                    <div className="menu__price"><span>{price}р.</span></div>
                    <button onClick = {(e) => {
                            e.preventDefault();
                            onAddToCart();
                        } }
                        className="menu__btn">КУПИТЬ</button>
                    </div>
            </li>
        </>
    )
}


export default MenuListItem;
