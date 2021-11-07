import React from 'react';
import { Link } from 'react-router-dom';

import './footer.sass';

const Footer = () => {

    return (
    <footer>
        <div className="footer">
            <div className="footer-menu">
                <ul className="menu-left menu-left__footer">
                    <li><Link to = {'/history-footer'}>История</Link></li>
                    <li><Link to = {'/musicians-footer'}>Музыканты</Link></li>
                    <li><Link to = "/audio-footer">Аудио</Link></li>
                    <li><Link to={'/video-footer'}>Видео</Link></li>
                </ul>
                <Link to={'/'} className="logo__footer" ></Link>
                <ul className="menu-right menu-right__footer">
                    <li><Link href="../concerts/concerts.html">Концерты</Link></li>
                    <li><Link href="../events/events.html">События</Link></li>
                    <li><Link href="">Магазин</Link></li>
                    <li><Link href="../fun-club/fun-club.html">Фан-клуб</Link></li>
                </ul>
            </div>
            <ul className="footer-text">
                <li>Все права защищены ©2021</li>
                <li className="footer-tel">+7 (964)969-12-84(Viber)</li>
                <li>Связь с администрацией : samson.emelyanov@gmail.com</li>
            </ul>
        </div>
    </footer>
    )
}

export default Footer;
