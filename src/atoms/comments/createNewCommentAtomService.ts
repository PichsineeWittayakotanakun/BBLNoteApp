/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {atom} from 'jotai';
import {Headers} from '@/atoms/headerAtomService';
import mockData from '@/model/mock_data/comments/createNewCommentMockData';
import {CreateNewCommentResponse} from '@/model/response_body/comments/createNewCommentResponseBody';
import {CreateNewCommentRequest} from '@/model/request_body/comments/createNewCommentRequestBody';
import Endpoint from '@/utils/endpoint';

class CreateNewCommentAtomService {
  private readonly _initReturnValue: CreateNewCommentResponse = {
    id: 0,
    userId: 0,
    noteId: 0,
    body: '',
  };

  private _response = atom<CreateNewCommentResponse>(this._initReturnValue);

  public response = atom(get => get(this._response));

  private _isError = atom<boolean>(false);

  public isError = atom(get => get(this._isError));

  private _isLoading = atom<boolean>(false);

  public isLoading = atom(get => get(this._isLoading));

  public fetchData = atom(
    null,
    async (
      _get,
      set,
      signal: AbortSignal,
      headers: Headers,
      body: CreateNewCommentRequest,
      isMockData: boolean,
    ) => {
      set(this._isLoading, true);
      set(this._isError, false);
      if (isMockData) {
        set(this._response, mockData['200']);
        set(this._isLoading, false);
        return;
      }
      await fetch(`${Endpoint}/comments`, {
        method: 'POST',
        headers,
        signal,
        body: JSON.stringify(body),
      })
        .then(async res => {
          if (res.status !== 200) {
            console.error(
              'APIs Response Error createNewCommentAtomService',
              await res.json(),
            );
            set(this._isError, true);
            set(this._isLoading, false);
            return;
          }
          const json: CreateNewCommentResponse = await res.json();
          set(this._response, json);
          set(this._isLoading, false);
        })
        .catch(err => {
          console.log('Error fetching createNewCommentAtomService', err);
          set(this._isLoading, false);
          set(this._isError, true);
          return;
        });

      return;
    },
  );
}

const createNewCommentAtomService = new CreateNewCommentAtomService();

export default createNewCommentAtomService;
