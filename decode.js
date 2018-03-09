
// Decode decodes an array of bytes into an object.
//  - fPort contains the LoRaWAN fPort number
//  - bytes is an array of bytes, e.g. [225, 230, 255, 0]
// The function must return an object, e.g. {"temperature": 22.5}
function Decode(fPort, bytes) {
    var evb_sensors = {};
    if (fPort == 1 || fPort == 2 || fPort == 5) {
        /*
         * Evaluation board properties.
         */
        var EVB_TYPE = {
            none: 0,
            //led_1: 1,
            co2ppm: 1,
            led_2: 2,
            lux_max: 3,
            lux_min: 4,
            lux: 5,
            barometer_max: 6,
            barometer_min: 7,
            barometer: 8,
            temperature_max: 9,
            temperature__min: 10,
            temperature: 11,
            accelerometer_max: 12,
            accelerometer_min: 13,
            accelerometer: 14,
            tx_interval: 15,
            amps_max: 16,
            amps_min: 17,
            amps: 18,
            m2x_device: 19,
            m2x_key: 20,
        };
        /*
         * Process the EVB LoRa payload.
         *
         * EVB payload contains one or more TLV fields.
         *
         * [<type: accelerometer><length: 6><x-high><x-low><y-high><y-low><z-high><z-low>]
         * [<type: barometer><length: 3><byte2><byte1><byte0>]
         * [<type: temperature><length: 2><byte-high><byte-low>]
         * 
         */


        for (var index = 0; index < bytes.length;) {
            var type = bytes[index++];
            //   var length = bytes[index++];
            var value;

            switch (type) {
                case EVB_TYPE.co2ppm:
                    if (typeof (evb_sensors.co2) == "undefined") {
                        evb_sensors.co2 = {};
                    }
                    value = bytes[index++] << 8;
                    value |= bytes[index++];
                    evb_sensors.co2.ppm = value;

                    break;

                case EVB_TYPE.lux:
                    if (typeof (evb_sensors.light) == "undefined") {
                        evb_sensors.light = {};
                    }

                    value = bytes[index++] << 8;
                    value |= bytes[index++];
                    value = value * 0.24;

                    evb_sensors.light.lux = value;
                    break;
                case EVB_TYPE.barometer:
                    if (typeof (evb_sensors.barometer) == "undefined") {
                        evb_sensors.barometer = {};
                    }

                    value = bytes[index++] << 16;
                    value |= bytes[index++] << 8;
                    value |= bytes[index++];
                    value = value * 0.00025;

                    evb_sensors.barometer.pa = value;
                    break;
                case EVB_TYPE.accelerometer:
                    if (typeof (evb_sensors.accelerometer) == "undefined") {
                        evb_sensors.accelerometer = {};
                    }
                    // evb_sensors.accelerometer.x = (bytes[index++] << 24) >> 16;
                    var x1 = evb_sensors.accelerometer.x = bytes[index++];
                    // x1 = ~x1 ; 
                    // x1 = ( x1 + 1 ) % 256; 
                    evb_sensors.accelerometer.x = x1 * 0.0625//; / 15;
                    // evb_sensors.accelerometer.y = (bytes[index++] << 24) >> 16;
                    var y1 = evb_sensors.accelerometer.y = bytes[index++];
                    // y1 = ~ y1 ; 
                    // y1 = ( y1 + 1 ) % 256;

                    var y1 = evb_sensors.accelerometer.y = y1 * 0.0625; // / 15 ;

                    // evb_sensors.accelerometer.z = (bytes[index++] << 24) >> 16;
                    var z1 = evb_sensors.accelerometer.z = bytes[index++];
                    // z1 = ~ z1 ; 
                    // z1 = ( z1 + 1 ) % 256; 
                    // z1 = z1 - 128;
                    var z1 = evb_sensors.accelerometer.z = z1 * 0.0625; // / 15;
                    break;
                case EVB_TYPE.temperature:
                    if (typeof (evb_sensors.temperature) == "undefined") {
                        evb_sensors.temperature = {};
                    }

                    value = (bytes[index++] << 24) >> 16;
                    value |= bytes[index++];
                    value = value * 0.0625;

                    evb_sensors.temperature.c = value;
                    break;
                case EVB_TYPE.tx_interval:
                    evb_sensors.tx_timer = bytes[index++];
                    break;
                default:
                    index += length;
                    break;
            }
        }


    }
    else if (fPort == 1) {
        var index = 0
        var value;
        if (bytes[index++] != 0x00)
            return;
        value = bytes[index++];
        if (typeof (evb_sensors.temperature) == "undefined") {
            evb_sensors.temperature = {};
        }
        evb_sensors.temperature.c = value;
        if (bytes[index++] != 0x00)
            return;

        if (typeof (evb_sensors.gps) == "undefined") {
            evb_sensors.gps = {};
        }

        value = bytes[index++] << 24;
        value |= bytes[index++] << 16;
        value |= bytes[index++] << 8;
        value |= bytes[index++];
        value *= 4.190951587721217e-08;

        evb_sensors.gps.lalitude = value;

        value = bytes[index++] << 24;
        value |= bytes[index++] << 16;
        value |= bytes[index++] << 8;
        value |= bytes[index++];
        value *= 8.381903175442434e-08;

        evb_sensors.gps.longitude = value;
        while (index < bytes.length)
            byte[index++];
    }
    return evb_sensors;
}
