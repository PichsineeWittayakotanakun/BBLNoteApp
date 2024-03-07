import {CreateNewCommentResponse} from '@/model/response_body/comments/createNewCommentResponseBody';

type MockData = {
  '200': CreateNewCommentResponse;
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
