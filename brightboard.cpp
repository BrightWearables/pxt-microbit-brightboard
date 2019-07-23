/**
* Test brightboard code
*/


#include "pxt.h"
#include <cstdint>
#include <math.h>

using namespace pxt;

namespace brightboard {
    /*
    * Calculates the light in Lux based on the ADC value passed in. 1 step in adcVal is equal to .488 uA or .976 lux at 5V
    */
    //%
    uint16_t getbright(int16_t bval) {

        return bval * .976;
    }

}
