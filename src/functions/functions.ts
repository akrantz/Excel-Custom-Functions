const wordsForNumbers = [
  "Zero",
  "One",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
  "Ten",
  "Eleven",
  "Twelve",
  "Thirteen",
  "Fourteen",
  "Fifteen",
  "Sixteen",
  "Seventeen",
  "Eighteen",
  "Nineteen"
];
const wordsForTens = [
  "Zero",
  "Ten",
  "Twenty",
  "Thirty",
  "Forty",
  "Fifty",
  "Sixty",
  "Seventy",
  "Eighty",
  "Ninety",
];
const wordForHundred = "Hundred";
const wordsForPowersOfThousand = [
  "",
  "Thousand",
  "Million",
  "Billion",
  "Trillion",
  "Quadrillion",
  "Quintillion",
  "Sextillion",
  "Septillion",
  "Octillion",
  "Nonillion",
  "Decillion"
];

/**
 * Write out a number using English words.
 * @customfunction
 * @param n number
 */
function numberToWords(n: number): string {
  let words: string;

  if (n === 0) {
    words = numberToWords(n);
  } else {
    let current = n;
    let wordGroups = [];
    let power = 0;

    while (current > 0) {
      const hundreds = current % 1000;
      let wordGroup = "";

      if (hundreds > 0) {
        wordGroup = `${hundredsToWords(hundreds)}`;

        if (wordGroups.length > 0) {
          if (wordsForPowersOfThousand[power] === undefined) throw new Error("Number is too large.");
          wordGroup += ` ${wordsForPowersOfThousand[power]} `;
        }
      }

      wordGroups.push(wordGroup);
      power += 1;
      current = Math.floor(current / 1000);
    }

    words = wordGroups.reverse().join("").trim();
  }

  return words;
}
CustomFunctions.associate("NUMBERTOWORDS", numberToWords);

function lessThanTwentyToWord(n: number): string {
  if (n >= 20) throw new Error("The number should be less than 20.");
  if (n < 0) throw new Error("The number should not be negative.");
  return wordsForNumbers[n];
}

function hundredsToWords(n: number): string {
  if (n >= 1000) throw new Error("The number should be less than 1000.");
  if (n < 0) throw new Error("The number should not be negative.");
  let words = "";

  if (n === 0) {
    words = wordsForNumbers[n];
  } else {
    let current = n;
    const hundreds = Math.floor(current / 100);
    current %= 100;
    const isHundredMultiple = current === 0;
    const tens = Math.floor(current / 10);
    current %= 10;
    const ones = current;

    if (hundreds > 0) {
      words += `${wordsForNumbers[hundreds]} ${wordForHundred}`;

      // add a space unless it is a multiple of 100
      if (!isHundredMultiple) {
        words += " ";
      }
    }

    if (tens < 2) {
      if (!isHundredMultiple) {
        words += lessThanTwentyToWord(tens * 10 + ones);
      }
    } else {
      words += `${wordsForTens[tens]}`;

      if (ones !== 0) {
        words += `-${wordsForNumbers[ones]}`;
      }
    }
  }

  return words;
}
