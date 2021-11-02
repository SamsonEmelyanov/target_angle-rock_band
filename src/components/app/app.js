import React from 'react';
import {MainPage, CartPage, ItemPage} from '../pages';
import Footer from "../footer/footer";
import AppHeader from '../app-header';

import Background from '../../image32.jpg';
import { Route, Switch } from 'react-router-dom';

const App = () => {

    return (
        <div style={{background: `url(${Background}) center center/cover no-repeat`}} className="app">
            <AppHeader/>
            <Switch>
                <Route path = '/' exact component={MainPage}/>
                <Route path = '/cart' exact component={CartPage}/>
                <Route path = '/:id'  component={ItemPage}/>
            </Switch>
            <Footer/>
        </div>
    )
}
export default App;
