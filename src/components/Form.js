import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import axios from 'axios';
import styled from 'styled-components';

const H2 = styled.h2`
  text-align: center;
`;

const FORM = styled.form`
  display: flex;
  flex-direction: column;
  border: 1px solid gray;
  border-radius: 8px;
  width: 350px;
  margin: auto;
  padding: 25px;
  background-color: #f8f8f8;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 10px 0;
  font-size: 16px;
`;

const Input = styled.input`
  margin-top: 10px;
`;

const Select = styled.select`
  margin-top: 10px;
`;

const Textarea = styled.textarea`
  margin-top: 10px;
`;

const Button = styled.button`
  width: 150px;
  display: inline-block;
  padding: 8px 11px;
  font-size: 16px;
  border: 0;
  border-radius: 5px;
  background-color: blue;
  color: white;
  cursor: pointer;
`;

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
      <H2>Build Your Own Pizza</H2>
      <FORM onSubmit={formSubmit}>
        <Label htmlFor="name">
          Name
          <Input
            type="text"
            id="name"
            name="name"
            onChange={inputChange}
            value={formState.name}
          />
          <div>
          {errors.name.length > 0 ? <p>{errors.name}</p> : null}
          </div>
        </Label>
        <Label htmlFor="size">
          Choice of Size
          <Select id="size" name="size" onChange={inputChange} value={formState.size}>
            <option value="XL">XL</option>
            <option value="L">L</option>
            <option value="M">M</option>
            <option value="S">S</option>
          </Select>
        </Label>
        <Label htmlFor="toppings">
          Add Toppings
          <label htmlFor="pepperoni">
          <Input
            type="checkbox"
            id="pepperoni"
            name="pepperoni"
            checked={formState.pepperoni}
            onChange={inputChange}
          />
          Pepperoni            
          </label>
          <label htmlFor="mushrooms">
          <Input
            type="checkbox"
            id="mushrooms"
            name="mushrooms"
            checked={formState.mushrooms}
            onChange={inputChange}
          />
          Mushrooms            
          </label>
          <label htmlFor="blackOlives">
          <Input
            type="checkbox"
            id="blackOlives"
            name="blackOlives"
            checked={formState.blackOlives}
            onChange={inputChange}
          />
          Black Olives            
          </label>
          <label htmlFor="jalapenos">
          <Input
            type="checkbox"
            id="jalapenos"
            name="jalapenos"
            checked={formState.jalapenos}
            onChange={inputChange}
          />
          Jalapenos            
          </label>
        </Label>
        <Label htmlFor="instructions">
          Special Instructions
          <Textarea
            id="instructions"
            name="instructions"
            onChange={inputChange}
            value={formState.instructions}
          />
        </Label>
        <Button type="submit" disabled={isButtonDisabled}>Add to Order</Button>
      </FORM>
    </>
  );
}

export default Form;