/* eslint-disable react/jsx-props-no-spreading */
import { useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import useHook from '../hooks/index.js';
import img from '../assets/SignupPage.png';

const { useAuth } = useHook;

const SignupPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const auth = useAuth();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: yup.object().shape({
      username: yup
        .string()
        .min(3, 'signup.lengthLimit')
        .max(20, 'signup.lengthLimit')
        .required('signup.required'),
      password: yup
        .string()
        .min(6, 'signup.passLengthLimit')
        .required('signup.required'),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], t('signup.matches')),
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
                  alt={t('signup.header')}
                />
              </div>
              <Form onSubmit={formik.handleSubmit} className="w-50">
                <h1 className="text-center mb-4">{t('signup.header')}</h1>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    placeholder={t('signup.lengthLimit')}
                    name="username"
                    id="username"
                    autoComplete="new-username"
                    required
                    ref={inputRef}
                  />
                  <Form.Label htmlFor="username">{t('signup.username')}</Form.Label>
                </Form.Group>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    placeholder={t('signup.passLengthLimit')}
                    name="password"
                    autoComplete="new-password"
                    required
                  />
                  <Form.Label htmlFor="password">{t('signup.password')}</Form.Label>
                </Form.Group>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.confirmPassword}
                    placeholder={t('signup.matches')}
                    name="confirmPassword"
                    autoComplete="new-password"
                    required
                  />
                  <Form.Label htmlFor="confirmPassword">{t('signup.confirm')}</Form.Label>
                </Form.Group>
                <Button type="submit" variant="outline-primary" className="w-100">{t('signup.submit')}</Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
