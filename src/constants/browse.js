/* eslint-disable max-len */
export const events = [
  {
    image:
      'https://images.unsplash.com/photo-1580397581145-cdb6a35b7d3f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1330&q=80',
    title: 'Octoberfest',
    startDate: '2022-03-19',
    endDate: '2022-03-22',
    query:
      'recommendations?months%5B0%5D=12&months%5B1%5D=3&months%5B2%5D=4&months%5B3%5D=5&weekendOnly=true&lat=39.77667&lon=30.52056',
    areaString: 'Munich, DE',
    type: 'event'
  },
  {
    image:
      'https://images.unsplash.com/photo-1491659015174-15b37116b4a4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    title: 'Formula Istanbul 2022',
    startDate: '2022-05-02',
    endDate: '2022-05-02',
    query:
      'recommendations?months%5B0%5D=12&months%5B1%5D=3&months%5B2%5D=4&months%5B3%5D=5&weekendOnly=true&lat=39.77667&lon=30.52056',
    areaString: 'Istanbul, TR',
    type: 'event'
  },
  {
    image:
      'https://images.unsplash.com/photo-1506157786151-b8491531f063?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    title: 'Ultra Music Festival',
    startDate: '2022-06-02',
    endDate: '2022-06-09',
    query:
      'recommendations?months%5B0%5D=12&months%5B1%5D=3&months%5B2%5D=4&months%5B3%5D=5&weekendOnly=true&lat=39.77667&lon=30.52056',
    areaString: 'Miami, FL, US',
    type: 'event'
  },
  {
    image:
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
    title: 'Contact Festival',
    startDate: '2022-06-02',
    endDate: '2022-06-09',
    query:
      'recommendations?months%5B0%5D=12&months%5B1%5D=3&months%5B2%5D=4&months%5B3%5D=5&weekendOnly=true&lat=39.77667&lon=30.52056',
    areaString: 'Vancouver, WA, CA',
    type: 'event'
  }
]

export const restrictions = [
  {
    image:
      'https://images.unsplash.com/photo-1619183921628-9e6050dcd2e1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
    title: 'No Required Test',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a2718eb-59bc-11ec-9ac1-579044a72771',
    type: 'restriction'
  },
  {
    image:
      'https://images.unsplash.com/photo-1586639940725-855e29712629?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    title: 'No Required Quarantine',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a2718e9-59bc-11ec-9ac1-579044a72771',
    type: 'restriction'
  },
  {
    image:
      'https://images.unsplash.com/photo-1619183921628-9e6050dcd2e1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
    title: 'Required Test',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a2718ec-59bc-11ec-9ac1-579044a72771',
    type: 'restriction'
  },
  {
    image:
      'https://images.unsplash.com/photo-1586639940725-855e29712629?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    title: 'Required Quarantine',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a2718ea-59bc-11ec-9ac1-579044a72771',
    type: 'restriction'
  },
  {
    image:
      'https://images.unsplash.com/photo-1586639940725-855e29712629?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    title: 'No Quarantine for Vaccinated',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a2718ed-59bc-11ec-9ac1-579044a72771',
    type: 'restriction'
  },
  {
    image:
      'https://images.unsplash.com/photo-1586639940725-855e29712629?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    title: 'Quarantine Required for Vaccinated',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a2718ee-59bc-11ec-9ac1-579044a72771',
    type: 'restriction'
  },
  {
    image:
      'https://images.unsplash.com/photo-1619183921628-9e6050dcd2e1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
    title: 'Test Required for Vaccinated',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a2718f0-59bc-11ec-9ac1-579044a72771',
    type: 'restriction'
  },
  {
    image:
      'https://images.unsplash.com/photo-1619183921628-9e6050dcd2e1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
    title: 'No Test Required for Vaccinated',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a2718ef-59bc-11ec-9ac1-579044a72771',
    type: 'restriction'
  },
  {
    image:
      'https://images.unsplash.com/photo-1608326389386-0305acbe600f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=755&q=80',
    title: 'Not Open for Vaccinated',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a2718f1-59bc-11ec-9ac1-579044a72771',
    type: 'restriction'
  },
  {
    image:
      'https://images.unsplash.com/photo-1608326389386-0305acbe600f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=755&q=80',
    title: 'Open for Vaccinated',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a2718f2-59bc-11ec-9ac1-579044a72771',
    type: 'restriction'
  },
  {
    image:
      'https://images.unsplash.com/photo-1565881606991-789a8dff9dbb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80',
    title: 'Attractions are Restricted',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a2718f3-59bc-11ec-9ac1-579044a72771',
    type: 'restriction'
  },
  {
    image:
      'https://images.unsplash.com/photo-1565881606991-789a8dff9dbb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80',
    title: 'Attractions are Open',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a2718f4-59bc-11ec-9ac1-579044a72771',
    type: 'restriction'
  },
  {
    image:
      'https://images.unsplash.com/photo-1565881606991-789a8dff9dbb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80',
    title: 'Attractions are Closed',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a2718f5-59bc-11ec-9ac1-579044a72771',
    type: 'restriction'
  },
  {
    image:
      'https://images.unsplash.com/photo-1597440658768-f3ffdf64223c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    title: 'Mask is Required',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a2718f8-59bc-11ec-9ac1-579044a72771',
    type: 'restriction'
  },
  {
    image:
      'https://images.unsplash.com/photo-1597440658768-f3ffdf64223c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    title: 'Mask is Recommended',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a2718f7-59bc-11ec-9ac1-579044a72771',
    type: 'restriction'
  },
  {
    image:
      'https://images.unsplash.com/photo-1597440658768-f3ffdf64223c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    title: 'Mask is not Required',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a2718f8-59bc-11ec-9ac1-579044a72771',
    type: 'restriction'
  },
  {
    image:
      'https://images.unsplash.com/photo-1491333078588-55b6733c7de6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    title: 'Bars are Restricted',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a2718f9-59bc-11ec-9ac1-579044a72771',
    type: 'restriction'
  },
  {
    image:
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    title: 'Restaurants are Restricted',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a2718fc-59bc-11ec-9ac1-579044a72771',
    type: 'restriction'
  },
  {
    image:
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    title: 'Restaurants are Open',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a2718fe-59bc-11ec-9ac1-579044a72771',
    type: 'restriction'
  },
  {
    image:
      'https://images.unsplash.com/photo-1491333078588-55b6733c7de6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    title: 'Bars are Closed',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a2718fa-59bc-11ec-9ac1-579044a72771',
    type: 'restriction'
  },
  {
    image:
      'https://images.unsplash.com/photo-1491333078588-55b6733c7de6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    title: 'Bars are Open',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a2718fb-59bc-11ec-9ac1-579044a72771',
    type: 'restriction'
  },
  {
    image:
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    title: 'Restaurants are Closed',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a2718fd-59bc-11ec-9ac1-579044a72771',
    type: 'restriction'
  },
  {
    image:
      'https://images.unsplash.com/photo-1559538834-8b012e20a84f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80',
    title: 'Active Public Transport',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a2718ff-59bc-11ec-9ac1-579044a72771',
    type: 'restriction'
  },
  {
    image:
      'https://images.unsplash.com/photo-1559538834-8b012e20a84f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80',
    title: 'Restricted Public Transport',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a271900-59bc-11ec-9ac1-579044a72771',
    type: 'restriction'
  }
]

