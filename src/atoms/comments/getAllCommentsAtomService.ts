/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {atom} from 'jotai';
import {Headers} from '@/atoms/headerAtomService';
import mockData from '@/model/mock_data/comments/getAllCommentsMockData';
import {GetAllCommentsResponse} from '@/model/response_body/comments/getAllCommentsResponseBody';
import {GetNoteByIdResponse} from '@/model/response_body/notes/getNoteByIdResponseBody';
import Endpoint from '@/utils/endpoint';

class GetAllCommentsAtomService {
  private readonly _initReturnValue: GetAllCommentsResponse = [];

  private _response = atom<GetAllCommentsResponse>(this._initReturnValue);

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
      noteId: GetNoteByIdResponse['id'],
      isMockData: boolean,
    ) => {
      set(this._isLoading, true);
      set(this._isError, false);
      if (isMockData) {
        set(this._response, mockData['200']);
        set(this._isLoading, false);
        return;
      }
      await fetch(`${Endpoint}/comments?noteId=${noteId}`, {
        method: 'GET',
        headers,
        signal,
      })
        .then(async res => {
          if (res.status !== 200) {
            console.error(
              'APIs Response Error getAllCommentsAtomService',
              await res.json(),
            );
            set(this._isError, true);
            set(this._isLoading, false);
            return;
          }
          const json: GetAllCommentsResponse = await res.json();
          set(this._response, json);
          set(this._isLoading, false);
        })
        .catch(err => {
          console.log('Error fetching getAllCommentsAtomService', err);
          set(this._isLoading, false);
          set(this._isError, true);
          return;
        });

      return;
    },
  );
}

const getAllCommentsAtomService = new GetAllCommentsAtomService();

export default getAllCommentsAtomService;
