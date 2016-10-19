var db = process.env.BROWSER_ENV ? 'http://db.magicalpixi.com' : ''

var domin = {
  db: db
}

var path = {
  game: {
    normal: '/api/game',
    plural: '/api/games'
  }
}

module.exports = {
  domin,
  path
}