export const visas = [
  {
    image:
      'https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    title: 'Visa on Arrival',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a273ff2-59bc-11ec-9ac1-579044a72771',
    type: 'visa'
  },
  {
    image:
      'https://images.unsplash.com/photo-1581553673739-c4906b5d0de8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    title: 'Visa Free for You',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a273ff1-59bc-11ec-9ac1-579044a72771',
    type: 'visa'
  }
]

export const activities = [
  {
    title: 'Hiking',
    image:
      'https://images.unsplash.com/photo-1600599067176-1f47e3b6fe47?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a271902-59bc-11ec-9ac1-579044a72771',
    type: 'activity'
  },
  {
    title: 'Backcountry Skiing',
    image:
      'https://ik.imagekit.io/7zlqc1cmihe/activity-images-out/backcountry-skiing.png?updatedAt=1636825570822',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a26a3b1-59bc-11ec-9ac1-579044a72771',
    type: 'activity'
  },
  {
    title: 'Road Bike',
    image:
      'https://ik.imagekit.io/7zlqc1cmihe/activity-images-out/road-bike.png?updatedAt=1636825565570',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a26a3b2-59bc-11ec-9ac1-579044a72771',
    type: 'activity'
  },
  {
    title: 'Mountain Bike',
    image:
      'https://ik.imagekit.io/7zlqc1cmihe/activity-images-out/mountain-bike.png?updatedAt=1636825570437',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a26a3b3-59bc-11ec-9ac1-579044a72771',
    type: 'activity'
  },
  {
    title: 'Dog Sledding',
    image:
      'https://ik.imagekit.io/7zlqc1cmihe/activity-images-out/dog-sledding.png?updatedAt=1636825566610',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a26a3b4-59bc-11ec-9ac1-579044a72771',
    type: 'activity'
  },
  {
    title: 'Alpine Ski',
    image:
      'https://ik.imagekit.io/7zlqc1cmihe/activity-images-out/alpine-ski.png?updatedAt=1636825567908',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a26a3b5-59bc-11ec-9ac1-579044a72771',
    type: 'activity'
  },
  {
    title: 'Cross Country Skiing',
    image:
      'https://ik.imagekit.io/7zlqc1cmihe/activity-images-out/cross-country-skiing.png?updatedAt=1636825568647',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a26a3b6-59bc-11ec-9ac1-579044a72771',
    type: 'activity'
  },
  {
    title: 'Snowmobile',
    image:
      'https://ik.imagekit.io/7zlqc1cmihe/activity-images-out/snowmobile.png?updatedAt=1636825564689',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a26a3b7-59bc-11ec-9ac1-579044a72771',
    type: 'activity'
  },
  {
    title: 'Alpine Climbing',
    image:
      'https://ik.imagekit.io/7zlqc1cmihe/activity-images-out/alpine-climbing.png?updatedAt=1636825561640',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a26a3b8-59bc-11ec-9ac1-579044a72771',
    type: 'activity'
  },
  {
    title: 'Off Road',
    image:
      'https://ik.imagekit.io/7zlqc1cmihe/activity-images-out/offroad.png?updatedAt=1636825566431',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a26a3b9-59bc-11ec-9ac1-579044a72771',
    type: 'activity'
  },
  {
    title: 'Walking',
    image:
      'https://ik.imagekit.io/7zlqc1cmihe/activity-images-out/walking.png?updatedAt=1636825564372',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a26a3ba-59bc-11ec-9ac1-579044a72771',
    type: 'activity'
  },
  {
    title: 'Motorboat',
    image:
      'https://ik.imagekit.io/7zlqc1cmihe/activity-images-out/motorboat.png?updatedAt=1636825567657',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a26a3bb-59bc-11ec-9ac1-579044a72771',
    type: 'activity'
  },
  {
    title: 'Car',
    image:
      'https://ik.imagekit.io/7zlqc1cmihe/activity-images-out/car.png?updatedAt=1636825569690',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a26a3bc-59bc-11ec-9ac1-579044a72771',
    type: 'activity'
  },
  {
    title: 'Quad',
    image:
      'https://ik.imagekit.io/7zlqc1cmihe/activity-images-out/quad.png?updatedAt=1636825569344',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a26a3bd-59bc-11ec-9ac1-579044a72771',
    type: 'activity'
  },
  {
    title: 'Kayak/ Canoe',
    image:
      'https://ik.imagekit.io/7zlqc1cmihe/activity-images-out/kayak.png?updatedAt=1636825567843',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a26a3be-59bc-11ec-9ac1-579044a72771',
    type: 'activity'
  },
  {
    title: 'Plane',
    image:
      'https://ik.imagekit.io/7zlqc1cmihe/activity-images-out/plane.png?updatedAt=1636825564819',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a26a3bf-59bc-11ec-9ac1-579044a72771',
    type: 'activity'
  },
  {
    title: 'Longboard/ Skateboard',
    image:
      'https://ik.imagekit.io/7zlqc1cmihe/activity-images-out/longboard.png?updatedAt=1636825569150',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a26a3c0-59bc-11ec-9ac1-579044a72771',
    type: 'activity'
  },
  {
    title: 'Running',
    image:
      'https://ik.imagekit.io/7zlqc1cmihe/activity-images-out/running.png?updatedAt=1636825570282',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a26a3c1-59bc-11ec-9ac1-579044a72771',
    type: 'activity'
  },
  {
    title: 'Trail Running',
    image:
      'https://ik.imagekit.io/7zlqc1cmihe/activity-images-out/trail-running.png?updatedAt=1636825570378',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a26a3c2-59bc-11ec-9ac1-579044a72771',
    type: 'activity'
  },
  {
    title: 'Rowing',
    image:
      'https://ik.imagekit.io/7zlqc1cmihe/activity-images-out/rowing.png?updatedAt=1636825562419',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a26a3c3-59bc-11ec-9ac1-579044a72771',
    type: 'activity'
  },
  {
    title: 'Bicycle Touring',
    image:
      'https://ik.imagekit.io/7zlqc1cmihe/activity-images-out/bicycle-touring.png?updatedAt=1636825564888',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a26a3c4-59bc-11ec-9ac1-579044a72771',
    type: 'activity'
  },
  {
    title: 'Multisport',
    image:
      'https://ik.imagekit.io/7zlqc1cmihe/headertemplate4x.png?updatedAt=1636665389858',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a26a3c5-59bc-11ec-9ac1-579044a72771',
    type: 'activity'
  },
  {
    title: 'Road Motorbike',
    image:
      'https://ik.imagekit.io/7zlqc1cmihe/activity-images-out/road-motorbike.png?updatedAt=1636825609168',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a26a3c6-59bc-11ec-9ac1-579044a72771',
    type: 'activity'
  },
  {
    title: 'Horseback Riding',
    image:
      'https://ik.imagekit.io/7zlqc1cmihe/activity-images-out/horseback-riding.png?updatedAt=1636825569494',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a26a3c7-59bc-11ec-9ac1-579044a72771',
    type: 'activity'
  },
  {
    title: 'Canicross',
    image:
      'https://ik.imagekit.io/7zlqc1cmihe/headertemplate4x.png?updatedAt=1636665389858',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a26a3c8-59bc-11ec-9ac1-579044a72771',
    type: 'activity'
  },
  {
    title: 'Spelunking',
    image:
      'https://ik.imagekit.io/7zlqc1cmihe/headertemplate4x.png?updatedAt=1636665389858',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a26a3c9-59bc-11ec-9ac1-579044a72771',
    type: 'activity'
  },
  {
    title: 'Dual-sport Motorcycle',
    image:
      'https://ik.imagekit.io/7zlqc1cmihe/activity-images-out/dual-sport-motorcycle.png?updatedAt=1636825571101',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a26a3ca-59bc-11ec-9ac1-579044a72771',
    type: 'activity'
  },
  {
    title: 'Enduro Motorcycle',
    image:
      'https://ik.imagekit.io/7zlqc1cmihe/activity-images-out/enduro-motorcycle.png?updatedAt=1636825568796',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a26cac0-59bc-11ec-9ac1-579044a72771',
    type: 'activity'
  },
  {
    title: 'Motorhome',
    image:
      'https://ik.imagekit.io/7zlqc1cmihe/activity-images-out/motorhome.png?updatedAt=1636825568990',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a26cac1-59bc-11ec-9ac1-579044a72771',
    type: 'activity'
  },
  {
    title: 'Sail Boat',
    image:
      'https://ik.imagekit.io/7zlqc1cmihe/activity-images-out/sailboat.png?updatedAt=1636825568104',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a26cac2-59bc-11ec-9ac1-579044a72771',
    type: 'activity'
  },
  {
    title: 'Barefoot',
    image:
      'https://ik.imagekit.io/7zlqc1cmihe/activity-images-out/bare-foot.png?updatedAt=1636825561909',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a26cac3-59bc-11ec-9ac1-579044a72771',
    type: 'activity'
  },
  {
    title: 'Air Balloon',
    image:
      'https://ik.imagekit.io/7zlqc1cmihe/activity-images-out/air-baloon.png?updatedAt=1636825561019',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a26cac4-59bc-11ec-9ac1-579044a72771',
    type: 'activity'
  },
  {
    title: 'Snowshoe',
    image:
      'https://ik.imagekit.io/7zlqc1cmihe/activity-images-out/snowshoe.png?updatedAt=1636825568958',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a26cac5-59bc-11ec-9ac1-579044a72771',
    type: 'activity'
  },
  {
    title: 'EBike',
    image:
      'https://ik.imagekit.io/7zlqc1cmihe/activity-images-out/ebike.png?updatedAt=1636825568512',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a26cac6-59bc-11ec-9ac1-579044a72771',
    type: 'activity'
  },
  {
    title: 'Downhill MTB',
    image:
      'https://ik.imagekit.io/7zlqc1cmihe/activity-images-out/downhill-mtb.png?updatedAt=1636825571111',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a26cac7-59bc-11ec-9ac1-579044a72771',
    type: 'activity'
  },
  {
    title: 'Rafting',
    image:
      'https://ik.imagekit.io/7zlqc1cmihe/activity-images-out/rafting.png?updatedAt=1636825568761',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a26cac8-59bc-11ec-9ac1-579044a72771',
    type: 'activity'
  },
  {
    title: 'Train',
    image:
      'https://ik.imagekit.io/7zlqc1cmihe/activity-images-out/train.png?updatedAt=1636825567359',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a26cac9-59bc-11ec-9ac1-579044a72771',
    type: 'activity'
  },
  {
    title: 'BASE Jumping',
    image:
      'https://ik.imagekit.io/7zlqc1cmihe/activity-images-out/base-jumping.png?updatedAt=1636825564374',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a26caca-59bc-11ec-9ac1-579044a72771',
    type: 'activity'
  },
  {
    title: 'Paragliding',
    image:
      'https://ik.imagekit.io/7zlqc1cmihe/activity-images-out/paragliding.png?updatedAt=1636825568446',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a26cacb-59bc-11ec-9ac1-579044a72771',
    type: 'activity'
  },
  {
    title: 'Reduced Mobility',
    image:
      'https://ik.imagekit.io/7zlqc1cmihe/activity-images-out/reduced-mobility.png?updatedAt=1636825570789',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a26cacc-59bc-11ec-9ac1-579044a72771',
    type: 'activity'
  },
  {
    title: 'Via Ferrata',
    image:
      'https://ik.imagekit.io/7zlqc1cmihe/activity-images-out/via-ferrata.png?updatedAt=1636825565413',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a26cacd-59bc-11ec-9ac1-579044a72771',
    type: 'activity'
  },
  {
    title: 'Orienteering',
    image:
      'https://ik.imagekit.io/7zlqc1cmihe/activity-images-out/orienteering.png?updatedAt=1636825568728',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a26cace-59bc-11ec-9ac1-579044a72771',
    type: 'activity'
  },
  {
    title: 'Skating',
    image:
      'https://ik.imagekit.io/7zlqc1cmihe/activity-images-out/skating.png?updatedAt=1636825564866',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a26cacf-59bc-11ec-9ac1-579044a72771',
    type: 'activity'
  },
  {
    title: 'Jet Ski',
    image:
      'https://ik.imagekit.io/7zlqc1cmihe/activity-images-out/jet-ski.png?updatedAt=1636825566944',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a26cad0-59bc-11ec-9ac1-579044a72771',
    type: 'activity'
  },
  {
    title: 'Stand up Paddle',
    image:
      'https://ik.imagekit.io/7zlqc1cmihe/activity-images-out/stand-up-paddle.png?updatedAt=1636825567930',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a26cad1-59bc-11ec-9ac1-579044a72771',
    type: 'activity'
  },
  {
    title: 'Trials Motorcycle',
    image:
      'https://ik.imagekit.io/7zlqc1cmihe/activity-images-out/dual-sport-motorcycle.png?updatedAt=1636825571101',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a26cad2-59bc-11ec-9ac1-579044a72771',
    type: 'activity'
  },
  {
    title: 'Golf',
    image:
      'https://ik.imagekit.io/7zlqc1cmihe/activity-images-out/golf.png?updatedAt=1636825568067',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a26cad3-59bc-11ec-9ac1-579044a72771',
    type: 'activity'
  },
  {
    title: 'Airboat',
    image:
      'https://ik.imagekit.io/7zlqc1cmihe/activity-images-out/airboat.png?updatedAt=1636825565446',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a26cad4-59bc-11ec-9ac1-579044a72771',
    type: 'activity'
  },
  {
    title: 'Inline Skate',
    image:
      'https://ik.imagekit.io/7zlqc1cmihe/activity-images-out/inline-skate.png?updatedAt=1636825566000',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a26cad5-59bc-11ec-9ac1-579044a72771',
    type: 'activity'
  },
  {
    title: 'Birdwatching',
    image:
      'https://ik.imagekit.io/7zlqc1cmihe/activity-images-out/birdwatching.png?updatedAt=1636825564385',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a26cad6-59bc-11ec-9ac1-579044a72771',
    type: 'activity'
  },
  {
    title: 'Nordic Walking',
    image:
      'https://ik.imagekit.io/7zlqc1cmihe/activity-images-out/nordic-walking.png?updatedAt=1636825567439',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a26cad7-59bc-11ec-9ac1-579044a72771',
    type: 'activity'
  },
  {
    title: 'Wildlife Watching',
    image:
      'https://ik.imagekit.io/7zlqc1cmihe/activity-images-out/wildlife-watching.png?updatedAt=1636825569908',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a26cad8-59bc-11ec-9ac1-579044a72771',
    type: 'activity'
  },
  {
    title: 'Gravel Bike',
    image:
      'https://ik.imagekit.io/7zlqc1cmihe/activity-images-out/gravel-bike.png?updatedAt=1636825570305',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a26cad9-59bc-11ec-9ac1-579044a72771',
    type: 'activity'
  },
  {
    title: 'Canyoneering',
    image:
      'https://ik.imagekit.io/7zlqc1cmihe/activity-images-out/canyoneering.png?updatedAt=1636825565711',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a26cada-59bc-11ec-9ac1-579044a72771',
    type: 'activity'
  },
  {
    title: 'Drone',
    image:
      'https://ik.imagekit.io/7zlqc1cmihe/activity-images-out/drone.png?updatedAt=1636825561704',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a26cadc-59bc-11ec-9ac1-579044a72771',
    type: 'activity'
  },
  {
    title: 'Bikepacking',
    image:
      'https://ik.imagekit.io/7zlqc1cmihe/activity-images-out/bikepacking.png?updatedAt=1636825565714',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a26cadd-59bc-11ec-9ac1-579044a72771',
    type: 'activity'
  },
  {
    title: 'Diving',
    image:
      'https://ik.imagekit.io/7zlqc1cmihe/activity-images-out/diving.png?updatedAt=1636825569770',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a26cade-59bc-11ec-9ac1-579044a72771',
    type: 'activity'
  },
  {
    title: 'Snowboarding',
    image:
      'https://ik.imagekit.io/7zlqc1cmihe/activity-images-out/snowboarding.png?updatedAt=1636825565519',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a26cadf-59bc-11ec-9ac1-579044a72771',
    type: 'activity'
  },
  {
    title: 'Handbike',
    image:
      'https://ik.imagekit.io/7zlqc1cmihe/activity-images-out/handbike.png?updatedAt=1636825570421',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a26cae0-59bc-11ec-9ac1-579044a72771',
    type: 'activity'
  },
  {
    title: 'Rock Climbing',
    image:
      'https://ik.imagekit.io/7zlqc1cmihe/activity-images-out/rock-climbing.png?updatedAt=1636825566382',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a26cae1-59bc-11ec-9ac1-579044a72771',
    type: 'activity'
  },
  {
    title: 'Baby Stroller',
    image:
      'https://ik.imagekit.io/7zlqc1cmihe/activity-images-out/babystroller.png?updatedAt=1636825569815',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a26cae2-59bc-11ec-9ac1-579044a72771',
    type: 'activity'
  },
  {
    title: 'Kitesurfing',
    image:
      'https://ik.imagekit.io/7zlqc1cmihe/activity-images-out/kite-surfing.png?updatedAt=1636825569151',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a26cae3-59bc-11ec-9ac1-579044a72771',
    type: 'activity'
  },
  {
    title: 'Kickbike',
    image:
      'https://ik.imagekit.io/7zlqc1cmihe/headertemplate4x.png?updatedAt=1636665389858',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a26cae6-59bc-11ec-9ac1-579044a72771',
    type: 'activity'
  },
  {
    title: 'Camel',
    image:
      'https://ik.imagekit.io/7zlqc1cmihe/activity-images-out/camel.png?updatedAt=1636825567260',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a26cae7-59bc-11ec-9ac1-579044a72771',
    type: 'activity'
  },
  {
    title: 'Mountain Unicycle',
    image:
      'https://ik.imagekit.io/7zlqc1cmihe/activity-images-out/mountain-unicycles.png?updatedAt=1636826318456',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a26cae8-59bc-11ec-9ac1-579044a72771',
    type: 'activity'
  },
  {
    title: 'Splitboard',
    image:
      'https://ik.imagekit.io/7zlqc1cmihe/activity-images-out/splitboard.png?updatedAt=1636825567579',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a26cae9-59bc-11ec-9ac1-579044a72771',
    type: 'activity'
  },
  {
    title: 'Segway',
    image:
      'https://ik.imagekit.io/7zlqc1cmihe/headertemplate4x.png?updatedAt=1636665389858',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a26caea-59bc-11ec-9ac1-579044a72771',
    type: 'activity'
  },
  {
    title: 'Flora Observation',
    image:
      'https://ik.imagekit.io/7zlqc1cmihe/activity-images-out/flora-observation.png?updatedAt=1636825571047',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a26caeb-59bc-11ec-9ac1-579044a72771',
    type: 'activity'
  },
  {
    title: 'Trailer Bike',
    image:
      'https://ik.imagekit.io/7zlqc1cmihe/activity-images-out/mountain-bike.png?updatedAt=1636825570437',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a26f1d0-59bc-11ec-9ac1-579044a72771',
    type: 'activity'
  },
  {
    title: 'Kite Ski',
    image:
      'https://ik.imagekit.io/7zlqc1cmihe/activity-images-out/kite-ski.png?updatedAt=1636825564607',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a26f1d1-59bc-11ec-9ac1-579044a72771',
    type: 'activity'
  },
  {
    title: 'Ice Climbing',
    image:
      'https://ik.imagekit.io/7zlqc1cmihe/activity-images-out/ice-climbing.png?updatedAt=1636825568837',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a26f1d2-59bc-11ec-9ac1-579044a72771',
    type: 'activity'
  },
  {
    title: 'Joëlette',
    image:
      'https://ik.imagekit.io/7zlqc1cmihe/headertemplate4x.png?updatedAt=1636665389858',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a26f1d3-59bc-11ec-9ac1-579044a72771',
    type: 'activity'
  },
  {
    title: 'Freeride Ski',
    image:
      'https://ik.imagekit.io/7zlqc1cmihe/activity-images-out/freeride-ski.png?updatedAt=1636825565951',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a26f1d3-59bc-11ec-9ac1-579044a72771',
    type: 'activity'
  },
  {
    title: 'Plogging',
    image:
      'https://ik.imagekit.io/7zlqc1cmihe/headertemplate4x.png?updatedAt=1636665389858',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a26f1d6-59bc-11ec-9ac1-579044a72771',
    type: 'activity'
  },
  {
    title: 'Roller Ski',
    image:
      'https://ik.imagekit.io/7zlqc1cmihe/activity-images-out/roller-ski.png?updatedAt=1636825570239',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a26f1d7-59bc-11ec-9ac1-579044a72771',
    type: 'activity'
  },
  {
    title: 'Hang Gliding',
    image:
      'https://ik.imagekit.io/7zlqc1cmihe/activity-images-out/hang-gliding.png?updatedAt=1636825565549',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a26f1d8-59bc-11ec-9ac1-579044a72771',
    type: 'activity'
  },
  {
    title: 'Scooter',
    image:
      'https://ik.imagekit.io/7zlqc1cmihe/activity-images-out/scooter.png?updatedAt=1636825600306',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a26f1d9-59bc-11ec-9ac1-579044a72771',
    type: 'activity'
  },
  {
    title: 'Camping',
    image:
      'https://ik.imagekit.io/7zlqc1cmihe/activity-images-out/camping.png?updatedAt=1636825568431',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a26f1da-59bc-11ec-9ac1-579044a72771',
    type: 'activity'
  },
  {
    title: 'Geocache',
    image:
      'https://ik.imagekit.io/7zlqc1cmihe/activity-images-out/geocaching.png?updatedAt=1636825600599',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a26f1db-59bc-11ec-9ac1-579044a72771',
    type: 'activity'
  },
  {
    title: 'Swimming',
    image:
      'https://ik.imagekit.io/7zlqc1cmihe/activity-images-out/swimming.png?updatedAt=1636914367504',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a26cade-59bc-11ec-9ac1-579044a72771',
    type: 'activity'
  }
]

