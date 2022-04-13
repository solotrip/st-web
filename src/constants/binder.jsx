export const MAIN_OPTIONS = [
  { value: 'cost-of-living', label: 'Cost of Living' },
  { value: 'acommodation', label: 'Acommodation' },
  { value: 'weather', label: 'Weather' },
  { value: 'trip', label: 'Trip' }
]

export const OPTIONS = [
  { value: 'hotel-prices', label: 'Hotel Prices' },
  { value: 'hostel-prices', label: 'Hostel Prices' },
  { value: 'airbnb-prices', label: 'Airbnb Prices' },
  { value: 'temperature', label: 'Temperature' },
  { value: 'trip-days', label: 'Tripdays' },
  { value: 'cost-of-living', label: 'Cost of Living' }
]

export const TABLE_CATEGORIES = [
  { category: 'Meal at Cheap Restaurant' },
  { category: 'Meal at Luxury Restaurant' },
  { category: 'McDonalds Menu' },
  { category: 'Public Transport' },
  { category: 'Beer at Restaurant' },
  { category: 'Prepaid Card' },
  { category: 'Cinema Ticket' },
  { category: 'Taxi 1km' }
]

export const SUB_OPTIONS = [
  {
    option: 'cost-of-living',
    suboptions: [
      { value: 'meal-at-cheap-restaurant', label: 'Meal at Cheap Restaurant' },
      { value: 'meal-at-luxury-restaurant', label: 'Meal at Luxury Restaurant' },
      { value: 'mcdonalds-menu', label: 'McDonalds Menu' },
      { value: 'beer-at-restaurant', label: 'Beer at Restaurant' },
      { value: 'public-transport', label: 'Public Transport' },
      { value: 'beer-from-market', label: 'Beer from Market' },
      { value: 'monthly-transport-pass', label: 'Monthly Transport Pass' },
      { value: 'gasoline-1-liter', label: 'Gasoline 1 Liter' },
      { value: 'prepaid-card', label: 'Prepaid Card' },
      { value: 'internet', label: 'Internet' },
      { value: 'cinema-ticket', label: 'Cinema Ticket' },
      { value: 'taxi-1km', label: 'Taxi 1km' }
    ]
  },
  {
    option: 'acommodation',
    suboptions: [
      { value: 'min-hotel-prices', label: 'Minimum Hotel Prices' },
      { value: 'max-hotel-prices', label: 'Maximum Hotel Prices' },
      { value: 'min-hostel-prices', label: 'Minimum Hostel Prices' },
      { value: 'max-hostel-prices', label: 'Maximum Hostel Prices' },
      { value: 'min-airbnb-prices', label: 'Minimum Airbnb Prices' },
      { value: 'max-airbnb-prices', label: 'Maximum Airbnb Prices' }
    ]
  },
  {
    option: 'weather',
    suboptions: [
      { value: 'min-temperature', label: 'Minimum Temperature' },
      { value: 'max-temperature', label: 'Maximum Temperature' },
      { value: 'avg-temperature', label: 'Average Temperature' },
      { value: 'humidity', label: 'Humidity' },
      { value: 'w-speed', label: 'Wind Speed' },
      { value: 'rainy-days', label: 'Rainy Days' }
    ]
  },
  {
    option: 'trip',
    suboptions: [
      { value: 'distance', label: 'Distance' },
      { value: 'duration', label: 'Duration' },
      { value: 'quick_trip', label: 'Quick Trip' },
      { value: 'ideal_trip', label: 'Ideal Trip' },
      { value: 'long_trip', label: 'Long Trip' }
    ]
  }
]
