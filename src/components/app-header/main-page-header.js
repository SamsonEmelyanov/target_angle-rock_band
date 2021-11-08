import React, {useEffect} from 'react';
import '../cart-table/cart-table.scss'
import '../app-header/main-page-header.sass'
import { Link , useLocation} from 'react-router-dom';
import { connect } from 'react-redux';

const MainPageHeader = ({totalPrice}) => {

    useEffect(()=> {
            if (totalPrice <= 0) {
                document.querySelector('.cart__item-price').style.display = 'none';
            }
            else {
                document.querySelector('.cart__item-price').style.display = 'inline';
            }
        }
    )
    const location = useLocation();
    console.log(location);
    return (
<>
    <header>
        <div className="header__left">
            <Link className="auth" href="">
                <span className="auth-text">Авторизация</span>
            </Link>
            <Link className="registration" href="">Регистрация</Link>
        </div>
        <div className="header__right">
            <span className="telephone">+7(964)969-12-84(Viber)</span>
            <Link to ={'/shop/cart'} className="carT" href=""></Link>
            <div className="cart__item-price">Total: {totalPrice} р.</div>


        </div>
    </header>
    <Link to={'/'} className="logo"></Link>
    <nav>
        <ul className="menu-left">
            <li><Link to={'/history'}>История</Link></li>
            <li><Link to={'/musicians'}>Музыканты</Link></li>
            <li><Link to = '/audio' >Аудио</Link></li>
            <li><Link to={'/video'}>Видео</Link></li>
        </ul>
        <ul className="menu-right">
            <li><Link to={'/concerts'}>Концерты</Link></li>
            <li><Link to={'/events'}>События</Link></li>
            <li><Link to='/shop' href="">Магазин</Link></li>
            <li><Link to={'/fun-club'}>Фан-клуб</Link></li>
        </ul>
    </nav>
</>
    )
};


const mapStateToProps = ({totalPrice}) => {
    return{
        totalPrice
    }
}

export default connect(mapStateToProps)(MainPageHeader);
