import { PushNotifications } from '@capacitor/push-notifications'
import * as NotificationService from 'api/notification'
import { NOTIFICATION_TYPES } from 'constants/index'
import { Capacitor } from '@capacitor/core'

export async function registerDevice(history) {
  if(!Capacitor.isPluginAvailable('PushNotifications')) {
    return
  }
  const permissionRes = await PushNotifications.requestPermissions()
  console.log(permissionRes.state)
  PushNotifications.addListener('registration', _handleRegister)
  PushNotifications.addListener('registrationError', _handleRegistrationError)
  PushNotifications.addListener(
    'pushNotificationActionPerformed',
    _handleNotificationAction(history)
  )
  await PushNotifications.register()
}

async function _handleRegister(token) {
  await NotificationService.registerDevice(token.value)
}

async function _handleRegistrationError(e) {

}

export const _handleNotificationAction = history => action => {
  const { data } = action.notification
  const { type } = data || {}
  switch (type) {
  case NOTIFICATION_TYPES.RECOMMENDATION:
    return history.push('/notifications')
  case NOTIFICATION_TYPES.WISHLIST:
    return history.push('/notifications')
  default:
    return
  }
}
