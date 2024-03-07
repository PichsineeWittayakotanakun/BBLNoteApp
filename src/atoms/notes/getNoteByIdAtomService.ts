/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {atom} from 'jotai';
import {Headers} from '@/atoms/headerAtomService';
import mockData from '@/model/mock_data/comments/getCommentByIdMockData';
import {GetCommentByIdResponse} from '@/model/response_body/comments/getCommentByIdResponseBody';
import Endpoint from '@/utils/endpoint';

class GetCommentByIdAtomService {
  private readonly _initReturnValue: GetCommentByIdResponse = {
    id: 0,
    userId: 0,
    noteId: 0,
    body: '',
  };

  private _response = atom<GetCommentByIdResponse>(this._initReturnValue);

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
      noteId: number,
      isMockData: boolean,
    ) => {
      set(this._isLoading, true);
      set(this._isError, false);
      if (isMockData) {
        set(this._response, mockData['200']);
        set(this._isLoading, false);
        return;
      }
      await fetch(`${Endpoint}/notes/${noteId}`, {
        method: 'GET',
        headers,
        signal,
      })
        .then(async res => {
          if (res.status !== 200) {
            console.error(
              'APIs Response Error getNoteByIdAtomService',
              await res.json(),
            );
            set(this._isError, true);
            set(this._isLoading, false);
            return;
          }
          const json: GetCommentByIdResponse = await res.json();
          set(this._response, json);
          set(this._isLoading, false);
        })
        .catch(err => {
          console.log('Error fetching getNoteByIdAtomService', err);
          set(this._isLoading, false);
          set(this._isError, true);
          return;
        });

      return;
    },
  );
}

const getNoteByIdAtomService = new GetCommentByIdAtomService();

export default getNoteByIdAtomService;
