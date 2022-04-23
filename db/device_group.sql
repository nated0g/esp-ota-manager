CREATE TABLE IF NOT EXISTS device_group (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name varchar[50] NOT NULL,
  metadata json
)