export const weather = [
  {
    title: 'Mostly Rainy',
    image:
      'https://images.unsplash.com/photo-1610741083757-1ae88e1a17f7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a2718e8-59bc-11ec-9ac1-579044a72771',
    type: 'weather'
  },
  {
    title: 'Sometimes Rainy',
    image:
      'https://images.unsplash.com/photo-1609229684650-e8735874e002?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1075&q=80',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a2718e7-59bc-11ec-9ac1-579044a72771',
    type: 'weather'
  },
  {
    title: 'Cold',
    image:
      'https://images.unsplash.com/photo-1610000025512-a082c31aaf7f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a271902-59bc-11ec-9ac1-579044a72771',
    type: 'weather'
  },
  {
    title: 'Warm',
    image:
      'https://images.unsplash.com/photo-1512463496162-08411bca9673?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=715&q=80',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a271903-59bc-11ec-9ac1-579044a72771',
    type: 'weather'
  },
  {
    title: 'Freezing',
    image:
      'https://images.unsplash.com/photo-1577457943926-11193adc0563?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1202&q=80',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a271903-59bc-11ec-9ac1-579044a72771',
    type: 'weather'
  },
  {
    title: 'Hot',
    image:
      'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a271904-59bc-11ec-9ac1-579044a72771',
    type: 'weather'
  },
  {
    title: 'Low Humidity',
    image:
      'https://ik.imagekit.io/7zlqc1cmihe/headertemplate4x.png?updatedAt=1636665389858',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a2718e0-59bc-11ec-9ac1-579044a72771',
    type: 'weather'
  },
  {
    title: 'Moderate Humidity',
    image:
      'https://ik.imagekit.io/7zlqc1cmihe/headertemplate4x.png?updatedAt=1636665389858',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a2718e1-59bc-11ec-9ac1-579044a72771',
    type: 'weather'
  },
  {
    title: 'High Humidity',
    image:
      'https://ik.imagekit.io/7zlqc1cmihe/headertemplate4x.png?updatedAt=1636665389858',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a2718e2-59bc-11ec-9ac1-579044a72771',
    type: 'weather'
  },
  {
    title: 'Dry',
    image:
      'https://ik.imagekit.io/7zlqc1cmihe/headertemplate4x.png?updatedAt=1636665389858',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=99a2718e6-59bc-11ec-9ac1-579044a72771',
    type: 'weather'
  }
]

