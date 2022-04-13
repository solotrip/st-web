import React from 'react'
import { Helmet } from 'react-helmet'

const SEO = () => {
  return(
    <Helmet>
      <title>
        Pulfy - Get personalized travel recommendations, updates, restrictions and much more.
      </title>
      <meta
        name="description"
        // eslint-disable-next-line max-len
        content="Get travel updates and recommendations based on restrictions, requirements, events, festivals, costs, weather and much more"
      />
      <meta name="twitter:card" content="app" />
      <meta
        name="twitter:image"
        content="https://ik.imagekit.io/stmedia/logo_o3TcRoTaq.png?ik-sdk-version=javascript-1.4.3&updatedAt=1648556830533"
      />
      <meta
        name="twitter:title"
        content="Pulfy - Get personalized travel recommendations, updates, restrictions
          and much more."
      />
      <meta name="twitter:creator" content="@pulfycom" />
      <meta name="twitter:site" content="@pulfycom" />
      <meta
        name="twitter:description"
        // eslint-disable-next-line max-len
        content="Get travel updates and recommendations based on restrictions, requirements, events, festivals, costs, weather and much more."
      />
      <meta name="twitter:app:country" content="US" />
      {/*<meta name="twitter:app:name:iphone" content="Pulfy" />*/}
      {/*<meta name="twitter:app:id:iphone" content="929750075" />*/}
      {/*<meta name="twitter:app:url:iphone" content="cannonball://poem/5149e249222f9e600a7540ef" />*/}
      {/*<meta name="twitter:app:name:ipad" content="Pulfy" />*/}
      {/*<meta name="twitter:app:id:ipad" content="929750075" />*/}
      {/*<meta name="twitter:app:url:ipad" content="cannonball://poem/5149e249222f9e600a7540ef" />*/}
      {/*<meta name="twitter:app:name:googleplay" content="Pulfy" />*/}
      {/*<meta name="twitter:app:id:googleplay" content="io.fabric.samples.cannonball" />*/}
      {/*<meta*/}
      {/*  name="twitter:app:url:googleplay"*/}
      {/*  content="http://cannonball.fabric.io/poem/5149e249222f9e600a7540ef"*/}
      {/*/>*/}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="http://pulfy.com" />
      <meta
        property="og:title"
        content="Pulfy - Get personalized travel recommendations, updates, restrictions
          and much more."
      />
      <meta
        property="og:description"
        content="Get travel updates and recommendations based on restrictions, requirements, events, festivals, costs, weather and much more."
      />
      <meta
        property="og:image"
        content="https://ik.imagekit.io/stmedia/logo_o3TcRoTaq.png?ik-sdk-version=javascript-1.4.3&updatedAt=1648556830533"
      />
      <script type="application/ld+json">{`
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Pulfy',
        legalName: 'Pulfy Technology Llc',
        url: 'http://www.pulfy.com',
        logo: 'https://ik.imagekit.io/stmedia/pulfy-black-logo_9H7xEWSC3.png',
        foundingDate: '2022',
        founders: [
      {
        '@type': 'Person',
        name: 'Fatih Tas'
      },
      {
        '@type': 'Person',
        name: 'Berk Durmus'
      }
        ],
        contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: 'support@pulfy.com'
      },
        sameAs: [
        'http://instagram.com/pulfycom',
        'http://www.twitter.com/pulfycom',
        'https://www.tiktok.com/@pulfy.com'
        ]
      }
      ]}`
      }
      </script>
    </Helmet>
  )
}

export default SEO
