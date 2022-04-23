CREATE TABLE IF NOT EXISTS sdk_config (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name varchar[50],
  metadata json,
  contents json,
  version varchar[16]
);