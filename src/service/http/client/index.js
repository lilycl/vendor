/**
 * Base client.
 */

import xhrClient from './xhr'
import {warn, when, isObject, isFunction} from '../../util'

export default function (context) {

  var reqHandlers = [sendRequest],
    resHandlers = [],
    handler

  function Client(request) {
    return new Promise((resolve) => {
      function exec() {
        handler = reqHandlers.pop()

        if (isFunction(handler)) {
          handler.call(context, request, next)
        } else {
          warn(`Invalid interceptor of type ${typeof handler}, must be a function`)
          next()
        }
      }

      function next(response) {
        if (isFunction(response)) {
          resHandlers.unshift(response)
        } else if (isObject(response)) {
          resHandlers.forEach((handler) => {
            response = when(response, (response) => {
              return handler.call(context, response) || response
            })
          })
          when(response, resolve)
          return
        }
        
        exec()
      }
      exec()
    }, context)
  }

  Client.use = (handler) => {
    reqHandlers.push(handler)
  }

  return Client
}

function sendRequest(request, resolve) {

  var client = request.client || xhrClient

  resolve(client(request))
}
