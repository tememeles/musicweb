# andasy.hcl app configuration file generated for music on Tuesday, 07-Oct-25 11:46:33 CAT
#
# See https://github.com/quarksgroup/andasy-cli for information about how to use this file.

app_name = "music"

app {

  env = {}

  port = 3000

  compute {
    cpu      = 1
    memory   = 256
    cpu_kind = "shared"
  }

  process {
    name = "music"
  }

}
