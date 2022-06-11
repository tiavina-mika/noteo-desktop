import { gql } from '@apollo/client';

import client from '../apollo-client';


export const NOTES_WITHOUT_FOLDER = gql`
  query GetNotesWithoutFolder {
    getNotesWithoutFolder {
      id
      title
      content
      updatedAt
    }
  }
`;

/**
* create note
* @var title string
* @var content string
*/
export const EDIT_NOTE = gql`
 mutation UpdateNote($id: String!, $values: UpdateNoteInput!) {
   updateNote(id: $id, values: $values) {
     id
     title
     content
     createdAt
     updatedAt
   }
 }
`;

/**
* create note
* @var title string
* @var content string
*/
export const ADD_NOTE = gql`
 mutation addNote($values: CreateNoteInput!) {
   createNote(values: $values) {
     id
     title
     content
     createdAt
     updatedAt
   }
 }
`;

export const DELETE_NOTE = gql`
 mutation DeleteNote($id: String!) {
   deleteNote(id: $id) {
     id
   }
 }
`;

export const DELETE_NOTES = gql`
  mutation DeleteNotes ($ids: [String!]!) {
    deleteNotes(ids: $ids) 
  }
`;

export const RECYCLE_BIN_NOTE = gql`
 mutation MoveNoteToRecycleBin($id: String!, $value: Boolean!) {
   moveNoteToRecycleBin(id: $id, value: $value) {
     id
   }
 }
`;

export const NOTES_FROM_RECYCLE_BIN = gql`
  query GetNotesFromRecycleBin {
    getNotesFromRecycleBin {
      id
      title
      content
      updatedAt
    }
  }
`;

/**
* set deleted field to true for the list of ids
* @var ids string[]
* @var value boolean
*/
export const RECYCLE_BIN_NOTES = gql`
mutation MoveNotesToRecycleBin($values: RecycleBinNotesInput!) {
 moveNotesToRecycleBin(values: $values)
}
`;

/**
 * get single note by its id
 * @param id 
 * @returns 
 */
export const getNoteById = async (id: string) => {
  try {
    const { data } = await client.query({
      query: gql`
      query GetNoteById($id: String!) {
        getNoteById(id: $id) {
          id
          title
          content
        }
      }
      `,
      variables: {
        id,
      }
    });

    return {
      note: data.getNoteById
    }
  } catch (error) {
    console.log('controller.note.getNoteById error: ', error.massage);
  }
}

/**
 * get list of notes inside of its parent folder
 * @param folderId 
 * @returns 
 */
export const getNotesByFolderId = async (folderId: string) => {
  try {
    const { data } = await client.query({
      query: gql`
      query GetNotesByFolderId($folderId: String!) {
        getNotesByFolderId(folderId: $folderId) {
          id
          title
          content
          updatedAt
        }
      }
      `,
      variables: {
        folderId,
      }
    });

    return {
      notes: data.getNotesByFolderId
    }
  } catch (error) {
    console.log('controller.note.getNotesByFolderId error: ', error.massage);
  }
}

/**
 * get all notes
 * @returns 
 */
export const getNotes = async () => {
  try {
    const { data } = await client.query({
      query: gql`
        query GetNotes {
          getNotes {
            id
            title
            content
            updatedAt
          }
        }
      `,
    });

    return {
      notes: data.getNotes
    }
  } catch (error) {
    console.log('controller.note.getNotes error: ', error.massage);
  }
}

/**
 * get all notes
 * @returns 
 */
 export const getNotesWithoutFolder = async () => {
  try {
    const { data } = await client.query({
      query: NOTES_WITHOUT_FOLDER,
    });

    return {
      notes: data.getNotesWithoutFolder
    }
  } catch (error) {
    console.log('controller.note.getNotes error: ', error.massage);
  }
}

/**
 * get notes with deleted true
 * @returns 
 */
 export const getNotesFromRecycleBin = async () => {
  try {
    const { data } = await client.query({
      query: NOTES_FROM_RECYCLE_BIN,
    });

    return {
      notes: data.getNotesFromRecycleBin
    }
  } catch (error) {
    console.log('controller.note.getNotes error: ', error.massage);
  }
}

