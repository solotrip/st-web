import React from 'react'
import { Helmet } from 'react-helmet'

const SEO = () => {
  return (
    <Helmet>
      <title>
        Pulfy - Get personalized travel recommendations, updates, restrictions and much more.
      </title>
      <head />
      <meta
        name="description"
        // eslint-disable-next-line max-len
        content="Get travel updates and recommendations based on restrictions, requirements, events, festivals, costs, weather and much more"
      />
      <meta name="twitter:card" content="app" />
      <meta name="twitter:image" content="https://www.pulfy.com/logo.png" />
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

      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://www.pulfy.com" />
      <meta
        property="og:title"
        content="Pulfy - Get personalized travel recommendations, updates, restrictions
          and much more."
      />
      <meta
        property="og:description"
        content="Get travel updates and recommendations based on restrictions, requirements, events, festivals, costs, weather and much more."
      />
      <meta property="og:image" content="http://www.pulfy.com/logo.png" />
      <meta property="og:image:secure_url" content="https://www.pulfy.com/logo.png" />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="robots" content="index, follow" />
      <script type="application/ld+json">
        {`
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Pulfy',
        legalName: 'Pulfy Technology Llc',
        url: 'http://www.pulfy.com',
        logo: 'https://www.pulfy.com/image.png',
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
      ]}`}
      </script>
    </Helmet>
  )
}

export default SEO
