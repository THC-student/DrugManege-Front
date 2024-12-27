import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import router from './router';
import store from './store';
const root = ReactDOM.createRoot(document.getElementById('root'));
import 'normalize.css'
root.render(

    <Provider store={store}>
         <RouterProvider router={router}/>
    </Provider>
      


);

