import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const DropDown = ({ selectedOption }) => {
    const listUber = ['UberXL', 'Black SUV', 'Taxi', 'UberPool', 'Black', 'UberX', 'WAV'];
    const listLyft = ['Shared', 'Lyft', 'Lux Black XL', 'Lux', 'Lux Black', 'Lyft XL'];

    return (
        <div>
            {selectedOption === 'Uber' && (
                <FormControl className='dropdown-type' fullWidth margin="normal">
                    <InputLabel>Uber</InputLabel>
                    <Select label="Uber">
                        {listUber.map((uber, index) => (
                            <MenuItem key={index} value={uber}>
                                {uber}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            )}
            {selectedOption === 'Lyft' && (
                <FormControl className='dropdown-type' fullWidth margin="normal">
                    <InputLabel>Lyft</InputLabel>
                    <Select label="Lyft">
                        {listLyft.map((lyft, index) => (
                            <MenuItem key={index} value={lyft}>
                                {lyft}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            )}
        </div>
    );
};

export default DropDown;
