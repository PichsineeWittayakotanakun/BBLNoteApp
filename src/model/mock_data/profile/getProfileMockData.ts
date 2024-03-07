import {GetProfileResponse} from '@/model/response_body/profile/getProfileResponseBody';

type MockData = {
  '200': GetProfileResponse;
};

const mockData: MockData = {
  '200': {
    id: 1,
    nickname: 'Name',
    name: 'Full Name',
    picture: 'https://dummyimage.com/600x400/ffffff/000000&text=test',
    email: 'test@test.com',
  },
};

export default mockData;
