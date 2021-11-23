import React , {useEffect , useState} from 'react';
import MainPage from "../main-page/main-page";
import {ShopPage, CartPage, ItemPage} from '../pages';
import Footer from "../footer/";
import Audio from "../audio/audio";
import Video from "../video/video";
import History from "../history/history";
import FullHistory from "../history/full-history";
import Musicians from "../musicians/musicians";
import Concerts from "../concerts/concerts";
import Events from "../events/events";
import FunClub from "../fun-club/fun-club";
import AppHeader from '../app-header/app-header';
import RegistAuthentification from "../RegistAuthentification/RegistAuthentification";
import { Route, Switch, useLocation, useHistory} from 'react-router-dom';
import {ACCESS_TOKEN} from "../constants";
import Alert from "react-s-alert";
import {getCurrentUser} from "../util/APIUtils";


const App = () => {

    const [authenticated , setAuthenticated] = useState(false);
    const [currentUser , setCurrentUser] = useState( null);
    const [loading , setLoading] = useState( false);
    const [counter, setCounter] = useState(0);
    const [data, setData] = useState([{sender: null, senderImg: null, date: null, label: null, id: counter}]);
    const  [message, setText] = useState("");

    const location = useLocation();
    useEffect(()=>{
        setAuthenticated(localStorage.getItem('authenticated')==='true');
        setCurrentUser(JSON.parse(localStorage.getItem('currentUser')));
    },[])

    useEffect(() => {
        if(location.pathname === '/audio-footer' || location.pathname === '/history-footer'
            || location.pathname === '/musicians-footer' || location.pathname === '/video-footer'
            || location.pathname === '/shop-footer' || location.pathname === '/concerts-footer'
            || location.pathname === '/events-footer' || location.pathname === '/fun-club-footer'){
            document.querySelector('.container').classList.remove("main-background");
            document.querySelector('body').classList.add('grange-background');
            document.querySelector('footer').classList.add('grange-footer')
        } else {
            document.querySelector('footer').classList.remove('grange-footer');
            document.querySelector('body').classList.remove('grange-background');
            document.querySelector('.container').classList.add("main-background");

        }

    })

    const history = useHistory();
    const handleLogout = () => {
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem('authenticated');
        localStorage.removeItem('currentUser');
        setAuthenticated(false);
        setCurrentUser(null);
        Alert.success("You're safely logged out!");
        history.push({
            pathname: '/'
        })
    };

    const loadCurrentlyLoggedInUser = () => {
        setLoading(true);

        getCurrentUser()
            .then(response => {
                setAuthenticated(true)
                localStorage.setItem('authenticated','true')
                localStorage.setItem('currentUser',JSON.stringify(response))
                setCurrentUser(response)
                setLoading(false)
            }).catch(error => {
            setLoading(false)
        });
    }
    return (
        <>
        <div className="container main-background">
            <AppHeader loadCurrentlyLoggedInUser={loadCurrentlyLoggedInUser} authenticated = {authenticated}
                       currentUser={currentUser} loading={loading} handleLogout={handleLogout}/>
            <Switch>
                <Route path = '/'  exact component={MainPage}/>
                <Route path = '/history'  exact component={History}/>
                <Route path = '/full-history'  exact component={FullHistory}/>
                <Route path = '/musicians'  exact component={Musicians}/>
                <Route path = '/audio' exact component={Audio}/>
                <Route path = '/video' exact component={Video}/>
                <Route path = '/concerts' exact component={Concerts}/>
                <Route path = '/events' exact component={Events}/>
                <Route path = '/shop' exact component={ShopPage}/>
                <Route path = '/fun-club' exact render={()=><FunClub message={message}
                counter = {counter} data ={data} authenticated = {authenticated}
                 setCounter = {setCounter} setData = {setData} setText = {setText}  currentUser = {currentUser}/>}/>
                <Route path = '/shop/cart' exact component={CartPage}/>
                <Route path = '/history-footer' exact component={History}/>
                <Route path = '/audio-footer' exact component={Audio}/>
                <Route path = '/musicians-footer' exact component={Musicians}/>
                <Route path = '/video-footer' exact component={Video}/>
                <Route path = '/concerts-footer' exact component={Concerts}/>
                <Route path = '/events-footer' exact component={Events}/>
                <Route path = '/shop-footer' exact component={ShopPage}/>
                <Route path = '/fun-club-footer' exact render={()=><FunClub message={message}
                counter = {counter} data ={data} authenticated = {authenticated}
                setCounter = {setCounter} setData = {setData} setText = {setText}  currentUser = {currentUser}/>}/>
                <Route path = '/registration' render={()=><RegistAuthentification authenticated = {authenticated}
                    currentUser={currentUser} loading={loading} handleLogout={handleLogout} loadCurrentlyLoggedInUser={loadCurrentlyLoggedInUser}/>}/>
                <Route path = '/shop/:id'  component={ItemPage}/>
            </Switch>
        </div>
            <Footer/>
        </>
    )
}
export default App;
