
/**
 * Use this file to define custom functions and blocks.
 * Read more at https://makecode.microbit.org/blocks/custom
 */

enum MyEnum {
    //% block="one"
    One,
    //% block="two"
    Two
}

/**
 * Well known colors for ZIP LEDs
 */
enum LedColors {
    //% block=red
    Red = 0xFF0000,
    //% block=orange
    Orange = 0xFFA500,
    //% block=yellow
    Yellow = 0xFFFF00,
    //% block=green
    Green = 0x00FF00,
    //% block=blue
    Blue = 0x0000FF,
    //% block=indigo
    Indigo = 0x4b0082,
    //% block=violet
    Violet = 0x8a2be2,
    //% block=purple
    Purple = 0xFF00FF,
    //% block=white
    White = 0xFFFFFF,
    //% block=black
    Black = 0x000000
}

/**
 * Custom blocks
 */
//% weight=100 color=#4da896 icon=""
namespace custom {
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

    /**
     * @param colorList list of colors
     */
    //% block="Radio send $colorList"
    //% advanced=true
    export function radioSendColorList(colorList: Array<number>): void {
        let len = colorList.length;
        for (let i = 0; i < len; i++) {
            radio.sendValue((colorList[i]).toString(), i);
            basic.pause(20);  // Give previous message time to be received
        }
    }

    /**
     * @param colorList list of colors
     */
    //% block="$colorList to string"
    //% advanced=true
    //% blockHidden=true
    export function colorsToString(colorList: Array<number>): string {
        let colString = "";
        let len = colorList.length;

        for (let i = 0; i < len; i++) {
            colString += (colorList[i]).toString();
            if (i + 1 < len) {
                colString += ",";
            }
        }
        serial.writeLine("Sending color string");
        serial.writeLine(colString);
        return colString;
    }

    /**
     * @param numString string containing color information
     */
    //% block
    //% advanced=true
    export function numStringToColor(numString: string): number {
        return parseInt(numString);
    }

    /**
     * @param colorString string containing comma separated list of color values
     */
    //% block
    //% advanced=true
    //% blockHidden=true
    export function stringToColors(colorString: string): Array<number> {
        let colors: number[] = [];
        let splitStr = colorString.split(',');
        for (let i = 0; i < splitStr.length; i++) {
            colors.push(parseInt(splitStr[i]));
        }
        serial.writeLine("received color values:");
        serial.writeNumbers(colors);
        return colors;
    }


    export class BrightBoardDisplay {
        buf: Buffer;
        pin: DigitalPin;
        brightness: number;
        currentHue: number;
        start: number;
        _stride: number;
        _length: number;


        /**
         * Rotates the current pattern by the specified offset.
         * You need to call ``show`` to make the changes visible.
         * @param offset rotation steps eg:1
         */
        //%block="%brightDisplay|rotate pattern by $offset"
        //%weight = 30
        rotate(offset: number = 1): void {
            if (this._length <= 0) return;
            offset = offset >> 0;
            const stride = 3;
            this.buf.rotate(-offset * stride, this.start * stride, this._length * stride)
        }

        /**
         * Turn off all LEDs on the Bright Board display.
         * You need to call ``show`` to make the changes visible.
         */
        //% block="%brightDisplay|clear"
        //% weight=90
        clear(): void {
            const stride = 3;
            this.buf.fill(0, 0, this._length * stride);
        }

        /**
         * Make the current pattern visible.
         */
        //% block="%brightDisplay|show"
        //% weight=90
        show(): void {
            ws2812b.sendBuffer(this.buf, this.pin);
        }

        private setBufferRGB(offset: number, red: number, green: number, blue: number): void {
            if (true) {
                this.buf[offset + 0] = green;  //Assume GRB
                this.buf[offset + 1] = red;
            } else {
                this.buf[offset + 0] = red;
                this.buf[offset + 1] = green;
            }
            this.buf[offset + 2] = blue;
        }

        private getBufferRGB(index: number): Array<number> {
            let offset = index * this._stride; //Stride = 3 for RGB
            let rgb: number[] = [this.buf[offset + 1], this.buf[offset], this.buf[offset + 2]];
            return rgb;
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
            for (let i = this.start; i < end; ++i) {
                this.setBufferRGB(i * this._stride, red, green, blue)
            }
        }

