import { initializeApp } from 'firebase/app';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

import './App.css';
import app from './firebase.init';
import { Form } from 'react-bootstrap';
import { useState } from 'react';


const auth = getAuth(app)
function App() {
  const [validated, setValidated] = useState(false);
  const [registered, setRegistered] = useState(false)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('')
  const [name, setName] = useState('')




  const handleEmailBlur = (e) => {

    setEmail(e.target.value)

  }

  const handlePasswordBlur = (e) => {

    setPassword(e.target.value)
  }

  const handleRegistered = event => {

    setRegistered(event.target.checked)
  }




  const handleOnSubmit = (event) => {

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (!/(?=.*?[#?!@$%^&*-])/.test(password)) {
      setError('Password should contain at least one special charecter')
      return

    }

    setValidated(true);
    setError('')

    if (registered) {

      signInWithEmailAndPassword(auth, email, password)
        .then(result => {
          const user = result.user
          console.log(user)
        })
        .catch(error => {
          console.error(error)
          setError(error.message)
        })

    }

    else {
      createUserWithEmailAndPassword(auth, email, password)
        .then(result => {
          const user = result.user
          console.log(user)
          setEmail('')
          setPassword('')
          verifyEmail()

          setuserName()
        })

        .catch(error => {
          console.error(error)
          setError(error.message)
        })

    }

    console.log(email, password, 'form submitted');
    event.preventDefault();

  }


  const setuserName = () => {

    updateProfile(auth.currentUser, {
      displayName: name
    })
      .then(() => {
        console.log('updating name')

      })

      .catch(error => {
        setError(error.message)
      })
  }


  const verifyEmail = () => {

    sendEmailVerification(auth.currentUser)
      .then(() => {
        console.log('a verification sms has been sent to your mobile')
      })
  }


  const resetPassword = () => {

    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log('password reset email sent')
      })
  }


  const handleName = (event) => {

    setName(event.target.value)


  }


  return (
    <div className="App">
      <div className='registration m-auto w-50'>

        <Form noValidate validated={validated} onSubmit={handleOnSubmit} >
          <h2 className='text-primary'>{registered ? 'Login' : 'Please Registered'}</h2>

          {!registered && <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control onBlur={handleName} type="text" placeholder="type your name" />

            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>

            <Form.Control.Feedback type="invalid">
              Please provide a valid city.
            </Form.Control.Feedback>
          </Form.Group>}


          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control onBlur={handleEmailBlur} type="email" placeholder="Enter email" required />

            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>

            <Form.Control.Feedback type="invalid">
              Please provide a valid city.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onBlur={handlePasswordBlur} type="password" placeholder="Password" required />
            <Form.Control.Feedback type="invalid">
              Please provide password.
            </Form.Control.Feedback>

          </Form.Group>

          <p className='text-danger'> {error} </p>

          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check onChange={handleRegistered} type="checkbox" label="Check me registered" />
          </Form.Group>
          <Button onClick={resetPassword} variant='link'> Forget Password</Button> <br />
          <Button variant="danger" type="submit">
            Submit
          </Button>
        </Form>
      </div>


    </div>
  );
}

export default App;
