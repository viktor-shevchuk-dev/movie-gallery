import { useReducer } from "react";

const initialInputState = { value: "", isTouched: false };

const inputStateReducer = (prevState, action) => {
  if (action.type === "INPUT")
    return { value: action.value, isTouched: prevState.isTouched };

  if (action.type === "BLUR")
    return { isTouched: true, value: prevState.value };

  if (action.type === "RESET") return { isTouched: false, value: "" };

  return initialInputState;
};

export const useInput = (validateValue) => {
  const [inputState, dispatch] = useReducer(
    inputStateReducer,
    initialInputState
  );

  const valueIsValid = validateValue(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  const valueChangeHandler = (event) =>
    Array.isArray(event)
      ? dispatch({ type: "INPUT", value: event })
      : dispatch({ type: "INPUT", value: event.target.value });

  const inputBlurHandler = () => dispatch({ type: "BLUR" });

  const reset = () => dispatch({ type: "RESET" });

  return {
    value: inputState.value,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};
