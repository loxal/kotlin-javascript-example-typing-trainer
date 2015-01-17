/*
 * Copyright 2015 Alexander Orlov <alexander.orlov@loxal.net>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package net.loxal.example.kotlin.typing_trainer

import kotlin.js.dom.html5.*
import kotlin.js.dom.html.*

class MarqueeCanvas(var text: String) {
    private val canvas = document.getElementById("canvas") as HTMLCanvasElement
    private val context: CanvasContext = canvas.getContext("2d")!!
    private var xPos = window.innerWidth
    private val yPos = 70
    private val steppingProgressPerFrame = 1.9
    private var errorStatus = false
    private val fontColor = "#119"
    private val goBackStepping = 20

    private fun renderBackground() {
        context.save()
        canvas.width = xPos
        canvas.height = 100.0
        context.font = "66px serif"

        context.fillStyle = fontColor
        context.fillRect(0, 0, canvas.width, canvas.height)
        context.restore()
    }

    fun goBack() {
        xPos += goBackStepping * steppingProgressPerFrame;
    }

    private fun drawTextContainer() {
        context.save()
        if (errorStatus) {
            context.fillStyle = "#911"
        } else {
            context.fillStyle = fontColor
        }

        context.fillRect(0, 0, canvas.width, canvas.height);
        context.restore()
    }

    fun showMistake() {
        errorStatus = true;
    }

    fun continueAsCorrect() {
        errorStatus = false;
    }

    private fun draw() {
        drawOnCanvas();
        if (xPos < 0) {
            xPos += steppingProgressPerFrame;
        }
        makeProgressivelySlower()
    }

    private fun drawOnCanvas(): Unit {
        drawTextContainer();

        context.save()
        context.fillStyle = "#ee1";
        context.fillText(text, xPos, yPos);
        context.restore()

        xPos -= steppingProgressPerFrame;
    }

    {
        renderBackground()

        window.setInterval({
            draw()
        }, 10)
    }

    private fun makeProgressivelySlower() {
        // TODO implement
    }
}