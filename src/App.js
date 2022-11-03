import React, { useEffect } from "react";
import {useDispatch} from 'react-redux';

import Router from "./Router";
import './app.css';
import { STATISTICS } from "./redux/constants";

const App = () => {
    
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch({
            type:STATISTICS,
            payload: {}
        })
    })

    return <Router />;
};
export default App;