import { ApolloClient, ApolloLink, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { setContext } from "@apollo/client/link/context";
import jwtDecode from "jwt-decode";
import { NextPageContext } from "next";
import { createWithApollo } from "./createWithApollo";
import getConfig from "next/config";

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();
const apiUrl = serverRuntimeConfig.apiUrl || publicRuntimeConfig.apiUrl;

export const getStandAloneApolloClient = () => {
  return new ApolloClient({
    uri: apiUrl + "/api/graphql",
    cache: new InMemoryCache(),
  });
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
  const access_token = localStorage.getItem("ecommerce_access_token");

  // console.log("getAccessToken ", access_token);

  try {
    if (isTokenValidOrUndefined(access_token)) return access_token;

    const data = await fetch(apiUrl + "/api/refresh_token", {
      method: "POST",
      credentials: "include",
    });
    const json = await data.json();

    if (json.ok && json.access_token) {
      localStorage.setItem("ecommerce_access_token", json.access_token);
      return json.access_token as string;
    } else {
      throw new Error(`Your refresh token is invalid. Please login again`);
    }
  } catch (error) {
    console.log(error);
    return "";
  }
};

const createClient = (ctx: NextPageContext) => {
  const uploadLink = createUploadLink({
    uri: apiUrl + "/api/graphql",
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
    connectToDevTools: true, //process.env.NODE_ENV === "development",
    cache: new InMemoryCache(),
  });
};

export const withApollo = createWithApollo(createClient);
