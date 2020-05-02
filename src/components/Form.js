import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import axios from 'axios';

const Form = () => {
  const [post, setPost] = useState([]);

  const [formState, setFormState] = useState({
    name: '',
    size: 'XL',
    pepperoni: false,
    mushrooms: false,
    blackOlives: false,
    jalapenos: false,
    instructions: ''
  });

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const [errors, setErrors] = useState({
    name: '',
    size: 'XL',
    pepperoni: false,
    mushrooms: false,
    blackOlives: false,
    jalapenos: false,
    instructions: ''
  });

  const formSchema = yup.object().shape({
    name: yup.string().min(2).required('Please enter your name'),
    size: yup.string(),
    pepperoni: yup.boolean(),
    mushrooms: yup.boolean(),
    blackOlives: yup.boolean(),
    jalapenos: yup.boolean(),
    instructions: yup.string()
  });

  const validateChange = (e) => {
    yup
      .reach(formSchema, e.target.name)
      .validate(e.target.value)
      .then(valid => {
        setErrors({ ...errors, [e.target.name]: '' });
      })
      .catch(err => setErrors({ ...errors, [e.target.name]: err.errors[0] }));
  }

  useEffect(() => {
    formSchema.isValid(formState).then(valid => {
      setIsButtonDisabled(!valid);
    });
  }, [formState]);

  const formSubmit = (e) => {
    e.preventDefault();
    axios
      .post('https://reqres.in/api/users', formState)
      .then(response => {
        console.log(response.data);
        setPost(response.data);
        setFormState({
          name: '',
          size: 'XL',
          pepperoni: false,
          mushrooms: false,
          blackOlives: false,
          jalapenos: false,
          instructions: ''
        });
      })
      .catch(err => console.log(err.response));
  }

  const inputChange = (e) => {
    e.persist();
    const newFormData = {
      ...formState,
      [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value
    };
    validateChange(e);
    setFormState(newFormData);
  }

  return (
    <>
      <h2>Build Your Own Pizza</h2>
      <form onSubmit={formSubmit}>
        <label htmlFor="name">
          Name
          <input
            type="text"
            id="name"
            name="name"
            onChange={inputChange}
            value={formState.name}
          />
          <div>
          {errors.name.length > 0 ? <p>{errors.name}</p> : null}
          </div>
        </label>
        <label htmlFor="size">
          Choice of Size
          <select id="size" name="size" onChange={inputChange} value={formState.size}>
            <option value="XL">XL</option>
            <option value="L">L</option>
            <option value="M">M</option>
            <option value="S">S</option>
          </select>
        </label>
        <label htmlFor="toppings">
          Add Toppings
          <label htmlFor="pepperoni">
          <input
            type="checkbox"
            id="pepperoni"
            name="pepperoni"
            checked={formState.pepperoni}
            onChange={inputChange}
          />
          Pepperoni            
          </label>
          <label htmlFor="mushrooms">
          <input
            type="checkbox"
            id="mushrooms"
            name="mushrooms"
            checked={formState.mushrooms}
            onChange={inputChange}
          />
          Mushrooms            
          </label>
          <label htmlFor="blackOlives">
          <input
            type="checkbox"
            id="blackOlives"
            name="blackOlives"
            checked={formState.blackOlives}
            onChange={inputChange}
          />
          Black Olives            
          </label>
          <label htmlFor="jalapenos">
          <input
            type="checkbox"
            id="jalapenos"
            name="jalapenos"
            checked={formState.jalapenos}
            onChange={inputChange}
          />
          Jalapenos            
          </label>
        </label>
        <label htmlFor="instructions">
          Special Instructions
          <textarea
            id="instructions"
            name="instructions"
            onChange={inputChange}
            value={formState.instructions}
          />
        </label>
        <button type="submit" disabled={isButtonDisabled}>Add to Order</button>
      </form>
    </>
    
  );
}

export default Form;