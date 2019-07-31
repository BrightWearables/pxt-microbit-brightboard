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

enum pixelType{
	//% block="neopixel"
	TYPE_NEOPIXEL=0,
	//% block="dotstar"
	TYPE_DOTSTAR=1
}

//% color=#cb42f5 icon="\uf185" groups=["colors", "actions", "animations", "others"]  
namespace brightboard {
	
    /**
	 * To be used as a shadow block
     * Get the color wheel field editor
     * @param color color, eg: #ff0000
     */
    //% blockId=brightColorNumberPicker block="%value"
    //% shim=TD_ID colorSecondary="#FFFFFF"
    //% value.fieldEditor="colornumber" value.fieldOptions.decompileLiterals=true
    //% value.defl='#ff0000' group=colors weight=150
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
	//% weight=100
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
    //% inlineInputMode=inline group=colors
    export function colorForLed(ledval1: number, ledval2: number, ledval3: number, ledval4: number, ledval5: number, ledval6: number, ledval7: number, ledval8: number, ledval9: number, ledval10: number, ledval11: number, ledval12: number): Array<number> {
        return [ledval1, ledval2, ledval3, ledval4, ledval5, ledval6, ledval7, ledval8, ledval9, ledval10, ledval11, ledval12];
    }

    /**
     * Returns variable length list of up to 12 LED colors
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
    //% blockId="variable_color_for_led" block="$ledval1|$ledval2||$ledval3|$ledval4|$ledval5|$ledval6|$ledval7|$ledval8|$ledval9|$ledval10|$ledval11|$ledval12"
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
    //% inlineInputMode=inline group=colors
	//% weight=125
    export function colorForLedVariableLength(ledval1: number, ledval2: number, ledval3?: number, ledval4?: number, ledval5?: number, ledval6?: number, ledval7?: number, ledval8?: number, ledval9?: number, ledval10?: number, ledval11?: number, ledval12?: number): Array<number> {
		let colorList = [ledval1, ledval2];
        if (typeof ledval3 !== 'undefined') colorList.push(ledval3);
        if (typeof ledval4 !== 'undefined') colorList.push(ledval4);
        if (typeof ledval4 !== 'undefined') colorList.push(ledval5);
        if (typeof ledval4 !== 'undefined') colorList.push(ledval6);
        if (typeof ledval4 !== 'undefined') colorList.push(ledval7);
        if (typeof ledval4 !== 'undefined') colorList.push(ledval8);
        if (typeof ledval4 !== 'undefined') colorList.push(ledval9);
        if (typeof ledval4 !== 'undefined') colorList.push(ledval10);
        if (typeof ledval4 !== 'undefined') colorList.push(ledval11);
        if (typeof ledval4 !== 'undefined') colorList.push(ledval12);	
		return colorList;
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
		_pixelType: pixelType;
		
		constructor(dataPin: DigitalPin, clkPin: DigitalPin) {
        	this.dataPin = dataPin;
			this.clkPin = clkPin;
			this._length = 12;
			this._stride = 3;
			this.brightness = 128;
			this.buf = pins.createBuffer(this._length * this._stride);
			this.start = 0;
			this._mode = colorMode.MODE_GRB;
			this._pixelType = pixelType.TYPE_NEOPIXEL;
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
            for (let i = 0; i < end; i++) {
				this.setBufferRGB(i, red, green, blue);
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
	
    // ----Only want one instance of brightBoardDisplay class - this is it----
	let brightDisplay = new BrightBoardDisplay(DigitalPin.P15, DigitalPin.P13);

	/**
	 * Set the type of LED (neopixel or dotstar)  
	 * @param type the type of pixels used: eg:pixelType.TYPE_DOTSTAR
	 */
	 //% blockId=brightboard_set_pixel_type block="set pixel type %type"
	 //% pixelType.defl=pixelType.TYPE_DOTSTAR
	 //% advanced=true
	 export function setPixelType(type: pixelType): void {
		brightDisplay._pixelType=type;
	 }
		 
	
	/**
	 * @param buf Buffer to send
	 * @param len Number of pixels to send data for
	 * dummy function pass through for C function
	 */
	 //%blockId=brightboard_spi_dotstar_send_buffer blockHidden=true
	 //%shim=brightboard::spiDotStarSendBuffer
	 export function spiSendBuffer(buf: Buffer, len: number): void {
		 return
	 }
	
	/**
	 * Sends the color buffer to the pixels
	 */
	 //% blockId=brightboard_show block="show" weight=150 group=actions
	export function show(): void {
		if (brightDisplay._pixelType == pixelType.TYPE_DOTSTAR) {
			spiSendBuffer(brightDisplay.getBuffer(), brightDisplay.getLength());
		} else {
			ws2812b.sendBuffer(brightDisplay.getBuffer(), DigitalPin.P0);
		}
	}
	
	/**
	 * clear the pixel strip
	 * @param buf Buffer to send
	 * @param len Number of pixels to send data for
	 * dummy function pass through for C function
	 */
	 //% blockId=brightboard_spi_clear blockHidde=true
	 //% shim=brightboard::clear weight=150 group=actions
	export function spiClear(buf: Buffer, len: number):void {
		// Fake function for simulator
		return;
	}
	
