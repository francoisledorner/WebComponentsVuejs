// https://gist.github.com/joelpalmer/e6319d40b05395618329be41318722a7

export default class SecurePojo {
  public toJSON() {
    return Object.getOwnPropertyNames(this).reduce((a: any, b: any) => {
      if (b.startsWith('_') && b !== '__ob__') {
        // console.log('member: ' + b)
        if (this.jsonIgnore(b)) {
          return
        }

        a[b.substring(1)] = this.getProperty(this, b)

        if (a[b.substring(1)] === '') {
          a[b.substring(1)] = null
        }
      }
      return a
    }, {})
  }

  public jsonIgnore(key: string): boolean {
    return false
  }

  public getProperty<T, K extends keyof T>(obj: T, key: K) {
    return obj[key]
  }
}
