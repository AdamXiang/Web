const fillSpace = "**";
const blackSpace = "  ";

let line1 = "";
let line2 = "";
let line3 = "";
let line4 = "";
let line5 = "";
let line6 = "";
let line7 = "";
let line8 = "";
let line9 = "";
let line10 = "";
let line11 = "";
let line12 = "";
let line13 = "";
let line14 = "";
let line15 = "";
let line16 = "";
let line17 = "";

for (i = 1; i <= 13; i++) {
  if (i >= 4 && i <= 10) {
    line1 += blackSpace;
    line2 = line1;
    line3 = line1;
    line4 = line1;
    line5 = line1;
  } else {
    line1 += fillSpace;
    line2 = line1;
    line3 = line1;
    line4 = line1;
    line5 = line1;
  }
  if (i >= 5 && i <= 9) {
    line6 += blackSpace;
  } else {
    line6 += fillSpace;
  }
  if (i !== i || i !== 13) {
    line7 += fillSpace;
  } else {
    line7 += blackSpace;
  }
  if (i < 3 || i > 11) {
    line8 += blackSpace;
  } else {
    line8 += fillSpace;
  }
  if (i < 4 || i > 10) {
    line9 += blackSpace;
  } else {
    line9 += fillSpace;
  }
  if (i === 3 || i === 4 || i === 7 || i === 10 || i === 11) {
    line10 += fillSpace;
    line11 = line10;
  } else {
    line10 += blackSpace;
    line11 = line10;
  }
  if (i !== 1 || i !== 13) {
    line12 += fillSpace;
    line13 = line12;
  } else {
    line12 += blackSpace;
    line13 = line12;
  }
  if ((i >= 2 && i <= 4) || (i >= 10 && i <= 12)) {
    line14 += fillSpace;
  } else {
    line14 += blackSpace;
  }
  if ((i >= 3 && i <= 5) || (i >= 9 && i <= 11)) {
    line15 += fillSpace;
  } else {
    line15 += blackSpace;
  }
  if ((i >= 4 && i <= 6) || (i >= 8 && i <= 10)) {
    line16 += fillSpace;
  } else {
    line16 += blackSpace;
  }
  if (i >= 5 && i <= 9) {
    line17 += fillSpace;
  } else {
    line17 += blackSpace;
  }
}
console.log(
  `${line1}\n${line2}\n${line3}\n${line4}\n${line5}\n${line6}\n${line7}\n${line8}\n${line9}\n${line10}\n${line11}\n${line12}\n${line13}\n${line14}\n${line15}\n${line16}\n${line17}`
);
