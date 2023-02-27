import { Grid, TextField } from "@mui/material";
import useInput from "../../hooks/useInput";
import { forwardRef, useImperativeHandle, useState } from "react";

const AddressInput = forwardRef((props, ref) => {
  const [addressDetails, setAddressDetails] = useState({});
  const isNotEmpty = (value) => {
    return value.trim() !== ""
  };
  const isValidZip = (value) =>
    value.match("[1-9][0-9]{5}") && value.length === 6;

  const {
    value: addLine1,
    isValid: addLine1IsValid,
    hasError: addLine1HasError,
    valueChangeHandler: addLine1ChangedHandler,
    inputBlurHandler: addLine1BlurHandler,
    reset: resetAddLine1Input,
  } = useInput(isNotEmpty, addressDetails.addLine1);

  const {
    value: addLine2,
    valueChangeHandler: addLine2ChangedHandler,
    inputBlurHandler: addLine2BlurHandler,
    reset: resetAddLine2Input,
  } = useInput(() => {}, addressDetails.addLine2);

  const {
    value: city,
    isValid: cityIsValid,
    hasError: cityHasError,
    valueChangeHandler: cityChangedHandler,
    inputBlurHandler: cityBlurHandler,
    reset: resetCityInput,
  } = useInput(isNotEmpty, addressDetails.city);

  const {
    value: zip,
    isValid: zipIsValid,
    hasError: zipHasError,
    valueChangeHandler: zipChangedHandler,
    inputBlurHandler: zipBlurHandler,
    reset: resetZipInput,
  } = useInput(isValidZip, addressDetails.zip);

  const {
    value: country,
    valueChangeHandler: countryChangedHandler,
    inputBlurHandler: countryBlurHandler,
    reset: resetCountryInput,
  } = useInput(isNotEmpty, addressDetails.country);

  const {
    value: state,
    valueChangeHandler: stateChangedHandler,
    inputBlurHandler: stateBlurHandler,
    reset: resetStateInput,
  } = useInput(() => {}, addressDetails.state);

  useImperativeHandle(ref, () => ({
    addressIsValid() {
      return addLine1IsValid && cityIsValid && zipIsValid;
    },
    getAddress() {
      return { addLine1, addLine2, city, state, zip, country };
    },
    handleReset() {
      resetAddLine1Input();
      resetAddLine2Input();
      resetCityInput();
      resetCountryInput();
      resetStateInput();
      resetZipInput();
      setAddressDetails({})
    },
    setAddress(addressData) {
        setAddressDetails(addressData);
    },
  }));

  return (
    <>
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
          value={addLine1}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="address2"
          label="Address line 2"
          fullWidth
          autoComplete="shipping address-line2"
          onChange={addLine2ChangedHandler}
          onBlur={addLine2BlurHandler}
          value={addLine2}
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
          value={city}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          id="state"
          label="State/Province/Region"
          fullWidth
          onChange={stateChangedHandler}
          onBlur={stateBlurHandler}
          value={state}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          id="zip"
          label="Zip / Postal code"
          fullWidth
          required
          autoComplete="shipping postal-code"
          error={zipHasError}
          helperText={zipHasError && "Invalid PIN code"}
          onChange={zipChangedHandler}
          onBlur={zipBlurHandler}
          value={zip}
          InputProps={{
            pattern: "[1-9][0-9]{5}",
            required: true,
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          id="country"
          label="Country"
          fullWidth
          autoComplete="shipping country"
          onChange={countryChangedHandler}
          onBlur={countryBlurHandler}
          value={country}
        />
      </Grid>
    </>
  );
});

export default AddressInput;
