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

	//%
	void dotStarSPIMode(int bits, int mode) {
		//pins::spiFormat(8,3);
		pins::spiFormat(bits,mode);
	}
	

	SPI* getSPI() {
		SPI* spi = pins::allocSPI();
		return spi;
	}	
	
	
	//%
	void spiDotStarSendBuffer(Buffer buf, int len) {
		SPI* spi = getSPI();
		// Send zero frame initially
		for (int8_t i = 0; i < 4; i++) {
			spi->write(0x00);
		}
		int offset;
		uint8_t* bufPtr = buf->data;
		// Send values from buffer
		for(int8_t i = 0; i < len; i++) {
			offset = i*3;
			spi->write(0xff); //Brightness on full - colors already scaled in buffer
			// For some reason colors go out in reverse order
			spi->write(bufPtr[offset+2]);
			spi->write(bufPtr[offset+1]);
			spi->write(bufPtr[offset]);
			//spi->write(0x00);
		}
		// Send end frame
		for (int8_t i = 0; i < 4; i++) {
			spi->write(0xff);
		}		
	}
	
	
	
	//%
	void clear(Buffer buf, int len) {
		SPI* spi = getSPI();
		uint8_t *bufPtr = buf->data;
		int offset;
		// Zero out the buffer
		for (int8_t i = 0; i < len; i++) {
			offset = i*3;
			bufPtr[offset] = 0;
			bufPtr[offset+1] = 0;
			bufPtr[offset+2]=0;
		}
		spiDotStarSendBuffer(buf, len);
	}
	
}
