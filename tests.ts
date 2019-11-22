input.onButtonPressed(Button.AB, function () {
    brightboard.setPattern(brightboard.colorForLed(0xff0000, 0xFF7F00, 0xFFFE00, 0x7FFF00, 0x00FF00, 0x00FF7F, 0x00FFFE, 0x007FFF, 0x0000FF, 0x7F00FF, 0xFE00FF, 0xFF007F))
    brightboard.show()
})
input.onButtonPressed(Button.B, function () {
    brightboard.colorGradient(
        0,
        12,
        0x00dcff,
        0xff0000
    )
    brightboard.show()
})
input.onButtonPressed(Button.A, function () {
    brightboard.setPattern(brightboard.colorForLedVariableLength(brightboard.randomColor(), 0x000000))
    brightboard.show()
})
brightboard.colorOrder(ColorOrderMode.MODE_RGB)
brightboard.setBrightness(128)
brightboard.setPattern(brightboard.colorForLed(0xff0000, 0xFF7F00, 0xFFFE00, 0x7FFF00, 0x00FF00, 0x00FF7F, 0x00FFFE, 0x007FFF, 0x0000FF, 0x7F00FF, 0xFE00FF, 0xFF007F))
brightboard.show()
basic.forever(function () {
    brightboard.rotate(1)
    brightboard.show()
    basic.pause(200)
})
