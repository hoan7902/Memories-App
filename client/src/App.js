import './App.css';
import { Container, Grid, Grow, Typography, AppBar } from '@material-ui/core'
import Navbar from './components/Navbar/Navbar'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import useStyles from './styles'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPosts } from './actions/posts'
import Home from './components/Home/Home'
import Auth from './components/Auth/Auth'

function App() {
    
    return (
        <BrowserRouter>
            <Container maxWidth="lg">
                <Navbar/>
                <Switch>
                    <Route path='/' exact component={Home}/>
                    <Route path='/auth' exact component={Auth}/>
                </Switch>
            </Container>
        </BrowserRouter>
    );
}

export default App;
