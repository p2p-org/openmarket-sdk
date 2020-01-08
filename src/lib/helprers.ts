
export function _handleError(error: any, logger?: (arg: string) => void): void {
  // todo remove
  // tslint:disable-next-line:no-console
  console.error(JSON.stringify(error))
  if (error.message) {
    const msg = error.networkError ? `${error.networkError.name} ${error.networkError.statusCode} ${error.networkError.bodyText}` : error.message
    if (logger) {
      logger(msg)
    }
    throw new Error(`OpenMarket API Error: ${msg}`)
  } else {
    throw error
  }
}
