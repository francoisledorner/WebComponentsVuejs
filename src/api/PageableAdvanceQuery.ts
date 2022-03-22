import PageableQuery from './PageableQuery'

export default class PageableAdvanceQuery extends PageableQuery {

  /* current page */
  private _current: number | any = null

  /* nb items */
  private _count: number | any = null

  /* total paginator icon visible */
  private _total: number | any = null

  
  public get length(): number {
    return Math.ceil(this._count / this._limit)
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

  public next(): boolean {
    if (this._offset + this._limit <= this._count) {
      this._offset = this._offset + this._limit
      this._current = this._current + 1
      return true
    }
    return false
  }

  public previous(): boolean {
    if (this._offset - this._limit >= 0) {
      this._offset = this._offset - this._limit
      this._current = this._current - 1
      return true
    }
    return false
  }
  
  public resetPagination() {
    // console.log("resetPagination");
    this._offset = 0
    this._limit = 5
    this._current = 1

    this._count = 5

    this._total = 1
  }

}