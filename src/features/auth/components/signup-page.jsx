import React from 'react'
import { Link } from 'react-router-dom'
import Layout from './layout'
import Button from '../../../components/button'
import { Text } from '../../../components/input'
import logo from '../../../assets/images/logo-text.png'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import styles from './signup-page.module.scss'
import { useForm } from 'react-hook-form'

const SignupPage = ({ registerFunc, error }) => {
  const onSubmit = ({ email, password, username }) => registerFunc({
    email,
    password,
    username,
    name:username
  })
  const { register, handleSubmit } = useForm()
  return (
    <Layout infoText="Find the best destination for you.">
      <img src={logo} alt="Solotrip"/>
      <h1 className={styles.heading}>Create Account</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Text
          placeholder="Username"
          name="username"
          ref={register({
            required: true
          })}
        />
        <Text
          placeholder="Email"
          name="email"
          ref={register({
            required: true
          })}
        />
        <Text
          placeholder="Password"
          name="password"
          type='password'
          ref={register({
            required: true
          })}
        />
        <span>{error}</span>
        <Button
          text="Sign Up" icon={ChevronRightIcon} onClick={onSubmit}
          className={styles.button}/>
      </form>
      <Link to="/login" className={styles.link}>
        Already have an account? <span>Login</span>
      </Link>
    </Layout>
  )
}

export default SignupPage