export const featured = [
  {
    title: 'Destinations where the movies were shot',
    image:
      'https://images.unsplash.com/photo-1528287942171-fbe365d1d9ac?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
    query:
      'recommendations?months%5B0%5D=12&months%5B1%5D=3&months%5B2%5D=4&months%5B3%5D=5&weekendOnly=true&lat=39.77667&lon=30.52056',
    type: 'featured'
  },
  {
    title: 'Budget destinations in Europe that I can visit next weekend',
    image:
      'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80s',
    query:
      'recommendations?months%5B0%5D=12&months%5B1%5D=3&months%5B2%5D=4&months%5B3%5D=5&weekendOnly=true&lat=39.77667&lon=30.52056',
    type: 'featured'
  },
  {
    title: 'Isolated places near me',
    image:
      'https://images.unsplash.com/photo-1543804082-5e00fcfc1e66?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1149&q=80',
    query:
      'recommendations?months%5B0%5D=12&months%5B1%5D=3&months%5B2%5D=4&months%5B3%5D=5&weekendOnly=true&lat=39.77667&lon=30.52056',
    type: 'featured'
  },
  {
    title: 'Visa free destinations on Coldplay tour',
    image:
      'https://images.unsplash.com/photo-1618901882475-4a8ce888ffda?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80',
    query:
      'recommendations?months%5B0%5D=12&months%5B1%5D=3&months%5B2%5D=4&months%5B3%5D=5&weekendOnly=true&lat=39.77667&lon=30.52056',
    type: 'featured'
  },
  {
    title: 'Best surfing places to visit in January',
    image:
      'https://images.unsplash.com/photo-1502680390469-be75c86b636f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    query:
      'recommendations?months%5B0%5D=12&months%5B1%5D=3&months%5B2%5D=4&months%5B3%5D=5&weekendOnly=true&lat=39.77667&lon=30.52056',
    type: 'featured'
  },
  {
    title: 'Best places to practice Spanish',
    image:
      'https://images.unsplash.com/photo-1489945052260-4f21c52268b9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
    query:
      'recommendations?months%5B0%5D=12&months%5B1%5D=3&months%5B2%5D=4&months%5B3%5D=5&weekendOnly=true&lat=39.77667&lon=30.52056',
    type: 'featured'
  }
]

