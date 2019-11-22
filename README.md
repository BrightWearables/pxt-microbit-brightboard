# Bright Board display

[Bright Board](https://brightwearables.com/product/bright-board/) is an accessory PCB for micro:bit that is designed for use in wearable projects. It is a part of the [Bright Wearables](https://www.brightwearables.com) product line of micro:bit-powered LED bags and backpacks. The Bright Board contains twelve SK9822/APA102 addressable LEDs which display different colors, patterns, and animations when controlled by the micro:bit.

![](BrightBoardIlluminated.jpg)

This extension intentionally does *not* support WS2812B addressable LEDs because [the timing required to communicate with the WS2812B LEDs is not compatible with micro:bit Bluetooth functionality](https://support.microbit.org/support/solutions/articles/19000068302-why-can-t-i-use-the-bluetooth-and-neopixel-packages-at-the-same-time-). Because the Bright Board uses SK9822/APA102 LEDs, you can program your Bright Board via Bluetooth with the micro:bit app (https://microbit.org/guide/mobile/) 

Project and code ideas for the Bright Board may be found at https://www.brightwearables.com/learn. The Bright Board and compatible accessory bags may be purchased at https://brightwearables.com/shop.


## Basic usage
The Bright Board MakeCode extension contains code blocks to set and manipulate the colors displayed on the twelve Bright Board LEDs. Bright Board code blocks that contain the word "show" will write their pattern to the LEDs when executed. If a code block doesn't contain the word "show", then it only makes changes to the buffered LED values. To make those values visible in the LEDs, you must use a "show" block.
```blocks
    brightDisplay.show()
```
## Display property blocks

You can set the overall properties of the Bright Board LED display with the following code blocks:

Set the overall brightness (from 0-255) of all displayed pixels. The default value is 255 if not otherwise set with this block. The scaling is not applied to the current display, only to future displays
```blocks
brightboard.setBrightness(128)
```
Set the color order mode of the display. Defaults to RGB (Bright Boards are RGB, but in case a future batch is GRB)
```blocks
brightboard.colorOrder(ColorOrderMode.MODE_RGB)
```
Set whether gamma correction is applied to the LEDs each time the "show" function is called. Default value is true (gamma correction on).
```blocks
brightboard.setGammaCorrect(true)
```

## Action blocks
```blocks
brightboard.doClear()
```

```blocks
brightboard.setBoardColor(0xff0000)
```

```blocks
brightboard.setPixelColor(0, 0xff0000)
```

```blocks
brightboard.rotate(1)
```

```blocks
brightboard.shift(1)
```

```blocks
brightboard.fadeAll(128)
```

## Color blocks

## Example: Display a repeating pattern


## Supported targets

* for PXT/microbit

## License

MIT

