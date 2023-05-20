let answer = Math.floor(Math.random() * 100) + 1;
let upr = 100;
let lwr = 0;
let guess = Math.floor(Math.random() * 100) + 1;

i = 1;
while (guess !== answer) {
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
  i++;
}
console.log(`第 ${i} 回合，你猜的是： ${answer} ，答對了！`);
