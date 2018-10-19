import MessageService from '../../../services/MessageService'
import { respond, fail } from '../../../utils/requestRespondUtils'
import { getIsAdmin, getId, getUserId } from '../../../utils/getUtils'


export default class Handlers {
  constructor() {
    this.messageService = new MessageService()
  }

  postMessage = async (req, res, next) => {
    try {
      const loggedInUserId = getUserId(req)
      const isAdmin = getIsAdmin(req)
      const message = req.body
      const params = {message, loggedInUserId, isAdmin}
      const result = await this.messageService.postMessage(params)
      return respond(res, result)
    } catch (err) {
      console.error(`Error in messageHandler.postMessage: [${err}]`)
      return fail(res, err)
    }
  }


  getManyMessages = async (req, res, next) => {
    try {
      const isAdmin = getIsAdmin(req)
      const params = {isAdmin}
      const results = await this.messageService.getManyMessages(params)
      return respond(res, results)
    } catch (err) {
      console.error(`Error in messageHandler.getManyMessages: [${err}]`)
      return fail(res, err)
    }
  }


  getMessage = async (req, res, next) => {
    try {
      const messageId = getId(req)
      const isAdmin = getIsAdmin(req)
      const params = {messageId, isAdmin}
      const result = await this.messageService.getMessage(params)
      return respond(res, result)
    } catch (err) {
      console.error(`Error in messageHandler.getMessage: [${err}]`)
      return fail(res, err)
    }
  }


  deleteMessage = async (req, res, next) => {
    try {
      const messageId = getId(req)
      const params = {messageId}
      const result = await this.messageService.deleteMessage(params)
      return respond(res, result)
    } catch (err) {
      console.error(`Error in messageHandler.deleteMessage: [${err}]`)
      return fail(res, err)
    }
  }
}
