import {GetCommentByIdResponse} from '@/model/response_body/comments/getCommentByIdResponseBody';

type MockData = {
  '200': GetCommentByIdResponse;
};

const mockData: MockData = {
  '200': {
    id: 1,
    userId: 1,
    noteId: 1,
    body: 'Learn something new!',
  },
};

export default mockData;
