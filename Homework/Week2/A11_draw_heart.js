// 要畫一個愛心需要什麼材料呢，空格與實心
const fillSpace = "**";
const blackSpace = "  ";

let line1 = " ";
let line2 = " ";
let line3 = " ";
let line4 = " ";
let line5 = " ";
let line6 = " ";
let line7 = " ";
let line8 = " ";
let line9 = " ";
let line10 = "\n 想對支持你學程式的人說：";

for (i = 1; i <= 9; i++) {
  if (i === 3 || i === 7) {
    line1 += fillSpace;
  } else {
    line1 += blackSpace;
  }
  if (i === 1 || i === 5 || i === 9) {
    line2 += blackSpace;
  } else {
    line2 += fillSpace;
  }
  line3 += fillSpace;
  line4 += fillSpace;
  line5 += fillSpace;

  if (i === 1 || i === 9) {
    line6 += blackSpace;
  } else {
    line6 += fillSpace;
  }
  if (i === 1 || i === 2 || i === 8 || i === 9) {
    line7 += blackSpace;
  } else {
    line7 += fillSpace;
  }
  if (i === 4 || i === 5 || i === 6) {
    line8 += fillSpace;
  } else {
    line8 += blackSpace;
  }
  if (i === 5) {
    line9 += fillSpace;
  } else {
    line9 += blackSpace;
  }
}
console.log(
  `${line1} \n${line2} \n${
    (line3, line4, line5)
  }\n${line6}\n${line7}\n${line8}\n${line9}${line10}`
);
