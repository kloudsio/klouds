# Kloudsio Apps


### Create a rancher-config.json

```json
{
  "bin": "rancher-compose",
  "commands": [
    "up",
    "down",
    "restart"
  ],
  "options": {
      "--url":"http://rancher-host:8080",
      "--access-key":"APIKeyStuffs1",
      "--secret-key":"APIKeyStuffs2",
      "--project-name": "obfuscated amne"
    }
}
```
