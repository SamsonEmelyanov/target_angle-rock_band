import React from 'react';
import {Route, Switch} from 'react-router-dom';
import MainPageHeader from "./main-page-header";
import '../app-header/main-page-header.sass'
import AudioHeader from "./audio-header";
import HistoryHeader from "./history-header";
import MusiciansHeader from "./musicians-header";
import VideoHeader from "./video-header";

const AppHeader = ()=>{

    return (
        <>
                <Switch>
                    <Route path = '/' exact component={MainPageHeader}/>
                    <Route path = '/history' exact component={MainPageHeader}/>
                    <Route path = '/full-history' exact component={MainPageHeader}/>
                    <Route path = '/musicians' exact component={MainPageHeader}/>
                    <Route path = '/video' exact component={MainPageHeader}/>
                    <Route path = '/shop' exact component={MainPageHeader}/>
                    <Route path = '/shop/cart' exact component={MainPageHeader}/>
                    <Route path = '/audio' exact component={MainPageHeader}/>
                    <Route path = '/shop/:id' exact component={MainPageHeader}/>
                    <Route path = '/history-footer' exact component={HistoryHeader}/>
                    <Route path = '/musicians-footer' exact component={MusiciansHeader}/>
                    <Route path = '/audio-footer' exact component={AudioHeader}/>
                    <Route path = '/video-footer' exact component={VideoHeader}/>
                </Switch>
        </>
    )
}

export default AppHeader;
