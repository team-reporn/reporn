import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NativeRouter, Route, Redirect } from "react-router-native"; // eslint-disable-line

import Nav from "./src/components/Nav";
import Login from "./src/components/Login";
import Home from "./src/components/Home";
import Wiwaldo from "./src/components/Wiwaldo";

import { setContext } from "apollo-link-context";
import { ApolloProvider } from "react-apollo";
import { withClientState } from "apollo-link-state";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloLink } from "apollo-link";

const cache = new InMemoryCache();

const defaults = {};

const stateLink = withClientState({ cache, defaults });
const httpLink = new HttpLink({
  uri: "http://192.168.1.37:4000",
});

export default function App() {
  const [userToken, setUserToken] = useState(null);
  const [appState, setAppState] = useState("home");

  const [client, setClient] = useState(
    new ApolloClient({
      link: ApolloLink.from([stateLink, httpLink]),
      cache,
    })
  );

  useEffect(() => {
    if (userToken) {
      const authLink = setContext((_, { headers }) => {
        // get the authentication token from local storage if it exists
        const token = userToken;
        // return the headers to the context so httpLink can read them
        return {
          headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
          },
        };
      });

      setClient(
        new ApolloClient({
          link: authLink.concat(httpLink),
          cache: new InMemoryCache(),
        })
      );
    } else {
      console.log("no usertoken yet");
    }
  }, [userToken]);
  return (
    <ApolloProvider client={client}>
      <NativeRouter>
        <View style={styles.container}>
          {/* <Text>Open up App.js to start working on your app!</Text> */}
          <Nav />
          <Route
            exact
            path="/"
            component={() => (
              <Home
                userToken={userToken}
                appState={appState}
                setAppState={setAppState}
              />
            )}
          />
          <Route
            exact
            path="/login"
            component={() => (
              <Login userToken={userToken} setUserToken={setUserToken} />
            )}
          />
                    <Route
            exact
            path="/shake"
            component={() => (
              <Shake />
            )}
          />
          <Route
            exact
            path="/wiwaldo"
            component={() => <Wiwaldo userToken={userToken} />}
          />
        </View>
      </NativeRouter>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    //justifyContent: "center",
  },
});

async function loadResourcesAndDataAsync() {
  try {
    SplashScreen.preventAutoHide();

    // Load our initial navigation state
    setInitialNavigationState(await getInitialState());

    // Load fonts
    await Font.loadAsync({
      ...Ionicons.font,
      "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf"),
      percolate: require("./assets/icon/percolate.ttf"),
      "NunitoSans-Bold": require("./assets/font/NunitoSans-Bold.ttf"),
      "NunitoSans-Italic": require("./assets/font/NunitoSans-Italic.ttf"),
      NunitoSans: require("./assets/font/NunitoSans-Regular.ttf"),
    });
  } catch (e) {
    // We might want to provide this error information to an error reporting service
    console.warn(e);
  } finally {
    setLoadingComplete(true);
    SplashScreen.hide();
  }
}
