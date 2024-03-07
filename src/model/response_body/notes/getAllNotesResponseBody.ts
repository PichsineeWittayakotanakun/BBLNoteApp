export type NoteItem = {
  id: number;
  userId: number;
  title: string;
  body: string;
};
export type GetAllNotesResponse = NoteItem[];