export const attractions = [
  {
    title: 'Eiffel',
    image:
      'https://images.unsplash.com/photo-1565881606991-789a8dff9dbb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80',
    query:
      'recommendations?filters[0][id]=a&filters[0][variables][areaSids][0]=paris',
    areaString: 'Paris, FR',
    type: 'attraction'
  },
  {
    title: 'Great Wall of China',
    image:
      'https://images.unsplash.com/photo-1571822325911-c01620a65e86?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    query:
      'recommendations?filters[0][id]=a&filters[0][variables][areaSids][0]=beijing',
    areaString: 'Beijing, PRC',
    type: 'attraction'
  },
  {
    title: 'Colosseum',
    image:
      'https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1096&q=80',
    query:
      'recommendations?filters[0][id]=a&filters[0][variables][areaSids][0]=rome',
    areaString: 'Rome, IT',
    type: 'attraction'
  },
  {
    title: 'Sydney Opera House',
    image:
      'https://images.unsplash.com/photo-1527915676329-fd5ec8a12d4b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80',
    query:
      'recommendations?filters[0][id]=a&filters[0][variables][areaSids][0]=sydney',
    areaString: 'Sydney, AU',
    type: 'attraction'
  },
  {
    title: 'Louvre Museum',
    image:
      'https://images.unsplash.com/photo-1543335785-8aadf6d8183c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80',
    query:
      'recommendations?filters[0][id]=a&filters[0][variables][areaSids][0]=paris',
    areaString: 'Paris, FR',
    type: 'attraction'
  },
  {
    title: 'Forbidden City',
    image:
      'https://images.unsplash.com/photo-1577706881850-bf7c7d8906a5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80',
    query:
      'recommendations?filters[0][id]=a&filters[0][variables][areaSids][0]=beijing',
    areaString: 'Beijing, PRC',
    type: 'attraction'
  },
  {
    title: 'Times Square',
    image:
      'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    query:
      'recommendations?filters[0][id]=a&filters[0][variables][areaSids][0]=new-york-city',
    areaString: 'Newyork City, NY, US',
    type: 'attraction'
  },
  {
    title: 'Leaning Tower of Pisa',
    image:
      'https://images.unsplash.com/photo-1548510907-5b514c51aba6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    query:
      'recommendations?filters[0][id]=a&filters[0][variables][areaSids][0]=pisa',
    areaString: 'Pisa, IT',
    type: 'attraction'
  },
  {
    title: 'Machu Picchu',
    image:
      'https://images.unsplash.com/photo-1526392060635-9d6019884377?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    query:
      'recommendations?filters[0][id]=a&filters[0][variables][areaSids][0]=machu-picchu',
    areaString: 'Machu Picchu, PE',
    type: 'attraction'
  },
  {
    title: 'Pyramids of Giza',
    image:
      'https://images.unsplash.com/photo-1623674587543-9c7564de99d1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80',
    query:
      'recommendations?filters[0][id]=a&filters[0][variables][areaSids][0]=giza',
    areaString: 'Giza, EG',
    type: 'attraction'
  }
]

