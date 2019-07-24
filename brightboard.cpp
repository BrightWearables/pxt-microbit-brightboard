/**
* Test brightboard code
*/


#include "pxt.h"
#include "pxtbase.h"
#include "brightboard.h"
#include <cstdint>
#include <math.h>

using namespace pxt;

namespace brightboard {


	/**
	 * Set SPI mode
	 * @param bits bits per write eg:8
	 * @param mode mode number eg:3
	 */
	//% blockId=brightboard_dotStarSPIMode block="%brightDisplay|set bits %bits|and mode %mode"
	void dotStarSPIMode(int bits, int mode) {
		//spiFormat(8,3);
		pins::spiFormat(8,0);
	}
	
	/**
	 * Get SPI pointer
	 */
	SPI* getSPI() {
		SPI* spi = pins::allocSPI();
		return spi;
	}	
	
	/**
	 * Send data down the SPI bus
	 */
	 //% blockId=brightboard_spiDotStarSendData block="send colors"
	void spiDotStarSendData() {
		SPI* spi = getSPI();
		// Send zero frame intitially
		for (int8_t i = 0; i < 4; i++) {
			spi->write(0x00);
		}
		// Send data for each pixel (red on, green, blue off)
		for (int8_t i = 0; i < 12; i++) {
			spi->write(0xff); //Brightness on full
			spi->write(0xff); //Red fully on
			spi->write(0x00); //Blue/green fully off
			spi->write(0x00);
		}
		// Send end frame
		for (int8_t i = 0; i < 4; i++) {
			spi->write(0xff);
		}
	}
	
	
	
	/**
	 * Send data down the SPI bus
	 */
	 //% blockId=brightboard_clear block="clear display"	
	void clear() {
		SPI* spi = getSPI();
		// Send zero frame intitially
		for (int8_t i = 0; i < 4; i++) {
			spi->write(0x00);
		}
		// Send data for each pixel (red on, green, blue off)
		for (int8_t i = 0; i < 12; i++) {
			spi->write(0xff); //Brightness on full
			spi->write(0x00); //Red fully off
			spi->write(0x00); //Blue/green fully off
			spi->write(0x00);
		}
		// Send end frame
		for (int8_t i = 0; i < 4; i++) {
			spi->write(0xff);
		}	
	}
	
    /*
    * Calculates the light in Lux based on the ADC value passed in. 1 step in adcVal is equal to .488 uA or .976 lux at 5V
    */
    //% blockId=brightboard_get_bright block="%brightDisplay|get brightness"
    uint16_t getbright(int16_t bval) {
        return bval * .976;
    }
}
