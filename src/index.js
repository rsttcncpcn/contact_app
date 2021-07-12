import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-toastify/dist/ReactToastify.css";
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import App from './components/App';
import ViewContact from './components/ViewContact';
import registerServiceWorker from './registerServiceWorker';
import store from './store';


ReactDOM.render(

    <Provider store={ store }>

        <Router>
            <Switch>
                <Route exact path="/" component={App} />
                <Route exact path="/Contact/:id" component={ViewContact} />
            </Switch>
        </Router>
    </Provider>,
    document.getElementById('root')

);
registerServiceWorker();
