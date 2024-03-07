export type CommentItem = {
  id: number;
  userId: number;
  noteId: number;
  body: string;
};

export type GetAllCommentsResponse = CommentItem[];
