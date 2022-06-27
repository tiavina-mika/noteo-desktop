import { gql } from "@apollo/client";
import client from "../apollo-client";

export const SIGNUP = gql`
  mutation Signup($values: CreateUserInput!) {
    signup(values: $values) {
      id
      email
      username
      firstName
      lastName
    }
  }
`;

export const LOGIN = gql`
  mutation Login($values: LoginInput!) {
    login(values: $values) {
      user {
        id
        email
        username
        firstName
        lastName
      }
      token
    }
  }
`;

export const PROFILE = gql`
  query Profile {
    profile {
      id
      email
      firstName
      lastName
      updatedAt
    }
  }
`;

/**
 * get the current logged in user
 * @returns 
 */
 export const getCurrentUser = async () => {
  try {
    const { data } = await client.query({
      query: PROFILE,
    });

    return data.profile;
  } catch (error) {
    console.log('controller.auth.getCurrentUser error: ', error.massage);
  }
}
