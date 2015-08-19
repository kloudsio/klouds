var Client = require('node-kubernetes-client');

var client = new Client({
    host:  '104.197.127.202',
    protocol: 'http:',
    version: 'v1beta2',
    token: ''
});

client.pods.get((err, pods) => {
  if (err)
    console.log(err)

  console.dir(pods)
})

// Current endpoint support includes:

// events
// endpoints
// namespaces
// pods
// minions
// services
// replicationControllers
// nodes
// proxyMinions
// proxyNodes
// proxyPods
// proxyServices
// watchPods

// client.<endpoint>.<method>
