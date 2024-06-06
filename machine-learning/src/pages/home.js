import React, { useState } from 'react';
import { memo } from 'react';
import Prediction from '../components/predict';
import Weather from '../components/weather';
import Clock from '../components/clock';
import './style.scss';
import { FaCarSide } from "react-icons/fa6";
import Maps from '../components/map';
import SearchBox from '../components/searchbox';
import { Button } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { FaMapMarkerAlt } from "react-icons/fa";

const HomePage = () => {
    const [search, setSearch] = useState('');
    const [listPlace, setListPlace] = useState([]);
    const [showResults, setShowResults] = useState(true);
    const [city, setCityName] = useState('');

    const handlePlaceClick = (place) => {
        const cityName = place.address.city;
        setCityName(cityName);
        setSearch(place.display_name);
        setShowResults(false);
    };

    const handleSearchChange = (value) => {
        setSearch(value);
        setShowResults(true);
    };

    return (
        <div>
            <header className="header">
                <div className='container'>
                    <div className='row'>
                        <FaCarSide />
                        <h1>Calculate Fares</h1>
                    </div>
                </div>
            </header>
            <main>
                <div className='container'>
                    <div className='row'>
                        <div className='col-9'>
                            <div className='search-box'>
                                <SearchBox 
                                    value={search} 
                                    onChange={handleSearchChange} 
                                    onPlacesChanged={setListPlace} 
                                />
                                <Button color='primary' variant='contained'>Search</Button>
                            </div>
                            {showResults && listPlace.length > 0 && (
                                <div className='result-list'>
                                    <List>
                                        {listPlace.map((place, index) => (
                                            <ListItem disablePadding key={index} onClick={() => handlePlaceClick(place)}>
                                                <ListItemButton>
                                                    <ListItemIcon>
                                                        <FaMapMarkerAlt />
                                                    </ListItemIcon>
                                                    <ListItemText primary={place.display_name} />
                                                </ListItemButton>
                                            </ListItem>
                                        ))}
                                    </List>
                                </div>
                            )}
                            <div className='map'>
                                <Maps />
                            </div>
                        </div>
                        <Weather cityName={city} />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default memo(HomePage);
