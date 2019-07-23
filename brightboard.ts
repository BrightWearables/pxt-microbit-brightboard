/**
* Andy England @ SparkFun Electronics
* September 6, 2018
* https://github.com/sparkfun/pxt-light-bit

* Development environment specifics:
* Written in Microsoft Makecode
* Tested with a SparkFun brightboard sensor and micro:bit
*
* This code is released under the [MIT License](http://opensource.org/licenses/MIT).
* Please review the LICENSE.md file included with this example. If you have any questions
* or concerns with licensing, please contact techsupport@sparkfun.com.
* Distributed as-is; no warranty is given.
*/


/**
 * Functions to operate the brightboard
 */

 enum brightBoardType{
	 Lux=1,
	 adcVal=2,
 }



//% color=#f44242 icon="\uf185"
namespace brightboard {

    // Functions for reading light from the brightboard in lux or straight adv value

    /**
    * Reads the number
    */
    //% weight=30 blockId="brightboard_light" block="Get light on pin %pin | in %brightBoardType"
    export function light(pin: AnalogPin, type: brightBoardType): number{
      let ADCVal = pins.analogReadPin(pin)
      switch(type){
        case brightBoardType.Lux: return getbright(ADCVal)
        case brightBoardType.adcVal: return ADCVal
        default: return -11111111
      }
    }

	/**
     * Function used for simulator, actual implementation is in brightboard.cpp
     */
    //% shim=brightboard::getbright
    function getbright(ADCVal: number) {
        // Fake function for simulator
        return 0
    }

    }
