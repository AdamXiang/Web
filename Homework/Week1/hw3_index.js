// 輪流丟骰子
let tiger = Math.floor(Math.random() * 6) + 1;
let bear = Math.floor(Math.random() * 6) + 1;

// 輸出兩人的點數
console.log(`虎哥 ${tiger} 點, 熊弟 ${bear} 點`);

// 判斷結果
if (tiger > bear) {
  console.log("虎哥贏，熊弟輸！");
} else if (tiger < bear) {
  console.log("虎哥輸，熊弟贏！");
} else {
  console.log("平手");
}
