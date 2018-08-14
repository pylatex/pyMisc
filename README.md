# varios
Repositorio de (varios) Archivos de configuracion del proyecto Pylatex.

# LoRa Server

Hasta el momento, se planteó un encoder/decoder similar en formato al de [Cayenne LPP](https://mydevices.com/cayenne/docs/lora/#lora-cayenne-low-power-payload), pero el objetivo es que el servidor brinde cierta persistencia, con la cual se puedan ahorrar aún más datos.

- [Encoder del Payload LoRaWAN](decode.js)
- [Decoder del Payload LoRaWAN](encode.js)

Tanto el Encoder como el Decoder se han de programar acorde al [formato establecido](FORMATOS.md).
