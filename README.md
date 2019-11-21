# Bright Board display

[Bright Board](https://brightwearables.com/product/bright-board/) is an accessory PCB for micro:bit that is designed for use in wearable projects. It is a part of the [Bright Wearables](https://www.brightwearables.com) product line of micro:bit-powered LED bags and backpacks. The Bright Board contains twelve SK9822/APA102 addressable LEDs which display different colors, patterns, and animations when controlled by the micro:bit.

This extension intentionally does *not* support WS2812B addressable LEDs because [the timing required to communicate with the WS2812B LEDs is not compatible with micro:bit Bluetooth functionality] (https://support.microbit.org/support/solutions/articles/19000068302-why-can-t-i-use-the-bluetooth-and-neopixel-packages-at-the-same-time-). Because the Bright Board uses SK9822/APA102 LEDs, you can program your Bright Board via Bluetooth with the micro:bit app (https://microbit.org/guide/mobile/) 

Project and code ideas for the Bright Board may be found at https://www.brightwearables.com/learn. The Bright Board may be purchased at https://brightwearables.com/shop.


## ~ hint


## ~

## Basic usage
Bright Board code blocks that contain the word "show" will write their pattern to the LEDs when executed. If a code block doesn't contain the word "show", then it only makes changes to the buffered LED values. To make those values visible in the LEDs, you must use a "show" block.

```blocks
    brightDisplay.show()
```
## Example: Display a repeating pattern


## Supported targets

* for PXT/microbit

## License

MIT

```package
brightboard=github:BrightWearables/pxt-microbit-brightboard
```
