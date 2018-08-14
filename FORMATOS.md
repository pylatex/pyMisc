# Especificiación de Formatos y Campos para la app Pylatex

En este documento se trata el formato binario al que debe llegar el [codificador](encode.js) para enviar un mensaje a un nodo. Del mismo modo, de una cadena binaria formateada con la misma convención, deberá partir el [decodificador](decode.js) para obtener la información original transmitida por el nodo.

# Variables posibles

|  id   | Tipo |  Formato   | Unidad    |
|  ---  | ---  |    ---     |  ---      |
| 1     | CO2  | A          | ppm       |
| 2     | TVOC | A          | ppb       |
| 3     | PM 2.5    |       |           |