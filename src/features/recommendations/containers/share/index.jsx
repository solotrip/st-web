import React, { useCallback, useMemo, useState } from 'react'
import { SheetWrapper } from 'components'
import { useSelector } from 'react-redux'
import SettingsSection from 'components/settings-section'
import { recommendationsSelector } from '../../slice'
import qs from 'qs'
import { useQuery } from 'utils/hooks/use-query'
import { useHistory, useLocation } from 'react-router-dom'
import formurlencoded from 'form-urlencoded'

import {
  TwitterIcon,
  FacebookIcon,
  WhatsappIcon,
  EmailIcon,
  TelegramIcon,
  RedditIcon,
  LinkedinIcon,
  FacebookMessengerIcon,
  LineIcon,
  PinterestIcon,
  ViberIcon
} from 'react-share'

import styles from './share.module.scss'

const ShareContainer = () => {
  const {
    loadingRecommendations,
    recommendations: recommendationsObject,
    activeRecommendationId
  } = useSelector(recommendationsSelector)

  const query = useQuery()
  const history = useHistory()
  const location = useLocation()
  let areaName = ''

  console.log({ activeRecommendationId, recommendationsObject, location })

  if (
    recommendationsObject &&
    activeRecommendationId &&
    recommendationsObject[activeRecommendationId] &&
    recommendationsObject[activeRecommendationId].recommendations
  ) {
    const recommendations = recommendationsObject[activeRecommendationId].recommendations
    console.log(recommendations)
    const recommendationFound = recommendations.find(r => location.pathname.includes(r.id))
    console.log(' found:', recommendationFound)
    if (recommendationFound && recommendationFound.name) {
      console.log('found: ', recommendationFound)
      areaName = recommendationFound.name
    }
  }

  const onSubmit = () => {
    history.push({
      pathname: '/recommendations',
      search: qs.stringify(query)
    })
  }
  const onBack = () => {
    history.goBack()
  }

  function createDynamicURL(option) {
    const url = 'https://www.pulfy.com' + location.pathname + location.search
    const encodedQuery = url
      .toString()
      .replace(/&/g, '%26')
      .replace(/ /g, '')
      .replace(/(\r\n|\n|\r)/gm, '')
      .trim()
      .replace(/\/share\//g, '/r/')
    if (option === 'mail') {
      const body = `Here is the ${areaName}'s travel requirements, restrictions,activities and events on Pulfy.%0D .%0DSee detailed recommendation on: ${encodedQuery}`
      return body
    } else if (option === 'telegram' || option === 'facebook') {
      const text = `Here is the ${areaName}'s travel requirements, restrictions,activities and events on Pulfy.`
      return { url: encodedQuery, text }
    } else if (option === 'reddit' || option === 'twitter') {
      const text = `${areaName}'s travel requirements, restrictions,activities and events on Pulfy.`
      return { url: encodedQuery, text }
    } else if (option === 'linkedin') {
      return { url: encodedQuery }
    }
  }

  function createShortDynamicURL() {
    const url = location.pathname + location.search
    const encodedQuery = url
      .toString()
      .replace(/&/g, '%26')
      .replace(/ /g, '')
      .replace(/(\r\n|\n|\r)/gm, '')
      .trim()
      .replace(/\/share\//g, '/r/')
    const body = `Here is the events,activities, restrictions and travel requirements of ${areaName} for you: https://www.pulfy.com${encodedQuery}`
    return body
  }

  return (
    <div className={styles.what}>
      <SheetWrapper disableDrag={false} closable={true}>
        {' '}
        <SheetWrapper.Content>
          <SettingsSection title="Share" description="Share this recommendation via">
            <div className={styles.shareHolder}>
              <a
                /* href="mailto:?subject=Travel recommendation for you on Pulfy &amp;body=Here is the travel recommendation for you.%0DSee detailed recommendation on http://www.pulfy.com/"
               */

                /*

                 href={`mailto:${qs.stringify(
                  query
                )}}?subject=Quote&body=I%20would%20like%20to%20accept%20this%20quote`}

                */

                href={`mailto:?subject=Travel recommendation for you on Pulfy&body=${createDynamicURL(
                  'mail'
                )}`}
                target="_blank"
                className={styles.shareButton}
              >
                <EmailIcon size={60} round={false} />
                <div className={styles.shareText}>Email</div>
              </a>
              <a
                href={`https://wa.me/?text=${createShortDynamicURL()}`}
                className={styles.shareButton}
                target="_blank"
              >
                <WhatsappIcon size={60} round={false} />
                <div className={styles.shareText}>Whatsapp</div>
              </a>
              <a
                href={`https://t.me/share/url?url=${createDynamicURL('telegram').url}&text=${
                  createDynamicURL('telegram').text
                }`}
                target="_blank"
                className={styles.shareButton}
              >
                <TelegramIcon size={60} round={false} />
                <div className={styles.shareText}>Telegram</div>
              </a>
              <a
                href={`fb-messenger://share/?link=${createDynamicURL('facebook').url}&app_id=${
                  process.env.REACT_APP_FACEBOOK_APP_ID
                }`}
                target="_blank"
                className={styles.shareButton}
              >
                <FacebookMessengerIcon size={60} round={false} />
                <div className={styles.shareText}>Messenger</div>
              </a>

              <a
                href={`https://www.reddit.com/r/travel/submit?url=${
                  createDynamicURL('reddit').url
                }&title=${createDynamicURL('reddit').text}`}
                target="_blank"
                className={styles.shareButton}
              >
                <RedditIcon size={60} round={false} />
                <div className={styles.shareText}>Reddit r/travel</div>
              </a>

              <a
                href={`https://twitter.com/intent/tweet?text=${
                  createDynamicURL('twitter').text
                }&url=${createDynamicURL('twitter').url}`}
                target="_blank"
                className={styles.shareButton}
              >
                <TwitterIcon size={60} round={false} />
                <div className={styles.shareText}>Twitter</div>
              </a>

              <a
                href={`https://www.facebook.com/dialog/share?
                app_id=1042368969717573&display=popup&href=${
                  createDynamicURL('facebook').url
                }&redirect_uri=${createDynamicURL('facebook').url}`}
                target="_blank"
                className={styles.shareButton}
              >
                <FacebookIcon size={60} round={false} />
                <div className={styles.shareText}>Facebook</div>
              </a>

              <a
                href="http://pinterest.com/pin/create/link/?url=pulfy.com"
                target="_blank"
                className={styles.shareButton}
              >
                <PinterestIcon size={60} round={false} />
                <div className={styles.shareText}>Pinterest</div>
              </a>

              <a
                href={`https://line.me/R/msg/text/?${createShortDynamicURL()}`}
                target="_blank"
                className={styles.shareButton}
              >
                <LineIcon size={60} round={false} />
                <div className={styles.shareText}>Line</div>
              </a>

              <a
                href={'https://www.linkedin.com/sharing/share-offsite/?url=pulfy.com'}
                target="_blank"
                className={styles.shareButton}
              >
                <LinkedinIcon size={60} round={false} />
                <div className={styles.shareText}>Linkedin</div>
              </a>
            </div>
          </SettingsSection>
        </SheetWrapper.Content>
        <SheetWrapper.Footer onClick={onBack} text="Close" disabled={false} />
      </SheetWrapper>
    </div>
  )
}

export default ShareContainer
