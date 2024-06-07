import React, { useState, memo, useEffect } from 'react';
import { FaCarSide } from "react-icons/fa6";
import { Button } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { FaMapMarkerAlt } from "react-icons/fa";
import RadioButtonCustom from '../components/radion-button';
import DropDown from '../components/dropdown';
import Prediction from '../components/predict';
import Weather from '../components/weather';
import Maps from '../components/map';
import SearchBox from '../components/searchbox';
import './style.scss';

const HomePage = () => {
    const [search, setSearch] = useState('');
    const [searchFrom, setSearchFrom] = useState('');
    const [listPlace, setListPlace] = useState([]);
    const [listPlaceFrom, setListPlaceFrom] = useState([]);
    const [showResults, setShowResults] = useState(true);
    const [showResultSearchFrom, setShowResultsSearchFrom] = useState(true);
    const [city, setCityName] = useState('');
    const [from, setFrom] = useState(null);
    const [to, setTo] = useState(null);
    const [selectedOption, setSelectedOption] = useState('Uber');
    const [distance,setDistance] = useState('')

    const handlePlaceClick = (place) => {
        setSearch(place.display_name);
        setShowResults(false);
        setTo(place);
    };

    const handlePlaceClickFrom = (place) => {
        const cityName = place.address.city;
        setCityName(cityName);
        setSearchFrom(place.display_name);
        setShowResultsSearchFrom(false);
        setFrom(place);
    };

    const handleSearchFrom = (value) => {
        setSearchFrom(value);
        setShowResultsSearchFrom(true);
    };

    const handleSearchChange = (value) => {
        setSearch(value);
        setShowResults(true);
    };

    const handleRadioChange = (event) => {
        setSelectedOption(event.target.value);
    };

    useEffect(() => {
        const showDistanceElement = document.querySelector('.show-distance');
        if (showDistanceElement && distance !== '') {
            showDistanceElement.innerText = `Estimated distance: ${distance} km`;
        }
    }, [distance]);
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
                    <div className='row content'>
                        <div className='col-9'>
                            <div className='row'><h6>Select your Cab:</h6></div>
                            <RadioButtonCustom selectedOption={selectedOption} onChange={handleRadioChange} />
                            <div className='row'><h6>Select your Cab type:</h6></div>
                            <DropDown selectedOption={selectedOption} />
                            <div className='row'><h6>Select your Location:</h6></div>
                            <div className='search-box'>
                                <SearchBox
                                    value={searchFrom}
                                    onChange={handleSearchFrom}
                                    onPlacesChanged={setListPlaceFrom}
                                    placeholder='Enter your starting location...'
                                />
                                <Button color='primary' variant='contained'>Search</Button>
                            </div>
                            <div className='search-box'>
                                <SearchBox
                                    value={search}
                                    onChange={handleSearchChange}
                                    onPlacesChanged={setListPlace}
                                    placeholder='Enter the destination you want to go to...'
                                />
                                <Button color='primary' variant='contained'>Search</Button>
                            </div>
                            {showResultSearchFrom && listPlaceFrom.length > 0 && (
                                <div className='result-list'>
                                    <List>
                                        {listPlaceFrom.map((place, index) => (
                                            <ListItem disablePadding key={index} onClick={() => handlePlaceClickFrom(place)}>
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
                            <div className='row'><h4 className='show-distance'></h4></div>
                            <div className='map'>
                                <Maps from={from} to={to} setDistance={setDistance}/>
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
