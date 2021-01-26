import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Button, Checkbox, TextInput } from 'components'
import { MdChevronRight } from 'react-icons/md'
import styles from './alternative-page.module.scss'
import Header from '../../home/components/header'
import cn from 'classnames'

const LoginPage = ({ loginFunc, error }) => {
  const onLogin = ({ email, password }) => {
    loginFunc({ email, password })
  }
  const { register, handleSubmit } = useForm()
  const shrink = false
  const header = props => <Header wrapperMode={false} {...props} />

  const [value, setValue] = useState(false)

  return (
    <div className={styles.layout}>

      <div className={styles.header}>
        {header({ shrink })}
      </div>
      <div className={styles.main}>
        <div className={styles.motto}>
          <span className={styles.gradientText}>Research Destinations,</span>
          <span className={styles.gradientText}>Explore with Itineraries.</span>
        </div>
        <div className={cn([styles.loginBox, 'card'])}>
          <h1 className={styles.heading}>Login</h1>
          <form onSubmit={handleSubmit(onLogin)} className={styles.form}>
            <TextInput
              placeholder='Email'
              name='email'
              ref={register({
                required: true
              })}
              filled
            />
            <TextInput
              placeholder='Password'
              name='password'
              type='password'
              ref={register({
                required: true
              })}
              filled
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
              icon={MdChevronRight}
              className={styles.button}
              onClick={handleSubmit(onLogin)}
            />
          </form>

          <Link to='signup'>
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
