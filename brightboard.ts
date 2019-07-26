/**
* Andy England @ SparkFun Electronics
* September 6, 2018
* https://github.com/BrightWearables/pxt-microbit-brightboard

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

enum colorMode{
	MODE_RGB = 0,
	MODE_GRB = 1
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
		_mode: colorMode;
		
		constructor(dataPin: DigitalPin, clkPin: DigitalPin) {
        	this.dataPin = dataPin;
			this.clkPin = clkPin;
			this._length = 12;
			this._stride = 3;
			this.brightness = 64;
			this.buf = pins.createBuffer(this._length * this._stride);
			this.start = 0;
			this._mode = colorMode.MODE_GRB;
		}
			

		getBrightness(): number {
		   return this.brightness;
		}
		
		setBrightness(bright: number): void {
			this.brightness = bright;
		}
		
		
        private setBufferRGB(offset: number, red: number, green: number, blue: number): void {
            if (this._mode === colorMode.MODE_RGB) {
                this.buf[offset + 0] = red;
                this.buf[offset + 1] = green;
            } else {
                this.buf[offset + 0] = green;
                this.buf[offset + 1] = red;
            }
            this.buf[offset + 2] = blue;
        }

        private setAllRGB(rgb: number) {
            let red = unpackR(rgb);
            let green = unpackG(rgb);
            let blue = unpackB(rgb);

            const br = this.brightness;
            if (br < 255) {
                red = (red * br) >> 8;
                green = (green * br) >> 8;
                blue = (blue * br) >> 8;
            }
            const end = this.start + this._length;
            const stride = this._stride;
            for (let i = this.start; i < end; ++i) {
                this.setBufferRGB(i * stride, red, green, blue)
            }
        }

		
        private setPixelRGB(pixeloffset: number, rgb: number): void {
            if (pixeloffset < 0
                || pixeloffset >= this._length)
                return;

            let stride = this._stride;
            pixeloffset = (pixeloffset + this.start) * stride;

            let red = unpackR(rgb);
            let green = unpackG(rgb);
            let blue = unpackB(rgb);

            let br = this.brightness;
            if (br < 255) {
                red = (red * br) >> 8;
                green = (green * br) >> 8;
                blue = (blue * br) >> 8;
            }
            this.setBufferRGB(pixeloffset, red, green, blue)
        }		

	}
	
	
	// Only want one instance of brightBoardDisplay class - this sis it
	let brightDisplay = new BrightBoardDisplay(DigitalPin.P15, DigitalPin.P13);
			
	/**
	 * Get the brightness of the pixel strip.
	*/
	//% blockId="brightboard_get_brightness" block="brightness"
	//% weight=7 blockGap=8
	export function brightness(): number {
		return brightDisplay.getBrightness();
	}
	
	
	/**
	 * Set the brightness of the pixel strip
	 * @param bright brightness of pixels eg:64
	 */
	 //%blockId="bright_board_set_brightness" block="set_brightness"
	 //%bright.max=255 bright.min=0
	export function setBrightness(bright: number): void {
		brightDisplay.setBrightness(bright);
	}
	
	/**
	 * Send colors to the strip
	 */
	//%blockId=brightboard_spi_dotstar_send_data block="send colors" 
	//% shim=brightboard::spiDotStarSendData
	export function doColors():void {
		return
	}
	
	 
	/**
	 * clear the pixel strip
	 */
	 //% blockId=brightboard_clear block="clear"
	 //% shim=brightboard::clear
	export function clear():void {
		// Fake function for simulator
		return
	}
	

	/**
	 * initialize the SPI mode
	 * @param bits bits per write eg:8
	 * @param mode mode number eg:3
	 */
	//% blockId=brightboard_set_spi_mode block="SPI bits %bits|and mode %mode"
	//% shim=brightboard::dotStarSPIMode
	export function setSPIMode(bits: number, mode: number):void {
		return
	}				


		

	
	function packRGB(a: number, b: number, c: number): number {
        return ((a & 0xFF) << 16) | ((b & 0xFF) << 8) | (c & 0xFF);
    }
    function unpackR(rgb: number): number {
        let r = (rgb >> 16) & 0xFF;
        return r;
    }
    function unpackG(rgb: number): number {
        let g = (rgb >> 8) & 0xFF;
        return g;
    }
    function unpackB(rgb: number): number {
        let b = (rgb) & 0xFF;
        return b;
    }


}
