
import { Context } from './Context'


class DatamuseError extends Error {

  isDatamuseError = true

  sdk = 'Datamuse'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  DatamuseError
}

