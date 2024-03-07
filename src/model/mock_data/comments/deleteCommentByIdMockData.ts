import {DeleteCommentByIdResponse} from '@/model/response_body/comments/deleteCommentByIdResponseBody';

type MockData = {
  '200': DeleteCommentByIdResponse;
};

const mockData: MockData = {
  '200': {
    message: 'Deleted',
  },
};

export default mockData;
