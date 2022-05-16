import React, { useEffect, useMemo } from 'react'
import { Loader, SheetWrapper } from 'components'
import { useDispatch, useSelector } from 'react-redux'
import SettingsSection from 'components/settings-section'
import { recommendationsSelector } from 'features/recommendations/slice'
import { fetchRecommendations, shareRecommendationSelector } from './slice'
import { useHistory, useLocation } from 'react-router-dom'
import { MdContentCopy } from 'react-icons/md'
import {
  EmailIcon,
  FacebookIcon,
  FacebookMessengerIcon,
  LineIcon,
  LinkedinIcon,
  PinterestIcon,
  RedditIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon
} from 'react-share'

import styles from './share.module.scss'
import { SHORT_URL_BASE } from 'constants/urls'
import { toast } from 'react-toastify'

const ShareListContainer = () => {
  const { recommendations: recommendationsObject, activeRecommendationId } = useSelector(
    recommendationsSelector
  )

  let recommendations = []
  var recommendations_shash

  const {
    loading,
    recommendation,
    error,
    recommendations: recommendationList,
    recommendations_loading,
    recommendations_error
  } = useSelector(shareRecommendationSelector)
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()

  var queryReturned

  const detailRecommendations = useMemo(
    () => {
      if (
        recommendationsObject &&
        activeRecommendationId &&
        recommendationsObject[activeRecommendationId] &&
        recommendationsObject[activeRecommendationId].recommendations
      ) {
        recommendations = recommendationsObject[activeRecommendationId].recommendations

        queryReturned = recommendationsObject[activeRecommendationId].query

        recommendations_shash = recommendationsObject[activeRecommendationId].shash

        return recommendations
      }
      return []
    },
    [recommendationsObject, activeRecommendationId, location.pathname]
  )

  //const { startDate: start, endDate: end, sid: areaSid, name: areaName } = detailRecommendation

  const { start, end, months, duration, weekendOnly, filters, lat, lon, passports } =
    queryReturned || {}

  useEffect(
    () => {
      if (activeRecommendationId && recommendationsObject) {
      }
    },
    [
      start,
      end,
      months,
      duration,
      weekendOnly,
      filters,
      lat,
      lon,
      passports,
      dispatch,
      recommendationsObject,
      activeRecommendationId
    ]
  )

  const onBack = () => {
    history.goBack()
  }

  const url = recommendations && SHORT_URL_BASE + recommendations_shash

  function createDynamicURL(option) {
    if (recommendations_loading) return {}
    if (option === 'mail') {
      return `Here is the recommendation list including travel requirements,
      restrictions,activities and events on Pulfy.%0D${url}`
    } else if (option === 'telegram' || option === 'facebook') {
      const text = `Here is the recommendation list including travel requirements,
       restrictions,activities and events on Pulfy.`
      return { url, text }
    } else if (option === 'reddit' || option === 'twitter') {
      const text =
        'Here is the recommendation list including travel requirements, restrictions,activities and events on Pulfy.'
      return { url, text }
    } else if (option === 'linkedin') {
      return { url }
    }
  }

  const shortUrl = `Here is the events,activities,
     restrictions and travel requirements of recommended destinations for you: https://www.pulfy.com/app${url}`

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url)
    toast.info('Copied to clipboard')
  }

  return (
    <div className={styles.what}>
      <SheetWrapper disableDrag={false} closable={true}>
        {' '}
        <SheetWrapper.Content>
          <Loader loading={recommendations_loading || !url || recommendations_error}>
            <SettingsSection title="Share" description="Share this recommendation via">
              <div className={styles.shareHolder}>
                <button className={styles.copyButton} onClick={copyToClipboard}>
                  {url} <MdContentCopy />
                </button>
                <a
                  href={`mailto:?subject=Travel recommendation for you on Pulfy&body=${createDynamicURL(
                    'mail'
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.shareButton}
                >
                  <EmailIcon size={60} round={false} />
                  <div className={styles.shareText}>Email</div>
                </a>
                <a
                  href={`https://wa.me/?text=${shortUrl}`}
                  className={styles.shareButton}
                  target="_blank"
                  rel="noreferrer"
                >
                  <WhatsappIcon size={60} round={false} />
                  <div className={styles.shareText}>Whatsapp</div>
                </a>
                <a
                  href={`https://t.me/share/url?url=${createDynamicURL('telegram').url}&text=${
                    createDynamicURL('telegram').text
                  }`}
                  target="_blank"
                  rel="noreferrer"
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
                  rel="noreferrer"
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
                  rel="noreferrer"
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
                  rel="noreferrer"
                  className={styles.shareButton}
                >
                  <TwitterIcon size={60} round={false} />
                  <div className={styles.shareText}>Twitter</div>
                </a>

                <a
                  href={`https://www.facebook.com/dialog/share?
                app_id=1042368969717573&display=popup&href=${url}&redirect_uri=${url}`}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.shareButton}
                >
                  <FacebookIcon size={60} round={false} />
                  <div className={styles.shareText}>Facebook</div>
                </a>

                <a
                  href={`http://pinterest.com/pin/create/link/?url=${url}`}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.shareButton}
                >
                  <PinterestIcon size={60} round={false} />
                  <div className={styles.shareText}>Pinterest</div>
                </a>

                <a
                  href={`https://line.me/R/msg/text/?${shortUrl}`}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.shareButton}
                >
                  <LineIcon size={60} round={false} />
                  <div className={styles.shareText}>Line</div>
                </a>

                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${url}`}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.shareButton}
                >
                  <LinkedinIcon size={60} round={false} />
                  <div className={styles.shareText}>Linkedin</div>
                </a>
              </div>
            </SettingsSection>
          </Loader>
        </SheetWrapper.Content>
        <SheetWrapper.Footer onClick={onBack} text="Close" disabled={false} />
      </SheetWrapper>
    </div>
  )
}

export default ShareListContainer
