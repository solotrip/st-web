import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import cn from 'classnames'
import { Button, Checkbox, TextInput } from 'components'
import { MdChevronRight } from 'react-icons/md'
import styles from './common-styles.module.scss'
import { ReactComponent as GoogleIcon } from 'assets/images/google.svg'
import { ReactComponent as AppleIcon } from 'assets/images/apple.svg'
import { Capacitor } from '@capacitor/core'

const LoginPage = ({ loginFunc, error, loginWithApple, loginWithGoogle }) => {
  const onLogin = ({ email, password }) => {
    loginFunc({ email, password })
  }
  const { register, handleSubmit } = useForm()

  const [value, setValue] = useState(false)

  return (
    <div className={styles.main}>
      <div className={styles.content}>
        <h1 className={styles.heading}>Login</h1>
        <form onSubmit={handleSubmit(onLogin)} className={styles.form}>
          <TextInput
            placeholder="Email"
            name="email"
            {...register('email', {
              required: true
            })}
            filled
          />
          <TextInput
            placeholder="Password"
            name="password"
            type="password"
            {...register('password', {
              required: true
            })}
            filled
          />

          <span>{error}</span>
          <div className={styles.checkBox}>
            <Checkbox
              name="Remember me"
              checked={value || false}
              onClick={() => {
                setValue(!value)
              }}
            />
          </div>
          <Button text="Login" icon={MdChevronRight} />
          <Link to="signup" className={styles.link}>
            New to Solotrip? <span>Join now!</span>
          </Link>
        </form>
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
      </div>
    </div>
  )
}

export default LoginPage
