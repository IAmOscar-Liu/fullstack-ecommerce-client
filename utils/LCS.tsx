export const LCS = (a: string, b: string) => {
  const aLen = a.length;
  const bLen = b.length;

  const LCSTable: number[][] = Array(aLen + 1)
    .fill(null)
    .map(() => Array(bLen + 1).fill(0));

  for (let i = 0; i <= aLen; i++) {
    for (let j = 0; j <= bLen; j++) {
      if (i === 0 || j === 0) continue;

      if (a[i - 1] === b[j - 1]) {
        LCSTable[i][j] = LCSTable[i - 1][j - 1] + 1;
      } else {
        LCSTable[i][j] = Math.max(LCSTable[i - 1][j], LCSTable[i][j - 1]);
      }
    }
  }

  let longest = "";
  let i = aLen;
  let j = bLen;
  while (i > 0 && j > 0) {
    if (a[i - 1] === b[j - 1]) {
      longest = a[i - 1] + longest;
      i--;
      j--;
    } else if (LCSTable[i - 1][j] > LCSTable[i][j - 1]) {
      i--;
    } else {
      j--;
    }
  }

  return longest;
};
