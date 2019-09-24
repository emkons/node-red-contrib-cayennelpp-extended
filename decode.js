// https://github.com/FIWARE-GEs/iot-agent.LoraWAN/blob/bfbb71bb24eedbde3beaa610d92c551aa3e12d2d/lib/dataModels/cayenneLpp.js
'use strict';

const CAYENNELPP_MAX_CHANNEL = 255;
const CAYENNELPP_MIN_SIZE_BYTES = 3;

const LPP_DIGITAL_INPUT = 0;
const LPP_DIGITAL_OUTPUT = 1;
const LPP_ANALOG_INPUT = 2;
const LPP_ANALOG_OUTPUT = 3;
const LPP_GENERIC_SENSOR = 100
const LPP_LUMINOSITY = 101;
const LPP_PRESENCE = 102;
const LPP_TEMPERATURE = 103;
const LPP_RELATIVE_HUMIDITY = 104;
const LPP_ACCELEROMETER = 113;
const LPP_BAROMETRIC_PRESSURE = 115;
const LPP_VOLTAGE = 116;
const LPP_CURRENT = 117;
const LPP_FREQUENCY = 118;
const LPP_PERCENTAGE = 120;
const LPP_ALTITUDE = 121;
const LPP_POWER = 128;
const LPP_DISTANCE = 130;
const LPP_ENERGY = 131;
const LPP_DIRECTION = 132;
const LPP_UNIXTIME = 133;
const LPP_GYROMETER = 134;
const LPP_GPS = 136;

const LPP_DIGITAL_INPUT_NAME = 'digital_in';
const LPP_DIGITAL_OUTPUT_NAME = 'digital_out';
const LPP_ANALOG_INPUT_NAME = 'analog_in';
const LPP_ANALOG_OUTPUT_NAME = 'analog_out';
const LPP_GENERIC_SENSOR_NAME = 'generic_sensor';
const LPP_LUMINOSITY_NAME = 'luminosity';
const LPP_PRESENCE_NAME = 'presence';
const LPP_TEMPERATURE_NAME = 'temperature';
const LPP_RELATIVE_HUMIDITY_NAME = 'relative_humidity';
const LPP_ACCELEROMETER_NAME = 'accelerometer';
const LPP_BAROMETRIC_PRESSURE_NAME = 'barometric_pressure';
const LPP_VOLTAGE_NAME = 'voltage';
const LPP_CURRENT_NAME = 'current';
const LPP_FREQUENCY_NAME = 'frequency';
const LPP_PERCENTAGE_NAME = 'percentage';
const LPP_ALTITUDE_NAME = 'altitude';
const LPP_POWER_NAME = 'power';
const LPP_DISTANCE_NAME = 'distance';
const LPP_ENERGY_NAME = 'energy';
const LPP_DIRECTION_NAME = 'direction';
const LPP_UNIXTIME_NAME = 'unixtime';
const LPP_GYROMETER_NAME = 'gyrometer';
const LPP_GPS_NAME = 'gps';

const LPP_DIGITAL_INPUT_SIZE = 1; // 1 byte
const LPP_DIGITAL_OUTPUT_SIZE = 1; // 1 byte
const LPP_ANALOG_INPUT_SIZE = 2; // 2 bytes, 0.01 signed
const LPP_ANALOG_OUTPUT_SIZE = 2; // 2 bytes, 0.01 signed
const LPP_GENERIC_SENSOR_SIZE = 4; // 4 bytes unsigned
const LPP_LUMINOSITY_SIZE = 2; // 2 bytes, 1 lux unsigned
const LPP_PRESENCE_SIZE = 1; // 1 byte, 1
const LPP_TEMPERATURE_SIZE = 2; // 2 bytes, 0.1°C signed
const LPP_RELATIVE_HUMIDITY_SIZE = 1; // 1 byte, 0.5% unsigned
const LPP_ACCELEROMETER_SIZE = 6; // 2 bytes per axis, 0.001G
const LPP_BAROMETRIC_PRESSURE_SIZE = 2; // 2 bytes 0.1 hPa Unsigned
const LPP_VOLTAGE_SIZE = 2; // 2 bytes 0.01V unsigned
const LPP_CURRENT_SIZE = 2; // 2 bytes 0.001A unsigned
const LPP_FREQUENCY_SIZE = 4; // 4 bytes 1Hz unsigned
const LPP_PERCENTAGE_SIZE = 1; // 1 byte 1-100% unsigned
const LPP_ALTITUDE_SIZE = 2; // 2 byte 1m signed
const LPP_POWER_SIZE = 2; // 2 byte, 1W, unsigned
const LPP_DISTANCE_SIZE = 4; // 4 byte, 0.001m, unsigned
const LPP_ENERGY_SIZE = 4; // 4 byte, 0.001kWh, unsigned
const LPP_DIRECTION_SIZE = 2; // 2 bytes, 1deg, unsigned
const LPP_UNIXTIME_SIZE = 4; // 4 bytes, unsigned
const LPP_GYROMETER_SIZE = 6; // 2 bytes per axis, 0.01 °/s
const LPP_GPS_SIZE = 9; // 3 byte lon/lat 0.0001 °, 3 bytes alt 0.01 meter

