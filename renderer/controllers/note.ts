import { gql } from '@apollo/client';

import client from '../apollo-client';
import { EditNoteInput } from '../types/notes';

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
 * get all notes
 * @returns 
 */
export const getNotes = async () => {
  try {
    const { data } = await client.query({
      query: gql`
        query Notes {
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