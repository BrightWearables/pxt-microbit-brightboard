#ifndef _brightboard_hpp
#define _brightboard_hpp

namespace pins {
	extern SPI* allocSPI();
	extern void spiFormat(int bits, int mode);
}

#endif