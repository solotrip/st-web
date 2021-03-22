import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Button, Checkbox, TextInput } from 'components'
import { MdChevronRight } from 'react-icons/md'
import styles from './alternative-page.module.scss'
import Header from '../../home/components/header'
import cn from 'classnames'


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
  const header = props => <Header wrapperMode={false} {...props}/>

  const [value, setValue] = useState(false)

  return (
    <div className={styles.layout}>
      <div className={styles.header}>
        {header({ shrink })}
      </div>
      <div className={styles.main}>
        <div className={styles.motto}>
          <span className={styles.gradientText}>Research Destinations,</span>
          <span className={styles.gradientText}>Explore with Itinaries.</span>
        </div>
        <div className={cn(styles.loginBox, 'card')}>
          <h1 className={styles.heading}>Signup</h1>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <TextInput
              placeholder='Username'
              name='username'
              ref={register({
                required: true
              })}
              filled
            />
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
                name='I accept Terms of Use'
                checked={value || false}
                onClick={() => {
                  setValue(!value)
                }}
              />
            </div>
            <Button
              text='Sign Up'
              icon={MdChevronRight}
              onClick={onSubmit}
              className={styles.button}
            />
          </form>

          <Link to='login'>
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
