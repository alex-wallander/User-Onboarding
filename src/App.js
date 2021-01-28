import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import Form from './components/Form';
import * as yup from 'yup';
import axios from 'axios';
import schema from './validation/formSchema';

const initialValues = {
  username: '',
  email: '',
  password: '',
  terms: false,
}

const initialValueErrors = {
  username: '',
  email: '',
  password: '',
}

const initialUser = [];
const initialDisabled = true;

function App() {

  const [user, setUser] = useState(initialUser);
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState(initialValueErrors);
  const [disabled, setDisabled] = useState(initialDisabled);


  const postNewUser = (newUser) => {
    axios
    .post('https://reqres.in/api/users', newUser)
    .then(res => {
      setUser([...user, res.data]);
      setFormValues(initialValues);
    })
    .catch(err => {
      console.log(err);
    })
  }

  const inputChange = (name, value) => {
    yup
    .reach(schema, name)
    .validate(value)
    .then(() => {
      setFormErrors({
        ...formErrors, [name]: '',
      })
    })
    .catch(err => {
      setFormErrors({
        ...formErrors, [name]: err.errors[0],
      })
    })
    setFormValues({
      ...formValues,
      [name]: value
    })
  }

  const formSubmit = () => {
    const newUser = {
      name: formValues.name.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
      terms: ['terms'].filter(
        term => formValues[term]
      )
    }
    postNewUser(newUser);
  }
  useEffect(() => {
    schema.isValid(formValues).then(valid => {
      setDisabled(!valid);
    });
  }, [formValues])

  return (
    <div className="App">
      <header>
        <h1>Create New User!</h1>
      </header>
      <Form 
      values={formValues}
      change={inputChange}
      submit={formSubmit}
      disabled={disabled}
      errors={formErrors}
      />
      <div>
      {
      user.map(use => {
        return (
          <div>
          <h2>{use.name}</h2>
          <h3>{use.email}</h3>
          <h4>{use.password}</h4>
          <p>{use.terms}</p>
          </div>
        ); 
      })  
    }
      </div>
    </div>
  );
}

export default App;
