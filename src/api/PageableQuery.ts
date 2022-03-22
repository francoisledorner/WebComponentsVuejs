import SecurePojo from './SecurePojo'

export default class PageableQuery extends SecurePojo {
  protected _offset: number | any = null
  protected _limit: number | any = null

  constructor() {
    super()
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
}
