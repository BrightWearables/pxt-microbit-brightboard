input.onButtonPressed(Button.A, function () {
    brightboard.setPixelArray(brightboard.colorForLed(0xff0000, 0xFF7F00, 0xFFFE00, 0x7FFF00, 0x00FF00, 0x00FF7F, 0x00FFFE, 0x007FFF, 0x0000FF, 0x7F00FF, 0xFE00FF, 0xFF007F))
    brightboard.show()
})
input.onButtonPressed(Button.B, function () {
    brightboard.doClear()
    brightboard.show()
})
basic.showIcon(IconNames.Heart)
brightboard.setBrightness(64)
brightboard.doClear()
brightboard.show()
basic.forever(function () {
    basic.showIcon(IconNames.Heart)
    brightboard.setPixelColor(Math.randomRange(1, 12), brightboard.randomColor())
    brightboard.show()
    basic.showIcon(IconNames.SmallHeart)
    basic.pause(500)
})
