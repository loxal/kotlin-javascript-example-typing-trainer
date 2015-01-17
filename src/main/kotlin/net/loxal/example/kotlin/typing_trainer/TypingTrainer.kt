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

import kotlin.js.dom.html.*

class TypingTrainer() {
    private val cursor = '>';
    private var mistakeCount: Int = 0
    private val marqueeCanvas: MarqueeCanvas
    private val idxOfComparable = 1
    private val statistics = document.getElementById("statistics") as HTMLDivElement

    private fun showMistake() {
        mistakeCount++
        marqueeCanvas.showMistake();
    }

    private fun validateChar(pressedChar: Char) {
        if (marqueeCanvas.text[idxOfComparable] == pressedChar) {
            continueAsRight()
        } else {
            showMistake()
        }
    }

    private fun updateText(text: String) {
        marqueeCanvas.text = text
    }

    private fun hasFinished(): Boolean {
        return marqueeCanvas.text.size == 2
    }

    private fun finish() {
        statistics.textContent = "Finished!"

        showStats()
    }

    private fun continueAsRight() {
        marqueeCanvas.continueAsCorrect()
        updateText("$cursor${marqueeCanvas.text.substring(idxOfComparable + 1)}")
        marqueeCanvas.goBack()
        if (hasFinished()) finish()
    }

    private fun generateText(total: Int = 12, spaceCharAfter: Int = 3): String {
        val space = ' '

        val text = StringBuilder()
        text.append(cursor)

        for (idx in 1..total) {
            text.append(generateRandomChar())
            if (idx.mod(spaceCharAfter).equals(0) && idx != total)
                text.append(space)
        }

        return text.toString()
    }

    private fun generateRandomChar(): Char {
        val alphabetCount = 26

        return ('a' + (alphabetCount * Math.random())).toChar()
    }

    {
        initListener()

        marqueeCanvas = MarqueeCanvas(generateText() + "<")
    }

    private fun initListener() {
        addCharValidator()
    }

    private fun addCharValidator() {
        window.onload = {
            document.body.onkeydown = {
                if (!hasFinished())
                    validateChar(window.event.keyCode.toChar().toString().toLowerCase()[0].toChar())
            }
        }
    }

    private fun showStats() {
        // TODO implement
    }
}
