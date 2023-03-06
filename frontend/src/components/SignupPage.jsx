/* eslint-disable react/jsx-props-no-spreading */
import { useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import * as yup from 'yup';

import useHook from '../hooks/index.js';
import img from '../assets/SignupPage.png';

const { useAuth } = useHook;

const SignupPage = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: yup.object().shape({
      username: yup.string().min(3).max(20).required(),
      password: yup.string().min(6).required(),
      confirmPassword: yup.string().oneOf([yup.ref('password')]),
    }),
    onSubmit: async (values) => {
      try {
        const { data } = await axios.post(
          '/api/v1/signup',
          { username: values.username, password: values.password },
        );
        auth.logIn(data);
        navigate('/');
      } catch (error) {
        console.error(error.message);
      }
    },
  });
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>
                <img
                  src={img}
                  alt="Registration"
                />
              </div>
              <Form onSubmit={formik.handleSubmit} className="w-50">
                <h1 className="text-center mb-4">Регистрация</h1>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    placeholder="Имя пользователя"
                    name="username"
                    id="username"
                    autoComplete="new-username"
                    required
                    ref={inputRef}
                  />
                  <Form.Label htmlFor="username">Имя пользователя</Form.Label>
                </Form.Group>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    placeholder="Пароль"
                    name="password"
                    autoComplete="new-password"
                    required
                  />
                  <Form.Label htmlFor="password">Пароль</Form.Label>
                </Form.Group>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.confirmPassword}
                    placeholder="Подтвердите пароль"
                    name="confirmPassword"
                    autoComplete="new-password"
                    required
                  />
                  <Form.Label htmlFor="confirmPassword">Подтвердите пароль</Form.Label>
                </Form.Group>
                <Button type="submit" variant="outline-primary" className="w-100">Зарегистрироваться</Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
