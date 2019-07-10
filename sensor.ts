
enum Gestur {
    //%block="get event back"
    back = 0x04,
    //%block="get event forward"
    forward = 0x08,
    //%block="get event right"
    right = 0x01,
    //%block="get event left"
    left = 0x02,
    //%block="get event pull up"
    pull_up = 0x05,
    //%block="get event pull down"
    pull_down = 0x06,
    //%block="get event pull and remove"
    pull_and_remove = 0x07,
}
const SENSOR_STR_TYPE_IS_NONE = ""
const SENSOR_BOOL_TYPE_IS_TRUE = true
const SENSOR_BOOL_TYPE_IS_FALSE = false
/**
 * Functions for DFRobot gamer:bit Players.
 */
//% weight=10 color=#DF6721  block="TouchKey"
namespace gestur {

    //serial
    let SENSOR_SERIAL_INIT = SENSOR_BOOL_TYPE_IS_FALSE
    let SENSOR_TX = SerialPin.P2
    let SENSOR_RX = SerialPin.P1
    //event
    let OBLOQ_MQTT_EVENT = SENSOR_BOOL_TYPE_IS_FALSE 
    let i
    //% advanced=true shim=Obloq::obloqSetTxBufferSize
    function obloqSetTxBufferSize(size: number): void {
        return
    }

    //% advanced=true shim=Obloq::obloqSetRxBufferSize
    function obloqSetRxBufferSize(size: number): void {
        return
    }

    //% advanced=true shim=Obloq::obloqEventOn
    function obloqEventOn(): void {
        return
    }

    //% advanced=true shim=Obloq::obloqClearRxBuffer
    function obloqClearRxBuffer(): void {
        return
    }

    //% advanced=true shim=Obloq::obloqClearTxBuffer
    function obloqClearTxBuffer(): void {
        return
    }

    //% advanced=true shim=Obloq::obloqforevers
    function obloqforevers(a: Action): void {
        return
    }

    function obloqWriteString(text: string): void {
        serial.writeString(text)
    }

    function Sensor_serial_init(): void {
        let item = SENSOR_STR_TYPE_IS_NONE
        //First send data through usb, avoid the first data scrambled.
        obloqWriteString("123")
        item = serial.readString()
        item = serial.readString()
        item = serial.readString()
        serial.redirect(
            SENSOR_TX,
            SENSOR_RX,
            BaudRate.BaudRate9600
        )
        obloqSetTxBufferSize(300)
        obloqSetRxBufferSize(300)
        obloqWriteString("\r")
        item = serial.readString()
        SENSOR_SERIAL_INIT = SENSOR_BOOL_TYPE_IS_TRUE
        obloqClearRxBuffer()
        obloqClearTxBuffer()
        onEvent()
    }

    //%block="The current guesture of RX %receive and TX %send is %Pose"
    function Gesturej(receive: SerialPin, send: SerialPin, Pose: Gestur): boolean {
        SENSOR_TX = send
        SENSOR_RX = receive
        Sensor_serial_init()
        if(i=Pose)
        {
            return true
        }
        return false
    }

    function Sensor_serial_recevice():void{
        
        let Sensor_message_buffer = serial.readBuffer(4)
        let item = Sensor_message_buffer
        if((item[0]==0xaa) && (item[3]==0x55)&&(item[1]==(0xff-item[2]))){
            i=item[1]
        }
    }

    function onEvent() {
        if (!SENSOR_SERIAL_INIT) {
            Sensor_serial_init()
        }
        OBLOQ_MQTT_EVENT = SENSOR_BOOL_TYPE_IS_TRUE
        obloqEventOn()
        control.onEvent(<number>32, <number>1, Sensor_serial_recevice); // register handler
    }
}