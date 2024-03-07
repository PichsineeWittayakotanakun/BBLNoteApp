import {GetAllCommentsResponse} from '@/model/response_body/comments/getAllCommentsResponseBody';

type MockData = {
  '200': GetAllCommentsResponse;
};

const mockData: MockData = {
  '200': [
    {
      id: 1,
      userId: 1,
      noteId: 1,
      body: 'Learn something new!',
    },
  ],
};

export default mockData;
