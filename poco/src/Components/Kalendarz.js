import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import "../Models/Kalendarz.css";

export default function StaticDatePickerLandscape() {
    // Stan do przechowywania komentarzy
    const [comments, setComments] = React.useState({});
    
    // Stan do przechowywania wybranego dnia
    const [selectedDate, setSelectedDate] = React.useState(null);

    // Stan do przechowywania komentarza
    const [comment, setComment] = React.useState('');

    // Funkcja do obsługi zmiany wybranego dnia
    const handleDateChange = (date) => {
        setSelectedDate(date);
        setComment(comments[date] || '');
    };

    // Funkcja do aktualizacji komentarzy
    const updateComment = () => {
        setComments({
            ...comments,
            [selectedDate]: comment,
        });
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
                <div className="comments">
                    <h2>Komentarz</h2>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        onBlur={updateComment}
                        placeholder="Dodaj komentarz..."
                    />
                </div>
            </div>
        </div>
    );
}
