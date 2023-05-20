let answer = Math.floor(Math.random() * 100 + 1);
let upper_bar = 100;
let lower_bar = 1;
let round = 1;
let guess = Math.floor((upper_bar + lower_bar) / 2);

console.log(`莊家數字是 ${answer}`);
while (guess !== answer) {
  if (guess < answer) {
    lower_bar = guess + 1;
    console.log(`第${round}次，電腦猜 ${guess}，結果 太小`);
  } else if (guess > answer) {
    upper_bar = guess - 1;
    console.log(`第${round}次，電腦猜 ${guess}，結果 太大`);
  }
  guess = Math.floor((upper_bar + lower_bar) / 2);
  round++;
}
console.log(`第${round}次，電腦猜 ${guess}，結果 猜中了`);
