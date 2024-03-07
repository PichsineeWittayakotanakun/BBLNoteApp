import {GetNoteByIdResponse} from '@/model/response_body/notes/getNoteByIdResponseBody';

type MockData = {
  '200': GetNoteByIdResponse;
};

const mockData: MockData = {
  '200': {
    id: 1,
    userId: 1,
    title: 'Todo List',
    body: 'Things to get it done within this month!',
  },
};

export default mockData;
