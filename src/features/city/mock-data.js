export default [
  {
    title: 'Overview',
    index: 0,
    content: {
      highlights: {
        type: 'highlights',
        value: [
          {
            name: 'Highlight',

            value: 'Visa Free for Turkish Citizens'
          },
          {
            name: 'Highlight',
            type: 'highlight',
            value: 'One of the Top 10 Camping Places'
          },
          {
            name: 'Highlight',
            type: 'highlight',
            value: 'Most travelers spend 3-5 days'
          },
          {
            name: 'Highlight',
            type: 'highlight',
            value:
          'Budget travelers spend 300$ on average (20% less than the other cities in Asia)'
          },
          {
            name: 'Highlight',
            type: 'highlight',
            value: 'Best time to visit is spring.'
          },
          {
            name: 'Highlight',
            type: 'highlight',
            value: 'Not walkable. ( Walk Score 4.3, %60 less than avg )'
          },
          {
            name: 'Highlight',
            type: 'highlight',
            value: 'Local people doesn’t speak English well'
          },
          {
            name: 'Highlight',
            type: 'highlight',
            value: 'Too much air pollution on May'
          }]
      },
      flightCost: {
        name: 'Flight Cost',
        type: 'cost',
        value: 290
      },
      accomodationCost: {
        name: 'Accom. Cost',
        type: 'cost',
        value: 290
      },
      flightCost3: {
        name: 'Total Budget',
        type: 'cost',
        value: 290
      },
      overallSpread: {
        name: 'Overall',
        type: 'radar',
        value: {
          data: [44, 55, 13, 43, 9, 12, 30],
          labels: [
            'Social',
            'Walkable',
            'Safe',
            'Luxury',
            'Budget',
            'Family',
            'Activity'
          ]
        }
      },

      overallScore: {
        name: 'Overall Score',
        type: 'score',
        value: 6.7
      },
      totalBudget: {
        name: 'Total Daily Budget',
        type: 'table',
        value: '630$'
      },
      starGazing: {
        name: 'Star Gazing',
        type: 'table',
        value: 'yes'
      },
      plugTypes: {
        name: 'Plug Types',
        type: 'table',
        value: '🔌 🔌'
      },
      currency: {
        name: 'Currency',
        type: 'table',
        value: 'Kyat'
      },
      timeDifference: {
        name: 'Time Difference',
        type: 'table',
        value: 'GMT+3'
      },
      phoneCode: {
        name: 'Country Phone Code',
        type: 'table',
        value: '+90'
      },
      religiousTolerance: {
        name: 'Religious Tolerance',
        type: 'table',
        value: 'High'
      },
      localFood: {
        name: 'Local Food',
        type: 'table',
        value: 'Oslo Tuna'
      }
    }
  },
  {
    title: 'Similar Cities',
    index: 1,
    content: {
      kars: { name: 'Similar City', type: 'city', value: 'Kars' },
      oslo: { name: 'Similar City', type: 'city', value: 'Oslo' },
      ardahan: { name: 'Similar City', type: 'city', value: 'Ardahan' }
    }
  },
  {
    title: 'Activities',
    index: 2,
    content: {
      activitiesChart: {
        name: 'Activities',
        type: 'pie-chart',
        value: {
          data: [44, 55, 13, 43, 9],
          labels: ['Swimming', 'Chilling', 'Sailing', 'Camping', 'Formula 1']
        }
      },
      activityScore: {
        name: 'Activity Score',
        type: 'score',
        value: 9.8
      },
      activitySailing: {
        name: 'activity',
        type: 'activity',
        value: '⛵ Sailing'
      },
      activitySwimming: {
        name: 'activity',
        type: 'activity',
        value: '🏊‍♀️ Swimming'
      },
      activityChilling: {
        name: 'activity',
        type: 'activity',
        value: '🏖️ Chilling'
      },
      activityRowing: {
        name: 'activity',
        type: 'activity',
        value: '🏕️ Camping'
      },
      activityF1: {
        name: 'activity',
        type: 'activity',
        value: '🏎️ Formula 1'
      },
      popularityChart: {
        name: 'Popularity',
        type: 'line-chart-blue',
        value: {
          data: [4, 3, 10, 9, 29, 19, 22, 9, 12, 7, 19, 5, 13, 9, 17, 2, 7, 5],
          labels: [
            '1/11/2000',
            '2/11/2000',
            '3/11/2000',
            '4/11/2000',
            '5/11/2000',
            '6/11/2000',
            '7/11/2000',
            '8/11/2000',
            '9/11/2000',
            '10/11/2000',
            '11/11/2000',
            '12/11/2000',
            '1/11/2001',
            '2/11/2001',
            '3/11/2001',
            '4/11/2001',
            '5/11/2001',
            '6/11/2001'
          ]
        }
      }
    }
  },

  {
    title: 'Scores',
    index: 3,
    content: {
      WalkScore: {
        name: 'Walk Score',
        type: 'score',
        value: 9.5
      },
      EcoScore: {
        name: 'Eco Score',
        type: 'score',
        value: 5.5
      },
      SocialScore: {
        name: 'Social Score',
        type: 'score',
        value: 8.5
      },
      SecurityScore: {
        name: 'Security Score',
        type: 'score',
        value: 8.9
      },
      popularityChart: {
        name: 'Popularity',
        type: 'line-chart-blue',
        value: {
          data: [4, 3, 10, 9, 29, 19, 22, 9, 12, 7, 19, 5, 13, 9, 17, 2, 7, 5],
          labels: [
            '1/11/2000',
            '2/11/2000',
            '3/11/2000',
            '4/11/2000',
            '5/11/2000',
            '6/11/2000',
            '7/11/2000',
            '8/11/2000',
            '9/11/2000',
            '10/11/2000',
            '11/11/2000',
            '12/11/2000',
            '1/11/2001',
            '2/11/2001',
            '3/11/2001',
            '4/11/2001',
            '5/11/2001',
            '6/11/2001'
          ]
        }
      },
      CamperScore: {
        name: 'Camper Score',
        type: 'score',
        value: 6.4
      },
      FoodieScore: {
        name: 'Foodie Score',
        type: 'score',
        value: 6.4
      },
      HealthScore: {
        name: 'Health Score',
        type: 'score',
        value: 9.4
      },
      OverallScore: {
        name: 'Overall Score',
        type: 'score',
        value: 6.4
      }
    }
  },
  {
    title: 'Budget',
    index: 4,
    content: {
      PieChart: {
        name: 'Pie',
        type: 'pie-chart',
        value: {
          data: [44, 55, 13, 43],
          labels: ['Accomodation', 'Food', 'Acitivities', 'Transport']
        }
      },
      Luxury: {
        name: 'Local Daily',
        type: 'cost',
        value: 450
      },
      Mid: {
        name: 'Family Daily',
        type: 'cost',
        value: 840
      },
      Cheap: {
        name: 'Average Daily',
        type: 'cost',
        value: 650
      },
      Accomodation: {
        name: 'Luxury Daily',
        type: 'cost',
        value: 920
      },
      Food: {
        name: 'Food Cost',
        type: 'cost',
        value: 210
      }
    }
  },
  {
    title: 'Flights',
    index: 5,

    content: {
      minCost: {
        name: 'Min Cost',
        type: 'cost',
        value: 170
      },
      maxCost: {
        name: 'Max Cost',
        type: 'cost',
        value: 540
      },
      medianCost: {
        name: 'Median Cost',
        type: 'cost',
        value: 290
      },
      airportCount: {
        name: 'Airports',
        type: 'score',
        value: 2
      },
      popularityChart: {
        name: 'Popularity',
        type: 'line-chart-blue',
        value: {
          data: [4, 3, 10, 9, 29, 19, 22, 9, 12, 7, 19, 5, 13, 9, 17, 2, 7, 5],
          labels: [
            '1/11/2000',
            '2/11/2000',
            '3/11/2000',
            '4/11/2000',
            '5/11/2000',
            '6/11/2000',
            '7/11/2000',
            '8/11/2000',
            '9/11/2000',
            '10/11/2000',
            '11/11/2000',
            '12/11/2000',
            '1/11/2001',
            '2/11/2001',
            '3/11/2001',
            '4/11/2001',
            '5/11/2001',
            '6/11/2001'
          ]
        }
      },
      nearestCities: {
        name: 'Nearest',
        type: 'table',
        value: 'Drobak,Toyen,Sinsen,Okern'
      },
      yourCitizenship: {
        name: 'Your citizenship',
        type: 'table',
        value: '🇹🇷 Turkish'
      },

      visaRequired: {
        name: 'Visa Required',
        type: 'table',
        value: 'yes'
      },
      expiresAt: {
        name: 'Expires at',
        type: 'table',
        value: '90 days'
      },
      maxStays: {
        name: 'Maximum stay',
        type: 'table',
        value: '90 days'
      },
      applicationRequired: {
        name: 'Application required',
        type: 'table',
        value: 'yes'
      },
      evisa: {
        name: 'e-visa',
        type: 'table',
        value: 'no'
      },
      visaFee: {
        name: 'Visa Fee',
        type: 'table',
        value: '46$'
      }
    }
  },
  {
    title: 'Visa Status',
    index: 6,
    content: {
      visaOf: {
        name: 'Visa of',
        type: 'table',
        value: '🇳🇴 Norway'
      },
      yourCitizenship: {
        name: 'Your citizenship',
        type: 'table',
        value: '🇹🇷 Turkish'
      },

      visaRequired: {
        name: 'Visa Required',
        type: 'table',
        value: 'yes'
      },
      expiresAt: {
        name: 'Expires at',
        type: 'table',
        value: '90 days'
      },
      maxStays: {
        name: 'Maximum stay',
        type: 'table',
        value: '90 days'
      },
      applicationRequired: {
        name: 'Application required',
        type: 'table',
        value: 'yes'
      },
      evisa: {
        name: 'e-visa',
        type: 'table',
        value: 'no'
      },
      visaFee: {
        name: 'Visa Fee',
        type: 'table',
        value: '46$'
      },

      moreInfo: {
        name: 'Visit site',
        type: 'link',
        value: 'http://valilik.oslo.gov.nl'
      }
    }
  },
  {
    title: 'Weather and Nature',
    index: 7,
    content: {
      TemperatureChart: {
        name: 'Temperature',
        type: 'line-chart-red',
        value: {
          data: [4, 3, 10, 9, 29, 19, 22, 9, 12, 7, 19, 5, 13, 9, 17, 2, 7, 5],
          labels: [
            '1/11/2000',
            '2/11/2000',
            '3/11/2000',
            '4/11/2000',
            '5/11/2000',
            '6/11/2000',
            '7/11/2000',
            '8/11/2000',
            '9/11/2000',
            '10/11/2000',
            '11/11/2000',
            '12/11/2000',
            '1/11/2001',
            '2/11/2001',
            '3/11/2001',
            '4/11/2001',
            '5/11/2001',
            '6/11/2001'
          ]
        }
      },
      temperature: {
        name: 'Temperature',
        type: 'score',
        value: 9.5
      },
      humidity: {
        name: 'Humidity',
        type: 'score',
        value: 9.5
      },
      uvLights: {
        name: 'UV Lights',
        type: 'score',
        value: 9.5
      },
      airQuality: {
        name: 'Air Quality',
        type: 'score',
        value: 9.5
      },
      altitude: {
        name: 'Forest Area',
        type: 'cost',
        value: 2500
      },
      forestAreaChart: {
        name: 'Green Area',
        type: 'forest',
        value: {
          data: [64, 15],
          label: ['Forest', 'Other']
        }
      },
      sustainability: {
        name: 'Sustainability',
        type: 'score',
        value: 8.5
      },
      nearestCoast: {
        name: 'Nearest Coast',
        type: 'cost',
        value: 850
      },

      areaPerPerson: {
        name: 'Altitude',
        type: 'cost',
        value: 550
      }
    }
  },
  {
    title: 'Culture',
    index: 8,
    content: {
      cultureScore: {
        name: 'Culture Score',
        type: 'score',
        value: 9.7
      },
      worldHeritages: {
        name: 'World Heritages',
        type: 'score',
        value: 21
      },
      socialScore: {
        name: 'Social Score',
        type: 'score',
        value: 9.7
      },
      foodQuality: {
        name: 'Food Quality',
        type: 'score',
        value: 6.7
      },
      languages: {
        name: 'Languages',
        type: 'table',
        value: 'English,Dutch,Norweigish'
      },
      nighLife: {
        name: 'Nightlife',
        type: 'table',
        value: 'active'
      },
      happinessLevel: {
        name: 'Happiness Level',
        type: 'table',
        value: 'High'
      },
      friendlyCulture: {
        name: 'Friendly Culture',
        type: 'table',
        value: 'yes'
      },
      englishLevel: {
        name: 'English Level',
        type: 'table',
        value: 'High'
      }
    }
  },
  {
    title: 'Transportation',
    index: 9,
    content: {
      transportCost: {
        name: 'Transport Daily',
        type: 'cost',
        value: 50
      },
      walkabilityScore: {
        name: 'Walk Score',
        type: 'score',
        value: 5.7
      },
      trafficDuration: {
        name: 'Traffic',
        type: 'cost',
        value: 3
      },
      transport: {
        name: 'Transport',
        type: 'pie-chart',
        value: {
          data: [44, 55, 13, 23, 34],
          labels: ['Bus', 'Metro', 'Bike', 'Train', 'Plane']
        }
      },
      safetyIndex: {
        name: 'Safest Cities',
        type: 'score',
        value: '30th'
      },
      publicTransportStations: {
        name: 'Public Transport',
        type: 'table',
        value: '314 stations'
      },
      bikeIndex: {
        name: 'Top Bike Cities',
        type: 'table',
        value: '67th /100'
      },
      bikeNetwork: {
        name: 'Bike Stations',
        type: 'table',
        value: '52 stations'
      },
      averageCafeDistance: {
        name: 'Average Cafe Distance',
        type: 'table',
        value: '1.2km'
      },
      lowTransportCost: {
        name: 'Lowcost Transport',
        type: 'table',
        value: '30$'
      },
      midTransportCost: {
        name: 'Midcost Transport',
        type: 'table',
        value: '50$'
      },
      highTransportCost: {
        name: 'Highcost Transport',
        type: 'table',
        value: '90$'
      },
      airportCount: {
        name: 'Airports',
        type: 'table',
        value: '2 airports'
      },
      nighLife9: {
        name: 'Average Market Distance',
        type: 'table',
        value: '0.9km'
      }
    }
  }
]

