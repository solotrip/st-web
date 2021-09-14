/**
 * Root reducer config
 */
import { combineReducers } from "@reduxjs/toolkit";
import auth from "features/auth/slice";
import home from "features/home/slice";
import preferences from "features/preferences/slice";
import profile from "features/profile/slice";
import recommendations from "features/recommendations/slice";
import navigation from "components/navigation/slice";
import wishlist from "features/wishlist/slice";
import saved from "features/saved/slice";

export default combineReducers({
  auth,
  home,
  preferences,
  profile,
  recommendations,
  navigation,
  wishlist,
  saved,
});
