import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "components";
import {
  fetchAvailableDates,
  recommendationsSelector,
  updateActiveDate,
} from "../slice";
import Content from "../components/content";
import Header from "../components/header";
import { profileSelector } from "../../profile/slice";

const RecommendationsContainer = () => {
  const {
    recommendations,
    loadingRecommendations,
    availableDates,
    loadingAvailableDates,
    activeDateIndex,
  } = useSelector(recommendationsSelector);

  const { data: user, loading: profileLoading } = useSelector(profileSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAvailableDates());
  }, [dispatch]);

  useEffect(() => {
    if (availableDates.length > 0) {
      dispatch(updateActiveDate(0));
    }
  }, [dispatch, availableDates]);

  const onDateSelect = useCallback(
    (index) => {
      dispatch(updateActiveDate(index));
    },
    [dispatch]
  );

  return (
    <Loader loading={profileLoading}>
      <Loader loading={loadingAvailableDates}>
        <Header
          availableDates={availableDates}
          onSelect={onDateSelect}
          activeDateIndex={activeDateIndex}
        />
      </Loader>
      <Loader loading={loadingRecommendations}>
        <Content recommendations={recommendations} user={user} />
      </Loader>
    </Loader>
  );
};

export default RecommendationsContainer;
