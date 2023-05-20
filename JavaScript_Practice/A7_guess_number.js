// ========= 宣告變數 ==========
let answer = Math.floor(Math.random() * 100) + 1; //正確答案
let guess = 0; //挑戰者猜的數字
let count = 0; //回合數

// ========= 從這裡開始 ==========
// 先印出正確數字
console.log(`正確數字為：${answer}`);
// 設計判斷式和迴圈解決問題
while (guess !== answer) {
  guess = Math.floor(Math.random() * 100) + 1; // 挑戰者猜一個本回合的數字
  count++;
  if (guess > answer) {
    console.log(`第 ${count} 回合，挑戰者猜 ${guess}，莊家回答：太大了`);
  } else if (guess < answer) {
    console.log(`第 ${count} 回合，挑戰者猜 ${guess}，莊家回答：太小了`);
  } else {
    console.log(`第 ${count} 回合，挑戰者猜 ${guess}，莊家回答：恭喜答對了`);
  }
  // 條件判斷
  // 若太大
  // 若太小
  // 若一樣大
}
