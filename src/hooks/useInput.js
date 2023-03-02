import { useState, useEffect } from "react";

const useInput = (validateValue, data) => {
  const [enteredValue, setEnteredValue] = useState(data ?? "");

  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validateValue(enteredValue);
  const hasError = !valueIsValid && isTouched;

  useEffect(() => {
    setEnteredValue(data ?? "");
  }, [data]);


  const setValue = (value) => {
    setEnteredValue(value);
  };
  const valueChangeHandler = (event) => {
    setEnteredValue(event.target?.value);
    if (!event.target) {
      setEnteredValue(event.toDate().toLocaleDateString("en-GB"));
    }
  };

  const inputBlurHandler = (event) => {
    setIsTouched(true);
  };

  const reset = () => {
    setEnteredValue("");
    setIsTouched(false);
  };

  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
    setValue,
  };
};

export default useInput;
