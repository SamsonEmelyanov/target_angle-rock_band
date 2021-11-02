import React from 'react';
import { Link } from 'react-router-dom';

import './footer.sass';

const Footer = () => {

    return (
    <footer>
        <div className="footer">
            <div className="footer-menu">
                <ul className="menu-left menu-left__footer">
                    <li><a href="../history/history.html">История</a></li>
                    <li><a href="../musicians/musicians.html">Музыканты</a></li>
                    <li><a href="../audio/audio.html">Аудио</a></li>
                    <li><a href="../video/video.html">Видео</a></li>
                </ul>
                <a className="logo__footer" href="../index/index.html"></a>
                <ul className="menu-right menu-right__footer">
                    <li><a href="../concerts/concerts.html">Концерты</a></li>
                    <li><a href="../events/events.html">События</a></li>
                    <li><a href="">Магазин</a></li>
                    <li><a href="../fun-club/fun-club.html">Фан-клуб</a></li>
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
