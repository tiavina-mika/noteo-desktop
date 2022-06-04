import dayjs from "dayjs";
import { Note } from "../types/notes";

export const notes: Note[] = [
  {
    id: 1,
    title: 'Eiusmod tempor incididunt',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore',
    updatedAt: dayjs().format('DD MMMM YYYY')
  },
  {
    id: 2,
    title: 'Quis nostrud exercitation',
    content: 'et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo',
    updatedAt: dayjs().add(5, 'day').subtract(1, 'year').format('DD MMMM YYYY')
  },
  {
    id: 3,
    title: 'sunt in culpa qui officia',
    content: 'fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim',
    updatedAt: dayjs().subtract(2, 'month').format('DD MMMM YYYY')
  },
];