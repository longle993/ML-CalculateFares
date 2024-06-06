import React from 'react';
import { memo } from 'react';
import Prediction from '../components/predict';
import Weather from '../components/weather';
import Clock from '../components/clock';
import './style.scss';
import { FaCarSide } from "react-icons/fa6";
import Maps from '../components/map';
import SearchBox from '../components/searchbox';

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
                        <div className='col-9'>
                            <div className='search-box'>
                                <SearchBox/>
                            </div>
                            <div className='map'>
                                <Maps/>
                            </div>
                        </div>
                        <Weather/>
                    </div>
                </div>

            </main>
        </div>
    )
}

export default memo(HomePage);
