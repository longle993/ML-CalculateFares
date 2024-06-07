import React, { useEffect } from 'react';
import { OutlinedInput } from '@mui/material';

const NOMINATIM_BASE_URL = 'https://nominatim.openstreetmap.org/search?';

const SearchBox = ({ value, onChange, onPlacesChanged,placeholder }) => {
    useEffect(() => {
        if (!value) {
            onPlacesChanged([]);
            return;
        }

        const params = {
            q: value,
            format: 'json',
            addressdetails: 1,
            polygon_geojson: 0
        };
        const query = new URLSearchParams(params).toString();
        const requestOption = {
            method: 'GET',
            redirect: 'follow',
        };

        fetch(`${NOMINATIM_BASE_URL}${query}`, requestOption)
            .then((res) => res.text())
            .then((result) => {
                if (result) {
                    try {
                        const jsonResult = JSON.parse(result);
                        console.log(jsonResult)
                        onPlacesChanged(jsonResult);
                    } catch (error) {
                        console.error("Error parsing JSON: ", error);
                    }
                } else {
                    console.error("Empty response received from API");
                }
            })
            .catch((err) => console.log("err: ", err));
    }, [value, onPlacesChanged]);

    return (
        <OutlinedInput 
            fullWidth={true}
            multiline={false}
            placeholder={placeholder}
            value={value}
            onChange={(event) => onChange(event.target.value)}
        />
    );
};

export default SearchBox;
