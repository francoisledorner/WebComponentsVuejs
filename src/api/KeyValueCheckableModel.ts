import SecurePojo from './SecurePojo'

export enum TypeOfKeyValueCheckableModel {
  string,
  date,
  na
}

export default class KeyValueCheckableModel extends SecurePojo {
  public _id: string = ''
  private _codei: string = ''
  private _libelle: string = ''
  private _type: TypeOfKeyValueCheckableModel = TypeOfKeyValueCheckableModel.na
  private _comment: string = ''

  private _checkAble: boolean = true
  private _checked: boolean = false

  private _unite: string = ''

  public get id(): string {
    return this._id
  }
  public set id(id: string) {
    this._id = id
  }

  public get codei(): string {
    return this._codei
  }
  public set codei(codei: string) {
    this._codei = codei
  }

  public get libelle(): string {
    return this._libelle
  }
  public set libelle(libelle: string) {
    this._libelle = libelle
  }

  public get type(): TypeOfKeyValueCheckableModel {
    return this._type
  }
  public set type(type: TypeOfKeyValueCheckableModel) {
    this._type = type
  }

  public get unite(): string {
    return this._unite
  }
  public set unite(unite: string) {
    this._unite = unite
  }

  public get comment(): string {
    return this._comment
  }
  public set comment(comment: string) {
    this._comment = comment
  }

  public static LIMITSTR: number = 30

  constructor(val: KeyValueCheckableModel = {} as KeyValueCheckableModel) {
    super()
    Object.assign(this, val)
  }

  public presentation(): string {
    let firstLibChars = this._libelle.substring(0, KeyValueCheckableModel.LIMITSTR)
    if (this._codei !== this._libelle) {
      return firstLibChars + ' (' + this._codei + ')'
    } else return firstLibChars
  }

  public get checkAble(): boolean {
    return this._checkAble
  }

  public get checked(): boolean {
    return this._checked
  }

  public set checkAble(value: boolean) {
    this._checkAble = value
  }

  public set checked(value: boolean) {
    this._checked = value
  }
}
