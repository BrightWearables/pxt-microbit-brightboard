// Auto-generated. Do not edit.


    /**
     * Test brightboard code
     */

declare namespace brightboard {

    /**
     * Set SPI mode
     */
    //% shim=brightboard::setDotStarSPIMode
    function setDotStarSPIMode(): void;

    /**
     * Send data down the SPI bus
     */
    //% blockId=brightboard_spiDotStarSendData block = "send red" shim=brightboard::spiDotStarSendData
    function spiDotStarSendData(): void;

    /**
     * Send data down the SPI bus
     */
    //% blockId=brightboard_clear block="%brightDisplay|clear" shim=brightboard::clear
    function clear(): void;
}

// Auto-generated. Do not edit. Really.
