import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Button from '../../../components/button'
import { Text } from '../../../components/input'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import styles from './alternative-login-page.module.scss'
import Header from '../../home/components/header'
import ThemeMode from '../../../theme/ThemeChanger'
import cn from 'classnames'

import Checkbox from '../../../components/input/checkbox'

const LoginPage = ({ loginFunc, error }) => {
  const onLogin = ({ email, password }) => {
    loginFunc({ email, password })
  }
  const { register, handleSubmit, watch, errors } = useForm()
  const shrink = false
  const header = props => <Header wrapperMode={false} {...props}></Header>

  const [value, setValue] = useState(false)

  return (
    <div className={styles.layout}>
      <div className={styles.tabBar}>
        <div className={styles.flexBox}>
          <div className={styles.tabBarLogo}></div>
          <div className={styles.tabBarText}></div>
        </div>
      </div>
      <div className={styles.header}>
        <div className={styles.holder}>
          <div className={styles.themeHolder}>
            {/*<ThemeMode page='home' />*/}
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
          <h1 className={styles.heading}>Login</h1>
          <form onSubmit={handleSubmit(onLogin)} className={styles.form}>
            <Text
              className={styles.formElement}
              placeholder='Email'
              name='email'
              ref={register({
                required: true
              })}
            />
            <Text
              className={styles.formElement}
              placeholder='Password'
              name='password'
              type='password'
              ref={register({
                required: true
              })}
            />
            <span>{error}</span>
            <div className={styles.checkBox}>
              <Checkbox
                name='Remember me'
                checked={value || false}
                onClick={() => {
                  setValue(!value)
                }}
              />
            </div>

            <Button
              text='Login'
              icon={ChevronRightIcon}
              className={styles.button}
              onClick={handleSubmit(onLogin)}
            />
          </form>

          <Link to='signup' className={styles.linko}>
            <div className={styles.link}>
              New to Solotrip? <span>Join now!</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
