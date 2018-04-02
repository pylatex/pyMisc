//PUERTO 1: Desarrollo con MTDot Box
function MTform (bytes) {
    var evb_sensors = {};

    //Evaluation board properties.
    var EVB_TYPE = {
        none:               0,
        led_1:              1,
        led_2:              2,
        lux_max:            3,
        lux_min:            4,
        lux:                5,
        barometer_max:      6,
        barometer_min:      7,
        barometer:          8,
        temperature_max:    9,
        temperature__min:   10,
        temperature:        11,
        accelerometer_max:  12,
        accelerometer_min:  13,
        accelerometer:      14,
        tx_interval:        15,
        amps_max:           16,
        amps_min:           17,
        amps:               18,
        m2x_device:         19,
        m2x_key:            20,
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
                index += bytes.length;
                break;
        }
    }
    return evb_sensors;
}

//PUERTO 5: Formato propio para pruebas/desarrollo en Pylatex
function pylatexForm (bytes) {
    var sensores = {};

    //Tipos de variable
    var tipos = {
        none:               0,  //Error o estado del nodo o alguno de sus componentes
        co2ppm:             1,  //A
        tvocppm:            2,  //A
        pm025:              3,  //A
        pm100:              4,  //A
        hum_rel:            5,  //A --> B
        temperature:        6,  //A --> B
        illuminance:        7,  // ??
        gas:                8   //A
    };

    //Procesamiento de la carga util
    for (var index = 0; index < bytes.length;) {
        var type = bytes[index++];
        var value;

        var A = (bytes[index] << 8) + (bytes[index+1]);
        switch (type) {

            case tipos.co2ppm:
                sensores.co2 = {};
                sensores.co2.ppm = A;
                index += 2;
                break;

            case tipos.tvocppm:
                sensores.tvoc = {};
                sensores.tvoc.ppm = A;
                index += 2;
                break;

            case tipos.pm025:
                sensores.pm025 = {};
                sensores.pm025.ppm = A;
                index += 2;
                break;

            case tipos.pm100:
                sensores.pm100 = {};
                sensores.pm100.ppm = A;
                index += 2;
                break;

            case tipos.hum_rel:
                sensores.rh = {};
                sensores.rh.percent = A;
                index += 2;
                break;

            case tipos.temperature:
                sensores.temp = {};
                sensores.temp.celsius = A;
                index += 2;
                break;

            case tipos.illuminance:
                sensores.luz = {};
                sensores.luz.lux = A;
                index += 2;
                break;

            case tipos.gas:
                sensores.gas = {};
                sensores.gas.adc = A;
                index += 2;
                break;

            default:
                index += bytes.length;
                break;
        }
    }
    return sensores;
}

//PUERTO 10: Sentencias GPS en formato NMEA-083
function NMEA (bytes) {
    var evb_sensors = {};
    // TO-DO: Implementación...
    return evb_sensors;
}

//PUERTO 15 - Formato Cayenne
function Cayenne (bytes) {
    var evb_sensors = {};
    // TO-DO: Implementación...
    return evb_sensors;
}

/**
 * Decode decodes an array of bytes into an object.
 * - fPort contains the LoRaWAN fPort number
 * - bytes is an array of bytes, e.g. [225, 230, 255, 0]
 * The function must return an object, e.g. {"temperature": 22.5}
*/
function Decode(fPort, bytes) {
    b2str = "";
    for (i=0;i<bytes.length;i++){
        if (bytes[i]<16)
            b2str = b2str.concat("0");
        b2str = b2str.concat(bytes[i].toString(16));
    }

    var PORT_TYPE = {
        MAC: 0,
        multitech: 1,
        pylatex: 5,
        NMEA: 10,
        Cayenne: 15
    }

    evb_sensors = {};
    switch (fPort) {
        case PORT_TYPE.MAC:
            //TO-DO: Actions for MAC messages
        default:
            break;

        case PORT_TYPE.multitech:
            evb_sensors = MTform(bytes);
            break;

        case PORT_TYPE.pylatex:
            evb_sensors = pylatexForm(bytes);
            break;

        case PORT_TYPE.NMEA:
            evb_sensors = NMEA(bytes);
            break;

        case PORT_TYPE.Cayenne:
            evb_sensors = Cayenne(bytes);
            break;
    }
    evb_sensors.rawHexData = b2str;
    return evb_sensors;
}
