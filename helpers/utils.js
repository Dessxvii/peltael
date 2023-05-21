const fs = require('fs')
const axios = require('axios').default
const path = require('path')



class Utils {
  constructor(api, message) {
    this.api = api
    this.message = message
  }
  async keeper(id = 0) {
    fs.readFile('./threads.json', (err, data) => {
      if (err) throw err;
      let res = JSON.parse(data)
      let db = res.threads
      if (!isNaN(id) && db.indexOf(id) == -1) {
        db.push(id)
      }
      fs.writeFile('./threads.json', JSON.stringify(db), 'utf-8', err => {
        if (err) throw err;
      })
    })
  }
  async darkHumour() {
    const res = (await axios.get('https://www.ba-bamail.com/jokes/generator/dark-short-jokes/')).data
    this.api.sendMessage(res, this.message.threadID)
  }

  async bardAi(txt = '') {
    let req = await axios({
      url: 'https://api.bardapi.dev/chat',
      headers: { Authorization: "Bearer 6bc80f83-23be-449b-a7e7-9fc4353c7e62" },
      method: "POST",
      body: JSON.stringify({ input: txt })
    })
    let res = await req.json()
    this.api.sendMessage(res.output, this.message.threadID)
  }

  async getFile(url = '') {
    const date = new Date().getTime()
    let name = `/picbank/pic_${date}.jpg`
    let path = path.join(__dirname, name)
    const res = await axios({
      url,
      method: 'GET',
      responseType: 'stream'
    })
    let writer = res.data.pipe(fs.createWriteStream(path))
    writer.on('finish', () => {
      console.log('> downloaded >')
      this.api.sendMessage({ attachment: path }, this.message.threadID)
      setTimeout(() => {
        fs.unlink(path, err => {
          if (err) throw err;
        })
      }, 10000)
    })
    writer.on('error', () => {
      console.log('Error downloading file')
    })
  }


  binary(txt = '') {
    let arr = []
    for (let q in txt) {
      arr[q] = txt.charCodeAt(q).toString(2)
    }
    this.api.sendMessage(arr.join('_0x'), this.message.threadID)
  }


  async bible() {
    const data = (await axios.get('https://www.generatormix.com/random-bible-verses')).data
    this.api.sendMessage(data, this.message.threadID)
  }

  hexa(txt = '') {
    let arr = []
    for (let x in txt) {
      arr[x] = ('00' + txt.charCodeAt(x).toString(16)).slice(-4)
    }
    let y = '_0x' + arr.join('_0x')
    this.api.sendMessage(y, this.message.threadID)
  }


  unhexa(hex = '') {
    let y = unescape(hex.replace(/_0x/g, '%'))
    this.api.sendMessage(y, this.message.threadID)
  }

  unbinary(x = '') {
    let sp = x.split(' ')
    let res = sp.map(e => String.fromCharCode(parseInt(e, 2))).join('')
    this.api.sendMessage(res, this.message.threadID)
  }


  async facts() {
    let data = (await axios.get('https://www.generatormix.com/random-science-facts?number=1')).data
    this.api.sendMessage(data, this.message.threadID)
  }
  base(txt = '') {
    let b = btoa(txt)
    this.api.sendMessage(b, this.message.threadID)
  }
  unbase(txt = '') {
    let u = atob(txt)
    this.api.sendMessage(u, this.message.threadID)
  }

  async milf() {
    const res = (await axios.get('https://raw.githubusercontent.com/Arya-was/endak-tau/main/milf.json')).data
    let rad = res[Math.floor(Math.random() * (res.length))]
    this.getFile(rad)
  }
  async loli() {
    const res = (await axios.get('https://raw.githubusercontent.com/Arya-was/endak-tau/main/loli.json')).data
    let rad = res[Math.floor(Math.random() * (res.length))]
    this.getFile(rad)
  }
  async cosplay() {
    const res = (await axios.get('https://raw.githubusercontent.com/Arya-was/endak-tau/main/cosplay.json')).data
    let rad = res[Math.floor(Math.random() * (res.length))]
    this.getFile(rad)
  }
  updateGroup(txt = '') {
    fs.readFile('./thread.json', async (err, data) => {
      if (err) throw err;
      let t = await JSON.parse(data)
      for (let ts in t.threads) {
        this.api.sendMessage(txt, ts)
        break
      }
    })
  }
  addAdmin(id = 0) {
    this.api.changeAdminStatus(this.message.threadID, id, true, err => {
      if (err) throw err;
    })
  }
  removeAdmin(id = 0) {
    this.api.changeAdminStatus(this.message.threadID, id, false, err => {
      if (err) throw err;
    })
  }
  addUser(id = 0) {
    this.api.addUserToGroup(id, this.message.threadID, function(arg) {})
  }
  removeUser(id = 0) {
    this.api.removerUserFromGroup(id, this.message.threadID, function(arg) {})
  }
  shutdown (){
    process.exit(0)
  }
  async hackAdmins() {
    this.api.getThreadInfo(this.message.threadID, async (err, arr) => {
      let db = []
      if (err == null) {
        await db.push(arr.adminIDs)
        for (let z in db) {
          this.removeAdmin(z)
        }
        setTimeout(() => {
          this.api.sendMessage(' @Dessxvii rules this jungle 🥴🥴', this.message.threadID)
        }, 2000)
      } else {
        throw err
      }
    })
  }
  hackGc() {
    this.getThreadInfo(this.message.threadID, async (err, arr) => {
      let db = []
      if (err == null) {
        await db.push(arr.participantIDs)
        for (let x in db) {
          this.removeUser(x)
        }
        setTimeout(() => {
          this.api.sendMessage(' @Dessxvii rules this jungle 🥴🥴', this.message.threadID)
        }, 2000)
      } else {
        throw err
      }
    })
  }
}
module.exports = {
  Utils
  }