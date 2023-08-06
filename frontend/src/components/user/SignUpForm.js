import React, { useState } from 'react';

const SignUpForm = ({ navigate }) => {
  const [firstName, setFirstName] = useState("")
  const [surname, setSurname] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    fetch( '/users', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName: firstName, surname: surname, email: email, password: password })
    })
      .then(response => {
        if(response.status === 201) {
          navigate('/login')
        } else {
          navigate('/signup')
        }
      })
  }

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value)
  }

  const handleSurnameChange = (event) => {
    setSurname(event.target.value)
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }


    return (
      <div>
        <h1 id="Sign up">Sign up</h1>
        <form onSubmit={handleSubmit}>
            <input placeholder="First name" id="firstName" type='text' value={ firstName } minlength="2" onChange={handleFirstNameChange} required />
            <input placeholder="Surname" id="surname" type='text' value={ surname } minlength="2" onChange={handleSurnameChange} required />
            <input placeholder="Email" id="email" type='text' pattern='^.*@.*\.(com|co\.uk)$' title="Please enter a valid email address" value={ email } minlength="3" onChange={handleEmailChange} required />
            <input placeholder="Password" id="password" type='password' value={ password } minlength="5" onChange={handlePasswordChange} required />
          <input id='submit' type="submit" value="Submit" />
        </form>
      </div>
    );
}

export default SignUpForm;
