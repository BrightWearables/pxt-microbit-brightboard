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

    /**
     * Get the color wheel field editor
     * @param color color, eg: #ff0000
     */
    //% blockId=brightColorNumberPicker block="%value"
    //% blockHidden=true
    //% shim=TD_ID colorSecondary="#FFFFFF"
    //% value.fieldEditor="colornumber" value.fieldOptions.decompileLiterals=true
    //% value.defl='#ff0000'
    //% value.fieldOptions.colours='["#ffffff","#ff0000","#ffaa00","#ffdc00","#ffff00","#eaff00","#8eff00","#4df243","#f3f2da","#00ffdc","#00dcff","#00a3ff","#0087ff","#acb3f3","#e0acfe","#a300ff","#ea00ff","#ff00e3","#fdd3f8","#ff3790","#ff0e36","#000000", "#C3C6D8", "#727474", "#171717"]'
    //% value.fieldOptions.columns=5 value.fieldOptions.className='rgbColorPicker'
    export function __colorNumberPicker(value: number) {
        return value;
    }

    /**
     * Returns list of 12 LEDs
     * @param ledval1 eg:0xff0000
     * @param ledval2 eg:0xFF7F00
     * @param ledval3 eg:0xFFFE00
     * @param ledval4 eg:0x7FFF00
     * @param ledval5 eg:0x00FF00
     * @param ledval6 eg:0x00FF7F
     * @param ledval7 eg:0x00FFFE
     * @param ledval8 eg:0x007FFF
     * @param ledval9 eg:0x0000FF
     * @param ledval10 eg:0x7F00FF
     * @param ledval11 eg:0xFE00FF
     * @param ledval12 eg:0xFF007F
     */
    //% blockId="color_for_led" block="$ledval1|$ledval2|$ledval3|$ledval4|$ledval5|$ledval6|$ledval7|$ledval8|$ledval9|$ledval10|$ledval11|$ledval12"
    //% ledval1.shadow="brightColorNumberPicker"
    //% ledval2.shadow="brightColorNumberPicker"
    //% ledval3.shadow="brightColorNumberPicker"
    //% ledval4.shadow="brightColorNumberPicker"
    //% ledval5.shadow="brightColorNumberPicker"
    //% ledval6.shadow="brightColorNumberPicker"
    //% ledval7.shadow="brightColorNumberPicker"
    //% ledval8.shadow="brightColorNumberPicker"
    //% ledval9.shadow="brightColorNumberPicker"
    //% ledval10.shadow="brightColorNumberPicker"
    //% ledval11.shadow="brightColorNumberPicker"
    //% ledval12.shadow="brightColorNumberPicker"
    //% inlineInputMode=inline
    export function colorForLed(ledval1: number, ledval2: number, ledval3: number, ledval4: number, ledval5: number, ledval6: number, ledval7: number, ledval8: number, ledval9: number, ledval10: number, ledval11: number, ledval12: number): Array<number> {
        return [ledval1, ledval2, ledval3, ledval4, ledval5, ledval6, ledval7, ledval8, ledval9, ledval10, ledval11, ledval12];
    }



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
			

		getBuffer(): Buffer {
			return this.buf;
		}
		
		getLength(): number {
			return this._length;
		}

		getBrightness(): number {
		   return this.brightness;
		}
		
		setBrightness(bright: number): void {
			this.brightness = bright;
		}
		
		
		
		
       setBufferRGB(offset: number, red: number, green: number, blue: number): void {
            if (this._mode === colorMode.MODE_RGB) {
                this.buf[offset + 0] = red;
                this.buf[offset + 1] = green;
            } else {
                this.buf[offset + 0] = green;
                this.buf[offset + 1] = red;
            }
            this.buf[offset + 2] = blue;
        }

        setAllRGB(rgb: number) {
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

		
        setPixelRGB(pixeloffset: number, rgb: number): void {
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
	
	
	/**
	 * @param buf Buffer to send
	 * @param len Number of pixels to send data for
	 * dummy function pass through for C function
	 */
	 //%blockId=brightboard_spi_dotstar_send_buffer
	 //%shim=brightboard::spiDotStarSendBuffer
	 export function spiSendBuffer(buf: Buffer, len: number): void {
		 return
	 }
	
	/**
	 * Sends the color buffer to the pixels
	 */
	 //% blockId=brightboard_show block="show"
	export function show(): void {
		spiSendBuffer(brightDisplay.getBuffer(), brightDisplay.getLength());
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
	 //%blockId=bright_board_set_brightness block="set brightness %brightVal"
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
	 * sets all pixels on BrightBoard to the same color
	 * @param rgb color for pixels eg:0xff0000
	 */
	 //% blockId = set_board_color block="set all pixels $rgb"
	 //% rgb.shadow=brightColorNumberPicker
	export function setBoardColor(rgb: number) {
		brightDisplay.setAllRGB(rgb);
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

	/**
	 * Create RGB color
	 * @param R red value eg:0
	 * @param G green value eg:0
	 * @param B blue value eg:0
	 */
	 //% blockId=brightboard_rgb block="R %R|G %G|B %B"
	 //% R.min=0 R.max=255 G.min=0 G.max=255 B.min=0 B.max=255
	 export function rgbColor(R: number, G: number, B: number): number {
		return packRGB(R, G, B);
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
