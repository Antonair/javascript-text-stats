// Check to see if something is already in an array
function uniqueElem(elem, someArray) {
    isUnique = true;
    for (let i = 0; i < someArray.length; i++) {
        if (elem === someArray[i]) {
            isUnique = false;
        }
    }
    return isUnique;
}

// Constructor for word frequency object
function wordFreq(aWord) {
    this.word = aWord;
    this.frequency = 1;
}

// The function to compute all the stats of the text
function getStats(txt) {
    // Get all the words in the text
    let arrayWords = txt.split(/[^A-Za-z0-9]/);
    arrayWords = arrayWords.filter(Boolean);

    // Make a lowercase version of arrayWords
    lowerWords = [];
    for (let i = 0; i < arrayWords.length; i++) {
        lowerWords.push(arrayWords[i].toLowerCase());
    }

    // Get a list of all the lines of the text
    let arrayLines = txt.split(/\n/);
    let arrayNonEmptyLines = [];
    for (let i = 0; i < arrayLines.length; i++) {
        if (/\S/.test(arrayLines[i])){
            arrayNonEmptyLines.push(arrayLines[i]);
        }
    }

    // Calculate the length of the longest line
    let longestLine = 0;
    for (let i = 0; i < arrayLines.length; i++) {
        if (longestLine < arrayLines[i].length) {
            longestLine = arrayLines[i].length;
        }
    }

    // Calculate the average word length of the text
    let avgWordLength = 0;
    for (let i = 0; i < arrayWords.length; i++) {
        avgWordLength += arrayWords[i].length;
    }
    avgWordLength = avgWordLength / arrayWords.length;

    // Create a list of unique palindromes in the text
    let arrayPalindromes = [];
    for (let i = 0; i < lowerWords.length; i++) {
        if (lowerWords[i] === lowerWords[i].split('').reverse().join('') && lowerWords[i].length > 2) {
            if (uniqueElem(lowerWords[i], arrayPalindromes)) {
                arrayPalindromes.push(lowerWords[i]);
            }

        }
    }

    let longWords = lowerWords;

    // Sort words by highest length first, alphabetic order for tiebreakers
    longWords.sort(function(a,b){
        if(a.length == b.length) {
            return (a < b) ? -1 : (a > b) ? 1 : 0;
        }
        else {
            return (a.length < b.length) ? 1 : -1;
        }
    });

    // Ensure words are unique
    let uniqueLongWords = [];
    for (let i = 0; i < longWords.length; i++) {
        if (uniqueElem(longWords[i], uniqueLongWords)) {
            uniqueLongWords.push(longWords[i]);
        }
    }
    uniqueLongWords = uniqueLongWords.slice(0,10);

    // Create an object for each word which includes their frequencies
    let frequencies = [];
    let prev = "";
    lowerWords.sort();
    for (let i = 0; i < lowerWords.length; i++) {
        if (lowerWords[i] !== prev) {
            let someWord = new wordFreq(lowerWords[i]);
            frequencies.push(someWord);
        }
        else {
            frequencies[frequencies.length-1].frequency++;
        }
        prev = lowerWords[i];
    }

    // Sort words by highest frequency first, alphabetic order for tiebreakers
    frequencies.sort(function(a,b){
        if(a.frequency == b.frequency) {
            return (a.word < b.word) ? -1 : (a.word > b.word) ? 1 : 0;
        }
        else {
            return (a.frequency < b.frequency) ? 1 : -1;
        }
    });

    // Create an array that properly formats the frequencies of each word
    let mostFreq = [];
    let counter = 10;
    if (frequencies.length < 10) {
        counter = frequencies.length;
    }
    for (let i = 0; i < counter; i++) {
        mostFreq.push(frequencies[i].word + "(" + frequencies[i].frequency + ")");
    }

    return {
        nChars: txt.length,
        nWords: arrayWords.length,
        nLines: arrayLines.length,
        nNonEmptyLines: arrayNonEmptyLines.length,
        averageWordLength: avgWordLength,
        maxLineLength: longestLine,
        palindromes: arrayPalindromes,
        longestWords: uniqueLongWords,
        mostFrequentWords: mostFreq
    };
}