function decodeCayenneLpp(payload) {
  var result = {};
  var buffer = Buffer.from(payload, 'hex');
  if (buffer && validateCayenneLppSize(buffer)) {
    var cursor = 0;
    var value;
    var propertyName;
    while (cursor < buffer.length) {
      var channel = buffer.readUInt8(cursor);
      if (validateCayenneLppChannel(channel)) {
        cursor++;
        var type = buffer[cursor];
        cursor++;

        switch (type) {
          case LPP_DIGITAL_INPUT:

            if (cursor + LPP_DIGITAL_INPUT_SIZE > buffer.length) {
              throw new Error('Invalid CayennLpp message');
            } else {
              value = buffer[cursor];
              cursor++;
              propertyName = LPP_DIGITAL_INPUT_NAME + '_' + channel.toString();
              result[propertyName] = value;
            }
            break;
          case LPP_DIGITAL_OUTPUT:
            if (cursor + LPP_DIGITAL_OUTPUT_SIZE > buffer.length) {
              throw new Error('Invalid CayennLpp message');
            } else {
              value = buffer[cursor];
              cursor++;
              propertyName = LPP_DIGITAL_OUTPUT_NAME + '_' + channel.toString();
              result[propertyName] = value;
            }
            break;
          case LPP_ANALOG_INPUT:
            if (cursor + LPP_ANALOG_INPUT_SIZE > buffer.length) {
              throw new Error('Invalid CayennLpp message');
            } else {
              value = buffer.readInt16BE(cursor) / 100.0;
              cursor += 2;
              propertyName = LPP_ANALOG_INPUT_NAME + '_' + channel.toString();
              result[propertyName] = value;
            }
            break;
          case LPP_ANALOG_OUTPUT:
            if (cursor + LPP_ANALOG_OUTPUT_SIZE > buffer.length) {
              throw new Error('Invalid CayennLpp message');
            } else {
              value = buffer.readInt16BE(cursor) / 100.0;
              cursor += 2;
              propertyName = LPP_ANALOG_OUTPUT_NAME + '_' + channel.toString();
              result[propertyName] = value;
            }
            break;
          case LPP_GENERIC_SENSOR:
            if (cursor + LPP_GENERIC_SENSOR_SIZE > buffer.length) {
              throw new Error('Invalid CayennLpp message');
            } else {
              value = buffer.readInt32BE(cursor);
              cursor += 4;
              propertyName = LPP_GENERIC_SENSOR_NAME + '_' + channel.toString();
              result[propertyName] = value;
            }
            break;
          case LPP_LUMINOSITY:
            if (cursor + LPP_LUMINOSITY_SIZE > buffer.length) {
              throw new Error('Invalid CayennLpp message');
            } else {
              value = buffer.readInt16BE(cursor);
              cursor += 2;
              propertyName = LPP_LUMINOSITY_NAME + '_' + channel.toString();
              result[propertyName] = value;
            }
            break;
          case LPP_PRESENCE:
            if (cursor + LPP_PRESENCE_SIZE > buffer.length) {
              throw new Error('Invalid CayennLpp message');
            } else {
              value = buffer[cursor];
              cursor++;
              propertyName = LPP_PRESENCE_NAME + '_' + channel.toString();
              result[propertyName] = value;
            }
            break;
          case LPP_TEMPERATURE:
            if (cursor + LPP_TEMPERATURE_SIZE > buffer.length) {
              throw new Error('Invalid CayennLpp message');
            } else {
              value = buffer.readInt16BE(cursor) / 10.0;
              cursor += 2;
              propertyName = LPP_TEMPERATURE_NAME + '_' + channel.toString();
              result[propertyName] = value;
            }
            break;
          case LPP_RELATIVE_HUMIDITY:
            if (cursor + LPP_RELATIVE_HUMIDITY_SIZE > buffer.length) {
              throw new Error('Invalid CayennLpp message');
            } else {
              value = buffer[cursor] / 2.0;
              cursor++;
              propertyName = LPP_RELATIVE_HUMIDITY_NAME + '_' + channel.toString();
              result[propertyName] = value;
            }
            break;
          case LPP_ACCELEROMETER:
            if (cursor + LPP_ACCELEROMETER_SIZE > buffer.length) {
              throw new Error('Invalid CayennLpp message');
            } else {
              var varAccX = buffer.readInt16BE(cursor) / 1000.0;
              cursor += 2;
              var varAccY = buffer.readInt16BE(cursor) / 1000.0;
              cursor += 2;
              var varAccZ = buffer.readInt16BE(cursor) / 1000.0;
              cursor += 2;
              value = {
                x: varAccX,
                y: varAccY,
                z: varAccZ
              };
              propertyName = LPP_ACCELEROMETER_NAME + '_' + channel.toString();
              result[propertyName] = value;
            }
            break;
          case LPP_BAROMETRIC_PRESSURE:
            if (cursor + LPP_BAROMETRIC_PRESSURE_SIZE > buffer.length) {
              throw new Error('Invalid CayennLpp message');
            } else {
              value = buffer.readInt16BE(cursor) / 10.0;
              cursor += 2;
              propertyName = LPP_BAROMETRIC_PRESSURE_NAME + '_' + channel.toString();
              result[propertyName] = value;
            }
            break;
          case LPP_VOLTAGE:
            if (cursor + LPP_VOLTAGE_SIZE > buffer.length) {
              throw new Error('Invalid CayennLpp message');
            } else {
              value = buffer.readInt16BE(cursor) / 100.0;
              cursor += 2;
              propertyName = LPP_VOLTAGE_NAME + '_' + channel.toString();
              result[propertyName] = value;
            }
            break;
          case LPP_CURRENT:
            if (cursor + LPP_CURRENT_SIZE > buffer.length) {
              throw new Error('Invalid CayennLpp message');
            } else {
              value = buffer.readInt16BE(cursor) / 1000.0;
              cursor += 2;
              propertyName = LPP_CURRENT_NAME + '_' + channel.toString();
              result[propertyName] = value;
            }
            break;
          case LPP_FREQUENCY:
            if (cursor + LPP_FREQUENCY_SIZE > buffer.length) {
              throw new Error('Invalid CayennLpp message');
            } else {
              value = buffer.readInt32BE(cursor);
              cursor += 4;
              propertyName = LPP_FREQUENCY_NAME + '_' + channel.toString();
              result[propertyName] = value;
            }
            break;
          case LPP_PERCENTAGE:

            if (cursor + LPP_PERCENTAGE_SIZE > buffer.length) {
              throw new Error('Invalid CayennLpp message');
            } else {
              value = buffer[cursor];
              cursor++;
              propertyName = LPP_PERCENTAGE_NAME + '_' + channel.toString();
              result[propertyName] = value;
            }
            break;
          case LPP_ALTITUDE:
            if (cursor + LPP_ALTITUDE_SIZE > buffer.length) {
              throw new Error('Invalid CayennLpp message');
            } else {
              value = buffer.readInt16BE(cursor);
              cursor += 2;
              propertyName = LPP_ALTITUDE_NAME + '_' + channel.toString();
              result[propertyName] = value;
            }
            break;
          case LPP_POWER:
            if (cursor + LPP_POWER_SIZE > buffer.length) {
              throw new Error('Invalid CayennLpp message');
            } else {
              value = buffer.readInt16BE(cursor);
              cursor += 2;
              propertyName = LPP_POWER_NAME + '_' + channel.toString();
              result[propertyName] = value;
            }
            break;
          case LPP_DISTANCE:
            if (cursor + LPP_DISTANCE_SIZE > buffer.length) {
              throw new Error('Invalid CayennLpp message');
            } else {
              value = buffer.readInt32BE(cursor) / 1000.0;
              cursor += 4;
              propertyName = LPP_DISTANCE_NAME + '_' + channel.toString();
              result[propertyName] = value;
            }
            break;
          case LPP_ENERGY:
            if (cursor + LPP_ENERGY_SIZE > buffer.length) {
              throw new Error('Invalid CayennLpp message');
            } else {
              value = buffer.readInt32BE(cursor) / 1000.0;
              cursor += 4;
              propertyName = LPP_ENERGY_NAME + '_' + channel.toString();
              result[propertyName] = value;
            }
            break;
          case LPP_DIRECTION:
            if (cursor + LPP_DIRECTION_SIZE > buffer.length) {
              throw new Error('Invalid CayennLpp message');
            } else {
              value = buffer.readInt16BE(cursor);
              cursor += 2;
              propertyName = LPP_DIRECTION_NAME + '_' + channel.toString();
              result[propertyName] = value;
            }
            break;
          case LPP_UNIXTIME:
            if (cursor + LPP_UNIXTIME_SIZE > buffer.length) {
              throw new Error('Invalid CayennLpp message');
            } else {
              value = buffer.readInt32BE(cursor);
              cursor += 4;
              propertyName = LPP_UNIXTIME_NAME + '_' + channel.toString();
              result[propertyName] = value;
            }
            break;
          case LPP_GYROMETER:
            if (cursor + LPP_GYROMETER_SIZE > buffer.length) {
              throw new Error('Invalid CayennLpp message');
            } else {
              var varX = buffer.readInt16BE(cursor) / 100.0;
              cursor += 2;
              var varY = buffer.readInt16BE(cursor) / 100.0;
              cursor += 2;
              var varZ = buffer.readInt16BE(cursor) / 100.0;
              cursor += 2;
              value = {
                x: varX,
                y: varY,
                z: varZ
              };
              propertyName = LPP_GYROMETER_NAME + '_' + channel.toString();
              result[propertyName] = value;
            }
            break;
          case LPP_GPS:
            if (cursor + LPP_GPS_SIZE > buffer.length) {
              throw new Error('Invalid CayennLpp message');
            } else {
              var latitude = readInt24BE(buffer, cursor) / 10000.0;
              cursor += 3;
              var longitude = readInt24BE(buffer, cursor) / 10000.0;
              cursor += 3;
              var altitude = readInt24BE(buffer, cursor) / 100.0;
              cursor += 3;
              value = {
                latitude: latitude,
                longitude: longitude,
                altitude: altitude
              };
              propertyName = LPP_GPS_NAME + '_' + channel.toString();
              result[propertyName] = value;
            }
            break;
        }
      } else {
        throw new Error('Invalid CayennLpp channel');
      }
    }
  } else {
    throw new Error('Invalid CayennLpp buffer size');
  }

  return result;
}

/**
 * It validates the size of a CayenneLpp message
 *
 * @param      {<type>}   buffer  The buffer
 * @return     {boolean}  { description_of_the_return_value }
 */
function validateCayenneLppSize(buffer) {
  var result = false;
  if (buffer && buffer.length >= CAYENNELPP_MIN_SIZE_BYTES) {
    result = true;
  }

  return result;
}

/**
 * It validates the a CayenneLpp channel
 *
 * @param      {<type>}   buffer  The buffer
 * @return     {boolean}  { description_of_the_return_value }
 */
function validateCayenneLppChannel(channel) {
  var result = true;

  if (channel > CAYENNELPP_MAX_CHANNEL) {
    result = false;
  }

  return result;
}

/**
 * It reads an integer represented using 24 bits
 *
 * @param      {<type>}  buf     The buffer
 * @param      {number}  offset  The offset
 * @return     {<type>}  { description_of_the_return_value }
 */
function readInt24BE(buf, offset) {
  return buf.readIntBE(offset, 3);
}

exports.decodeCayenneLpp = decodeCayenneLpp;