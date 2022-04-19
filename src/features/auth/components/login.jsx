import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import cn from 'classnames'
import { Button, TextInput } from 'components'
import { MdChevronRight } from 'react-icons/md'
import styles from './common-styles.module.scss'
import { ReactComponent as GoogleIcon } from 'assets/images/google.svg'
import { ReactComponent as AppleIcon } from 'assets/images/apple.svg'
import { Capacitor } from '@capacitor/core'
import { joiResolver } from '@hookform/resolvers/joi'
import Joi from 'joi'
import _get from 'lodash/get'

const schema = Joi.object({
  body: Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .trim()
      .lowercase()
      .required()
      .messages({
        'string.email': 'This is not a valid email',
        'any.required': 'You should fill the password field'
      }),
    password: Joi.string()
      .min(6)
      .max(32)
      .required()
      .messages({
        'string.min': 'Password should be longer than 6 characters',
        'string.max': 'Password should be shorter than 32 character',
        'string.empty': 'You should fill the password field',
        'any.required': 'You should fill the password field'
      })
  }).required()
})

const LoginPage = ({ loginFunc, error, loginWithApple, loginWithGoogle }) => {
  const onLogin = ({ body = {} }) => {
    const { email, password } = body
    loginFunc({ email, password })
  }
  const { register, handleSubmit, formState: { errors }, setError } = useForm({
    resolver: joiResolver(schema)
  })

  useEffect(
    () => {
      _get(error, 'details', []).forEach(e => {
        if (_get(e, 'context.key')) {
          setError(_get(e, 'context.key'), { type: 'manual', message: e.message })
        }
      })
    },
    [error, setError]
  )

  return (
    <div className={styles.main}>
      <div className={Capacitor.getPlatform() === 'ios' ? styles.contentIos : styles.content}>
        <h1 className={styles.heading}>Login</h1>
        <form onSubmit={handleSubmit(onLogin)} className={styles.form}>
          <TextInput
            placeholder="Email"
            name="body.email"
            {...register('body.email')}
            error={_get(errors, 'body.email.message')}
            filled
          />
          <TextInput
            placeholder="Password"
            name="password"
            type="password"
            {...register('body.password')}
            error={_get(errors, 'body.password.message')}
            filled
          />
          <Button text="Login" icon={MdChevronRight} />
        </form>
        <p className={styles.or}>Or</p>
        <div className={styles.socialButtons}>
          <button
            className={cn(styles.socialLogin, styles.loginWithGoogle)}
            onClick={loginWithGoogle}
          >
            <GoogleIcon />
            <span>Sign in with Google</span>
          </button>
          {Capacitor.getPlatform() !== 'android' && (
            <button
              className={cn(styles.socialLogin, styles.loginWithApple)}
              onClick={loginWithApple}
            >
              <AppleIcon />
              <span>Sign in with Apple</span>
            </button>
          )}
        </div>
        <span className={styles.terms}>
          By continuing, you agree to Pulfy's
          <a target="_blank" href="/#">
            {' '}
            Terms of Service,{' '}
          </a>
          <a target="_blank" href="/#">
            {' '}
            Data Use Policy{' '}
          </a>
          and
          <a target="_blank" href="/#">
            {' '}
            Cookie Use
          </a>
        </span>
        <Link to="/signup" className={styles.link}>
          New to Pulfy? <span>Join now!</span>
        </Link>

        <Link className={styles.link} to="/onboarding/1">
          or <span>Continue as Guest </span>
        </Link>
      </div>
    </div>
  )
}

export default LoginPage
