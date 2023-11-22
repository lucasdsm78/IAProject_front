import React, { useState } from 'react';
import axios from 'axios';
import './TransactionForm.css';
import Swal from 'sweetalert2';

const TransactionForm = () => {
    const [formData, setFormData] = useState({
        distance_from_home: 0,
        distance_from_last_transaction: 0,
        ratio_to_median_purchase_price: 0,
        repeat_retailer: 0,
        used_chip: 0,
        used_pin_number: 0,
        online_order: 0,
    });

    const [predictionResult, setPredictionResult] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/predict', formData);
            console.log('Réponse de la prédiction:', response.data);

            setPredictionResult(response.data);

            if (response.data.fraud_prediction === false) {
                await Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: "Votre transaction n'est pas frauduleuse",
                    showConfirmButton: false,
                });
            } else {
                await Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'La transaction semble frauduleuse!',
                });
            }
        } catch (error) {
            console.error('Erreur lors de la prédiction:', error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="transaction-form">
                <label>
                    Distance from Home
                    <input
                        type="number"
                        name="distance_from_home"
                        value={formData.distance_from_home}
                        onChange={handleChange}
                    />
                </label>

                <label>
                    Distance from Last Transaction
                    <input
                        type="number"
                        name="distance_from_last_transaction"
                        value={formData.distance_from_last_transaction}
                        onChange={handleChange}
                    />
                </label>

                <label>
                    Ratio to Median Purchase Price
                    <input
                        type="number"
                        name="ratio_to_median_purchase_price"
                        value={formData.ratio_to_median_purchase_price}
                        onChange={handleChange}
                    />
                </label>

                <label>
                    Repeat Retailer
                    <input
                        type="number"
                        name="repeat_retailer"
                        value={formData.repeat_retailer}
                        onChange={handleChange}
                    />
                </label>

                <label>
                    Used Chip
                    <input
                        type="number"
                        name="used_chip"
                        value={formData.used_chip}
                        onChange={handleChange}
                    />
                </label>

                <label>
                    Used PIN Number
                    <input
                        type="number"
                        name="used_pin_number"
                        value={formData.used_pin_number}
                        onChange={handleChange}
                    />
                </label>

                <label>
                    Online Order
                    <input
                        type="number"
                        name="online_order"
                        value={formData.online_order}
                        onChange={handleChange}
                    />
                </label>

                <button type="submit">Prédire</button>
            </form>
        </div>
    );
};

export default TransactionForm;
