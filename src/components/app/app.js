import React , {useEffect} from 'react';
import MainPage from "../main-page/main-page";
import {ShopPage, CartPage, ItemPage} from '../pages';
import Footer from "../footer/";
import Audio from "../audio/audio";
import Video from "../video/video";
import History from "../history/history";
import FullHistory from "../history/full-history";
import Musicians from "../musicians/musicians";
import AppHeader from '../app-header/app-header';
import { Route, Switch, useLocation} from 'react-router-dom';


const App = () => {
    const location = useLocation();
    useEffect(()=>{
        if(location.pathname === '/audio-footer' || location.pathname === '/history-footer'
            || location.pathname === '/musicians-footer' || location.pathname === '/video-footer'){
            document.querySelector('.container').classList.add('grange-container');
            document.querySelector('footer').classList.add('grange-footer')
        } else {
            document.querySelector('.container').classList.remove('grange-container');
            document.querySelector('footer').classList.remove('grange-footer');
        }

    })

    return (
        <>
        <div className="container">
            <AppHeader/>
            <Switch>
                <Route path = '/'  exact component={MainPage}/>
                <Route path = '/history'  exact component={History}/>
                <Route path = '/full-history'  exact component={FullHistory}/>
                <Route path = '/musicians'  exact component={Musicians}/>
                <Route path = '/audio' exact component={Audio}/>
                <Route path = '/video' exact component={Video}/>
                <Route path = '/shop' exact component={ShopPage}/>
                <Route path = '/shop/cart' exact component={CartPage}/>
                <Route path = '/history-footer' exact component={History}/>
                <Route path = '/audio-footer' exact component={Audio}/>
                <Route path = '/musicians-footer' exact component={Musicians}/>
                <Route path = '/video-footer' exact component={Video}/>

                <Route path = '/shop/:id'  component={ItemPage}/>
            </Switch>
        </div>
            <Footer/>
        </>
    )
}
export default App;