	/**
	 * Clears the pixel strip - must call show to see effect
	 */
	 //% blockId=brightboard_clear block="clear" weight=140 group=actions
	export function doClear() : void {
		spiClear(brightDisplay.getBuffer(), brightDisplay.getLength());
	}
	
	

			
	/**
	 * Get the brightness of the pixel strip.
	*/
	//% blockId="brightboard_get_brightness" block="brightness"
	//% weight=7
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
	 * Set specified pixel to the specifed color (must use show to send)
	 * @param led index of pixel to change eg:1
	 * @param rgb color to set pixel to eg:0xff0000
	 */
	 //% blockId=brightboard_set_pixel_color block="set pixel %led| to %rgb"
	 //% led.min=1 led.max=12 rgb.shadow="brightColorNumberPicker" group=actions
	 export function setPixelColor(led: number, rgb: number) {
		brightDisplay.setPixelRGB(led, rgb);
	 }
	 

	 /**
	  * Set colors of multiple pixels - if fewer colors than pixels, pattern will repeat
	  * @param colorList list of colors to set pattern from
	  */ 
	  //% blockId=brightboard_set_pixel_array block="set pattern %colorList"
	  //% colorList.shadow="unset" group=actions
	  export function setPixelArray(colorList: Array<number>): void {
        let len = colorList.length;
        let index = 0;
        for (let i = 0; i < brightDisplay._length; i++) {
			brightDisplay.setPixelRGB(i, colorList[index]);
            index = index + 1;
            if (index >= len) {
               index = 0;
            }
        }
	 }

	 
	 /**
	  * Rotates the current pattern by the specified offset.
	  * You need to call show to make the changes visible.
	  * @param offset rotation steps eg:1
	  */
	 //% blockId=brightboard_rotate block="rotate pixels by $offset"
	 //% offset.min=-12 offset.max=12 group=actions
	 export function rotate(offset: number): void {
		let stride = brightDisplay._stride;
		let start = brightDisplay.start;
		let len = brightDisplay._length;
		brightDisplay.getBuffer().rotate(-offset * stride, start * stride, len * stride);
    }
	
	 /**
	  * Rotates the current pattern by the specified offset.
	  * You need to call show to make the changes visible.
	  * @param offset shift steps eg:1
	  */
	 //% blockId=brightboard_shift block="shift pixels by $offset"
	 //% offset.min=-12 offset.max=12 group=actions
	 export function shift(offset: number): void {
		let stride = brightDisplay._stride;
		let start = brightDisplay.start;
		let len = brightDisplay._length;
		brightDisplay.getBuffer().shift(-offset * stride, start * stride, len * stride);
    }
	
	 

	
	/**
	 * sets all pixels on BrightBoard to the same color - must select show to execute
	 * @param rgb color for pixels eg:0xff0000
	 */
	 //% blockId=set_board_color block="set all pixels $rgb"
	 //% rgb.shadow="brightColorNumberPicker" group=actions
	export function setBoardColor(rgb: number): void {
		brightDisplay.setAllRGB(rgb);
	}
	

	/**
	 * initialize the SPI mode
	 * @param bits bits per write eg:8
	 * @param mode mode number eg:3
	 */
	//% blockId=brightboard_set_spi_mode block="SPI bits %bits|and mode %mode"
	//% shim=brightboard::dotStarSPIMode blockHidden=true
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
	 //% R.min=0 R.max=255 G.min=0 G.max=255 B.min=0 B.max=255 group=colors
	 //% weight=90
	 export function rgbColor(R: number, G: number, B: number): number {
		return packRGB(R, G, B);
	 }
	 
	
	/**
     * Converts a hue saturation luminosity value into a RGB color
     * @param h hue from 0 to 255
     * @param s saturation from 0 to 99
     * @param l luminosity from 0 to 99
     */
    //% blockId=brightboardHSL block="hue %h|saturation %s|luminosity %l"
	//% h.defl=0 h.shadow="colorWheelHsvPicker" h.min=0 h.max=255 s.defl=99 s.min=0 s.max=99 l.defl=50 l.min=0 l.max=99
	//% group=colors weight=80
    export function hsl2rgb(h: number, s: number, l: number): number {
        h = Math.round(h);
        s = Math.round(s);
        l = Math.round(l);
		let r = 0;
		let g = 0;
		let b = 0;
        
        h /= 42;
		if (h < 0) h = 6 - (-h % 6);
		h %= 6;

		s = Math.max(0, Math.min(1, s / 100));
		l = Math.max(0, Math.min(1, l / 100));

		let c = (1 - Math.abs((2 * l) - 1)) * s;
		let x = c * (1 - Math.abs((h % 2) - 1));

		if (h < 1) {
			r = c;
			g = x;
			b = 0;
		} else if (h < 2) {
			r = x;
			g = c;
			b = 0;
		} else if (h < 3) {
			r = 0;
			g = c;
			b = x;
		} else if (h < 4) {
			r = 0;
			g = x;
			b = c;
		} else if (h < 5) {
			r = x;
			g = 0;
			b = c;
		} else {
			r = c;
			g = 0;
			b = x;
		}

		let m = l - c / 2;
		r = Math.round((r + m) * 255);
		g = Math.round((g + m) * 255);
		b = Math.round((b + m) * 255);
        return packRGB(r, g, b);
    }
	

	
	
    /**
	 * Generate a random color
	 */
	 //% blockId=brightboard_random_color block="random color" weight=75
	 //% group=colors weight=70
	 export function randomColor(): number {
		return hsl2rgb(Math.randomRange(0, 359), 99, 50);
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


