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
  const [price, setPrice] = React.useState(0);
  const [balance, setBalance] = React.useState(0);
  const [selectedCategoryDate, setSelectedCategoryDate] = React.useState(null);
  const [categories, setCategories] = React.useState({});
  const [entry, setEntry] = React.useState({ price: 0, category: '' });
  const [entries, setEntries] = React.useState([]);

  const handleEntryChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setEntry((prevEntry) => ({
      ...prevEntry,
      [name]: value,
    }));
  };

  const handlePriceChange = (e) => {
    const newPrice = parseFloat(e.target.value) || 0;
    setPrice(newPrice);
    updateBalance();
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setPrice(comments[date] || 0);
    setEntry((prevEntry) => ({
      ...prevEntry,
      price: comments[date] || 0,
    }));
    setEntry((prevEntry) => ({
      ...prevEntry,
      category: categories[date] || '',
    }));
  };

  const updateBalance = () => {
    const totalCost = calculateTotalCommentsCost();
    const newBalance = price - totalCost;
    setBalance(newBalance);
  };

  const calculateTotalCommentsCost = () => {
    let totalCost = 0;

    for (const entry of entries) {
      totalCost += parseFloat(entry.price) || 0;
    }

    return totalCost;
  };

  const handleCategoryDateChange = (date) => {
    setSelectedCategoryDate(date);
    setEntry((prevEntry) => ({
      ...prevEntry,
      price: comments[date] || 0,
    }));
    setEntry((prevEntry) => ({
      ...prevEntry,
      category: categories[date] || '',
    }));
  };

  const addEntry = () => {
    if (entry.price !== 0 || entry.category !== '') {
      const newEntry = { date: selectedCategoryDate, price: entry.price, category: entry.category };
      setEntries([...entries, newEntry]);

      setComments({
        ...comments,
        [selectedCategoryDate]: entry.price,
      });
      setCategories({
        ...categories,
        [selectedCategoryDate]: entry.category,
      });

      // Zaktualizuj balans po dodaniu wpisu
      updateBalance();
      setEntry({ price: 0, category: '' });
    }
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
            <FilledInput
              id="filled-adornment-amount"
              name="price"
              startAdornment={<InputAdornment position="start">PLN</InputAdornment>}
              value={entry.price}
              onChange={handleEntryChange}
            />
            <FilledInput
              id="filled-adornment-category"
              name="category"
              startAdornment={<InputAdornment position="start">Kategoria</InputAdornment>}
              value={entry.category}
              onChange={handleEntryChange}
            />
            <Button variant="contained" color="primary" onClick={addEntry}>
              Dodaj
            </Button>
          </FormControl>
        </div>
        <div className="entries-container">
          <h2>Wpisy:</h2>
          <ul>
            {entries.map((entry, index) => (
              <li key={index}>
                Cena: {entry.price} PLN, Kategoria: {entry.category}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="sidebar">
        <div className="price">
          <h2>Początkowy stan: </h2>
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
