CREATE TABLE IF NOT EXISTS device_type (
  name varchar(50) PRIMARY KEY,
  default_sdk_config integer REFERENCES sdk_config(id),
  vendor_mcu_id varchar(20),
  metadata json
)