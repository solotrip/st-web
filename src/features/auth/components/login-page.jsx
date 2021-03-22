import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Layout from './layout'
import { Button, TextInput } from 'components'
import logo from 'assets/images/logo-text.png'
import { MdChevronRight } from 'react-icons/md'
import styles from './login-page.module.scss'


const LoginPage = ({ loginFunc, error }) => {
  const onLogin = ({ email, password }) => {
    loginFunc({ email, password })
  }
  const { register, handleSubmit, watch, errors } = useForm()
  return (
    <Layout infoText="Find the best destination for you.">
      <img src={logo} alt="Solotrip"/>
      <h1 className={styles.heading}>Login</h1>
      <form onSubmit={handleSubmit(onLogin)} className={styles.form}>
        <TextInput
          placeholder="Email"
          name="email"
          ref={register({
            required: true
          })}
        />
        <TextInput
          placeholder="Password"
          name="password"
          type='password'
          ref={register({
            required: true
          })}
        />
        <span>{error}</span>
        <Button
          text="Login"
          icon={MdChevronRight}
          className={styles.button}
          onClick={handleSubmit(onLogin)}
        />
      </form>
      <Link to="signup" className={styles.link}>
        New to Solotrip? <span>Join now!</span>
      </Link>
    </Layout>
  )
}

export default LoginPage
