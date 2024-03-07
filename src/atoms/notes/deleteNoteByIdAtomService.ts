/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {atom} from 'jotai';
import {Headers} from '@/atoms/headerAtomService';
import mockData from '@/model/mock_data/notes/deleteNoteByIdMockData';
import {DeleteNoteByIdResponse} from '@/model/response_body/notes/deleteNoteByIdResponseBody';
import {GetNoteByIdResponse} from '@/model/response_body/notes/getNoteByIdResponseBody';
import Endpoint from '@/utils/endpoint';

class DeleteNoteByIdAtomService {
  private readonly _initReturnValue: DeleteNoteByIdResponse = {
    message: '',
  };

  private _response = atom<DeleteNoteByIdResponse>(this._initReturnValue);

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
      await fetch(`${Endpoint}/notes/${noteId}`, {
        method: 'DELETE',
        headers,
        signal,
      })
        .then(async res => {
          if (res.status !== 200) {
            console.error(
              'APIs Response Error deleteNoteByIdAtomService',
              await res.json(),
            );
            set(this._isError, true);
            set(this._isLoading, false);
            return;
          }
          const json: DeleteNoteByIdResponse = await res.json();
          set(this._response, json);
          set(this._isLoading, false);
        })
        .catch(err => {
          console.log('Error fetching deleteNoteByIdAtomService', err);
          set(this._isLoading, false);
          set(this._isError, true);
          return;
        });

      return;
    },
  );
}

const deleteNoteByIdAtomService = new DeleteNoteByIdAtomService();

export default deleteNoteByIdAtomService;
