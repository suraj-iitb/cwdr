import { useState, useRef, useEffect } from "react";
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
import { useDispatch } from "react-redux";

import useInput from "../../hooks/useInput";
import { AddressInput } from "..";
import { retrieveOrgDataUsingMemberId, updateDocument } from "../../firebase";
import { COLLECTIONS } from "../../constants/constants";
import { getNextMemberId, encrypt, decrypt } from "../../firebase";
import { useAuth } from "../../hooks";
import { setOpenEditUserDialog } from "../../redux/slices/openEditUserDialogSlice";
import { isNotEmpty, isValidPhone } from "../../utils";
import CircularProgress from "@mui/material/CircularProgress";
import { green } from "@mui/material/colors";

export function FieldWorkerFormManushiMaithri(props) {
  const [loading, setLoading] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  const [memberData, setMemberData] = useState({});
  const [docID, setDocID] = useState(null);
  const [isMember, setIsMember] = useState(!!props?.memberID);
  const [memberID, setMemberID] = useState(props.memberID);
  const [isAssociatedUser, setIsAssociatedUser] = useState(false);
  const [isUserEmployed, setIsUserEmployed] = useState(false);

  const { currentUser } = useAuth();

  const dispatch = useDispatch();

  const formRefs = useRef({
    addressInputRef: null,
  });

  const org = props.org;

  const handleMemberChange = (event) => {
    handleReset();
    if (event.target.value === "true") {
      setMemberID("");
    } else {
      setMemberID(JSON.parse(sessionStorage.getItem("memberId")));
    }
    setIsMember(event.target.value === "true");
  };

  const memberIDChangeHandler = (event) => {
    setMemberID(event.target.value);
  };
  const handleUserAssociatedChange = (event) => {
    setIsAssociatedUser(event.target.value === "true");
  };

  const handleEmployeeChange = (event) => {
    setIsUserEmployed(event.target.value === "true");
  };

  const handleReset = () => {
    setMemberID("");
    setMemberData({});
    firstNameReset("");
    lastNameReset("");
    dobReset(null);
    resetPhoneInput("");
    dependantsReset("");
    billNoInputReset("");
    refNoReset("");
    staffNameReset("");
    aadharReset("");
    renewalDateReset(null);
    if (isUserEmployed) {
      companyNameReset("");
      occupationReset("");
      yearsOfExpReset("");
    }
    formRefs.current.addressInputRef.handleReset();
    setIsAssociatedUser(false);
    if (!isMember) {
      setMemberID(JSON.parse(sessionStorage.getItem("memberId")));
    }
  };

  const {
    value: firstName,
    isValid: firstNameIsValid,
    hasError: firstNameHasError,
    valueChangeHandler: firstNameValueChangeHandler,
    inputBlurHandler: firstNameInputBlurHandler,
    reset: firstNameReset,
  } = useInput(isNotEmpty, memberData?.firstName);

  const {
    value: lastName,
    isValid: lastNameIsValid,
    hasError: lastNameHasError,
    valueChangeHandler: lastNameValueChangeHandler,
    inputBlurHandler: lastNameInputBlurHandler,
    reset: lastNameReset,
  } = useInput(isNotEmpty, memberData?.lastName);

  const {
    value: dob,
    hasError: dobHasError,
    valueChangeHandler: dobValueChangeHandler,
    reset: dobReset,
  } = useInput(() => {}, memberData?.dob);

  const {
    value: aadhar,
    valueChangeHandler: aadharValueChangeHandler,
    reset: aadharReset,
  } = useInput(() => {}, memberData?.aadhar);

  const {
    value: phone,
    isValid: phoneIsValid,
    hasError: phoneHasError,
    valueChangeHandler: phoneValueChangeHandler,
    inputBlurHandler: phoneInputBlurHandler,
    reset: resetPhoneInput,
  } = useInput(isValidPhone, memberData?.phone);

  const {
    value: billNo,
    valueChangeHandler: billValueChangeHandler,
    reset: billNoInputReset,
  } = useInput(() => {}, memberData?.billNo);

  const {
    value: refNo,
    valueChangeHandler: refValueChangeHandler,
    reset: refNoReset,
  } = useInput(() => {}, memberData?.refNo);

  const {
    value: dependants,
    valueChangeHandler: dependantsValueChangeHandler,
    reset: dependantsReset,
  } = useInput(() => {}, memberData?.dependants);

  const {
    value: companyName,
    valueChangeHandler: companyNameValueChangeHandler,
    reset: companyNameReset,
  } = useInput(() => {}, memberData?.companyName);

  const {
    value: occupation,
    valueChangeHandler: occupationValueChangeHandler,
    reset: occupationReset,
  } = useInput(() => {}, memberData?.occupation);

  const {
    value: yearsOfExp,
    valueChangeHandler: yearsOfExpValueChangeHandler,
    reset: yearsOfExpReset,
  } = useInput(() => {}, memberData?.yearsOfExp);

  const {
    value: fieldStaffName,
    valueChangeHandler: staffNameValueChangeHandler,
    reset: staffNameReset,
  } = useInput(() => {}, memberData?.fieldStaffName);

  const {
    value: renewalDate,
    hasError: renewalDateHasError,
    valueChangeHandler: renewalDateValueChangeHandler,
    reset: renewalDateReset,
  } = useInput(() => {}, memberData?.renewalDate);

  let formIsValid = false;
  if (
    firstNameIsValid &&
    lastNameIsValid &&
    phoneIsValid &&
    formRefs.current.addressInputRef.addressIsValid()
  ) {
    formIsValid = true;
  }

  const formSubmissionHandler = async (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }

    setIsSubmit(true);
    setLoading(true)

    const address = formRefs.current.addressInputRef.getAddress();
    const encryptedAadhar = await encrypt({ originalText: aadhar });

    const memberDetails = {
      memberID: memberID,
      firstName,
      lastName,
      address: { ...address },
      dob,
      aadhar: encryptedAadhar?.data?.cipherText,
      phone,
      billNo,
      refNo,
      dependants,
      isUserEmployed,
      companyName,
      occupation,
      yearsOfExp,
      fieldStaffName,
      isAssociatedUser,
      renewalDate,
      approved: false,
    };

    try {
      if (!isMember) {
        await props.saveData(org, memberDetails);
      } else {
        await updateDocument(org, docID, memberDetails);
      }
    } catch (e) {
      console.error("Error submitting form: ", e);
    }

    const memberId = await getNextMemberId(org);
    sessionStorage.setItem("memberId", JSON.stringify(memberId));

    event.target.reset();
    handleReset();

    updateDocument(COLLECTIONS.USER, currentUser.id, {
      noOfApplicants: currentUser.noOfApplicants + 1,
    });

    dispatch(setOpenEditUserDialog(false));
    setLoading(false);
    setIsSubmit(false);
  };

  useEffect(() => {
    const getNextMemberIdFunction = async () => {
      const memberId = await getNextMemberId(org);
      sessionStorage.setItem("memberId", JSON.stringify(memberId));
      setMemberID(memberId);
    };
    if (!memberID) {
      getNextMemberIdFunction();
    }
  }, []);

  useEffect(() => {
    let interval;
    if (memberID && isMember) {
      setLoading(true);
      interval = setTimeout(async () => {
        try {
          retrieveOrgDataUsingMemberId(org, memberID).then(async (response) => {
            if(!response) {
              props.showSnackBar("error", "No member dound!")
            }
            let decryptedAadhar = null;
            if(response?.aadhar) {
              decryptedAadhar = await decrypt({
                cipherText: response?.aadhar,
              });
              response.aadhar = decryptedAadhar?.data?.originalText;
            }
            formRefs.current.addressInputRef.setAddress(response?.address);
            setDocID(response?.id);
            setIsAssociatedUser(response?.isAssociatedUser);
            setMemberData(response);
            setLoading(false);

          });
        } catch (error) {
          props.showSnackBar("error", "No member dound!")
        }
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [memberID, isMember]);

  return (
    <Container component="main" maxWidth="md" sx={{ width: "100%" }}>
      <Paper sx={{ my: { xs: 3, md: 3 }, p: { xs: 2, md: 3 } }}>
        <Typography component="h4" variant="h4" align="center">
          {props.org.toUpperCase()}
        </Typography>
        <form onSubmit={formSubmissionHandler}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <FormLabel id="member-radio-group">
                  Is user already a member?
                </FormLabel>
                <RadioGroup
                  aria-label="member"
                  value={isMember}
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
            </Grid>
            <Grid item xs={12} container spacing={3}>
              <Grid item xs={6}>
                <TextField
                  required
                  id="memberID"
                  fullWidth
                  disabled={!isMember}
                  error={!isNotEmpty}
                  helperText={!isNotEmpty && "This field cannot be empty"}
                  onChange={memberIDChangeHandler}
                  value={memberID}
                />
              </Grid>
              <Grid item xs={6}>
                {/* <LocalizationProvider dateAdapter={AdapterDayjs}> */}
                <TextField
                  type="date"
                  id="date"
                  label="Next Date of Renewal"
                  onChange={renewalDateValueChangeHandler}
                  inputProps={{
                    min: new Date().toISOString().slice(0, 10),
                  }}
                  value={renewalDate || ''}
                  InputLabelProps={{shrink: true}}
                  />
               {/* </LocalizationProvider> */}
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="firstName"
                label="First name"
                fullWidth
                autoComplete="given-name"
                error={firstNameHasError}
                helperText={firstNameHasError && "This field cannot be empty"}
                onChange={firstNameValueChangeHandler}
                onBlur={firstNameInputBlurHandler}
                value={firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="lastName"
                label="Last name"
                fullWidth
                autoComplete="family-name"
                error={lastNameHasError}
                helperText={lastNameHasError && "This field cannot be empty"}
                onChange={lastNameValueChangeHandler}
                onBlur={lastNameInputBlurHandler}
                value={lastName}
              />
            </Grid>
            <Grid item xs={12} container spacing={3}>
              <Grid item xs={6}>
                <TextField
                  id="ph_num"
                  label="Phone Number"
                  fullWidth
                  autoComplete="ph_num"
                  required
                  error={isNotEmpty && phoneHasError}
                  helperText={phoneHasError && "Enter a valid phone number"}
                  value={phone}
                  onChange={phoneValueChangeHandler}
                  onBlur={phoneInputBlurHandler}
                />
              </Grid>
              <Grid item xs={6}>
                {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Date Of Birth"
                    onChange={dobValueChangeHandler}
                    renderInput={(params) => (
                      <TextField {...params} error={dobHasError} />
                    )}
                    value={dob}
                  />
                </LocalizationProvider> */}
                <TextField
                  type="date"
                  label="Date Of Birth"
                  onChange={dobValueChangeHandler}
                  value={dob}
                  InputLabelProps={{shrink: true}}
                  />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="aadhar"
                label="Aadhar Number"
                fullWidth
                autoComplete="aadhar_number"
                inputProps={{
                  maxLength: 12,
                  placeholder: "XXXX-XXXX-XXXX",
                }}
                value={aadhar}
                onChange={aadharValueChangeHandler}
              />
            </Grid>
            <AddressInput
              ref={(ref) => (formRefs.current.addressInputRef = ref)}
            />
            <Grid item xs={12}>
              <TextField
                id="bill_no"
                label="Bill Number"
                fullWidth
                value={billNo}
                onChange={billValueChangeHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="ref_no"
                label="Reference Number"
                fullWidth
                autoComplete="ref_no"
                value={refNo}
                onChange={refValueChangeHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="staff_name"
                label="Field Staff Name"
                fullWidth
                autoComplete="staff_name"
                value={fieldStaffName}
                onChange={staffNameValueChangeHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="outlined-multiline-static"
                label="Dependents"
                fullWidth
                multiline
                rows={4}
                value={dependants}
                onChange={dependantsValueChangeHandler}
              />
            </Grid>
            {org === COLLECTIONS.MANUSHI && (
              <Grid item xs={12}>
                <FormControl component="fieldset">
                  <FormLabel id="employee-radio-group">
                    Associated with {COLLECTIONS.MAITHRI} member?
                  </FormLabel>
                  <RadioGroup
                    aria-label="employee"
                    value={isAssociatedUser ? true : false}
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
              </Grid>
            )}
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <FormLabel id="employee-radio-group">
                  Is user employed?
                </FormLabel>
                <RadioGroup
                  aria-label="employee"
                  value={isUserEmployed}
                  onChange={handleEmployeeChange}
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
              {isUserEmployed && (
                <>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <TextField
                        id="companyName"
                        label="Company Name"
                        value={companyName}
                        fullWidth
                        onChange={companyNameValueChangeHandler}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        id="occupation"
                        label="Occupation"
                        value={occupation}
                        fullWidth
                        onChange={occupationValueChangeHandler}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        id="yearsOfExp"
                        label="Years of Experience"
                        value={yearsOfExp}
                        fullWidth
                        onChange={yearsOfExpValueChangeHandler}
                      />
                    </Grid>
                  </Grid>
                </>
              )}
            </Grid>
          </Grid>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              type="submit"
              disabled={!formIsValid || isSubmit}
              variant="contained"
              sx={{ mt: 3, ml: 1 }}
            >
              Submit
            </Button>
          </Box>
        </form>
        { loading &&(
              <CircularProgress
                size={100}
                sx={{
                  color: green[500],
                  margin:"auto",
                  left:0,
                  right:0,
                  top:0,
                  bottom:0,
                  position:"fixed"
                }}
              />
            )}
      </Paper>
    </Container>
  );
}
