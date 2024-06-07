import React, { useState } from 'react';

const RadioButtonCustom = ({ selectedOption, onChange }) => {
    return (
        <div className="row">
            <div className="format-car">
                <input
                    type="radio"
                    id="uber"
                    name="car"
                    value="Uber"
                    checked={selectedOption === 'Uber'}
                    onChange={onChange}
                />
                <label htmlFor="uber">
                    <img 
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/1200px-Uber_logo_2018.svg.png" 
                        alt="Uber" 
                        width="50" 
                        height="50"
                    />
                </label>
            </div>
            <div className="format-car">
                <input
                    type="radio"
                    id="lyft"
                    name="car"
                    value="Lyft"
                    checked={selectedOption === 'Lyft'}
                    onChange={onChange}
                />
                <label htmlFor="lyft">
                    <img 
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Lyft_logo.svg/1200px-Lyft_logo.svg.png" 
                        alt="Lyft" 
                        width="50" 
                        height="50"
                    />
                </label>
            </div>
        </div>
    );
};

export default RadioButtonCustom;
