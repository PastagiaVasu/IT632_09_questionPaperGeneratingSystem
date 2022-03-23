import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import LoginPage from './components/pages/LoginPage'
import RegisterPage from './components/pages/RegisterPage'
import ForgetPasswordPage from './components/pages/ForgetPasswordPage'

import './App.css'

export default function App() {
    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path="/" component={ LoginPage } />
                    <Route path="/register" component={ RegisterPage } />
                    <Route path="/forget-password" component={ ForgetPasswordPage } />
                </Switch>
                <Footer />
            </div>
        </Router>
    )
}

const Footer = () => {
    return (
        <p className="text-center" style={ FooterStyle }>Designed & coded by QPGS Team</p>
    )
}

const FooterStyle = {
    background: "#222",
    fontSize: ".8rem",
    color: "#ff0",
    position: "absolute",
    bottom: 0,
    padding: "1rem",
    margin: 0,
    width: "100%",
    opacity: ".5"
}