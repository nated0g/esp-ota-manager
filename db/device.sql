CREATE TABLE IF NOT EXISTS device (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  reported_fw integer REFERENCES firmware(id),
  requested_fw integer REFERENCES firmware(id),
  group_id integer REFERENCES device_group(id),
  device_type varchar[50] REFERENCES device_type(name),
  name varchar[50],
  mac macaddr,
  uuid uuid,
  metadata json
)
