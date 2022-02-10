/* eslint-disable max-len*/
import React from 'react'
import { Footer } from 'components'

import styles from './home-page.module.scss'
import { Link } from 'react-router-dom'

import { isMobile } from 'react-device-detect'

import ImageShadow from 'react-image-shadow'
import 'react-image-shadow/assets/index.css'

import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

let bucketlist = [
  {
    link:
      'https://ik.imagekit.io/7zlqc1cmihe/Europe_Popular_Destinations/tr:h-400/France_Marseille_071_Z_zcXbsw6.jpeg',
    title: 'Marseille 🇫🇷'
  },
  {
    link:
      'https://ik.imagekit.io/7zlqc1cmihe/Europe_Popular_Destinations/tr:h-400/Poland_Warsaw_081_hszpzFXzc.jpeg',
    title: 'Warsaw 🇵🇱'
  },
  {
    link:
      'https://ik.imagekit.io/7zlqc1cmihe/Europe_Popular_Destinations/tr:h-400/Belgium_Brussels_043_ywtsNgEVe.jpeg',
    title: 'Brussels 🇧🇪'
  },
  {
    link:
      'https://ik.imagekit.io/7zlqc1cmihe/Europe_Popular_Destinations/tr:h-400/Britain_Oxford_061_CWq5_ZI6V.jpeg',
    title: 'Oxford 🇬🇧'
  },
  {
    link:
      'https://ik.imagekit.io/7zlqc1cmihe/Europe_Popular_Destinations/tr:h-400/Czech_Republic_Prague_014_K3DSjNySSMU.jpeg',
    title: 'Prague 🇨🇿'
  },
  {
    link:
      'https://ik.imagekit.io/7zlqc1cmihe/Europe_Popular_Destinations/tr:h-400/Italy_Taormina_068_0fGbxxOWH.jpeg',
    title: 'Taormina 🇮🇹'
  },
  {
    link:
      'https://ik.imagekit.io/7zlqc1cmihe/Europe_Popular_Destinations/tr:h-400/Britain_Cambridge_067_FMIKN5uSm.jpeg',
    title: 'Cambridge 🇬🇧'
  },

  {
    link:
      'https://ik.imagekit.io/7zlqc1cmihe/Europe_Popular_Destinations/tr:h-400/Italy_Lombardy_073_OdqaupZ6EY.jpeg',
    title: 'Lombardy 🇮🇹'
  },

  {
    link:
      'https://ik.imagekit.io/7zlqc1cmihe/Europe_Popular_Destinations/tr:h-400/Sweden_Stockholm_035_7J-e0AYhX.jpeg',
    title: 'Stockholm 🇸🇪'
  },
  {
    link:
      'https://ik.imagekit.io/7zlqc1cmihe/Europe_Popular_Destinations/tr:h-400/Italy_Milan_009_rcyh_cGrtRoR.jpeg',
    title: 'Milan 🇮🇹'
  },
  {
    link:
      'https://ik.imagekit.io/7zlqc1cmihe/Europe_Popular_Destinations/tr:h-400/Portugal_Azores_078_ZN9sCXr4M.jpeg',
    title: 'Azores 🇵🇹'
  },

  {
    link:
      'https://ik.imagekit.io/7zlqc1cmihe/Europe_Popular_Destinations/tr:h-400/Croatia_Zagreb_069_K6DbU9BV8.jpeg',
    title: 'Zagreb 🇭🇷'
  }
]

