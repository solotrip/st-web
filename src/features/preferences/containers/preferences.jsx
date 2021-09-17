import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  eventInterestsHasSelectedSelector,
  eventInterestsSelectedCountSelector,
  updateInterests as updateEventInterests,
} from "./event-interests/slice";
import {
  activityInterestsHasSelectedSelector,
  activityInterestsSelectedCountSelector,
  updateInterests as updateActivityInterests,
} from "./activity-interests/slice";

import { locationSelector, updateLocation } from "./location/slice";

import {
  passportsSelector,
  updatePassportCountries,
} from "./passport-countries/slice";
import { isGuestSelector, isOnboardedSelector } from "../../profile/slice";

const PreferencesContainer = ({ children, page: Page, isOnboarding }) => {
  const dispatch = useDispatch();
  const { index } = useParams();

  const activityInterestsSelectedCount = useSelector(
    activityInterestsSelectedCountSelector
  );
  const eventInterestsSelectedCount = useSelector(
    eventInterestsSelectedCountSelector
  );
  const eventInterestsHasSelected = useSelector(
    eventInterestsHasSelectedSelector
  );
  const activityInterestsHasSelected = useSelector(
    activityInterestsHasSelectedSelector
  );

  const { coordinates, modified: locationModified } = useSelector(
    locationSelector
  );
  const { modified: passportsModified } = useSelector(passportsSelector);

  const isGuest = useSelector(isGuestSelector);
  const onboarded = useSelector(isOnboardedSelector);

  const onNext = useCallback(
    (i) => {
      switch (i) {
        case "1":
          dispatch(updateEventInterests());
          //dispatch(updateAvailableDates());
          break;
        case "2":
          dispatch(updateActivityInterests());
          //dispatch(updateAreaClusters());
          break;
        case "4":
          dispatch(updatePassportCountries());
          dispatch(updateLocation());
          break;
        default:
          return;
      }
    },
    [dispatch]
  );

  const getNextEnabled = () => {
    switch (index) {
      case "1":
        return (
          eventInterestsSelectedCount > 0 ||
          (isOnboarding && eventInterestsHasSelected)
        );
      case "2":
        return (
          activityInterestsSelectedCount > 0 ||
          (isOnboarding && activityInterestsHasSelected)
        );
      case "4":
        return !!coordinates && (locationModified || passportsModified);
      case "5":
        return onboarded;
      default:
        return true;
    }
  };

  const nextEnabled = getNextEnabled();

  return (
    <Page onNext={onNext} nextEnabled={nextEnabled} isGuest={isGuest}>
      {children}
    </Page>
  );
};

export default PreferencesContainer;
