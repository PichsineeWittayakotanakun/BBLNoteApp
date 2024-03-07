/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {atom} from 'jotai';
import {Headers} from '@/atoms/headerAtomService';
import mockData from '@/model/mock_data/notes/getAllNotesMockData';
import {GetAllNotesResponse} from '@/model/response_body/notes/getAllNotesResponseBody';
import Endpoint from '@/utils/endpoint';

class GetAllNotesAtomService {
  private readonly _initReturnValue: GetAllNotesResponse = [];

  private _response = atom<GetAllNotesResponse>(this._initReturnValue);

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
        method: 'GET',
        headers,
        signal,
      })
        .then(async res => {
          if (res.status !== 200) {
            console.error(
              'APIs Response Error getAllNotesAtomService',
              await res.json(),
            );
            set(this._isError, true);
            set(this._isLoading, false);
            return;
          }
          const json: GetAllNotesResponse = await res.json();
          set(this._response, json.reverse());
          set(this._isLoading, false);
        })
        .catch(err => {
          console.log('Error fetching getAllNotesAtomService', err);
          set(this._isLoading, false);
          set(this._isError, true);
          return;
        });

      return;
    },
  );
}

const getAllNotesAtomService = new GetAllNotesAtomService();

export default getAllNotesAtomService;
