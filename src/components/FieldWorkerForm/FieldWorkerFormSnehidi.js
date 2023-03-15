import * as React from "react";
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
import CircularProgress from "@mui/material/CircularProgress";
import { green } from "@mui/material/colors";

import useInput from "../../hooks/useInput";
import { AddressInput } from "..";
import { retrieveOrgDataUsingMemberId, updateDocument } from "../../firebase";
import { COLLECTIONS } from "../../constants/constants";
import { getNextMemberId } from "../../firebase";
import { useAuth } from "../../hooks";
import { setOpenEditUserDialog } from "../../redux/slices/openEditUserDialogSlice";
import { isNotEmpty } from "../../utils";

export function FieldWorkerFormSnehidi(props) {
  const org = props.org;
  const [loading, setLoading] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [memberData, setMemberData] = useState({});
  const [docID, setDocID] = useState(null);
  const [isMember, setIsMember] = useState(!!props?.memberID);
  const [memberID, setMemberID] = useState(props.memberID);

  const { currentUser } = useAuth();

  const dispatch = useDispatch();

  const [isAssociatedUser, setIsAssociatedUser] = useState(false);

  const handleMemberChange = (event) => {
    handleReset();
    if (event.target.value === "true") {
      setMemberID("");
    } else {
      setMemberID(JSON.parse(sessionStorage.getItem("memberId")));
    }
    setIsMember(event.target.value === "true");
  };

  const memberIDChangeHandler = async (event) => {
    setMemberID(event.target.value);
  };
  const handleUserAssociatedChange = (event) =>
    setIsAssociatedUser(event.target.value === "true");

  const handleReset = () => {
    setMemberID("");
    setMemberData({});
    resetFirstNameInput();
    resetLastNameInput();
    resetDobInput();
    resetInsitutionInput();
    resetCourseInput();
    resetBillNoInput();
    resetRefNoInput();
    resetStaffNameInput();
    resetAadharInput();
    resetRenewalDateInput();
    formRefs.current.addressInputRef.handleReset();
    setIsAssociatedUser(false);
    if (!isMember) {
      setMemberID(JSON.parse(sessionStorage.getItem("memberId")));
    }
  };

  const formRefs = useRef({
    addressInputRef: null,
  });
  const {
    value: firstName,
    isValid: firstNameIsValid,
    hasError: firstNameInputHasError,
    valueChangeHandler: firstNameChangedHandler,
    inputBlurHandler: firstNameBlurHandler,
    reset: resetFirstNameInput,
  } = useInput(isNotEmpty, memberData?.firstName);

  const {
    value: lastName,
    isValid: lastNameIsValid,
    hasError: lastNameInputHasError,
    valueChangeHandler: lastNameChangedHandler,
    inputBlurHandler: lastNameBlurHandler,
    reset: resetLastNameInput,
  } = useInput(isNotEmpty, memberData?.lastName);

  const {
    value: dob,
    hasError: dobInputHasError,
    valueChangeHandler: dobChangedHandler,
    reset: resetDobInput,
  } = useInput(() => {}, memberData?.dob);

  let date = new Date();
  date.setFullYear(date.getFullYear() + 1);
  date = date.toISOString().slice(0, 10);
  const {
    value: renewalDate,
    hasError: renewalDateHasError,
    valueChangeHandler: renewalDateChangedHandler,
    reset: resetRenewalDateInput,
  } = useInput(() => {}, memberData?.renewalDate || (!isMember && date));

  const {
    value: aadhar,
    valueChangeHandler: aadharChangeHandler,
    reset: resetAadharInput,
  } = useInput(() => {}, memberData?.aadhar);

  const {
    value: institutionName,
    valueChangeHandler: institutionValueChangeHandler,
    reset: resetInsitutionInput,
  } = useInput(() => {}, memberData?.institutionName);

  const {
    value: courseName,
    valueChangeHandler: courseChangeHandler,
    reset: resetCourseInput,
  } = useInput(() => {}, memberData?.courseName);

  const {
    value: billNo,
    valueChangeHandler: billChangeHandler,
    reset: resetBillNoInput,
  } = useInput(() => {}, memberData?.billNo);

  const {
    value: refNo,
    valueChangeHandler: refChangeHandler,
    reset: resetRefNoInput,
  } = useInput(() => {}, memberData?.refNo);
  const {
    value: fieldStaffName,
    valueChangeHandler: staffNameChangeHandler,
    reset: resetStaffNameInput,
  } = useInput(() => {}, memberData?.fieldStaffName);

  let formIsValid = false;

  if (
    firstNameIsValid &&
    lastNameIsValid &&
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
    setLoading(true);

    const address = formRefs.current.addressInputRef.getAddress();
    const memberDetails = {
      memberID: memberID,
      firstName,
      lastName,
      dob,
      address: { ...address },
      institutionName,
      courseName,
      billNo,
      refNo,
      fieldStaffName,
      isAssociatedUser,
      aadhar,
      renewalDate,
      approved: false,
    };
    try {
      if (!isMember) {
        await props.saveData(org, memberDetails);
      } else {
        await updateDocument(org, docID, memberDetails);
        props.showSnackBar("success", "Form updated successfully!");
      }
    } catch (e) {
      console.error("Error adding document: ", e);
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
          retrieveOrgDataUsingMemberId(COLLECTIONS.SNEHIDHI, memberID).then(
            (response) => {
              if (!response) {
                props.showSnackBar("error", "No member dound!");
              }
              formRefs.current.addressInputRef.setAddress(response?.address);
              setDocID(response?.id);
              setIsAssociatedUser(response?.isAssociatedUser);
              setMemberData(response);
              setLoading(false);
            }
          );
        } catch (error) {
          props.showSnackBar("error", "No member dound!");
        }
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [memberID, isMember]);

  return (
    <Container
      component="main"
      maxWidth="md"
      sx={{ width: "100%" }}
      style={{ opacity: loading && `0.7` }}
    >
      <Paper sx={{ my: { xs: 3, md: 3 }, p: { xs: 2, md: 3 } }}>
        <Typography component="h4" variant="h4" align="center">
          {props.org.toUpperCase()}
        </Typography>
        <form onSubmit={formSubmissionHandler}>
          <Grid container spacing={3}>
            {props.showHeader ? (
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
            ) : (
              <Box sx={{ m: 2 }} />
            )}
            <Grid item xs={12} container spacing={3}>
              <Grid item xs={6}>
                <TextField
                  required
                  id="memberID"
                  label=""
                  fullWidth
                  disabled={!isMember}
                  error={!isNotEmpty}
                  helperText={!isNotEmpty && "This field cannot be empty"}
                  onChange={memberIDChangeHandler}
                  value={memberID}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  type="date"
                  id="date"
                  label="Next Date of Renewal"
                  onChange={renewalDateChangedHandler}
                  inputProps={{
                    min: new Date().toISOString().slice(0, 10),
                  }}
                  value={renewalDate}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>
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
                error={lastNameInputHasError}
                helperText={
                  lastNameInputHasError && "This field cannot be empty"
                }
                onChange={lastNameChangedHandler}
                onBlur={lastNameBlurHandler}
                value={lastName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="date"
                label="Date Of Birth"
                onChange={dobChangedHandler}
                value={dob}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <AddressInput
              ref={(ref) => (formRefs.current.addressInputRef = ref)}
            />
            <Grid item xs={12}>
              <TextField
                id="institution"
                label="Institution Name"
                value={institutionName}
                fullWidth
                onChange={institutionValueChangeHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="course"
                label="Course Name"
                fullWidth
                value={courseName}
                onChange={courseChangeHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="bill_no"
                label="Bill Number"
                fullWidth
                value={billNo}
                onChange={billChangeHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="ref_no"
                label="Reference Number"
                fullWidth
                autoComplete="ref_no"
                value={refNo}
                onChange={refChangeHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="staff_name"
                label="Field Staff Name"
                fullWidth
                autoComplete="staff_name"
                value={fieldStaffName}
                onChange={staffNameChangeHandler}
              />
            </Grid>
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
              {isAssociatedUser && (
                <>
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
                      onChange={aadharChangeHandler}
                    />
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
        {loading && (
          <CircularProgress
            size={100}
            sx={{
              color: green[500],
              margin: "auto",
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              position: "fixed",
            }}
          />
        )}
      </Paper>
    </Container>
  );
}
