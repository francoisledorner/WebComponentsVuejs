import ItemWithChildrenDTO from './ItemWithChildrenDTO'

export default class ItemWithChildrenDTOHelper {
  constructor() {}

  public getFirstNodeInDeep(all: ItemWithChildrenDTO[], field: string): ItemWithChildrenDTO | any {
    let result: ItemWithChildrenDTO | any

    let firstNodeInDeepFound = null
    let i = 0
    // @ts-ignore
    while ((!firstNodeInDeepFound || !firstNodeInDeepFound.element || !firstNodeInDeepFound.element[field]) && i < all.length) {
      firstNodeInDeepFound = this.findDeep(all[i])
      i++
    }

    // @ts-ignore
    if (firstNodeInDeepFound && firstNodeInDeepFound.level) {
      return firstNodeInDeepFound
    } else {
      return null
    }
  }

  findDeep(itemWithChildrenDTO: ItemWithChildrenDTO): ItemWithChildrenDTO | any {
    if (itemWithChildrenDTO.children && itemWithChildrenDTO.children.length > 0) {
      return this.findDeep(itemWithChildrenDTO.children[0])
    } else {
      return itemWithChildrenDTO
    }
  }
}

export const ItemWithChildrenDTOService = new ItemWithChildrenDTOHelper()
