import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FilledInput from '@mui/material/FilledInput';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import "../Models/Kalendarz.css";

export default function StaticDatePickerLandscape() {
    const [comments, setComments] = React.useState({});
    const [selectedDate, setSelectedDate] = React.useState(null);
    const [comment, setComment] = React.useState('');
    const [price, setPrice] = React.useState(0);
    const [balance, setBalance] = React.useState(0);

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setComment(comments[date] || '');
    };

    const updateComment = () => {
        setComments({
            ...comments,
            [selectedDate]: comment,
        });
    };

    const handlePriceChange = (e) => {
        const newPrice = parseFloat(e.target.value) || 0;
        setPrice(newPrice);
        updateBalance();
    };

    const updateBalance = () => {
        const newBalance = price - calculateTotalCommentsCost();
        setBalance(newBalance);
    };

    const calculateTotalCommentsCost = () => {
        const commentDates = Object.keys(comments);
        let totalCost = -1;

        for (const date of commentDates) {
            const commentPrice = parseFloat(comments[date]) || 0;
            totalCost += commentPrice;
        }

        return totalCost;
    };

    return (
        <div className="calendar-container">
            <div className="calendar">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <StaticDatePicker
                        orientation="portrait"
                        className="xd large-calendar"
                        value={selectedDate}
                        onChange={handleDateChange}
                        renderInput={(params) => (
                            <div>
                                {params.inputProps.value}
                            </div>
                        )}
                    />
                </LocalizationProvider>
            </div>
            <div className="comments-container">
                <div className="comments">
                    <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                        <InputLabel htmlFor="filled-adornment-amount">Dodaj komentarz</InputLabel>
                        <FilledInput
                            id="filled-adornment-amount"
                            startAdornment={<InputAdornment position="start">PLN</InputAdornment>}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <Button variant="contained" color="primary" onClick={updateComment}>
                            Dodaj
                        </Button>
                    </FormControl>
                </div>
            </div>
            <div className="sidebar">
                <div className="price">
                    <h2>Cena: </h2>
                    <input
                        type="number"
                        value={price}
                        onChange={handlePriceChange}
                    />
                </div>
                <div className="balance">
                    <h2>Balans: {balance}</h2>
                </div>
            </div>
        </div>
    );
}