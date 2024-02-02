"use client";

import React from "react";
import { Provider } from "react-redux";
import store from ".";

interface ReduxProviderParams {
  children: React.ReactNode;
}

function ReduxProvider({ children }: ReduxProviderParams) {
  return <Provider store={store}>{children}</Provider>;
}

export default ReduxProvider;
