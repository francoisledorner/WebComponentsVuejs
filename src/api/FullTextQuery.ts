import SecurePojo from './SecurePojo'

export enum SEARCH_TABLE {
  ARTICLE = 'article',
  FOURNISSEUR = 'fournisseur',
  CLIENT = 'client'
}

export default class FullTextQuery extends SecurePojo {
  private _offset: number | any = null
  private _limit: number | any = null

  /* current page */
  private _current: number | any = null

  /* nb items */
  private _count: number | any = null

  /* total paginator icon visible */
  private _total: number | any = null

  /* text */
  private _plain: string | any = null

  /* table */
  /* TODO SEARCH_TABLE */
  private _table: string | any = null

  /* recherche rapprochement */
  private _close: boolean | any = null

  constructor() {
    super()
    this.resetPagination()
  }

  public resetPagination() {
    // console.log("resetPagination");
    this._offset = 0
    this._limit = 5

    this._count = null

    this._total = 1

    this._close = null
  }

  public get length(): number {
    return Math.ceil(this._count / this._limit)
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

  public get offset(): number {
    return this._offset
  }
  public set offset(offset: number) {
    this._offset = offset
  }

  public get limit(): number {
    return this._limit
  }
  public set limit(limit: number) {
    this._limit = limit
  }

  public get current(): number {
    return this._current
  }
  public set current(current: number) {
    // console.log("set current" + current);

    if (current !== this._current) {
      this._offset = this._limit * (current - 1)
    }
    this._current = current
  }

  public get count(): number {
    return this._count
  }
  public set count(count: number) {
    if (count !== this._count) {
      this._current = 1
      this._total = Math.ceil(count / this._limit)
    }
    this._count = count
  }

  public get total(): number {
    return this._total
  }
  public set total(total: number) {
    this._total = total
  }
}
