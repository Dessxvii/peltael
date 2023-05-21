const { cmds } = require('./helpers/commands.js')
const { keepAlive, init } = require('desslib')

keepAlive({ bool: true, port: 3690 })

init('./iixvssed/tansu.json', ev => {
  ev.when('message', (message, api) => {
    cmds(message, api)
    hehe(message, api)
  })
  ev.when('message_reply', (message, api) => {
    cmds(message, api)
    hehe(message, api)
  })

})

function hehe(arg = '', api) {
  switch (arg.type) {
    case 'event':
      switch (arg.logMessageType) {
        case 'log:unsubscribe':
          let x = {
            attachment: fs.createReadStream('./assets/idoit.jpg')
          }
          api.sendMessage(x, arg.threadID)
          break
          default:
          break 
      }
      break
    default:
      break
  }
 }