// eslint-disable-next-line no-sparse-arrays
export const seasons = [
  {
    title: 'Spring',
    image:
      'https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    query: 'recommendations?months%5B0%5D=3&months%5B1%5D=4&months%5B2%5D=5',
    type: 'season'
  },
  ,
  {
    title: 'Summer',
    image:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80',
    query: 'recommendations?months%5B0%5D=6&months%5B1%5D=7&months%5B2%5D=8',
    type: 'season'
  },
  {
    title: 'Fall',
    image:
      'https://images.unsplash.com/photo-1507371341162-763b5e419408?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1039&q=80',
    query: 'recommendations?months%5B0%5D=9&months%5B1%5D=10&months%5B2%5D=11',
    type: 'season'
  },
  {
    title: 'Winter',
    image:
      'https://images.unsplash.com/photo-1486496146582-9ffcd0b2b2b7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    query: 'recommendations?months%5B0%5D=12&months%5B1%5D=1&months%5B2%5D=2',
    type: 'season'
  }
]

export const regions = [
  {
    title: 'North America',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/North_America_satellite_globe.jpg/514px-North_America_satellite_globe.jpg',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a26f1dc-59bc-11ec-9ac1-579044a72771',
    type: 'region'
  },
  {
    title: 'South America',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/South_America_-_Blue_Marble_orthographic.jpg/432px-South_America_-_Blue_Marble_orthographic.jpg',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a26f1e3-59bc-11ec-9ac1-579044a72771',
    type: 'region'
  },
  {
    title: 'Europe',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/1/1b/Europe_satellite_orthographic.jpg',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a26f1dd-59bc-11ec-9ac1-579044a72771',
    type: 'region'
  },
  {
    title: 'Africa',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Africa_satellite_orthographic.jpg/912px-Africa_satellite_orthographic.jpg',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a26f1df-59bc-11ec-9ac1-579044a72771',
    type: 'region'
  },
  {
    title: 'Asia',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Asia_satellite_orthographic.jpg/985px-Asia_satellite_orthographic.jpg',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a26f1de-59bc-11ec-9ac1-579044a72771',
    type: 'region'
  },
  {
    title: 'Middle East',
    image:
      'https://www.gatewayhouse.in/wp-content/uploads/2017/11/middle-east-satellite-photo.png',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a26f1e0-59bc-11ec-9ac1-579044a72771',
    type: 'region'
  },
  {
    title: 'South Pacific',
    image:
      'https://images.unsplash.com/photo-1622671890543-bfbca2178998?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a26f1e1-59bc-11ec-9ac1-579044a72771',
    type: 'region'
  },
  {
    title: 'Caribbean',
    image:
      'https://images.unsplash.com/photo-1582300857444-5ddd87c86797?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a26f1e2-59bc-11ec-9ac1-579044a72771',
    type: 'region'
  }
]

