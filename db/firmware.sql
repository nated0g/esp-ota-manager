CREATE TABLE IF NOT EXISTS firmware (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  device_type varchar[50] REFERENCES device_type(name),
  sdk_config integer REFERENCES sdk_config(id),
  version varchar[16],
  url varchar[255],
  digest varchar[64],
  metadata json
);

