import React, { useState, useEffect, useReducer,useContext } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../context/AuthContext';

const passwordReducer = (state, action) => {
  const { value, type } = action;
  switch (type) {
    case "PASSWAORD_INPUT_ONCHANGE":
      return { value: value, isValid: value.length > 6 };
    case "PASSWAORD_INPUT_ONBLUR":
      return { value: value, isValid: value.length > 6 };
    default: return { value: '', isValid: false };

  }
}

const Login = () => {

  const context = useContext(AuthContext)
  const [enteredEmail, setEnteredEmail] = useState('');
  const [emailIsValid, setEmailIsValid] = useState();

  /*const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState();
  */
  /**useReducer example */
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, { value: '', isValid: null });

  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    setFormIsValid(
      enteredEmail.includes('@') && passwordState.value.trim().length > 6
    );
  }, [passwordState.value, enteredEmail])

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    //setEnteredPassword(event.target.value);

    dispatchPassword({type:'PASSWAORD_INPUT_ONCHANGE', value: event.target.value})
    setFormIsValid(
      event.target.value.trim().length > 6 && enteredEmail.includes('@')
    );
  };

  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes('@'));
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type:'PASSWAORD_INPUT_ONBLUR', value: passwordState.value})
  };

  const submitHandler = (event) => {
    event.preventDefault();
    context.onLogin(enteredEmail, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${emailIsValid === false ? classes.invalid : ''
            }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${passwordState.isValid === false ? classes.invalid : ''
            }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
