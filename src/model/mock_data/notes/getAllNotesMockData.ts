import {GetAllNotesResponse} from '@/model/response_body/notes/getAllNotesResponseBody';

type MockData = {
  '200': GetAllNotesResponse;
};

const mockData: MockData = {
  '200': [
    {
      id: 1,
      userId: 1,
      title: 'Todo List',
      body: 'Things to get it done within this month!',
    },
  ],
};

export default mockData;
