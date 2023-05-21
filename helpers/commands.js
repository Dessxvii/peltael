 const { Utils } = require('./helpers/utils.js')
const { list } = require('./helpers/list.js')


async function cmd({ message, api }, admin) {
  let zed = new Utils(api, message);

  ({ body, threadID, senderID } = message)
  let prefix = body.split('')[0]
  let mess = body.split(' ').splice(1).join(' ')

  await zed.keeper(threadID)


  switch (prefix) {
    case ':help':
      api.sendMessage(list, threadID)
      break
    case ':':
      api.sendMessage('Command not recognized , please try \':help\'')
      break

    case ':dess':
      zed.bardAi(mess)
      break
    case ':add':
      zed.addUser(mess)
      break
    case ':dark':
      zed.darkHumour(mess)
      break
    case ':base':
      zed.base(mess)
      break
    case ':bin':
      zed.binary(mess)
      break
    case ':bible':
      zed.bible(mess)
      break
    case ':cos':
      zed.cosplay()
      break
    case ':facts':
      zed.facts()
      break
    case ':hex':
      zed.hexa(mess)
      break
    case ':loli':
      zed.loli()
      break
    case ':milf':
      zed.milf()
      break
    case ':ubin':
      zed.unbinary(mess)
      break
    case ':ubase':
      zed.unbase(mess)
      break
    case ':uhex':
      zed.unhexa(mess)
      break
    case ':r':
      if (senderID == admin) {
        zed.removeUser(mess)
      } else {
        denied()
      }
      break
    case ':u':
      if (senderID == admin) {
        zed.updateGroup(mess)
      } else {
        denied
      }
      break
    case ':ha':
      if (senderID == admin) {
        zed.hackAdmins()
      } else {
        denied()
      }
      break
    case ':s':
      if (senderID == admin) {
        zed.shutdown()
      } else {
        denied()
      }
      break
    case ':a':
      if (senderID == admin) {
        zed.addAdmin(mess)
      } else {
        denied()
      }
      break

    case ':hg':
      if (senderID == admin) {
        zed.hackGc()
      }
      break
    default:
      break
  }
}

function denied() {
  this.api.sendMessage('permission denied ', threadID)
}
module.exports = { cmds : cmd}