import * as React from 'react';
import { useCallback, useMemo, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Unstable_Grid2';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
// import { Dayjs } from 'dayjs';
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const AddModal = ({open, handleClose}) => {

    const states = [
        {
          value: 'alabama',
          label: 'Alabama'
        },
        {
          value: 'new-york',
          label: 'New York'
        },
        {
          value: 'san-francisco',
          label: 'San Francisco'
        },
        {
          value: 'los-angeles',
          label: 'Los Angeles'
        }
      ];

    const [brand, setBrand] = useState('alabama');
    const [value, setDateValue] = useState(null);

    const handleChange = (event) => {
        setBrand(event.target.value);
    };

    return (
    <div>
        <Dialog
        open={open}
        maxWidth = "md"
        fullWidth
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        >
        <DialogTitle>{"Modal"}</DialogTitle>
        <DialogContent>
            <Grid
                fullWidth
                container
                spacing={3}
            >
                <FormControl fullWidth>
                    <Grid xs={12} md={12}>
                        <FormControlLabel control={<Switch defaultChecked />} label="Active" />
                    </Grid>
                    <Grid xs={12} md={12}>
                        <TextField
                            fullWidth
                            label="Select State"
                            name="state"
                            onChange={handleChange}
                            required
                            select
                            SelectProps={{ native: true }}
                            value={brand}
                            >
                            {states.map((option) => (
                                <option
                                key={option.value}
                                value={option.value}
                                >
                                {option.label}
                                </option>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid xs={12} md={12}>
                        <TextField
                        fullWidth
                        label="Last name"
                        name="lastName"
                        onChange={handleChange}
                        required
                        />
                    </Grid>
                    <Grid xs={12} md={12}>
                        <TextField
                        fullWidth
                        label="Last name"
                        name="lastName"
                        onChange={handleChange}
                        required
                        />
                    </Grid>
                    <Grid xs={12} md={12}>
                        {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker']}>
                                <DatePicker value={value} onChange={(newValue) => setDateValue(newValue)} />
                            </DemoContainer>
                        </LocalizationProvider> */}
                    </Grid>
                    <Grid xs={12} md={12}>
                        <TextField
                        fullWidth
                        label="Last name"
                        name="lastName"
                        onChange={handleChange}
                        required
                        />
                    </Grid>
                </FormControl>
            </Grid>
        </DialogContent>

        <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            <Button onClick={handleClose}>Agree</Button>
        </DialogActions>

        </Dialog>
    </div>
    );
}