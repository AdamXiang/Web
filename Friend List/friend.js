// 宣告網址變數
const base_URL = "https://lighthouse-user-api.herokuapp.com";
const index_URL = base_URL + "/api/v1/users/";
// 抓出要渲染的 DOM
const dataPanel = document.querySelector("#data-panel");
const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-user");
const homeButton = document.querySelector(".backToHome");
// 宣告一個 friendList Array
const friendList = [];
let filterUser = [];

axios
  .get(index_URL)
  .then(function (response) {
    friendList.push(...response.data.results); //展開運算子，將陣列中的元素展開，一個個放入
    renderList(friendList);
  })
  .catch((err) => console.log(err));
// 渲染畫面的函式
// <em>標籤表示強調，加了會變成斜體

// 建立 modalList 的事件監聽器
dataPanel.addEventListener("click", function onShow(event) {
  if (event.target.matches(".card-show-list")) {
    showModal(Number(event.target.dataset.id));
    console.log(event.target);
  }
});

function renderList(datas) {
  let contentHTML = ``;
  for (const data of datas) {
    contentHTML += `
    <div class="col-sm-2">
      <div class="mb-2 mt-3">
        <div class="card mx-4">
         <button type="button" class="btn m-0 p-0" data-toggle="modal" data-target="#friend-modal">
          <img src="${
            data.avatar
          }" class="card-img-top card-show-list" alt="Friend Post"  data-id="${
      data.id
    }"/>
          </button>
        </div>
        <div class="444444">
        <h6 class="called-name">${data.name + ` ` + data.surname}</h6>
        </div>
      </div>
    </div>

    <!-- Modal -->
  <div class="modal fade" id="friend-modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="friend-modal-name">Modal</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body" id="friend-modal-body">
          <div class="row">
            <div class="col-sm-4" id="friend-modal-image">
              <img src="" alt="friend-detail">
            </div>
            <div class="col-sm-8">
              <p class="m-0" id="friend-modal-gender">gender: </p>
              <p class="m-0" id="friend-modal-age">age: </p>
              <p class="m-0" id="friend-modal-region">region: </p>
              <p class="m-0" id="friend-modal-birthday">birthday: </p>
              <p class="m-0" id="friend-modal-email">email: </p>
            </div>
          </div>  
        </div>
        </div>
      </div>
    </div>
 
    `;
  }
  dataPanel.innerHTML = contentHTML;
}

// 渲染 單一Friend 的 modal
function showModal(id) {
  const modalTitle = document.querySelector("#friend-modal-name");
  const modalImage = document.querySelector("#friend-modal-image");
  const modalGender = document.querySelector("#friend-modal-gender");
  const modalBirthday = document.querySelector("#friend-modal-birthday");
  const modalRegion = document.querySelector("#friend-modal-region");
  const modalEmail = document.querySelector("#friend-modal-email");
  const modalAge = document.querySelector("#friend-modal-age");

  axios
    .get(index_URL + id)
    .then((response) => {
      const data = response.data;
      modalTitle.innerText = `${data.name + " " + data.surname}`;
      modalImage.innerHTML = `<img src="${data.avatar}" alt="friend-detail"></img>`;
      modalGender.innerText = `Gender: ${data.gender}`;
      modalBirthday.innerText = `Birthday: ${data.birthday}`;
      modalRegion.innerText = `Region: ${data.region}`;
      modalEmail.innerText = `Email: ${data.email}`;
      modalAge.innerText = `Age: ${data.age}`;
    })
    .catch((err) => console.log(err));
}

//建立事件監聽器
searchForm.addEventListener("submit", function onSearchClicked(event) {
  event.preventDefault();
  const input = searchInput.value.trim().toLowerCase();
  filterUser = friendList.filter((user) =>
    user.name.toLowerCase().includes(input)
  );
  if (filterUser.length === 0) {
    return alert(`沒有找到符合「${input}」的關鍵字`);
  }
  renderList(filterUser);
});

homeButton.addEventListener("click", function backToHome(event) {
  target = event.target;
  console.log(target);
  renderList(friendList);
});
