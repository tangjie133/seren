enum SensorRX {
    //% block="2"
    SenR1 = 2,
    //% block="3"
    SenR2 = 3,
    //% block="4"
    SenR3 = 4,
    //% block="5"
    SenR4 = 5,
    //% block="6"
    SenR5 = 6,
    //% block="7"
    SenR6 = 7,
    //% block="8"
    SenR7 = 8,
    //% block="9"
    SenR8 = 9,
    //% block="10"
    SenR9 = 10,
    //% block="11"
    SenR10 = 11,
    //% block="12"
    SenR11 = 12,
}
enum SensorTX {
    //% block="2"
    SenT1 = 2,
    //% block="3"
    SenT2 = 3,
    //% block="4"
    SenT3 = 4,
    //% block="5"
    SenT4 = 5,
    //% block="6"
    SenT5 = 6,
    //% block="7"
    SenT6 = 7,
    //% block="8"
    SenT7 = 8,
    //% block="9"
    SenT8 = 9,
    //% block="10"
    SenT9 = 10,
    //% block="11"
    SenT10 = 11,
    //% block="12"
    SenT11 = 12,
}

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
const OBLOQ_STR_TYPE_IS_NONE = ""
const OBLOQ_BOOL_TYPE_IS_TRUE = true
const OBLOQ_BOOL_TYPE_IS_FALSE = false
/**
 * Functions for DFRobot gamer:bit Players.
 */
//% weight=10 color=#DF6721  block="TouchKey"
namespace gestur {
    let DF_OK = 0
    let DF_ERR = -1

    let DFGT_SEND_HEAD = 0xaa
    let DFGT_SEND_END = 0x55

    let DFGT_RECV_HEAD = 0xaa
    let DFGT_RECV_END = 0x55

    let DFGT_CMD_INTERVAL = 0x51
    let DFGT_CMD_SLEEP = 0x52
    let DFGT_CMD_DISTANCE = 0x54
    let DFGT_CMD_ENABLE = 0x55

    let GT_FUN_RIGHT = 0x01
    let GT_FUN_LEFT = 0x02
    let GT_FUN_BACK = 0x03
    let GT_FUN_FORWARD = 0x04
    let GT_FUN_PULLUP = 0x05
    let GT_FUN_PULLDOWN = 0x06
    let GT_FUN_TOUCH1 = 0x09
    let GT_FUN_TOUCH2 = 0x0A
    let GT_FUN_TOUCH3 = 0x0B
    let GT_FUN_TOUCH4 = 0x0C
    let GT_FUN_TOUCH5 = 0x0D

    let DFGT_FUN_START1 = 0x01
    let DFGT_FUN_PART1 = 0x3f
    let DFGT_FUN_OFFSET1 = 0x00
    let DFGT_FUN_START2 = 0x09
    let DFGT_FUN_PART2 = 0x07ff
    let DFGT_FUN_OFFSET2 = 0x06
    let DFGT_FUN_ALL = 0x07ff

    let DFGT_EVT_RIGHT = 0x01
    let DFGT_EVT_LEFT = 0x02
    let DFGT_EVT_BACK = 0x03
    let DFGT_EVT_FORWARD = 0x04
    let DFGT_EVT_PULLUP = 0x05
    let DFGT_EVT_PULLDOWN = 0x06
    let DFGT_EVT_PULLREMOVE = 0x07
    let DFGT_EVT_TOUCH1 = 0x21
    let DFGT_EVT_TOUCH2 = 0x22
    let DFGT_EVT_TOUCH3 = 0x23
    let DFGT_EVT_TOUCH4 = 0x24
    let DFGT_EVT_TOUCH5 = 0x25

    let DFGT_SLEEP_DISABLE = 0xff
    let Gesture: number[] = [0xaa, null, null, 0x55] /* 用于存储传入数据*/
    let pRecv: number[] = [null, null, null, null]

    //serial
    let OBLOQ_SERIAL_INIT = OBLOQ_BOOL_TYPE_IS_FALSE
    let OBLOQ_SERIAL_TX = SerialPin.P2
    let OBLOQ_SERIAL_RX = SerialPin.P1
    //event
    let OBLOQ_MQTT_EVENT = OBLOQ_BOOL_TYPE_IS_FALSE
    
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

    function Obloq_serial_init(): void {
        let item = OBLOQ_STR_TYPE_IS_NONE
        //First send data through usb, avoid the first data scrambled.
        obloqWriteString("123")
        item = serial.readString()
        item = serial.readString()
        item = serial.readString()
        serial.redirect(
            OBLOQ_SERIAL_TX,
            OBLOQ_SERIAL_RX,
            BaudRate.BaudRate9600
        )
        obloqSetTxBufferSize(300)
        obloqSetRxBufferSize(300)
        obloqWriteString("\r")
        item = serial.readString()
        OBLOQ_SERIAL_INIT = OBLOQ_BOOL_TYPE_IS_TRUE
        obloqClearRxBuffer()
        obloqClearTxBuffer()
        onEvent()
    }

    //%weight=15
    //% block
    export function Gesturejudgment(gestur: Gestur): boolean {
       return true;

    }



    //%weight=20
    //% block="Gesture judgment"
    export function Gesturej(handler: (nan: Gestur) => void) {

    }
    //%weight=25
    //% block=" SoftwareSerial RX %arg1 TX %arg2"
    export function statementWith2Arguments(arg1: SensorRX, arg2: SensorTX) {

    }


    /*
    basic.forever(() => {
        if (kbCallback != null) {
            let TPval = pins.i2cReadNumber(0x57, NumberFormat.UInt16BE);
            keyBasic()
            if (TPval != 0) {
                for (let item of kbCallback) {
                    if (item.key & TPval) {
                        item.action();
                    }
                }
            }
        }
        basic.pause(20);
    })*/

    function onEvent() {
        if (!OBLOQ_SERIAL_INIT) {
            Obloq_serial_init()
        }
        OBLOQ_MQTT_EVENT = OBLOQ_BOOL_TYPE_IS_TRUE
        obloqEventOn()
        //control.onEvent(<number>32, <number>1, Obloq_serial_recevice); // register handler
    }
}