import { gql } from '@apollo/client';

import client from '../apollo-client';

export const GET_FOLDERS = gql`
query Folders {
  getFolders {
    id
    name
    updatedAt
  }
}
`;

/**
 * get single folder by its id
 * @param id 
 * @returns 
 */
export const getFolderById = async (id: string) => {
  try {
    const { data } = await client.query({
      query: gql`
      query GetFolderById($id: String!) {
        getFolderById(id: $id) {
          id
          name
        }
      }
      `,
      variables: {
        id,
      }
    });

    return {
      folder: data.getFolderById
    }
  } catch (error) {
    console.log('controller.folder.getFolderById error: ', error.massage);
  }
}

/**
 * get all folders
 * @returns 
 */
export const getFolders = async () => {
  try {
    const { data } = await client.query({
      query: GET_FOLDERS,
    });

    return {
      folders: data.getFolders
    }
  } catch (error) {
    console.log('controller.folder.getFolders error: ', error.massage);
  }
}

export const EDIT_FOLDER = gql`
  mutation UpdateFolder($id: String!, $values: UpdateFolderInput!) {
    updateFolder(id: $id, values: $values) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;

export const ADD_FOLDER = gql`
  mutation addFolder($values: CreateFolderInput!) {
    createFolder(values: $values) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_FOLDER = gql`
  mutation DeleteFolder($id: String!) {
    deleteFolder(id: $id) {
      id
    }
  }
`;