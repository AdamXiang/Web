let answer = Math.floor(Math.random() * 100) + 1; //產生一數字做為答案
let upr = 100; // 設定上限為多少
let lwr = 0; // 設定下限為多少
let guess = Math.floor((upr + lwr) / 2);

// 也可以直接讓電腦隨便猜數字，再根據答案跟猜的數字的範圍相加除二（但效率不佳）

i = 1; //回合開始數為一

while (guess !== answer) {
  //進行迴圈判讀猜的數字是否與答案一樣
  if (guess < answer) {
    lwr = guess + 1;
    console.log(
      `第 ${i} 回合，你猜的是： ${guess} ，答錯了！範圍是： ${lwr} ~ ${upr}`
    );
    guess = Math.floor((upr + lwr) / 2);
  } else if (guess > answer) {
    upr = guess - 1;
    console.log(
      `第 ${i} 回合，你猜的是： ${guess} ，答錯了！範圍是： ${lwr} ~ ${upr}`
    );
    guess = Math.floor((upr + lwr) / 2);
  }
  i++; //做完判斷後，把回合數加一，以符合後續的判斷回合數
}

console.log(`第 ${i} 回合，你猜的是： ${answer} ，答對了！`);
