import React from 'react';
import { memo } from 'react';
import Prediction from '../components/predict';
import Weather from '../components/weather';
import Clock from '../components/clock';
import './style.scss';
import { FaCarSide } from "react-icons/fa6";
const HomePage = () => {
    return(
        <div>
            <header className="header">
                <div className='container'>
                    <div className='row'>
                        <FaCarSide/>
                        <h1>Calculate Fares</h1>
                    </div>
                </div>
                
            </header>
            <main>
                <div className='container'>
                    <div className='row'>
                        <div className='col-9'>Left Content</div>
                        <Weather/>
                    </div>
                </div>

            </main>
        </div>
    )
}

export default memo(HomePage);
