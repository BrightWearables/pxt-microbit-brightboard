// Auto-generated. Do not edit.


    /**
     * Test brightboard code
     */

declare namespace brightboard {

    /**
     * Set SPI mode
     * @param bits bits per write eg:8
     * @param mode mode number eg:3
     */
    //% blockId=brightboard_dotStarSPIMode block="set bits %bits| and mode %mode" shim=brightboard::dotStarSPIMode
    function dotStarSPIMode(bits: int32, mode: int32): void;

    /**
     * Send data down the SPI bus
     */
    //% blockId=brightboard_spiDotStarSendData block="send colors" shim=brightboard::spiDotStarSendData
    function spiDotStarSendData(): void;

    /**
     * Send data down the SPI bus
     */
    //% blockId=brightboard_clear block="clear display" shim=brightboard::clear
    function clear(): void;
}

// Auto-generated. Do not edit. Really.
