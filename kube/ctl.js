var Client = require('node-kubernetes-client');

var client = new Client({
    host:  'admin:gZ7UeNmGzqhuvJUv@104.155.215.248',
    protocol: 'http',
    version: 'v1'
});

client.nodes.get((err, pods) => {
  if (err)
    console.log(err)

  console.dir("Pods: ")
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
