var spawn = require('child_process').spawn


function* launch () {
  var rancherCompose = spawn('which', ['node'])
  rancherCompose.stdout.on('data', function (buf) {

  })
  rancherCompose.stderr.on('data', function (err) {

  })
}


export default {
    launch
}
