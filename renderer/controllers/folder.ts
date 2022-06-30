import { gql } from '@apollo/client';

import client from '../apollo-client';
import { Folder, FolderListInput, FoldersResult } from '../types/folders';
import { DEFAULT_PER_PAGE } from '../utils/constants';
import { setRequestHeader } from '../utils/utils';

export const GET_FOLDERS = gql`
  query Folders {
    getFolders {
      id
      name
      updatedAt
    }
  }
`;

export const FOLDERS_WITH_NOTES_COUNT = gql`
  query GetUserFoldersWithNotesCount ($options: FolderListInput!) {
    getUserFoldersWithNotesCount (options: $options) {
      data {
        id
        notesCount
        name
        updatedAt
      }
      totalData
      totalPage
      currentPage
      perPage
      availableSearch
      availableSort
    }
  }
`;

export const DELETE_MANY_FOLDERS = gql`
  mutation DeleteManyFoldersByUser($ids: [String!]!) {
    deleteManyFoldersByUser(ids: $ids) 
  }
`;

/**
 * get single folder by its id
 * @param id 
 * @returns 
 */
export const getFolderById = async (id: string, sessionToken: string): Promise<Folder> => {
  try {
    const { data } = await client.query({
      query: gql`
        query GetUserFolderById($id: String!) {
          getUserFolderById(id: $id) {
            id
            name
            updatedAt
          }
        }
      `,
      variables: { id },
      context: setRequestHeader({ sessionToken })
    });

    return data.getUserFolderById;
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

// export const getFoldersWithNotesCount = async () => {
//   try {
//     const { data } = await client.query({
//       query: GET_FOLDERS_WITH_NOTES_COUNT,
//     });

//     return {
//       folders: data.getFoldersWithNotesCount
//     }
//   } catch (error) {
//     console.log('controller.folder.getFolders error: ', error.massage);
//   }
// }

export const getUserFoldersWithNotesCount = async ({
  search,
  page = 1,
  perPage = DEFAULT_PER_PAGE,
  sort = 'updatedAt@desc',
  sessionToken
}: FolderListInput): Promise<FoldersResult> => {
  try {
    const { data } = await client.query({
      query: FOLDERS_WITH_NOTES_COUNT,
      variables: { options: { search, page, perPage, sort }},
      context: setRequestHeader({ sessionToken })
    });

    return data.getUserFoldersWithNotesCount
  } catch (error) {
    console.log('controller.folder.getUserFoldersWithNotesCount error: ', error.massage);
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
  mutation DeleteUserFolder($id: String!) {
    deleteUserFolder(id: $id) {
      id
    }
  }
`;