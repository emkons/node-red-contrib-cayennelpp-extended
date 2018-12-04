/* LPP_TYPE = IPSO_OBJECT_ID - 3200 */
var LPP_TYPE = {}

LPP_TYPE.DIGITAL_INPUT = 0x00;
LPP_TYPE.DIGITAL_OUTPUT = 0x01;
LPP_TYPE.ANALOG_INPUT = 0x02;
LPP_TYPE.ANALOG_OUTPUT = 0x03;
LPP_TYPE.LUMINOSITY = 0x65;
LPP_TYPE.PRESENCE = 0x66;
LPP_TYPE.TEMPERATURE = 0x67;
LPP_TYPE.HUMIDITY = 0x68;
LPP_TYPE.ACCELEROMETER = 0x71;
LPP_TYPE.BAROMETER = 0x73;
LPP_TYPE.GYROSCOPE = 0x86;
LPP_TYPE.GPS = 0x88;

module.exports = LPP_TYPE;