export const costs = [
  {
    title: 'Cheap',
    image:
      'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a26f1e4-59bc-11ec-9ac1-579044a72771',
    type: 'cost'
  },
  {
    title: 'Moderate',
    image:
      'https://images.unsplash.com/photo-1508672019048-805c876b67e2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1219&q=80',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a26f1e5-59bc-11ec-9ac1-579044a72771',
    type: 'cost'
  },
  {
    title: 'Expensive',
    image:
      'https://images.unsplash.com/photo-1526786220381-1d21eedf92bf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a26f1e6-59bc-11ec-9ac1-579044a72771',
    type: 'cost'
  }
]

export const languages = [
  {
    title: 'English',
    image:
      'https://images.unsplash.com/photo-1543332164-6e82f355badc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a2718e3-59bc-11ec-9ac1-579044a72771',
    type: 'language'
  },
  {
    title: 'Spanish',
    image:
      'https://images.unsplash.com/photo-1489945052260-4f21c52268b9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a2718e4-59bc-11ec-9ac1-579044a72771',
    type: 'language'
  },
  {
    title: 'No Language Barrier',
    image:
      'https://images.unsplash.com/photo-1624384897936-f0976c16c7ba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    query:
      'recommendations?filters%5B0%5D%5Bid%5D=9a273ff0-59bc-11ec-9ac1-579044a72771',
    type: 'language'
  }
]

