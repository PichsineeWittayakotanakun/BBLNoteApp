import {DeleteNoteByIdResponse} from '@/model/response_body/notes/deleteNoteByIdResponseBody';

type MockData = {
  '200': DeleteNoteByIdResponse;
};

const mockData: MockData = {
  '200': {
    message: 'Deleted',
  },
};

export default mockData;
