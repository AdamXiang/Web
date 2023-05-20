// 第一階段，宣告我們所需要的變數
// 宣告水果的價錢 $/顆
const priceApple = 10;
const priceLemon = 5;
const priceStrawberry = 15;

// 宣告要買多少顆水果
let appleCount = 100;
let lemonCount = 1;
let strawberryCount = 40;

// 宣告我們有多少預算
let budget = 2000;

// 宣告，並計算我們總共需要多少錢
let total =
  priceApple * appleCount +
  priceLemon * lemonCount +
  priceStrawberry * strawberryCount;

// 判斷我們是否有足夠的錢可以花
if (total > budget) {
  console.log(
    `你想要買的水果要花 ${total} 元，而錢包裡有 ${budget} 元，我們的錢不夠`
  );
} else {
  console.log(
    `你想要買的水果要花 ${total} 元，而錢包裡有 ${budget} 元，我們的錢很夠!`
  );
}
