import React, { useState, useEffect } from "react";
import { Box, Button, Checkbox, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";
import { getAuthorsPaged } from "../../services/AuthorServices/AuthorServices";


const FilterSection = (props) => {
    
    const initialFilters = props.currentFilters; 

    const [filters, setFilters] = useState({
        TitleFilter: initialFilters.titleFilter || '',
        PublishedDateFrom: initialFilters.publishedDateFrom ? dayjs(initialFilters.publishedDateFrom) : null,
        PublishedDateTo: initialFilters.publishedDateTo ? dayjs(initialFilters.publishedDateTo) : null,
        AuthorId: initialFilters.authorId || '',
        AuthorFullNameFilter: initialFilters.authorFullNameFilter || '',
        AuthorDateOfBirthFrom: initialFilters.authorDateOfBirthFrom ? dayjs(initialFilters.authorDateOfBirthFrom) : null,
        AuthorDateOfBirthTo: initialFilters.authorDateOfBirthTo ? dayjs(initialFilters.authorDateOfBirthTo) : null,
    });
    
    const [authors, setAuthors] = useState([]);

    // Efekat za učitavanje liste autora za padajući meni
    useEffect(() => {
        const fetchAuthors = async () => {
            try {
                // Dohvaćamo sve autore (ili bar prvu veliku stranicu)
                const data = await getAuthorsPaged({currentPage: 1, pageSize: 100, orderBy: "fullName asc"}); 
                setAuthors(data.items);
            } catch (err) {
                console.error("Greška pri učitavanju autora:", err);
            }
        };
        fetchAuthors();
    }, []); 

    // Generička funkcija za rukovanje promenama teksta i dropdowna
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    // Glavna funkcija za slanje filtera roditeljskoj komponenti
    const handleFilterSubmit = () => {
        const submittedFilters = {};
        
        // 1. ITERIRANJE KROZ LOKALNI STATE I OBRADA DATUMA I NULL VREDNOSTI
        Object.keys(filters).forEach(key => {
            const value = filters[key];

            if (value instanceof dayjs) {
                // Ako je Day.js objekat, konvertujemo ga u ISO string
                submittedFilters[key] = value.toISOString();
            } else if (value !== '' && value !== null) {
                // Filtriramo prazne stringove/null i dodajemo ih
                submittedFilters[key] = value;
            }
        });

        // 2. POZIV RODITELJSKE FUNKCIJE (onFilter je handleFilterChange u BooksPage)
        props.onFilter(submittedFilters);
    };

    const handleReset = () => {
        // Resetovanje na prazne/defaultne vrednosti
        setFilters({
            TitleFilter: '',
            PublishedDateFrom: null,
            PublishedDateTo: null,
            AuthorId: '',
            AuthorFullNameFilter: '',
            AuthorDateOfBirthFrom: null,
            AuthorDateOfBirthTo: null,
        });
        // Odmah pokreni pretragu s praznim filterima
        props.onFilter({}); 
    };


    return (
        <Box sx={{ flexGrow: 1, p: 2, border: '1px solid #ddd', mb: 3 }}>
            <Grid container spacing={3}>
                
                {/* 1. Naziv Knjige (TitleFilter) */}
                <Grid item xs={12} sm={6} md={3}>
                    <TextField 
                        fullWidth 
                        label="Naziv knjige (sadrži)" 
                        name="TitleFilter"
                        value={filters.TitleFilter} 
                        onChange={handleChange}
                    />
                </Grid>
                
                {/* 2. Ime Autora (AuthorFullNameFilter) */}
                <Grid item xs={12} sm={6} md={3}>
                    <TextField 
                        fullWidth 
                        label="Ime autora (sadrži)" 
                        name="AuthorFullNameFilter"
                        value={filters.AuthorFullNameFilter} 
                        onChange={handleChange}
                    />
                </Grid>

                {/* 3. Dropdown Autora (AuthorId) */}
                <Grid item xs={12} sm={6} md={3}>
                    <FormControl fullWidth>
                        <InputLabel id="author-label">Izaberi Autora</InputLabel>
                        <Select
                            labelId="author-label"
                            name="AuthorId"
                            value={filters.AuthorId}
                            label="Izaberi Autora"
                            onChange={handleChange}
                        >
                            <MenuItem value="">-- Svi Autori --</MenuItem>
                            {/* KORISTIMO OPTIONAL CHAINING ZA IZBEGAVANJE GREŠKE */}
                            {authors?.map((author) => ( 
                                <MenuItem key={author.id} value={author.id}>
                                    {author.fullName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                {/* 4. Datum Izdavanja (OD) - PublishedDateFrom */}
                <Grid item xs={12} sm={6} md={3}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Izdata od"
                            value={filters.PublishedDateFrom}
                            onChange={(newValue) => setFilters(prev => ({ ...prev, PublishedDateFrom: newValue }))}
                            slotProps={{ textField: { fullWidth: true } }}
                        />
                    </LocalizationProvider>
                </Grid>
                
                {/* 5. Datum Izdavanja (DO) - PublishedDateTo */}
                <Grid item xs={12} sm={6} md={3}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Izdata do"
                            value={filters.PublishedDateTo}
                            onChange={(newValue) => setFilters(prev => ({ ...prev, PublishedDateTo: newValue }))}
                            slotProps={{ textField: { fullWidth: true } }}
                        />
                    </LocalizationProvider>
                </Grid>

                {/* 6. Datum Rođenja Autora (OD) - AuthorDateOfBirthFrom */}
                <Grid item xs={12} sm={6} md={3}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Autor rođen od"
                            value={filters.AuthorDateOfBirthFrom}
                            onChange={(newValue) => setFilters(prev => ({ ...prev, AuthorDateOfBirthFrom: newValue }))}
                            slotProps={{ textField: { fullWidth: true } }}
                        />
                    </LocalizationProvider>
                </Grid>
                
                {/* 7. Datum Rođenja Autora (DO) - AuthorDateOfBirthTo */}
                <Grid item xs={12} sm={6} md={3}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Autor rođen do"
                            value={filters.AuthorDateOfBirthTo}
                            onChange={(newValue) => setFilters(prev => ({ ...prev, AuthorDateOfBirthTo: newValue }))}
                            slotProps={{ textField: { fullWidth: true } }}
                        />
                    </LocalizationProvider>
                </Grid>

                {/* DUGME ZA FILTRIRANJE */}
                <Grid item xs={12} sm={6} md={3} sx={{ display: 'flex', gap: 1 }}>
                    <Button variant="contained" onClick={handleFilterSubmit} sx={{ height: 56 }}>
                        Pretraži
                    </Button>
                    <Button variant="outlined" onClick={handleReset} sx={{ height: 56 }}>
                        Reset
                    </Button>
                </Grid>

            </Grid>
        </Box>
    );
}

export default FilterSection;