# brightboard:brightBoard display

Bright Board is a extension board for micro:bit that is designed for use in wearable projects that allow you to bring your micro:bit with you and create your on the go. It contains twelve SK9822 (DotStar clone) LEDs which may be programmed to display different colors, patterns, and animations.

This extension does *not* support NeoPixel (WS2812B) addressable LEDs because [the timing required to communicate with the NeoPixels is not compatible with micro:bit Bluetooth functionality] (https://support.microbit.org/support/solutions/articles/19000068302-why-can-t-i-use-the-bluetooth-and-neopixel-packages-at-the-same-time-). Because the Bright Board uses DotStar LEDs, you can program your Bright Board via Bluetooth with the micro:bit app (https://microbit.org/guide/mobile/) 

Project and code ideas for the Bright Board may be found at https://www.brightwearables.com/brightboard/examples. The Bright Board may be purchased at https://brightwearables.com, shop.


## ~ hint


## ~

## Basic usage
Bright Board code blocks that contain the word "show" will write their pattern to the LEDs when executed. If a code block doesn't contain the word "show", then it only makes changes to the buffered LED values. To make those values visible in the LEDs, you must use a "show" block.

## Example: Display a repeating pattern


## Supported targets

* for PXT/microbit

## License

MIT

```package
brightboard=github:BrightWearables/pxt-microbit-brightboard
```