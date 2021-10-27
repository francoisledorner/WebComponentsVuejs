import ItemWithChildrenDTO from './ItemWithChildrenDTO'
import KeyValueCheckableModel from './KeyValueCheckableModel'

export default class SearchHelper {
  constructor() {}

  public filteredArrayTree(tree: ItemWithChildrenDTO[], filter: String): ItemWithChildrenDTO[] {
    let result: ItemWithChildrenDTO[] = []
    if (tree) {
      tree.forEach(element => {
        const filtered: ItemWithChildrenDTO = this.filteredTree(element, filter)
        let ok: boolean = null != filtered
        if (ok) {
          result.push(filtered)
        }
      })
    }
    return result
  }

  public filteredTree(tree: ItemWithChildrenDTO, filter: String): ItemWithChildrenDTO {
    if (!filter) {
      return tree
    }
    let result: ItemWithChildrenDTO | any = null
    if (tree) {
      let rootIsMatching: boolean = this.match(tree.name, filter) || this.match(tree.element, filter)
      let children: ItemWithChildrenDTO[] = tree.children
      let keepedChildren: ItemWithChildrenDTO[] | any = null
      let childIsMatching: boolean = false
      if (children && children.length > 0) {
        for (let index = 0; index < children.length; index++) {
          let child = children[index]
          let keep: boolean = rootIsMatching
          if (!keep) {
            child = this.filteredTree(child, filter)
            keep = null != child && null != child.id
            if (keep) {
              childIsMatching = true
            }
          }
          if (keep) {
            if (null == keepedChildren) {
              keepedChildren = []
            }
            keepedChildren.push(child)
          }
        }
      }
      if (rootIsMatching || childIsMatching) {
        result = new ItemWithChildrenDTO()
        result.id = tree.id
        result.name = tree.name
        result.level = tree.level
        result.indexForParent = tree.indexForParent
        result.element = tree.element
        result.description = tree.description
        result.expend = null != keepedChildren && keepedChildren.length > 0 ? true : undefined
        result.children = keepedChildren
      }
    }

    return result
  }

  public filtered(items: any[], filter: String): any[] {
    let result: any[] = []
    if (items) {
      result = items.filter(item => this.match(item, filter))
    }
    return result
  }

  public isRowFiltered(allCheckedCodei: string[], allNotCheckedCodei: string[], row: any, keyOfRow: string): boolean {
    console.log(' ' + allCheckedCodei.length + ' ' + allNotCheckedCodei.length)
    //return allNotCheckedCodei.findIndex(e => e === row[keyOfRow]) > -1 && allCheckedCodei.findIndex(e => e === row[keyOfRow]) == -1
    return allNotCheckedCodei.findIndex(e => e === row[keyOfRow]) == -1 && allCheckedCodei.findIndex(e => e === row[keyOfRow]) > -1
  }

  public rowFiltered(checkable: KeyValueCheckableModel[], row: any[], key: string): any[] {
    const allChecked = checkable.filter(element => element.checked).map(e => e.codei)
    const allNotChecked = checkable.filter(element => !element.checked).map(e => e.codei)

    const dataFiltered = row.filter(x => this.isRowFiltered(allChecked, allNotChecked, x, key))

    return dataFiltered
  }

  /**
   *
   * @param row : {, , , job:'...', jobLibelle:'...'}
   * @param key : job
   * @param libelleForCheckable : jobLibelle
   * @returns
   */
  public getDistintKeyValueCheckableModel(
    row: any[],
    key: string,
    libelle: string,
    base: KeyValueCheckableModel = {} as KeyValueCheckableModel
  ): KeyValueCheckableModel[] {
    let result = row
      .filter((element, index, arr) => arr.findIndex(arre => arre[key] === element[key]) === index)
      .map(
        element =>
          new KeyValueCheckableModel({
            ...base,
            ...({ codei: element[key], libelle: element[libelle] } as KeyValueCheckableModel)
          } as KeyValueCheckableModel)
      )

    console.log('result' + JSON.stringify(result))
    return result
  }

  public keyValueCheckableModelMerge(coll: KeyValueCheckableModel[], base: KeyValueCheckableModel = {} as KeyValueCheckableModel) {
    coll.forEach(e => (e = { ...e, ...base } as KeyValueCheckableModel))
  }

  public spliceWithValidator(coll: [], valid: (value: Object) => boolean) {
    for (let i = 0; i < coll.length; i++) {
      let currentObject = coll[i]
      if (valid(currentObject) === false) {
        coll.splice(i, 1)
      }
    }
  }

  public match(obj: any, filter: String): boolean {
    if (!obj) {
      return false
    }
    if (filter) {
      let lowerFilter = filter.toLowerCase()
      let values: any[] = Object.values(obj)
      return (
        values &&
        values.some((val: any) => {
          if (this.isString(val)) {
            return val.toLowerCase().includes(lowerFilter)
          }
          return this.match(val, filter)
        })
      )
    }
    return true
  }

  private isString(s: any) {
    return typeof s === 'string' || s instanceof String
  }
}

export const SearchService = new SearchHelper()