        private setPixelRGB(pixeloffset: number, rgb: number): void {
            if (pixeloffset < 0
                || pixeloffset >= this._length)
                return;

            let stride = 3;
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

        setPin(pin: DigitalPin): void {
            this.pin = pin;
            pins.digitalWritePin(this.pin, 0);
            // don't yield to avoid races on initialization
        }

        /**
         * Sets all LEDs to a given color (range 0-255 for r, g, b). 
         * @param R RGB color of the LED
         * @param G RGB color of the LED
         * @param B RGB color of the LED
         */
        //% blockId="bright_board_show_color" block="%brightDisplay|show color $R $G $B" 
        //% R.min=0 R.max=255 G.min=0 G.max=255 B.min=0 B.max=255
        //% weight=85 blockGap=8
        //% blockHidden=true
        showRGBColor(R: number, G: number, B: number) {
            this.setAllRGB(packRGB(R, G, B));
            this.show();
        }

        /**
         * Sets all LEDs to a selcted color from the picker
         * @param rgb
         */
        //% blockId="bright_board_picker_color" block="%brightDisplay|show color $rgb"
        //% rgb.shadow="brightColorNumberPicker"
        selectPickerColor(rgb: number) {
            this.setAllRGB(rgb);
            this.show();
        }

        /**
         * Sets all LEDs to a selcted color from the picker
         * @param rgb
         */
        //% blockId="bright_board_wheel_color" block="%brightDisplay|show color $rgb"
        //% rgb.shadow="colorWheelPicker"
        //% blockHidden="true"  
        // Color heel picker returns value from 0-255
        selectWheelColor(rgb: number) {
            this.setAllRGB(rgb);
            this.show();
        }

        /**
         * Set LED to a given color (range 0-255 for r, g, b). 
         * You need to call ``show`` to make the changes visible.
         * @param pixeloffset position of the NeoPixel in the strip
         * @param rgb RGB color of the LED
         */
        //% blockId="bright_display_set_pixel_color" block="%brightDisplay|set pixel color at $pixeloffset|to $rgb" 
        //% blockGap=8
        //% weight=80
        //% pixeloffset.max=11 pixeloffset.min=0
        //% rgb.shadow="brightColorNumberPicker"
        //% advanced=true
        setPixelColor(pixeloffset: number, rgb: number): void {
            this.setPixelRGB(pixeloffset >> 0, rgb >> 0);
        }




        /**
         * Generate a 12-pixel pattern by repeating colors passed in list
         * @param rgbList list of colors eg:[0xff0000, 0x7f00ff, 0x00ffff]
         */
        //% blockId="bright_display_pattern" block = "$rgbList"
        //% blockHidden=true
        colorPattern(rgbList: Array<number>): Array<number> {
            let patternList: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            let len = rgbList.length;
            let index = 0;
            for (let i = 0; i < this._length; i++) {
                patternList[i] = rgbList[index];
                index = index + 1;
                if (index >= len) {
                    index = 0;
                }
            }
            return patternList;
        }

        /**
         * Hold a list of colors of variable length
         * @param colorList list of colors eg:[custom.picker(0xff0000), custom.picker(0x7f00ff), custom.picker(0x00ffff)]
         */
        //% blockId="bright_display_show_pattern" block="%brightDisplay show pattern| $colorList"
        //% advanced=true
        setColorPattern(colorList: Array<number>): void {
            let len = colorList.length;
            let index = 0;
            for (let i = 0; i < 12; i++) {
                this.setPixelColor(i, colorList[index]);
                index = index + 1;
                if (index >= len) {
                    index = 0;
                }
            }
            this.show();
        }

        /**
         * Transition to a color pattern over a specified time period
         * @param durationMillis time in MS to transition eg:500
         * @param colorList pattern to transition to
         */
        //% blockId="bright_display_transition_colors" block="%brightDisplay over time %durationMillis|transition to pattern $colorList"
        //% advanced=true
        transitionColorPattern(durationMillis: number, colorList: Array<number>): void {
            // Copy the buffer because we'll change it
            let fromColors = pins.createBuffer(this._length * this._stride);
            for (let i = 0; i < this._length; i++) {
                let offset = this._stride * i;
                fromColors[offset] = this.buf[offset + 1]; //RGB Swapped
                fromColors[offset + 1] = this.buf[offset];
                fromColors[offset + 2] = this.buf[offset + 2];
            }
            let toColors = pins.createBuffer(this._length * this._stride);
            let toPacked = this.colorPattern(colorList);
            //serial.writeNumbers(toPacked);
            for (let i = 0; i < this._length; i++) {
                let offset = this._stride * i;
                let col = toPacked[i];
                toColors[offset] = unpackR(col);
                toColors[offset + 1] = unpackG(col);
                toColors[offset + 2] = unpackB(col);

                let br = this.brightness;
                if (br < 255) {
                    toColors[offset] = (toColors[offset] * br) >> 8;
                    toColors[offset + 1] = (toColors[offset + 1] * br) >> 8;
                    toColors[offset + 2] = (toColors[offset + 2] * br) >> 8;
                }
            }
            // Make each step approx 50 ms
            let nsteps = Math.max(8, Math.round(durationMillis / 50));
            let stepDelay = Math.round(durationMillis / nsteps);
            for (let i = 1; i <= nsteps; i++) {
                let pct = i * 100 / nsteps;
                for (let j = 0; j < this._length; j++) {
                    let offset = this._stride * j;
                    let r0 = fromColors[offset];
                    let g0 = fromColors[offset + 1];
                    let b0 = fromColors[offset + 2];
                    let rf = toColors[offset];
                    let gf = toColors[offset + 1];
                    let bf = toColors[offset + 2];
                    this.setBufferRGB(offset, Math.round(r0 + pct * (rf - r0) / 100), Math.round(g0 + pct * (gf - g0) / 100), Math.round(b0 + pct * (bf - b0) / 100));
                }
                this.show();
                basic.pause(stepDelay);
            }
        }


    }

