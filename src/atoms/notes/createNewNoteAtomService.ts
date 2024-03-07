/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {atom} from 'jotai';
import {Headers} from '@/atoms/headerAtomService';
import mockData from '@/model/mock_data/notes/createNewNoteMockData';
import {CreateNewNoteResponse} from '@/model/response_body/notes/createNewNoteResponseBody';
import {CreateNewNoteRequest} from '@/model/request_body/notes/createNewNoteRequestBody';
import Endpoint from '@/utils/endpoint';

class CreateNewNoteAtomService {
  private readonly _initReturnValue: CreateNewNoteResponse = {
    id: 0,
    userId: 0,
    title: '',
    body: '',
  };

  private _response = atom<CreateNewNoteResponse>(this._initReturnValue);

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
      body: CreateNewNoteRequest,
      isMockData: boolean,
    ) => {
      set(this._isLoading, true);
      set(this._isError, false);
      if (isMockData) {
        set(this._response, mockData['200']);
        set(this._isLoading, false);
        return;
      }
      await fetch(`${Endpoint}/notes`, {
        method: 'POST',
        headers,
        signal,
        body: JSON.stringify(body),
      })
        .then(async res => {
          if (res.status !== 200) {
            console.error(
              'APIs Response Error createNewNoteAtomService',
              await res.json(),
            );
            set(this._isError, true);
            set(this._isLoading, false);
            return;
          }
          const json: CreateNewNoteResponse = await res.json();
          set(this._response, json);
          set(this._isLoading, false);
        })
        .catch(err => {
          console.log('Error fetching createNewNoteAtomService', err);
          set(this._isLoading, false);
          set(this._isError, true);
          return;
        });

      return;
    },
  );
}

const createNewNoteAtomService = new CreateNewNoteAtomService();

export default createNewNoteAtomService;
