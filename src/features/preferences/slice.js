import { combineReducers } from "@reduxjs/toolkit";
import eventInterests from "./containers/event-interests/slice";
import activityInterests from "./containers/activity-interests/slice";
import availabilities from "./containers/dates/slice";
//import navigation from "../../components/navigation/slice";
import location from "./containers/location/slice";
import passports from "./containers/passport-countries/slice";
import bucketlist from "./containers/bucketlist/slice";

export default combineReducers({
  eventInterests,
  activityInterests,
  location,
  passports,
  availabilities,
  bucketlist,
});
