import * as am5 from '@amcharts/amcharts5'

export const restrictionColors = {
  closed: am5.color(0xee77a2),
  restricted: am5.color(0xdae085),
  open: am5.color(0x69f084)
}

export const restrictionConfig = {
  'mask_status': {
    title: 'Mask Status',
    settings: {
      RECOMMENDED: {
        fill: restrictionColors.restricted
      },
      'NOT REQUIRED': {
        fill: restrictionColors.open
      },
      REQUIRED: {
        fill: restrictionColors.closed
      }
    }
  },
  'arrival_quarantine_status': {
    title: 'Arrival Quarantine',
    settings: {
      [false]: {
        fill: restrictionColors.open
      },
      [true]: {
        fill: restrictionColors.closed
      }
    }
  },
  'open_for_vaccinated': {
    title: 'Open for Vaccinated',
    settings: {
      [false]: {
        fill: restrictionColors.open
      },
      [true]: {
        fill: restrictionColors.closed
      }
    }
  },
  'vaccinated_arrival_test_required': {
    title: 'Test Required',
    settings: {
      [false]: {
        fill: restrictionColors.open
      },
      [true]: {
        fill: restrictionColors.closed
      }
    }
  },
  'vaccinated_arrival_quarantine_required': {
    title: 'Quarantine for Vaccinated',
    settings: {
      [false]: {
        fill: restrictionColors.open
      },
      [true]: {
        fill: restrictionColors.closed
      }
    }
  },
  'arrival_quarantine_required': {
    title: 'Quarantine Required',
    settings: {
      [false]: {
        fill: restrictionColors.open
      },
      [true]: {
        fill: restrictionColors.closed
      }
    }
  },
  'Public Transport': {
    title: 'Public Transport',
    settings: {
      'Partial Restrictions': {
        fill: restrictionColors.restricted
      },
      'Operating': {
        fill: restrictionColors.open
      },
      'Closed': {
        fill: restrictionColors.closed
      }
    }
  },
  'Dining and Bars': {
    title: 'Dining and Bars',
    settings: {
      'Partially Open': {
        fill: restrictionColors.restricted
      },
      'Open': {
        fill: restrictionColors.open
      },
      'Closed': {
        fill: restrictionColors.closed
      }
    }
  },
  'Tourist Attractions': {
    title: 'Tourist Attractions',
    settings: {
      'Partially Open': {
        fill: restrictionColors.restricted
      },
      'Open': {
        fill: restrictionColors.open
      },
      'Closed': {
        fill: restrictionColors.closed
      }
    }
  }
}

export const costOfLivingColors = {
  critical: am5.color(0xee77a2),
  bad: am5.color(0xfcbb86),
  medium: am5.color(0xdae085),
  good: am5.color(0x9ae4a7),
  verygood: am5.color(0x69f084)
}

export const costOfLivingConfig = {
  'meal_cheap_restaurant_cost_label': {
    title: 'Meal at Cheap Restaurant',
    settings: {
      '$0 - $5': {
        fill: costOfLivingColors.verygood
      },
      '$5 - $10': {
        fill: costOfLivingColors.good
      },
      '$10 - $15': {
        fill: costOfLivingColors.medium
      },
      '$15 - $20': {
        fill: costOfLivingColors.bad
      },
      '$25 +': {
        fill: costOfLivingColors.critical
      }
    }
  },
  'meal_mid_range_restaurant_cost_label': {
    title: 'Meal at Luxury Restaurant',
    settings: {
      '$10 - $20': {
        fill: costOfLivingColors.verygood
      },
      '$20 - $30': {
        fill: costOfLivingColors.verygood
      },
      '$30 - $40': {
        fill: costOfLivingColors.good
      },
      '$40 - $50': {
        fill: costOfLivingColors.good
      },
      '$50 - $60': {
        fill: costOfLivingColors.medium
      },
      '$60 - $70': {
        fill: costOfLivingColors.bad
      },
      '$70 - $80': {
        fill: costOfLivingColors.critical
      },
      '$80 +': {
        fill: costOfLivingColors.critical
      }
    }
  },
  'mcmeal_at_mcdonalds_cost_label': {
    title: 'McDonalds Meal',
    settings: {
      '$0 - $5': {
        fill: costOfLivingColors.verygood
      },
      '$5 - $10': {
        fill: costOfLivingColors.medium
      },
      '$10 - $15': {
        fill: costOfLivingColors.bad
      },
      '$15 +': {
        fill: costOfLivingColors.critical
      }
    }
  },
  'public_transport_cost_label': {
    title: 'Public Transport',
    settings: {
      '$0 - $0.5': {
        fill: costOfLivingColors.verygood
      },
      '$0.5 - $1': {
        fill: costOfLivingColors.good
      },
      '$1 - $1.5': {
        fill: costOfLivingColors.good
      },
      '$1.5 - $2.5': {
        fill: costOfLivingColors.medium
      },
      '$2.5 - $3.0': {
        fill: costOfLivingColors.bad
      },
      '$3.0 - $3.5': {
        fill: costOfLivingColors.critical
      }
    }
  },
  'beer_at_restaurant_cost_label': {
    title: 'Beer at Restaurant',
    settings: {
      '$0 - $2.5': {
        fill: costOfLivingColors.verygood
      },
      '$2.5 - $4': {
        fill: costOfLivingColors.good
      },
      '$4 - $5': {
        fill: costOfLivingColors.medium
      },
      '$5 - $6': {
        fill: costOfLivingColors.bad
      },
      '$6 - $7': {
        fill: costOfLivingColors.critical
      },
      '$7 +': {
        fill: costOfLivingColors.critical
      }
    }
  },
  'cinema_ticket_cost_label': {
    title: 'Cinema Ticket',
    settings: {
      '$0 - $5': {
        fill: costOfLivingColors.verygood
      },
      '$5 - $7': {
        fill: costOfLivingColors.good
      },
      '$7 - $10': {
        fill: costOfLivingColors.medium
      },
      '$10 - $15': {
        fill: costOfLivingColors.bad
      },
      '$15 +': {
        fill: costOfLivingColors.critical
      }
    },
    'taxi_1km_cost_label': {
      title: 'Taxi 1km',
      settings: {
        '$0 - $0.5': {
          fill: costOfLivingColors.verygood
        },
        '$0.5 - $1': {
          fill: costOfLivingColors.good
        },
        '$1 - $1.5': {
          fill: costOfLivingColors.medium
        },
        '$1.5 - $2': {
          fill: costOfLivingColors.bad
        },
        '$2 - $2.5': {
          fill: costOfLivingColors.critical
        },
        '$2.5 +': {
          fill: costOfLivingColors.critical
        }
      }
    }
  }
}


export const chartConfig = {
  'hotel-prices': {
    min: 'hotel_price_min',
    max: 'hotel_price_max'
  },
  'hostel-prices': {
    min: 'hostel_price_min',
    max: 'hostel_price_max'
  },
  'airbnb-prices': {
    min: 'vacation_rental_price_min',
    max: 'vacation_rental_price_max'
  },
  'temperature': {
    min: 'climate.t_min',
    max: 'climate.t_max'
  },
  'trip-days': {
    min: 'tripdays.min_days',
    max: 'tripdays.max_days'
  }
}
