import React, { useState } from 'react';
import axios from 'axios';

function Prediction() {
    const [input, setInput] = useState('');
    const [predictions, setPredictions] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const inputArray = input.split(',').map(Number);
        try {
            const response = await axios.post('http://localhost:5000/predict', {
                input: inputArray
            });
            setPredictions(response.data);
        } catch (error) {
            console.error("There was an error making the request", error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Input (comma-separated values):
                    <input 
                        type="text" 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                </label>
                <button type="submit">Predict</button>
            </form>
            {predictions && (
                <div>
                    <h3>Predictions</h3>
                    <ul>
                        {predictions.map((pred, index) => (
                            <li key={index}>{pred}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Prediction;
