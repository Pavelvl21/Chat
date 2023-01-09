/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import logo from '../assets/LoginPage.png';

import useAuth from '../hooks/index.js';

const TextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="form-floating mb-3">
      <input className="form-control" {...field} {...props} />
      <label htmlFor={props.id || props.name}>{label}</label>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

const LoginPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const auth = useAuth();
  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      validationSchema={Yup.object().shape({
        username: Yup.string().trim().matches(/^[a-z0-9_-]{3,16}$/).required('Required filed'),
        password: Yup.string().trim().required('Required filed'),
      })}
      onSubmit={async (values) => {
        const response = await axios.post('/api/v1/login', values);
        auth.logIn(response.data);
        const { from } = location.state || { from: { pathname: '/' } };
        navigate(from);
        return response;
      }}
    >
      <div className="container-fluid h-100">
        <div className="row justify-content-center align-content-center h-100">
          <div className="col-12 col-md-8 col-xxl-6">
            <div className="card shadow-sm">
              <div className="card-body row p-5">
                <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                  <img src={logo} alt="img" height="200" />
                </div>
                <Form className="col-12 col-md-6 mt-3 mt-mb-0">
                  <h1 className="text-center mb-4">Войти</h1>
                  <TextInput
                    label="Ваш ник"
                    name="username"
                    type="text"
                    placeholder="Ваш ник"
                  />
                  <TextInput
                    label="Пароль"
                    name="password"
                    type="password"
                    placeholder="Пароль"
                  />
                  <button type="submit" className="btn btn-outline-primary w-100 mt-2 mb-3">Войти</button>
                </Form>
              </div>
              <div className="card-footer p-4">
                <div className="text-center">
                  <span>Нет аккаунта?</span>
                  {' '}
                  <Link to="/login">Регистрация</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Formik>
  );
};

export default LoginPage;
