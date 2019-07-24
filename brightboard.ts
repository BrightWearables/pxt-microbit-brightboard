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



//% color=#cb42f5 icon="\uf185"
namespace brightboard {

    // Functions for reading light from the brightboard in lux or straight adv value
	export class BrightBoardDisplay {
		
		buf: Buffer;   //Buffer for pixel data
        dataPin: DigitalPin;
		clkPin: DigitalPin;
        brightness: number;
		// per pixel scaling. This buffer is allocated on-demand when per-pixel brightness is needed.
        // when rendering, if this buffer is null, use _brightness instead
        _brightnessBuf: Buffer;
        _sendBuf: Buffer; // scaled color buffer
        currentHue: number;
        start: number;
        _stride: number;  //bits per pixel
        _length: number;  //number of pixels (12)
		
		
		
		/**
		 * Get the brightness of the pixel strip.
		 */
		//% blockId="brightboard_get_brightness" block="%brightDisplay|brightness"
		//% weight=7 blockGap=8
		getBrightness(): number {
		   return this.brightness;
		}
		
		/**
		 * clear the pixel strip
		 */
		 //% shim=brightboard::spiDotStarSendData
		spiDotStarSendData():void {
			// Fake function for simulator
		}		
		
		
		/**
		 * Send colors to the strip (hopefully)
		 */
		//%blockId=brightboard_doColors block="%brightDisplay|send colors" 
		doColors():void {
			this.spiDotStarSendData();
		}
		
		 
		/**
		 * color the pixel strip
		 */
		 //% shim=brightboard::clear
		clear():void {
			// Fake function for simulator
		}
		
		/**
		 * clear strip
		 */
		//% blockId=brightboard_doClear block="%brightDisplay|clear"
		doClear():void {
			this.clear();
		}
		
		
		/**
		 * set the SPI mode
		 */
		 //% shim=brightboard::dotStarSPIMode
		dotStarSPIMode(bits: number, mode: number):void {
			// Fake function for simulator
		}

		/**
		 * initialize the SPI mode
		 * @param bits bits per write eg:8
		 * @param mode mode number eg:3
		 */
		//% blockId=brightboard_setSPIMode block="%brightDisplay|SPI bits %bits|and mode %mode"
		setSPIMode(bits: number, mode: number):void {
			this.dotStarSPIMode(bits, mode);
		}				
	}
	

		
    /**
	 * Creates a strip of colored LEDs (APA102)
	 * @param dataPin data pin eg:DigitalPin.P15
	 * @param clkPin clock pin eg:DigitalPin.P13
	 */
	//% blockId="brightboard_create_board" block="create brightBoard|data %dataPin|clock %clkPin"
	//% dataPin.fieldEditor="gridpicker" dataPin.fieldOptions.columns=4
    //% dataPin.fieldOptions.tooltips="false" dataPin.fieldOptions.width="250"
	//% clkPin.fieldEditor="gridpicker" clkPin.fieldOptions.columns=4
    //% clkPin.fieldOptions.tooltips="false" clkPin.fieldOptions.width="250"
	//% weight=100 blockSetVariable=brightDisplay
	export function createBoard(dataPin: DigitalPin, clkPin: DigitalPin): BrightBoardDisplay {
			let brightDisplay = new BrightBoardDisplay();
			brightDisplay.dataPin = dataPin;
			brightDisplay.clkPin = clkPin;
			brightDisplay._length = 12;
			brightDisplay._stride = 4;
			brightDisplay.brightness = 64;
			brightDisplay.buf = pins.createBuffer(brightDisplay._length * brightDisplay._stride);
			brightDisplay.start = 0;

			return brightDisplay;
	}


}
