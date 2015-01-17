(function (Kotlin) {
  'use strict';
  var _ = Kotlin.defineRootPackage(null, /** @lends _ */ {
    net: Kotlin.definePackage(null, /** @lends _.net */ {
      loxal: Kotlin.definePackage(null, /** @lends _.net.loxal */ {
        example: Kotlin.definePackage(null, /** @lends _.net.loxal.example */ {
          kotlin: Kotlin.definePackage(null, /** @lends _.net.loxal.example.kotlin */ {
            typing_trainer: Kotlin.definePackage(null, /** @lends _.net.loxal.example.kotlin.typing_trainer */ {
              main: function (args) {
                new _.net.loxal.example.kotlin.typing_trainer.TypingTrainer();
              },
              MarqueeCanvas: Kotlin.createClass(null, function (text) {
                var tmp$0;
                this.text = text;
                this.canvas_cjewyr$ = document.getElementById('canvas');
                this.context_uu8f7g$ = (tmp$0 = this.canvas_cjewyr$.getContext('2d')) != null ? tmp$0 : Kotlin.throwNPE();
                this.xPos_9if6ux$ = window.innerWidth;
                this.yPos_9iejve$ = 70;
                this.steppingProgressPerFrame_a9z87a$ = 1.9;
                this.errorStatus_cjfugf$ = false;
                this.fontColor_yo65bd$ = '#119';
                this.goBackStepping_eis5ns$ = 20;
                this.renderBackground();
                window.setInterval(_.net.loxal.example.kotlin.typing_trainer.MarqueeCanvas.MarqueeCanvas$f(this), 10);
              }, /** @lends _.net.loxal.example.kotlin.typing_trainer.MarqueeCanvas.prototype */ {
                renderBackground: function () {
                  this.context_uu8f7g$.save();
                  this.canvas_cjewyr$.width = this.xPos_9if6ux$;
                  this.canvas_cjewyr$.height = 100.0;
                  this.context_uu8f7g$.font = '66px serif';
                  this.context_uu8f7g$.fillStyle = this.fontColor_yo65bd$;
                  this.context_uu8f7g$.fillRect(0, 0, this.canvas_cjewyr$.width, this.canvas_cjewyr$.height);
                  this.context_uu8f7g$.restore();
                },
                goBack: function () {
                  this.xPos_9if6ux$ += this.goBackStepping_eis5ns$ * this.steppingProgressPerFrame_a9z87a$;
                },
                drawTextContainer: function () {
                  this.context_uu8f7g$.save();
                  if (this.errorStatus_cjfugf$) {
                    this.context_uu8f7g$.fillStyle = '#911';
                  }
                   else {
                    this.context_uu8f7g$.fillStyle = this.fontColor_yo65bd$;
                  }
                  this.context_uu8f7g$.fillRect(0, 0, this.canvas_cjewyr$.width, this.canvas_cjewyr$.height);
                  this.context_uu8f7g$.restore();
                },
                showMistake: function () {
                  this.errorStatus_cjfugf$ = true;
                },
                continueAsCorrect: function () {
                  this.errorStatus_cjfugf$ = false;
                },
                draw: function () {
                  this.drawOnCanvas();
                  if (this.xPos_9if6ux$ < 0) {
                    this.xPos_9if6ux$ += this.steppingProgressPerFrame_a9z87a$;
                  }
                  this.makeProgressivelySlower();
                },
                drawOnCanvas: function () {
                  this.drawTextContainer();
                  this.context_uu8f7g$.save();
                  this.context_uu8f7g$.fillStyle = '#ee1';
                  this.context_uu8f7g$.fillText(this.text, this.xPos_9if6ux$, this.yPos_9iejve$);
                  this.context_uu8f7g$.restore();
                  this.xPos_9if6ux$ -= this.steppingProgressPerFrame_a9z87a$;
                },
                makeProgressivelySlower: function () {
                }
              }, /** @lends _.net.loxal.example.kotlin.typing_trainer.MarqueeCanvas */ {
                MarqueeCanvas$f: function (this$MarqueeCanvas) {
                  return function () {
                    this$MarqueeCanvas.draw();
                  };
                }
              }),
              TypingTrainer: Kotlin.createClass(null, function () {
                this.cursor_uq2f99$ = '>';
                this.mistakeCount_9htks8$ = 0;
                this.idxOfComparable_mepnvd$ = 1;
                this.statistics_jh12wm$ = document.getElementById('statistics');
                this.initListener();
                this.marqueeCanvas_s2m7n1$ = new _.net.loxal.example.kotlin.typing_trainer.MarqueeCanvas(this.generateText() + '<');
              }, /** @lends _.net.loxal.example.kotlin.typing_trainer.TypingTrainer.prototype */ {
                showMistake: function () {
                  this.mistakeCount_9htks8$++;
                  this.marqueeCanvas_s2m7n1$.showMistake();
                },
                validateChar: function (pressedChar) {
                  if (this.marqueeCanvas_s2m7n1$.text.charAt(this.idxOfComparable_mepnvd$) === pressedChar) {
                    this.continueAsRight();
                  }
                   else {
                    this.showMistake();
                  }
                },
                updateText: function (text) {
                  this.marqueeCanvas_s2m7n1$.text = text;
                },
                hasFinished: function () {
                  return this.marqueeCanvas_s2m7n1$.text.length === 2;
                },
                finish: function () {
                  this.statistics_jh12wm$.textContent = 'Fnished!';
                  this.showStats();
                },
                continueAsRight: function () {
                  this.marqueeCanvas_s2m7n1$.continueAsCorrect();
                  this.updateText(this.cursor_uq2f99$.toString() + this.marqueeCanvas_s2m7n1$.text.substring(this.idxOfComparable_mepnvd$ + 1));
                  this.marqueeCanvas_s2m7n1$.goBack();
                  if (this.hasFinished())
                    this.finish();
                },
                generateText: function (total, spaceCharAfter) {
                  var tmp$0;
                  if (total === void 0)
                    total = 12;
                  if (spaceCharAfter === void 0)
                    spaceCharAfter = 3;
                  var space = ' ';
                  var text = new Kotlin.StringBuilder();
                  text.append(this.cursor_uq2f99$);
                  tmp$0 = total;
                  for (var idx = 1; idx <= tmp$0; idx++) {
                    text.append(this.generateRandomChar());
                    if (Kotlin.equals(idx % spaceCharAfter, 0) && idx !== total)
                      text.append(space);
                  }
                  return text.toString();
                },
                generateRandomChar: function () {
                  var alphabetCount = 26;
                  return Kotlin.toChar('a'.charCodeAt(0) + alphabetCount * Math.random());
                },
                initListener: function () {
                  this.addCharValidator();
                },
                addCharValidator: function () {
                  window.onload = _.net.loxal.example.kotlin.typing_trainer.TypingTrainer.addCharValidator$f(this);
                },
                showStats: function () {
                }
              }, /** @lends _.net.loxal.example.kotlin.typing_trainer.TypingTrainer */ {
                f: function (this$TypingTrainer) {
                  return function () {
                    if (!this$TypingTrainer.hasFinished())
                      this$TypingTrainer.validateChar(Kotlin.toChar(window.event.keyCode).toString().toLowerCase().charAt(0));
                  };
                },
                addCharValidator$f: function (this$TypingTrainer) {
                  return function () {
                    document.body.onkeydown = _.net.loxal.example.kotlin.typing_trainer.TypingTrainer.f(this$TypingTrainer);
                  };
                }
              })
            })
          })
        })
      })
    })
  });
  Kotlin.defineModule('kotlin-javascript-example-typing-trainer', _);
  _.net.loxal.example.kotlin.typing_trainer.main([]);
}(Kotlin));
