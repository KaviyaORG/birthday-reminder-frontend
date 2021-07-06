import React from 'react';
import ReactDOM from 'react-dom';
import './FontawesomeIcons/icons'
import './Style/index.css';
import App from './App';
import SignIn from "./signIn";
import SignUp from "./signUp";
import FindPassword from "./findPassword";
import UpdatePassword from "./resetPassword";
import {BrowserRouter as Router, Redirect, Route, Switch, useHistory} from 'react-router-dom'
import Home from "./views/Home";
import AddData from "./views/AddData";
import About from "./views/About";
import 'react-toastify/dist/ReactToastify.css'
import ProtectedRoute from './helpers/ProtectedRoute'



ReactDOM.render(

    <Router>
        <Switch>


            <Route exact path="/" component={SignIn}/>
            <Route path="/signUp" component={SignUp}/>
            <Route path="/findPassword" component={FindPassword}/>
            {/*<ProtectedRoute path="/updatePassword" component={UpdatePassword}/>*/}
            <Route path="/updatePassword" component={UpdatePassword}/>

            <ProtectedRoute path="/home" component={ Home  } />
            <ProtectedRoute path="/addData" component={AddData}/>
            <ProtectedRoute path="/about" component={About}/>


        </Switch>
    </Router>,
  document.getElementById('root')
);

