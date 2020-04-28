import React from 'react';
import {Route, BrowserRouter, Switch} from 'react-router-dom'
import store from './store/store'
import { Provider } from 'react-redux'

//pages
import LoginPage from './pages/LoginPage'
import ErrPage from './pages/ErrPage'
import PrivatePage from './pages/PrivatePage'
import LandingPage from './pages/LandingPage'
import HomePage from './pages/HomePage'
import VisitorWrite from './pages/VisitorWrite'
import StartPage from './pages/StartPage'
import AgreePage from './pages/AgreePage'
import movePage from './pages/movePage'
import Profile from './pages/Profile'
import Memory from './pages/Memory'
import KakaoLoginPage from './pages/KakaoLoginPage'
import BookReg from './pages/BookReg'
import B from './pages/B'
import Select from './pages/Select'
import Header from './components/Header'
import Document from './pages/Documentation'
import History from './pages/History'
import Img from './pages/ImgUpload'
import Live from './pages/Live'

function App() {
  	return (
    	<BrowserRouter>
		 <Provider store={store}>
			 <Switch>
			 <Route exact path="/" component={Document}/>
			 <Route path="/start" component={StartPage}/>
			<Route path="/login" component={LoginPage}/>
			<Route path="/err" component={ErrPage}/>
			<Route path="/private" component={PrivatePage}/>
			<Route path="/landing" component={LandingPage}/>
			<Route path="/home" component={HomePage}/>
			<Route path="/visitors" component={VisitorWrite}/>			
			<Route path="/agree" component={AgreePage}/>
			<Route path="/move" component={movePage}/>
			<Route path="/profile" component={Profile}/>
			<Route path="/memory" component={Memory}/>
			<Route path="/kakaoLogin" component={KakaoLoginPage}/>
			<Route path="/header" component={Header}/>
			<Route path="/bookreg" component={BookReg}/>
			<Route path="/b" component={B}/>
			<Route path="/select" component={Select}/>
			<Route path="/history" component={History}/>
			<Route path="/live" component={Live}/>
			<Route path="/img" component={Img}/>
			</Switch>
			</Provider>
		</BrowserRouter>
  	);
}

export default App;
