import PageableAdvanceQuery from './PageableAdvanceQuery'

export default class FullTextQuery extends PageableAdvanceQuery {
 
  /* text */
  private _plain: string | any = null

  /* table */
  /* exemple:  ARTICLE = 'article',
  FOURNISSEUR = 'fournisseur',
  CLIENT = 'client'
  */
  private _table: string | any = null

  /* recherche rapprochement */
  private _close: boolean | any = null

  constructor() {
    super()
    this.resetPagination()
    this._close = null
  }


  public get plain(): string {
    return this._plain
  }
  public set plain(plain: string) {
    if (plain !== this._plain) {
      this.resetPagination()
    }

    this._plain = plain
  }

  public get table(): string {
    return this._table
  }
  public set table(table: string) {
    this._table = table
  }

  public get close(): string {
    return this._close
  }
  public set close(close: string) {
    this._close = close
  }

  
}
