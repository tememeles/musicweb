# andasy.hcl app configuration file generated for musicbackend on Thursday, 16-Oct-25 14:00:24 CAT
#
# See https://github.com/quarksgroup/andasy-cli for information about how to use this file.

app_name = "musicbackend"

app {

  env = {}

  port = 3002

  compute {
    cpu      = 1
    memory   = 256
    cpu_kind = "shared"
  }

  process {
    name = "musicbackend"
  }

}
