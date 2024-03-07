import {CreateNewNoteResponse} from '@/model/response_body/notes/createNewNoteResponseBody';

type MockData = {
  '200': CreateNewNoteResponse;
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
