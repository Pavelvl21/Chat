/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Formik, Form as FormikForm, useField } from 'formik';
// import * as Yup from 'yup';
import logo from '../assets/LoginPage.png';

import useAuth from '../hooks/index.js';

const TextInput = ({ label, validationClass, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <input className={`form-control ${validationClass}`} required {...field} {...props} />
      <label htmlFor={props.id || props.name}>{label}</label>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

const LoginPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const auth = useAuth();
  const [authFailed, setAuthFailed] = useState('');
  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      // validationSchema={Yup.object().shape({
      //   username: Yup.string().trim().matches(/^[a-z0-9_-]{3,16}$/).required('Required filed'),
      //   password: Yup.string().trim().required('Required filed'),
      // })}
      onSubmit={async (values) => {
        setAuthFailed('');
        try {
          const response = await axios.post('/api/v1/login', values);
          auth.logIn(response.data);
          const { from } = location.state || { from: { pathname: '/' } };
          navigate(from);
        } catch (error) {
          setAuthFailed('is-invalid');
          console.error(error.message);
        }
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
                <FormikForm className="col-12 col-md-6 mt-3 mt-mb-0">
                  <h1 className="text-center mb-4">Войти</h1>
                  <div className="form-floating mb-3">
                    <TextInput
                      label="Ваш ник"
                      name="username"
                      type="text"
                      placeholder="Ваш ник"
                      validationClass={authFailed}
                    />
                  </div>
                  <div className="form-floating mb-3">
                    <TextInput
                      label="Пароль"
                      name="password"
                      type="password"
                      placeholder="Пароль"
                      validationClass={authFailed}
                    />
                    <div className="invalid-tooltip">Неверные имя пользователя или пароль</div>
                  </div>
                  <button type="submit" className="btn btn-outline-primary w-100 mt-2 mb-3">Войти</button>
                </FormikForm>
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
