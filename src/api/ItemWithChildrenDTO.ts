import SecurePojo from './SecurePojo'

export default class ItemWithChildrenDTO extends SecurePojo {
  private _id: String | any = null
  private _children: ItemWithChildrenDTO[] = []
  private _level: Number = 0
  private _indexForParent: Number = 0
  private _name: String | any = ''
  private _description: String | any = ''
  private _expend: Boolean | any = null
  private _element: Object | any = null

  constructor() {
    super()
  }

  public get id(): String {
    return this._id
  }
  public set id(id: String) {
    this._id = id
  }

  public get name(): String {
    return this._name
  }
  public set name(name: String) {
    this._name = name
  }

  public get shortName(): String {
    if (this._name.length > 30) return this._name.substring(0, 29) + '...'
    else return this._name
  }

  public get description(): String {
    return this._description
  }
  public set description(description: String) {
    this._description = description
  }

  public get level(): Number {
    return this._level
  }
  public set level(level: Number) {
    this._level = level
  }

  public get indexForParent(): Number {
    return this._indexForParent
  }
  public set indexForParent(indexForParent: Number) {
    this._indexForParent = indexForParent
  }

  public get children(): ItemWithChildrenDTO[] {
    return this._children
  }
  public set children(children: ItemWithChildrenDTO[]) {
    this._children = children
  }

  public get expend(): Boolean {
    return this._expend
  }

  public set expend(expend: Boolean) {
    this._expend = expend
  }

  public get element(): Object {
    return this._element
  }

  public set element(element: Object) {
    this._element = element
  }
}
