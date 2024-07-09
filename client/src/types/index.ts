import { Dispatch, SetStateAction } from "react";

export interface IBookmark {
  _id: string;
  title: string;
  link: string;
  tags: string[];
  stared: boolean;
  type: string;
}

export type TSetQuery = Dispatch<
  SetStateAction<{
    folderId: string;
    search: string;
    page: number;
    limit: number;
  }>
>;