    /**
     * Converts red, green, blue channels into a RGB color
     * @param red value of the red channel between 0 and 255. eg: 255
     * @param green value of the green channel between 0 and 255. eg: 255
     * @param blue value of the blue channel between 0 and 255. eg: 255
     */
    //% weight=1
    //% blockId="bright_board_rgb" block="red %red|green %green|blue %blue"
    export function rgb(red: number, green: number, blue: number): number {
        return packRGB(red, green, blue);
    }

    /**
     * Generates a random color value
     */
    //% block
    //% weight = 50
    //% blockId = "bright_board_random_color"
    export function randomColor(): number {
        return packRGB(Math.randomRange(0, 255), Math.randomRange(0, 255), Math.randomRange(0, 255));
    }

    /**
     * Converts a hue saturation luminosity value into a RGB color
     * @param h value between 0 and 255 eg: 0
     * @param s value between 0 and 255 eg: 255
     * @param l value between 0 and 255 eg: 255
     */
    //% weight = 1
    //% blockId = "bright_board_hsl" block="$h|$s|$l"
    //% h.max=255 h.min=0 s.max=255 s.min=0 l.max=255 l.min=0
    //% advanced="true"
    export function hsl(h: number, s: number, l: number): number {
        h = Math.round(h);
        s = Math.round(s);
        l = Math.round(l);

        h = h % 360;
        s = Math.clamp(0, 99, s);
        l = Math.clamp(0, 99, l);
        let c = Math.idiv((((100 - Math.abs(2 * l - 100)) * s) << 8), 10000); //chroma, [0,255]
        let h1 = Math.idiv(h, 60);//[0,6]
        let h2 = Math.idiv((h - h1 * 60) * 256, 60);//[0,255]
        let temp = Math.abs((((h1 % 2) << 8) + h2) - 256);
        let x = (c * (256 - (temp))) >> 8;//[0,255], second largest component of this color
        let r$: number;
        let g$: number;
        let b$: number;
        if (h1 == 0) {
            r$ = c; g$ = x; b$ = 0;
        } else if (h1 == 1) {
            r$ = x; g$ = c; b$ = 0;
        } else if (h1 == 2) {
            r$ = 0; g$ = c; b$ = x;
        } else if (h1 == 3) {
            r$ = 0; g$ = x; b$ = c;
        } else if (h1 == 4) {
            r$ = x; g$ = 0; b$ = c;
        } else if (h1 == 5) {
            r$ = c; g$ = 0; b$ = x;
        }
        let m = Math.idiv((Math.idiv((l * 2 << 8), 100) - c), 2);
        let r = r$ + m;
        let g = g$ + m;
        let b = b$ + m;
        return packRGB(r, g, b);
    }

    /**
     * TODO: describe your function here
     */
    //% block="create bright board display"
    //% blockSetVariable=brightDisplay
    //% weight=100
    export function createBrightBoardDisplay(): BrightBoardDisplay {
        let brightDisplay = new BrightBoardDisplay();
        brightDisplay._length = 12;
        brightDisplay._stride = 3;
        brightDisplay.brightness = 64;
        brightDisplay.setPin(DigitalPin.P0);
        brightDisplay.buf = pins.createBuffer(brightDisplay._length * brightDisplay._stride);
        brightDisplay.start = 0;

        return brightDisplay;
    }

    /**
     * Gets the RGB value of a known color
     */
    //% weight=2 blockGap=8
    //% blockId="led_color_names" block="%color"
    //% advanced=true
    export function colors(color: LedColors): number {
        return color;
    }



    /**
     * Returns the rgb value of a color chosen from the picker
     */
    //% weight=2 blockGap=8
    //% blockId="led_color_picker" block="%color"
    //% advanced=true
    //% color.shadow="brightColorNumberPicker"
    export function picker(color: number): number {
        return color;
    }

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
function unpackRGB(rgb: number): Array<number> {
    let b = (rgb) & 0xFF;
    rgb >>= 8;
    let g = (rgb) & 0xFF;
    rgb >>= 8;
    let r = (rgb) & 0xFF;
    return [r, g, b];
}


