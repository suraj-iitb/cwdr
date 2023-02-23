import * as React from "react";
import { useState, useRef } from "react";
import {
  Grid,
  Box,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  Button,
  Typography,
  TextField,
  FormControlLabel,
  Container,
  Paper,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import useInput from "../../hooks/useInput";

export default function FieldWorkerFormSnehidi(props) {
  const data = props.data;
  const [isMember, setIsMember] = useState(false);
  const [isAssociatedUser, setIsAssociatedUser] = useState(data?.isAssociatedUser ? true: false);

  const handleMemberChange = (event) =>
    setIsMember(event.target.value === "true");
  const handleUserAssociatedChange = (event) =>
    setIsAssociatedUser(event.target.value === "true");

  const isNotEmpty = (value) => value.trim() !== "";
  const isValidZip = (value) =>
    value.match("[1-9][0-9]{5}") && value.length === 6;

  const formRefs = useRef({
    aadharInputRef: null,
    institutionNameInputRef: null,
    courseNameInputRef: null,
    billNoInputRef: null,
    refNoInputRef: null,
    fieldStaffNameInputRef: null,
  });

  let {
    value: firstName,
    isValid: firstNameIsValid,
    hasError: firstNameInputHasError,
    valueChangeHandler: firstNameChangedHandler,
    inputBlurHandler: firstNameBlurHandler,
    reset: resetFirstNameInput,
  } = useInput(isNotEmpty);

  const {
    value: lastName,
    isValid: lastNameIsValid,
    hasError: lastNameInputHasError,
    valueChangeHandler: lastNameChangedHandler,
    inputBlurHandler: lastNameBlurHandler,
    reset: resetLastNameInput,
  } = useInput(isNotEmpty);

  const {
    value: dob,
    hasError: dobInputHasError,
    valueChangeHandler: dobChangedHandler,
  } = useInput(() => {});

  const {
    value: addLine1,
    isValid: addLine1IsValid,
    hasError: addLine1HasError,
    valueChangeHandler: addLine1ChangedHandler,
    inputBlurHandler: addLine1BlurHandler,
    reset: resetAddLine1Input,
  } = useInput(isNotEmpty);

  const {
    value: addLine2,
    isValid: addLine2IsValid,
    hasError: addLine2HasError,
    valueChangeHandler: addLine2ChangedHandler,
    inputBlurHandler: addLine2BlurHandler,
    reset: resetAddLine2Input,
  } = useInput(() => {});

  const {
    value: city,
    isValid: cityIsValid,
    hasError: cityHasError,
    valueChangeHandler: cityChangedHandler,
    inputBlurHandler: cityBlurHandler,
    reset: resetCityInput,
  } = useInput(isNotEmpty);

  const {
    value: zip,
    isValid: zipIsValid,
    hasError: zipHasError,
    valueChangeHandler: zipChangedHandler,
    inputBlurHandler: zipBlurHandler,
    reset: resetZipInput,
  } = useInput(isValidZip);

  const {
    value: country,
    isValid: countryIsValid,
    hasError: countryHasError,
    valueChangeHandler: countryChangedHandler,
    inputBlurHandler: countryBlurHandler,
    reset: resetCountryInput,
  } = useInput(isNotEmpty);

  const {
    value: state,
    valueChangeHandler: stateChangedHandler,
    inputBlurHandler: stateBlurHandler,
    reset: resetStateInput,
  } = useInput(() => {});

  const {
    value: renewalDate,
    hasError: renewalDateHasError,
    valueChangeHandler: renewalDateChangedHandler,
  } = useInput(() => {});

  const {
    value: aadhar,
    hasError: aadharInputHasError,
    valueChangeHandler: aadharChangeHandler,
    inputBlurHandler: aadharBlurHandler,
  } = useInput(isNotEmpty);

  let formIsValid = false;

  if (
    firstNameIsValid &&
    lastNameIsValid &&
    addLine1IsValid &&
    addLine2IsValid &&
    cityIsValid &&
    zipIsValid &&
    countryIsValid
  ) {
    formIsValid = true;
  }

  const formSubmissionHandler = async (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }
    const aadhar = formRefs.current.aadharInputRef?.value || "";
    const institutionName = formRefs.current.institutionNameInputRef.value;
    const courseName = formRefs.current.courseNameInputRef.value;
    const billNumber = formRefs.current.billNoInputRef.value;
    const referenceNumber = formRefs.current.refNoInputRef.value;
    const fieldStaffName = formRefs.current.fieldStaffNameInputRef.value;

    try {
      await props.saveData(
        {
          firstName,
          lastName,
          dob,
          addLine1,
          addLine2,
          city,
          state,
          zip,
          country,
          ...(aadhar && { aadhar }),
          ...(institutionName && { institutionName }),
          ...(courseName && { courseName }),
          ...(billNumber && { billNumber }),
          ...(referenceNumber && { referenceNumber }),
          ...(fieldStaffName && { fieldStaffName }),
          renewalDate,
          aadhar
        },
        "cities"
      );
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    event.target.reset();
    resetFirstNameInput();
    resetLastNameInput();
    resetAddLine1Input();
    resetAddLine2Input();
    resetCityInput();
    resetZipInput();
    resetCountryInput();
    resetStateInput();
  };
  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <Paper
        variant="outlined"
        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
      >
        <Typography component="h4" variant="h4" align="center">
          {props.name.toUpperCase()}
        </Typography>
        <form onSubmit={formSubmissionHandler}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="firstName"
                label="First name"
                fullWidth
                autoComplete="given-name"
                error={firstNameInputHasError}
                helperText={
                  firstNameInputHasError && "This field cannot be empty"
                }
                onChange={firstNameChangedHandler}
                onBlur={firstNameBlurHandler}
                value={data?.firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="lastName"
                label="Last name"
                fullWidth
                autoComplete="family-name"
                error={lastNameInputHasError}
                helperText={
                  lastNameInputHasError && "This field cannot be empty"
                }
                onChange={lastNameChangedHandler}
                onBlur={lastNameBlurHandler}
                value={data?.lastName}
              />
            </Grid>
            <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Date Of Birth"
                  onChange={dobChangedHandler}
                  renderInput={(params) => (
                    <TextField {...params} error={dobInputHasError} />
                  )}
                  value={data?.dob}
                  maxDate={new Date()}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="address1"
                label="Address line 1"
                fullWidth
                autoComplete="shipping address-line1"
                error={addLine1HasError}
                helperText={addLine1HasError && "This field cannot be empty"}
                onChange={addLine1ChangedHandler}
                onBlur={addLine1BlurHandler}
                value={data?.addLine1}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="address2"
                label="Address line 2"
                fullWidth
                autoComplete="shipping address-line2"
                error={addLine2HasError}
                helperText={addLine2HasError && "This field cannot be empty"}
                onChange={addLine2ChangedHandler}
                onBlur={addLine2BlurHandler}
                value={data?.addLine2}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="city"
                label="City"
                fullWidth
                autoComplete="shipping address-level2"
                error={cityHasError}
                helperText={cityHasError && "This field cannot be empty"}
                onChange={cityChangedHandler}
                onBlur={cityBlurHandler}
                value={data?.city}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="state"
                label="State/Province/Region"
                fullWidth
                onChange={stateChangedHandler}
                onBlur={stateBlurHandler}
                value={data?.state}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="zip"
                label="Zip / Postal code"
                fullWidth
                autoComplete="shipping postal-code"
                error={zipHasError}
                helperText={zipHasError && "Invalid PIN code"}
                onChange={zipChangedHandler}
                onBlur={zipBlurHandler}
                value={data?.zip}
                InputProps={{
                  pattern: "[1-9][0-9]{5}",
                  required: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="country"
                label="Country"
                fullWidth
                autoComplete="shipping country"
                error={countryHasError}
                helperText={countryHasError && "This field cannot be empty"}
                onChange={countryChangedHandler}
                onBlur={countryBlurHandler}
                value={data?.country}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                id="institution"
                label="Institution Name"
                ref={(ref) => (formRefs.current.institutionNameInputRef = ref)}
                fullWidth
                value={data?.institutionName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="course"
                label="Course Name"
                fullWidth
                ref={(ref) => (formRefs.current.courseNameInputRef = ref)}
                value={data?.courseName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="bill_no"
                label="Bill Number"
                fullWidth
                autoComplete="bill_no"
                ref={(ref) => (formRefs.current.billNoInputRef = ref)}
                value={data?.billNumber}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="ref_no"
                label="Reference Number"
                fullWidth
                autoComplete="ref_no"
                ref={(ref) => (formRefs.current.refNoInputRef = ref)}
                value={data?.referenceNumber}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="staff_name"
                label="Field Staff Name"
                fullWidth
                autoComplete="staff_name"
                ref={(ref) => (formRefs.current.fieldStaffNameInputRef = ref)}
                value={data?.fieldStaffName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl component="fieldset">
                <FormLabel id="member-radio-group">
                  Is user already a member?
                </FormLabel>
                <RadioGroup
                  aria-label="member"
                  value={data?.isMember}
                  onChange={handleMemberChange}
                >
                  <FormControlLabel
                    value={false}
                    control={<Radio />}
                    label="No, not a member"
                  />
                  <FormControlLabel
                    value={true}
                    control={<Radio />}
                    label="Yes, already a member"
                  />
                </RadioGroup>
              </FormControl>
              {isMember && (
                <>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Next Date of Renewal"
                      onChange={renewalDateChangedHandler}
                      renderInput={(params) => (
                        <TextField {...params} error={renewalDateHasError} />
                      )}
                      value={data?.renewalDate}
                      minDate={new Date()}
                    />
                  </LocalizationProvider>
                </>
              )}
            </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <FormLabel id="employee-radio-group">
                  Associated with Mythri member?
                </FormLabel>
                <RadioGroup
                  aria-label="employee"
                  value={isAssociatedUser? true : false}
                  onChange={handleUserAssociatedChange}
                >
                  <FormControlLabel
                    value={false}
                    control={<Radio />}
                    label="No"
                  />
                  <FormControlLabel
                    value={true}
                    control={<Radio />}
                    label="Yes"
                  />
                </RadioGroup>
              </FormControl>
              {isAssociatedUser && (
                <>
                  <Grid item xs={12}>
                    <TextField
                      id="aadhar"
                      label="Aadhar Number"
                      required
                      ref={(ref) => (formRefs.current.aadharInputRef = ref)}
                      fullWidth
                      autoComplete="aadhar_number"
                      inputProps={{
                        maxLength: 12,
                        placeholder: "XXXX-XXXX-XXXX",
                      }}
                      value={data?.aadhar}
                      onChange={aadharChangeHandler}
                      onBlur={aadharBlurHandler}
                      error={aadharInputHasError}
                      helperText={aadharInputHasError && "This field cannot be empty"}
                    />
                  </Grid>
                </>
              )}
            </Grid>
          </Grid>

          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              type="submit"
              disabled={!formIsValid}
              variant="contained"
              sx={{ mt: 3, ml: 1 }}
            >
              Submit
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
}
