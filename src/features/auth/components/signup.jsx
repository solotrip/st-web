import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Button, TextInput } from 'components'
import { MdChevronRight } from 'react-icons/md'
import styles from './common-styles.module.scss'
import cn from 'classnames'
import { ReactComponent as GoogleIcon } from '../../../assets/images/google.svg'
import { ReactComponent as AppleIcon } from '../../../assets/images/apple.svg'
import { Capacitor } from '@capacitor/core'
import Joi from 'joi'
import _get from 'lodash/get'
import { joiResolver } from '@hookform/resolvers/joi'

const schema = Joi.object({
  body: Joi.object({
    username: Joi.string().min(3).max(32).required().messages({
      'string.min': 'Username should be longer than 3 characters',
      'string.max': 'Username should be shorter than 32 character',
      'any.required': 'You should fill the username field'
    }),
    email: Joi.string().email({ tlds: { allow: false } })
      .trim().lowercase().required().messages({
        'string.email': 'This is not a valid email',
        'any.required': 'You should fill the password field'
      }),
    password: Joi.string().min(6).max(32).required().messages({
      'string.min': 'Password should be longer than 6 characters',
      'string.max': 'Password should be shorter than 32 character',
      'string.empty': 'You should fill the password field',
      'any.required': 'You should fill the password field'
    })
  }).required()
})

const SignupPage = ({
  registerFunc,
  error,
  loginWithApple,
  loginWithGoogle
}) => {
  const onSubmit = ({ body }) => {
    const { email, password, username } = body
    registerFunc({
      email,
      password,
      username,
      name: username
    })
  }
  const { register, handleSubmit, formState: { errors }, setError } = useForm({
    resolver: joiResolver(schema)
  })

  useEffect(() => {
    _get(error, 'details', []).forEach(e => {
      if (_get(e, 'context.key')) {
        setError(_get(e, 'context.key'),
          { type: 'manual', message: e.message })
      }
    })

  }, [error, setError])


  return (
    <div className={styles.main}>
      <div className={styles.content}>
        <h1 className={styles.heading}>Create new account</h1>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <TextInput
            placeholder="Username"
            name="body.username"
            {...register('body.username', {
              required: true
            })}
            error={_get(errors, 'body.username.message')}
            filled
          />
          <TextInput
            placeholder="Email"
            name="body.email"
            {...register('body.email', {
              required: true
            })}
            error={_get(errors, 'body.email.message')}
            filled
          />
          <TextInput
            placeholder="Password"
            name="body.password"
            type="password"
            {...register('body.password', {
              required: true
            })}
            error={_get(errors, 'body.password.message')}
            filled
          />
          <span className={styles.terms}>
            By clicking Sign Up or signing up with a social account,
            you agree to our
            <a target="_blank" href="/#"> Terms of Service </a>
            and that you have read our
            <a target="_blank" href="/#"> Data Use Policy </a>
            including our
            <a target="_blank" href="/#"> Cookie Use</a>.
          </span>
          <Button
            text="Sign Up"
            icon={MdChevronRight}
          />
          <Link to="login" className={styles.link}>
            Already have an account? <span>Login</span>
          </Link>
        </form>
        <div className={styles.socialButtons}>
          <button
            className={cn(styles.socialLogin, styles.loginWithGoogle)}
            onClick={loginWithGoogle}
          >
            <GoogleIcon/>
            <span>Sign up with Google</span>
          </button>
          {Capacitor.getPlatform() !== 'android' && (
            <button
              className={cn(styles.socialLogin, styles.loginWithApple)}
              onClick={loginWithApple}
            >
              <AppleIcon/>
              <span>Sign up with Apple</span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default SignupPage
