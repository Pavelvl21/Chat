/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Formik, Form as FormikForm, useField } from 'formik';
// import * as Yup from 'yup';

import useHook from '../hooks/index.js';
import img from '../assets/SignupPage.png';

const { useAuth } = useHook;

// import axios from 'axios';
// import React, { useEffect, useRef } from 'react';
// import { useFormik } from 'formik';
// import { Button, Form } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
// import * as yup from 'yup';
// import useHook from '../hooks/index.js';

// const { useAuth } = useHook;
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

const SignupPage = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const [authFailed, setAuthFailed] = useState('');
  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
        confirmPassword: '',
      }}
      // validationSchema={Yup.object().shape({
      //   username: Yup.string().trim().matches(/^[a-z0-9_-]{3,16}$/).required('Required filed'),
      //   password: Yup.string().trim().required('Required filed'),
      // })}
      onSubmit={async (values) => {
        setAuthFailed('');
        try {
          const { data } = await axios.post(
            '/api/v1/signup',
            { username: values.username, password: values.password },
          );
          auth.logIn(data);
          navigate('/');
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
              <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
                <div>
                  <img
                    src={img}
                    alt="Registration"
                  />
                </div>
                <FormikForm className="col-12 col-md-6 mt-3 mt-mb-0">
                  <h1 className="text-center mb-4">Войти</h1>
                  <div className="form-floating mb-3">
                    <TextInput
                      label="Имя пользователя"
                      name="username"
                      type="text"
                      placeholder="Имя пользователя"
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
                  </div>
                  <div className="form-floating mb-3">
                    <TextInput
                      label="Подтвердите пароль"
                      name="confirmPassword"
                      type="password"
                      placeholder="Подтвердите пароль"
                      validationClass={authFailed}
                    />
                  </div>
                  <button type="submit" className="btn btn-outline-primary w-100 mt-2 mb-3">Зарегистрироваться</button>
                </FormikForm>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Formik>
  );
};

export default SignupPage;
