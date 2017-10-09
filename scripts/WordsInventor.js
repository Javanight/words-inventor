(function () {
  'use strict';



  /**
   * [[Description]]
   * @param {[[Type]]} wordList [[Description]]
   */
  var WordsInventor = function (wordList) {
    this.wordList = wordList || [];
    this.analysis = {};

    this.analyse(wordList);
  };



  /**
   * [[Description]]
   * @returns {[[Type]]} [[Description]]
   */
  WordsInventor.prototype.analyse = function (wordList) {
    if (typeof wordList !== 'undefined') {
      this.wordList = wordList;
    } else {
      wordList = this.wordList;
    }

    var
      wordListAnalysis = {},
      word, wordIndex, wordListLength,
      charIndex, wordLength,
      charCode, i, j, k;


    for (wordIndex = 0, wordListLength = wordList.length; wordIndex < wordListLength; wordIndex += 1) {
      word = wordList[wordIndex];
      i = 0;
      j = 0;
      k = 0;

      for (charIndex = 0, wordLength = word.length; charIndex < wordLength; charIndex += 1) {
        charCode = word.charCodeAt(charIndex);
        j = k;
        k = charCode;

        if (typeof wordListAnalysis[i] === 'undefined') {
          wordListAnalysis[i] = {};
        }

        if (typeof wordListAnalysis[i][j] === 'undefined') {
          wordListAnalysis[i][j] = {};
        }

        if (typeof wordListAnalysis[i][j][k] === 'undefined') {
          wordListAnalysis[i][j][k] = 0;
        }

        wordListAnalysis[i][j][k] += 1;
        i = j;
        j = k;
      }
    }

    this.analysis = this.normalize(wordListAnalysis);
    return this.analysis;
  };



  /**
   * [[Description]]
   */
  WordsInventor.prototype.normalize = function (analysis) {
    var
      sum, veryLeftChar, leftChar,
      i, j, k;


    for (i in analysis) {
      veryLeftChar = analysis[i];
      sum = 0;

      for (j in veryLeftChar) {
        leftChar = veryLeftChar[j];

        for (k in leftChar) {
          sum += veryLeftChar[j][k];
        }
      }


      for (j in veryLeftChar) {
        leftChar = veryLeftChar[j];

        for (k in leftChar) {
          veryLeftChar[j][k] /= sum;
        }
      }
    }

    return analysis;
  };



  /**
   * [[Description]]
   */
  WordsInventor.prototype.invent = function (wordList) {
    if (typeof wordList !== 'undefined') {
      this.analyse(wordList);
    } else {
      wordList    = this.wordList;
    }

    var
      analysis    = this.analysis,
      wordNumber  = 1000,
      wordLength  = 15,
      newWordList = [],
      uniqueNewWordList = [],
      newNewWordList = [],
      newWord, nextChar, rnd, charWeight,
      charPosition, i, j;

    while (wordNumber >= 0) {
      newWord = '';
      nextChar = 0;
      i = 0;
      j = 0;

      for (charPosition = 0; charPosition < wordLength; charPosition += 1) {
        rnd = Math.random();

        if (!analysis[nextChar] || !analysis[nextChar][i]) {
          break;
        }

        for (j in  analysis[nextChar][i]) {
          charWeight = analysis[nextChar][i][j];
          rnd -= charWeight;
          if (rnd <= 0) {
            break;
          }
        }

        newWord += String.fromCharCode(j);

        nextChar = i;
        i = j;
      }

      if (newWord.length < wordLength) {
        newWordList.push(newWord);
        wordNumber -= 1;
      } else {
        continue;
      }
    }

    uniqueNewWordList = newWordList.filter(function(item, pos){
      return newWordList.indexOf(item) == pos;
    })

    newNewWordList = uniqueNewWordList.filter(function(item, pos){
      return wordList.indexOf(item) == -1;
    })

    return newNewWordList;
  };



  window.WordsInventor = WordsInventor;
}());