const HomePage = () => {
  //const { data: user, loading: profileLoading } = useSelector(profileSelector);
  return (
    <div className={styles.outer}>
      <div className={styles.navbar}>
        <div className={styles.logo}>
          <img
            src="https://ik.imagekit.io/7zlqc1cmihe/nostroke_On5RfkPz2W.png?updatedAt=1629769174155"
            style={{ width: '120px' }}
            alt=""
          />
        </div>
      </div>

      <div className={styles.wrapper}>
        <div className={styles.row1}>
          <div className={styles.row1Title}>
            <div>Personalized</div>
            <div>Travel</div>
            <div>Recommendations</div>
          </div>
          <div className={styles.row1Subtitle}>
            Get travel updates and recommendations based on restrictions,
            requirements, events, festivals, costs, weather and much more.
          </div>{' '}
          <Link to="/onboarding/1">
            <button className={styles.actionButton}>Get Started</button>
          </Link>
          <div className={styles.row1Subtitle2}>Already member? </div>
          <Link to="/login">
            <button className={styles.actionButton2}>Login</button>
          </Link>
        </div>
        <div className={styles.row1Subtitle2}>Scroll down to learn more.</div>
      </div>
      {/*<div className={styles.recoDemo}>
        <Content recommendations={[recommendation]} mapEnabled={false} />
  </div>*/}
      <div className={styles.videoContainer}>
        <video
          autoPlay
          src={
            'https://res.cloudinary.com/dtp5yitjt/video/upload/v1629817028/combined2_pqra8s.mp4'
          }
          playsInline
          loop="loop"
          muted
          preload="auto"
          id="myVideo"
          className={styles.videoContainer}
        >
          your browser does not support video tag.
        </video>
      </div>
      <div className={styles.featuresHolder}>
        <div className={styles.featureText}>
          <div className={styles.featureTitle}>Browse.</div>
          <div className={styles.featureSubtitle}>
            Need some inspiration? Discover when and where you want to go by
            choosing what is really important for you.
          </div>
        </div>

        <div className={styles.featureImage}>
          <ImageShadow
            className={styles.calendar}
            src={
              'https://ik.imagekit.io/stmedia/tags2_RlueUb_65.svg?ik-sdk-version=javascript-1.4.3&updatedAt=1644520753861'
            }
            width={'100%'}
            shadowBlur={20}
            alt="a"
            key="1"
          />
        </div>
      </div>

      <div className={styles.featuresHolder}>
        <div className={styles.featureText}>
          <div className={styles.featureTitle}>Select Dates.</div>
          <div className={styles.featureSubtitle}>
            You can select from a specific dates or you can select options like
            'any weekend in March, June, July' or 'a whole week in February'
            etc.
          </div>
        </div>
        <div className={styles.featureImage}>
          <ImageShadow
            className={styles.calendar}
            src={
              'https://ik.imagekit.io/7zlqc1cmihe/July_kJ0X3FxmQg.svg?updatedAt=1629801887574'
            }
            width={'70%'}
            shadowBlur={10}
            alt="a"
          />
        </div>
      </div>
      {!isMobile ? (
        <div className={styles.featuresHolder}>
          <div className={styles.featureImage}>
            <ImageShadow
              className={styles.calendar}
              src={
                'https://ik.imagekit.io/stmedia/Screen_Shot_2022-02-10_at_21.40.31_z2iy-SpdQ.png?ik-sdk-version=javascript-1.4.3&updatedAt=1644518516014'
              }
              width={'80%'}
              shadowBlur={10}
              alt="a"
            />
          </div>
          <div className={styles.featureText}>
            <div className={styles.featureTitle}>Get Recommendations.</div>
            <div className={styles.featureSubtitle}>
              Your recommendations include information about festivals, major
              events, visa requirements, test and quarantine status, country
              restrictions, hotel hostel vacation rental prices etc.{' '}
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.featuresHolder}>
          <div className={styles.featureText}>
            <div className={styles.featureTitle}>Get Recommendations.</div>
            <div className={styles.featureSubtitle}>
              Your recommendations include information about festivals, major
              events, visa requirements, test and quarantine status, country
              restrictions, hotel hostel vacation rental prices etc.{' '}
            </div>
          </div>
          <div className={styles.featureImage}>
            <ImageShadow
              className={styles.calendar}
              src={
                'https://ik.imagekit.io/stmedia/Screen_Shot_2022-02-10_at_21.40.31_z2iy-SpdQ.png?ik-sdk-version=javascript-1.4.3&updatedAt=1644518516014'
              }
              width={'80%'}
              shadowBlur={10}
              alt="a"
            />
          </div>
        </div>
      )}
      <div className={styles.featuresHolder}>
        <div className={styles.featureText}>
          <div className={styles.featureTitle}>Your Wishlist.</div>
          <div className={styles.featureSubtitle}>
            Prioritize the destinations you want to go by adding them to your
            wishlist.
          </div>
        </div>

        <div className={styles.featureImage}>
          <div className={styles.arrowHolder}>
            <div className={styles.arrowLeft3}>
              <FaChevronLeft />
            </div>
            <div className={styles.arrowRight3}>
              <FaChevronRight />
            </div>
          </div>
          <div className={styles.slideHolder}>
            {bucketlist.map(spec => (
              <div key={`bl-${spec.link}`}>
                <ImageShadow
                  src={spec.link}
                  className={styles.slideElement3}
                  shadowBlur={10}
                  alt="a"
                />
                <div className={styles.slideElementTitle2}>{spec.title}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {!isMobile ? (
        <div className={styles.featuresHolder}>
          <div className={styles.featureImage}>
            <ImageShadow
              className={styles.calendar}
              src={
                'https://ik.imagekit.io/stmedia/Screen_Shot_2022-02-10_at_22.25.15_kshFhdM4b.png?ik-sdk-version=javascript-1.4.3&updatedAt=1644521145299'
              }
              width={'80%'}
              shadowBlur={10}
              alt="a"
              key="1"
            />
          </div>
          <div className={styles.featureText}>
            <div className={styles.featureTitle}>Get Updates.</div>
            <div className={styles.featureSubtitle}>
              Updates, status changes, cancellations. All the things that matter
              to you.
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.featuresHolder}>
          <div className={styles.featureText}>
            <div className={styles.featureTitle}>Get Updates.</div>
            <div className={styles.featureSubtitle}>
              Updates, status changes, cancellations. All the things that matter
              to you.
            </div>
          </div>
          <div className={styles.featureImage}>
            <ImageShadow
              className={styles.calendar}
              src={
                'https://ik.imagekit.io/stmedia/Screen_Shot_2022-02-10_at_22.25.15_kshFhdM4b.png?ik-sdk-version=javascript-1.4.3&updatedAt=1644521145299'
              }
              width={'80%'}
              shadowBlur={10}
              alt="a"
              key="1"
            />
          </div>
        </div>
      )}

      <div className={styles.wrapper}>
        <div className={styles.row2}>
          <div className={styles.row1Subtitle}>
            Ready to Get Recommendations?
          </div>
          <Link to="/onboarding/1">
            <div className={styles.actionButton}>Get Started</div>
          </Link>
        </div>
      </div>

      <Footer isStatic={true} />
    </div>
  )
}

HomePage.propTypes = {}

export default HomePage
