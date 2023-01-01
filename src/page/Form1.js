import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from '@mui/material/Button';

export default function Form1() {
  const [name, setName] = React.useState(null);
  const [address, setAddress] = React.useState(null);
  const [date, setDate] = React.useState(null);
  const [aadhar, setAadhar] = React.useState(null);
  const [phone, setPhone] = React.useState(null);
  const [bill, setBill] = React.useState(null);
  const [reference, setReference] = React.useState(null);
  const [dependents, setDependents] = React.useState(null);
  const [company, setCompany] = React.useState(null);
  const [occupation, setOccupation] = React.useState(null);
  const [experience, setExperience] = React.useState(null);
  const [fieldStaffName, setFieldStaffName] = React.useState(null);

  return (
    <Box
      component="form"
      sx={{
        width: 500,
        maxWidth: '100%',
        alignItems: 'center',
        justifyContent: "center"
      }}
      noValidate
      autoComplete="off"
    >
      <TextField 
        id="name"
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        variant="outlined"
        margin="dense"
        fullWidth
      />
      <TextField 
        id="name"
        label="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        variant="outlined"
        margin="dense"
        fullWidth
        multiline
        rows={4}
        maxRows={4}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
            label="Date of Birth"
            value={date}
            onChange={(newDate) => {
            setDate(newDate);
            }}
            renderInput={(params) => 
            <TextField 
                variant="outlined"
                margin="dense"
                fullWidth
                {...params} 
            />}
        />
      </LocalizationProvider>
      <TextField 
        id="aadhar"
        label="Aadhar"
        value={aadhar}
        onChange={(e) => setAadhar(e.target.value)}
        variant="outlined"
        margin="dense"
        fullWidth
      />
      <TextField 
        id="phone"
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        label="Phone"
        margin="dense"
        variant="outlined"
        fullWidth
      />
      <TextField 
        id="file"
        type="file"
        label="Photo"
        margin="dense"
        variant="outlined"
        fullWidth
        InputLabelProps={{
            shrink: true,
          }}
      />
      <TextField 
        id="bill"
        value={bill}
        onChange={(e) => setBill(e.target.value)}
        label="Bill No"
        margin="dense"
        variant="outlined"
        fullWidth
      />
      <TextField 
        id="reference"
        value={reference}
        onChange={(e) => setReference(e.target.value)}
        label="Reference No"
        margin="dense"
        variant="outlined"
        fullWidth
      />
      <TextField 
        id="dependents"
        value={dependents}
        onChange={(e) => setDependents(e.target.value)}
        label="Dependents (Only Children)"
        margin="dense"
        variant="outlined"
        fullWidth
        type="number"
      />
      <TextField 
        id="company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        label="Company Name"
        margin="dense"
        variant="outlined"
        fullWidth
      />
      <TextField 
        id="occupation"
        value={occupation}
        onChange={(e) => setOccupation(e.target.value)}
        label="Occupation"
        margin="dense"
        variant="outlined"
        fullWidth
      />
      <TextField 
        id="experience"
        value={experience}
        onChange={(e) => setExperience(e.target.value)}
        label="No. of years of experience"
        margin="dense"
        variant="outlined"
        fullWidth
        type="number"
      />
      <TextField 
        id="fieldStaffName"
        value={fieldStaffName}
        onChange={(e) => setFieldStaffName(e.target.value)}
        label="Field Staff Name"
        margin="dense"
        variant="outlined"
        fullWidth
      />
      <Button variant="contained">Submit</Button>

    </Box>
  );
}