import {atom} from 'jotai';

export type Headers = {
  Authorization: string;
  'content-type': 'application/json';
};

class HeaderAtomService {
  private readonly _initHeader: Headers = {
    Authorization: '',
    'content-type': 'application/json',
  };

  private _header = atom<Headers>(this._initHeader);

  public header = atom(get => get(this._header));

  private _idToken = atom<string>('');

  public idToken = atom(get => get(this._idToken));

  private _isLoading = atom(true);

  public isLoading = atom(get => get(this._isLoading));

  public setHeader = atom(null, async (_get, set, idToken: string) => {
    set(this._isLoading, true);
    set(this._idToken, idToken);
    const newHeader: Headers = {
      Authorization: `Bearer ${idToken}`,
      'content-type': 'application/json',
    };
    set(this._header, newHeader);
    set(this._isLoading, false);

    return {newHeader};
  });
}

const headerAtomService = new HeaderAtomService();
export default headerAtomService;
