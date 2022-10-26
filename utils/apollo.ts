import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { setContext } from "@apollo/client/link/context";
import jwtDecode from "jwt-decode";
import { useMemo } from "react";
import getConfig from "next/config";

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();
const apiUrl = serverRuntimeConfig.apiUrl || publicRuntimeConfig.apiUrl;

let apolloClient: ApolloClient<NormalizedCacheObject>;
let apolloServerState: any;

export const getStandAloneApolloClient = () => {
  return new ApolloClient({
    uri: apiUrl + "/graphql",
    cache: new InMemoryCache(),
  });
};

const combineState = (
  apolloServerState: any,
  previousState: NormalizedCacheObject,
  initialState: any
) => {
  const newState = {
    ...(apolloServerState ?? {}),
    ...previousState,
    ...(initialState ?? {}),
  };

  const combinedRootQuery = {
    ...(apolloServerState?.ROOT_QUERY ?? {}),
    ...(previousState.ROOT_QUERY ?? {}),
    ...(initialState?.ROOT_QUERY ?? {}),
  };

  newState.ROOT_QUERY = combinedRootQuery;

  return newState;
};

const isTokenValidOrUndefined = (token: string) => {
  if (!token) return true;

  try {
    const { exp }: any = jwtDecode(token);

    if (Date.now() >= exp * 1000) return false;
    // if (Date.now() >= 0) return false;
    return true;
  } catch (error) {
    return false;
  }
};

const getAccessToken = async () => {
  // console.log("Let's try to get access Token");
  const access_token =
    typeof window === "undefined"
      ? undefined
      : window.localStorage.getItem("ecommerce_access_token");

  // console.log("getAccessToken ", access_token);

  try {
    if (isTokenValidOrUndefined(access_token)) return access_token;

    const data = await fetch(apiUrl + "/refresh_token", {
      method: "POST",
      credentials: "include",
    });
    const json = await data.json();

    if (json.ok && json.access_token) {
      window.localStorage.setItem("ecommerce_access_token", json.access_token);
      return json.access_token as string;
    } else {
      throw new Error(`Your refresh token is invalid. Please login again`);
    }
  } catch (error) {
    console.log(error);
    return "";
  }
};

const createClient = (ssr: boolean) => {
  const uploadLink = createUploadLink({
    uri: apiUrl + "/graphql",
    credentials: "include",
  });

  const asyncAuthLink = setContext(async () => {
    const access_token = await getAccessToken();

    return {
      headers: {
        authorization: `Bearer ${access_token}`,
      },
    };
  });

  return new ApolloClient({
    link: ApolloLink.from([asyncAuthLink, uploadLink]),
    connectToDevTools: process.env.NODE_ENV === "development",
    ssrMode: typeof window === "undefined" && ssr,
    // credentials: "include",
    cache: new InMemoryCache(),
  });
};

export const initializeApollo = ({
  initialState = null,
  ssr = false,
}: {
  initialState?: any;
  ssr?: boolean;
}) => {
  const _apolloClient = apolloClient ?? createClient(ssr);
  let newState: any;

  if (typeof window === "undefined") {
    // It's on server
    newState = apolloServerState = initialState;
  } else {
    // Its on client
    const previousState = _apolloClient.cache.extract();
    newState = combineState(apolloServerState, previousState, initialState);
  }

  if (newState) {
    _apolloClient.cache.restore(newState);
  }

  if (typeof window === "undefined") return _apolloClient;

  apolloClient = apolloClient ?? _apolloClient;

  return apolloClient;
};

export const useApollo = (initialState: any, ssr: boolean = false) => {
  const store = useMemo(
    () =>
      initializeApollo({
        initialState,
        ssr,
      }),
    [initialState]
  );
  return store;
};