export const destinations = [
  {
    title: 'London',
    image:
      'https://images.unsplash.com/photo-1520967824495-b529aeba26df?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80',
    query:
      'recommendations?filters[0][id]=a&filters[0][variables][areaSids][0]=london',
    type: 'destination'
  },
  {
    title: 'Rome',
    image:
      'https://images.unsplash.com/photo-1542820229-081e0c12af0b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80',
    query:
      'recommendations?filters[0][id]=a&filters[0][variables][areaSids][0]=rome',
    type: 'destination'
  },
  {
    title: 'Phuket',
    image:
      'https://images.unsplash.com/photo-1584314620461-90d4239969cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1139&q=80',
    query:
      'recommendations?filters[0][id]=a&filters[0][variables][areaSids][0]=phuket-(city)',
    type: 'destination'
  },
  {
    title: 'Bora Bora',
    image:
      'https://images.unsplash.com/photo-1500930287596-c1ecaa373bb2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    query:
      'recommendations?filters[0][id]=a&filters[0][variables][areaSids][0]=bora-bora',
    type: 'destination'
  },
  {
    title: 'Barcelona',
    image:
      'https://images.unsplash.com/photo-1583422409516-2895a77efded?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    query:
      'recommendations?filters[0][id]=a&filters[0][variables][areaSids][0]=barcelona',
    type: 'destination'
  },
  {
    title: 'Malé',
    image:
      'https://images.unsplash.com/photo-1540202404-a2f29016b523?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1333&q=80',
    query:
      'recommendations?filters[0][id]=a&filters[0][variables][areaSids][0]=male',
    type: 'destination'
  },
  {
    title: 'Bali',
    image:
      'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    query:
      'recommendations?filters[0][id]=a&filters[0][variables][areaSids][0]=bali',
    type: 'destination'
  },
  {
    title: 'New York City',
    image:
      'https://images.unsplash.com/photo-1543788303-c15e49305bc6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80',
    query:
      'recommendations?filters[0][id]=a&filters[0][variables][areaSids][0]=new-york-city',
    type: 'destination'
  },
  {
    title: 'Florence',
    image:
      'https://images.unsplash.com/photo-1543429257-3eb0b65d9c58?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    query:
      'recommendations?filters[0][id]=a&filters[0][variables][areaSids][0]=florence',
    type: 'destination'
  },
  {
    title: 'Santorini',
    image:
      'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1138&q=80',
    query:
      'recommendations?filters[0][id]=a&filters[0][variables][areaSids][0]=santorini',
    type: 'destination'
  },
  {
    title: 'Amsterdam',
    image:
      'https://images.unsplash.com/photo-1499241142330-28701ea87ff4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80',
    query:
      'recommendations?filters[0][id]=a&filters[0][variables][areaSids][0]=amsterdam',
    type: 'destination'
  }
]
