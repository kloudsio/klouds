const url = 'http://192.168.0.53:8080/v1/projects/1a5/environments/1a2'
const projectname = 'test'
const accesskey = 'A93752C01458187DF894'
const secretkey = 'iXTy9zffMhgwUXMYYLBWgrD8WMQgErZAr3Gyn3a'

const rancher = `--url "${url}" \
  --project-name ${projectname} \
  --access-key ${accesskey} \
  --secret-key ${secretkey}`

export default {
  rancher
}


