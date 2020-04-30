import React, { useState } from "react";
import { Text, TextInput, StyleSheet, View, Button } from "react-native";

import gql from "graphql-tag";

import { ApolloProvider, graphql, Mutation } from "react-apollo";
import { Redirect } from "react-router-native";

const login = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        email
      }
    }
  }
`;

export default ({ setUserToken, userToken }) => {
  const [logintext, setLoginText] = useState("graph@reporn.com");
  const [passwordText, setPasswordText] = useState("graph");
  return !userToken ? (
    <Mutation mutation={login}>
      {(loginMutation, { data }) => (
        <View style={{ padding: 10 }}>
          <Text>Login</Text>
          <TextInput
            style={{ height: 40 }}
            placeholder="Type here to translate!"
            onChangeText={(logintext) => setLoginText(logintext)}
            defaultValue={logintext}
          />
          <Text>password</Text>
          <TextInput
            style={{ height: 40 }}
            placeholder="Type here to translate!"
            onChangeText={(passwordText) => setPasswordText(passwordText)}
            defaultValue={passwordText}
          />
          <Button
            onPress={() => {
              loginMutation({
                variables: {
                  email: logintext,
                  password: passwordText,
                },
              })
                .then((res) => {
                  setUserToken(res.data.login.token);
                  return res;
                })
                .then((res) => res)
                .catch((err) => <Text>{err}</Text>);

              setLoginText("");
              setPasswordText("");
            }}
            title="Submit"
          />
        </View>
      )}
    </Mutation>
  ) : (
    <Redirect to="/" />
  );
};

const styles = StyleSheet.create({});
