import mixpanel from 'mixpanel-browser'
mixpanel.init(process.env.REACT_APP_MIXPANEL_TOKEN)

let envCheck = true
//let envCheck = process.env.NODE_ENV === 'production'

let actions = {
  identify: id => {
    if (envCheck) mixpanel.identify(id)
  },
  alias: id => {
    if (envCheck) mixpanel.alias(id)
  },
  track: (name, props) => {
    if (envCheck) mixpanel.track(name, props)
  },
  people: {
    set: props => {
      if (envCheck) mixpanel.people.set(props)
    }
  }
}

export let Mixpanel = actions
