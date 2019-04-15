import { assert } from '/components/sharedScripts/debug'

export default class Component {
  constructor(def) {
    // copy properties
    for (let prop in def) {
      if (prop === 'data') {
        assert(() => typeof(def[prop]) === 'object', 'data must be object')
        this._addData(def[prop])
        continue
      }
      this[prop] = def[prop]
    }

    assert(() => this.name, 'component must have name')

    if (this.types) {
      // add type properties
      if (!this.props) this.props = {}
      this.props = Object.assign(this.props, Object.fromEntries(this.types
        .filter(t => t !== 'default').map(t => [t, Boolean])))

      // type computed property
      if (!this.computed) this.computed = {}
      this.computed['type'] = function() {
        const type = this.types.map(t => ([t, this[t]])).find(t => t[1])
        return type ? type[0] : null
      }

      // add type array to data
      this._addData({ types: this.types })

      // add tag list and computed tag property if tags array is defined & valid
      if (this.tags) {
        assert(Array.isArray(this.tags), 'tags must be array')
        assert(this.tags.length === this.types.length, 'number of tags must be equal to number of types')
        this._addData({ tags: this.tags })
        this.computed['tag'] = function() {
          return this.tags[this.types.indexOf(this.type)]
        }
      }
    }

    // getClass computed property
    if (!this.computed) this.computed = {}
    this.computed['getClass'] = function() {
      const kebabCase = str => (str[0] + str.slice(1).replace(/([A-Z])/g, '-$1')).toLowerCase()
      return [kebabCase(this.$options.name), this.type]
    }
  }

  _addData(...data) {
    for (let prop of data) {
      const dataOld = this.data ? this.data() : {}
      this.data = () => ({
        ...dataOld,
        ...prop
      })
    }
  }

  created() {
    if (this.types === undefined) return
    const num_types = this.types.map(t => this[t]).filter(t => t).length
    if (this.types.includes('default') && !num_types) return
    assert(() => num_types > 0, this.$options.name + ' must have a type')
    assert(() => num_types < 2, this.$options.name + ' must not have multiple types')
  }
}
