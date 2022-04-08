import { initializeApp } from 'firebase/app';
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

import './App.css';
import app from './firebase.init';
import { Form } from 'react-bootstrap';
import { useState } from 'react';


const auth = getAuth(app)
function App() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');



  const handleEmailBlur = (e) => {

    setEmail(e.target.value)

  }

  const handlePasswordBlur = (e) => {

    setPassword(e.target.value)
  }

  const handleOnSubmit = (event) => {

    createUserWithEmailAndPassword(auth, email, password)
      .then(result => {
        const user = result.user
        console.log(user)
      })

      .catch(error => {
        console.error(error)
      })

    console.log(email, password, 'form submitted');
    event.preventDefault();

  }


  return (
    <div className="App">
      <div className='registration m-auto w-50'>
        <Form onSubmit={handleOnSubmit} >
          <h2 className='text-primary'>Please Register</h2>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control onBlur={handleEmailBlur} type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onBlur={handlePasswordBlur} type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="danger" type="submit">
            Submit
          </Button>
        </Form>
      </div>


    </div>
  );
}

export default App;
