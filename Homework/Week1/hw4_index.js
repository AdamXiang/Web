// 設計變數
let tigerWinCount = 0;
let bearWinCount = 0;
let tiger = Math.floor(Math.random() * 6) + 1;
let bear = Math.floor(Math.random() * 6) + 1;
// 跑 10 局
// write your code
// 輸流擲骰子
// 計算當局輸贏，並輸出結果

for (let i = 1; i <= 10; i++) {
  let tiger = Math.floor(Math.random() * 6) + 1;
  let bear = Math.floor(Math.random() * 6) + 1;
  if (tiger > bear) {
    console.log(
      `第 ${i} 局｜虎哥 ${tiger} 點 vs 熊弟 ${bear} 點｜本局虎哥獲勝`
    );
    tigerWinCount++;
  } else if (tiger < bear) {
    console.log(
      `第 ${i} 局｜虎哥 ${tiger} 點 vs 熊弟 ${bear} 點｜本局熊弟獲勝`
    );
    bearWinCount++;
  } else {
    console.log(`第 ${i} 局｜虎哥 ${tiger} 點 vs 熊弟 ${bear} 點｜本局平手`);
  }
}

// 輸出摘要
console.log("--- 結果 ---");
console.log(`虎哥贏 ${tigerWinCount} 局`);
console.log(`熊弟贏 ${bearWinCount} 局`);

// 宣布最終勝利者
// write your code
if (tigerWinCount > bearWinCount) {
  console.log("最終冠軍：虎哥");
} else if (bearWinCount > tigerWinCount) {
  console.log("最終冠軍：熊弟");
} else {
  console.log("平手");
}
