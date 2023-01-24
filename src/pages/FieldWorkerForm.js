import * as React from 'react';
import { useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import {FormPageHeader} from "../components";

const theme = createTheme();

export default function FieldWorkerForm() {

const [formData, setFormData] = useState({});
const [member, setMember] = React.useState('yes');
const [employee, setEmployee] = React.useState('yes');
const [partOfMythri, setPartOfMythri] = React.useState('yes');
const [renewalDate, setRenewalDate] = React.useState('');

const handleMemberChange = (event) => {
  setMember(event.target.value);
};

const handleEmployeeChange = (event) => {
  setEmployee(event.target.value);
};

const handlePartOfMythriChange = (event) => {
  setPartOfMythri(event.target.value);
};

const handleRenewalDateChange = (event) => {
  setRenewalDate(event.target.value);
};


const handleChange = (e) => {
    console.log(e)
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
        ...prevState,
        [name]: value
    }));
    }
    
  return (

    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
        <FormPageHeader />
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <Typography component="h4" variant="h4" align="center">
        Mythri 
          </Typography>
          <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    label="Date Of Birth"
                    onChange={handleChange}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Address line 1"
            fullWidth
            autoComplete="shipping address-line1"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            label="Address line 2"
            fullWidth
            autoComplete="shipping address-line2"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="shipping address-level2"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            name="state"
            label="State/Province/Region"
            fullWidth
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="shipping postal-code"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="shipping country"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl component="fieldset">
          <FormLabel id="member-radio-group">Is user already a member?</FormLabel>
            <RadioGroup aria-label="member" name="member" value={member} onChange={handleMemberChange}>
              <FormControlLabel value="no" control={<Radio />} label="No, not a member" />
              <FormControlLabel value="yes" control={<Radio />} label="Yes, already a member" />
            </RadioGroup>
          </FormControl>
          {member === 'yes' && (
            <>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                  label="Next Date of Renewal"
                  onChange={handleChange}
                  renderInput={(params) => <TextField {...params} />}
              />
              </LocalizationProvider>
            </>
            )}
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="aadhar"
            name="aadhar"
            label="Aadhar Number"
            fullWidth
            autoComplete="aadhar_number"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField id="ph_num" name="ph_num" label="Phone Number" fullWidth autoComplete="ph_num" variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl component="fieldset">
          <FormLabel id="employee-radio-group">Is user employed?</FormLabel>
            <RadioGroup aria-label="employee" name="employee-radio-group" value={employee} onChange={handleEmployeeChange}>
              <FormControlLabel value="no" control={<Radio />} label="No" />
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            </RadioGroup>
          </FormControl>
          {employee === 'yes' && (
            <>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField id="company_name" name="company_name" label="Company Name" fullWidth variant="outlined"/>
              </Grid>
              <Grid item xs={12}>
                <TextField id="occupation_details" name="occupation_details" label="Occupation details" fullWidth variant="outlined"/>
              </Grid> 
              <Grid item xs={12} sm={6}>
              <TextField id="years_of_experience" name=" years_of_experience" label="Years of experience" fullWidth autoComplete="years_of_exp" variant="outlined"/>
              </Grid>
            </Grid>
            </>
            )}
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-multiline-static"
            label="Dependents"
            fullWidth
            multiline
            rows={4}
          />  
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="bill_no"
            name="bill_no"
            label="Bill Number"
            fullWidth
            autoComplete="bill_no"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="ref_no"
            name="ref_no"
            label="Reference Number"
            fullWidth
            autoComplete="ref_no"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="staff_name"
            name="staff_name"
            label="Field Staff Name"
            fullWidth
            autoComplete="staff_name"
            variant="outlined"
          />
        </Grid>
      </Grid>

      <React.Fragment>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant="contained" sx={{ mt: 3, ml: 1 }}>
                  Next
                </Button>
              </Box>
        </React.Fragment>

    </React.Fragment>
        </Paper>
      </Container>
    </ThemeProvider> 
  );
}