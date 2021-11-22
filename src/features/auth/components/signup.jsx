import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Button, Checkbox, TextInput } from 'components'
import { MdChevronRight } from 'react-icons/md'
import styles from './common-styles.module.scss'

const SignupPage = ({ registerFunc, error }) => {
  const onSubmit = ({ email, password, username }) =>
    registerFunc({
      email,
      password,
      username,
      name: username
    })
  const { register, handleSubmit } = useForm()

  const [value, setValue] = useState(false)

  return (
    <div className={styles.main}>
      <div className={styles.content}>
        <h1 className={styles.heading}>Signup</h1>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <TextInput
            placeholder="Username"
            name="username"
            {...register('username', {
              required: true
            })}
            filled
          />
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
              name="I accept Terms of Use"
              checked={value || false}
              onChange={() => {
                setValue(!value)
              }}
            />
          </div>
          <Button
            text="Sign Up"
            icon={MdChevronRight}
            className={styles.button}
          />
          <Link to="login" className={styles.link}>
            Already have an account? <span>Login</span>
          </Link>
        </form>

      </div>
    </div>
  )
}

export default SignupPage
