import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, reset } from "../slice";
import LoginPage from "../components/recommendation-login";

const LoginContainer = () => {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);
  return (
    <LoginPage
      loginFunc={({ email, password }) => {
        dispatch(login({ email, password }));
      }}
      error={error}
    />
  );
};

export default LoginContainer;
