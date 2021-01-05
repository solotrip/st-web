import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Button from '../../../components/button'
import { Text } from '../../../components/input'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import styles from './alternative-signup-page.module.scss'
import Header from '../../home/components/header'
import ThemeMode from '../../../theme/ThemeChanger'
import cn from 'classnames'

import Checkbox from '../../../components/input/checkbox'

const SignupPage = ({ registerFunc, error }) => {
  const onSubmit = ({ email, password, username }) =>
    registerFunc({
      email,
      password,
      username,
      name: username
    })
  const { register, handleSubmit } = useForm()

  const shrink = false
  const header = props => <Header wrapperMode={false} {...props}></Header>

  const [value, setValue] = useState(false)

  return (
    <div className={styles.layout}>
      <div className={styles.tabBar}>
        <div className={styles.flexBox}>
          <Link className={styles.tabBarLogo} to='/' />
          <Link className={styles.tabBarText} to='/' />
        </div>
      </div>

      <div className={styles.header}>
        <div className={styles.holder}>
          <div className={styles.themeHolder}>
            <ThemeMode page='signup' />
          </div>
          <div className={styles.headerHolder}>{header({ shrink })}</div>
        </div>
      </div>
      <div className={styles.main}>
        <div className={styles.motto}>
          <text className={styles.gradientText}>Research Destinations,</text>
          <br />{' '}
          <text className={styles.gradientText}>Explore with Itinaries.</text>
        </div>
        <div className={styles.loginBox}>
          <h1 className={styles.heading}>Signup</h1>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <Text
              placeholder='Username'
              className={styles.formElement}
              name='username'
              ref={register({
                required: true
              })}
            />
            <Text
              placeholder='Email'
              className={styles.formElement}
              name='email'
              ref={register({
                required: true
              })}
            />
            <Text
              placeholder='Password'
              className={styles.formElement}
              name='password'
              type='password'
              ref={register({
                required: true
              })}
            />
            <span>{error}</span>
            <div className={styles.checkBox}>
              <Checkbox
                name='I accept Terms of Use'
                checked={value || false}
                onClick={() => {
                  setValue(!value)
                }}
              />
            </div>
            <Button
              text='Sign Up'
              icon={ChevronRightIcon}
              onClick={onSubmit}
              className={styles.button}
            />
          </form>

          <Link to='login' className={styles.linko}>
            <div className={styles.link}>
              Already have an account? <span>Login</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SignupPage
