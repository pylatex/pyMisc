# Especificiación de Formatos y Campos para la app Pylatex

En este documento se trata el formato binario al que debe llegar el [codificador](encode.js) para enviar un mensaje a un nodo. Del mismo modo, de una cadena binaria formateada con la misma convención, deberá partir el [decodificador](decode.js) para obtener la información original transmitida por el nodo.

Este formato es similar al de [Cayenne LPP](https://mydevices.com/cayenne/docs/lora/#lora-cayenne-low-power-payload) pero con campos asociados a las variables de los sensores disponibles

# Formatos de valor numérico

Al almacenarse el valor numérico de manera binaria (no codificado como ASCII).

| Formato   |                 Valor                   |
| --------- | --------------------------------------- |
| A         | 

# Identificadores de Variable

Seguido a cada identificador de la variable en medición, para ser enviada se escoge uno de los identificadores. Cada identificador implica una cantidad fija de información binaria, y por consecuencia, una estructura de peso y formato de cada octeto.

|  id   | Tipo      |  Formato  | Unidad    |
|  ---  | ---       |    ---    |  ---      |
| 1     | CO2       | A         | ppm       |
| 2     | TVOC      | A         | ppb       |
| 3     | PM 2.5    | A         | ppm       |
| 4     | PM 10     | A         | ppm       |
| 5     | Humedad Relativa | B  | %         |
| 6     | Temperatura      | B  | °C        |

