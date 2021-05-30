const BASE_URL = 'https://movie-list.alphacamp.io'
const INDEX_URL = BASE_URL + '/api/v1/movies/'
const POSTER_URL = BASE_URL + '/posters/'

const dataPanel = document.querySelector('#data-panel')
const searchForm = document.querySelector('#search-form')
const searchInput = document.querySelector('#search-input')
const paginator = document.querySelector('#paginator')


const movies = []
let filteredMovies = []
const MOVIES_PER_PAGE = 12

function addToFavorite(id) {
  // 建立一個叫收藏清單的 list
  const list = JSON.parse(localStorage.getItem('favoriteMovies')) || []
  const movie = movies.find((movie) => movie.id === id)
  if (list.some((movie) => movie.id === id)) {
    return alert(`此電影收藏清單已有了！`)
  }
  list.push(movie)
  localStorage.setItem('favoriteMovies', JSON.stringify(list))
}

dataPanel.addEventListener("click", function onPanelClicked(event) {
  if (event.target.matches('.btn-show-movie')) {
    showMovieModal(Number(event.target.dataset.id))
  } else if (event.target.matches('.btn-add-favorite')) {
    addToFavorite(Number(event.target.dataset.id))
  }
})

searchForm.addEventListener('submit', function onSearchFormSubmitted(event) {
  event.preventDefault()
  const keyword = searchInput.value.trim().toLowerCase()

  // if (!keyword.length) {
  //   return alert('請輸入有效字串！')
  // }
  filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(keyword)
  )
  //錯誤處理：無符合條件的結果
  if (filteredMovies.length === 0) {
    return alert(`您輸入的關鍵字：${keyword} 沒有符合條件的電影`)
  }

  // 重製分頁器
  renderPaginator(filteredMovies.length)
  // 預設顯示第 1 頁的搜尋結果
  renderMovieList(getMoviesByPage(1))
})

paginator.addEventListener('click', function (event) {
  if (event.target.tagName !== 'A') return

  const page = Number(event.target.dataset.page)
  renderMovieList(getMoviesByPage(page))
})



axios.get(INDEX_URL)
  .then((response) => {
    for (const movie of response.data.results) {
      movies.push(movie)
      renderPaginator(movies.length)
      renderMovieList(getMoviesByPage(1))
    }
  }).catch(function (error) {
    console.log(error)
  })

// 讓每個函式只做一件事情，且參數不要用變數代入，否則此函式只能用於此變數
function renderMovieList(data) {
  // 需要 image, title
  let rawHTml = ``
  // 讓data中的每個物件，做以下動作
  data.forEach((item) => {
    // Render Movie List
    rawHTml += `
      <div class="col-sm-3">
        <div class="mb-2">
          <div class="card">
            <img
              src="${POSTER_URL + item.image}"
              class="card-img-top" alt="Movie Poster" />
            <div class="card-body">
              <h5 class="card-title">${item.title}</h5>
            </div>
            <div class="card-footer">
              <button class="btn btn-primary btn-show-movie" data-toggle="modal"
                data-target="#movie-modal" data-id="${item.id}">More</button>
              <button class=" btn btn-info btn-add-favorite" data-id='${item.id}'>+</button>
            </div>
     
            <div class="modal fade" id="movie-modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
              aria-hidden="true">
              <div class="modal-dialog modal-lg">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="movie-modal-title">Modal title</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                  <div class="modal-body" id="movie-modal-body">
                    <div class='row'>
                      <div class='col-sm-8' id="movie-modal-image">
                        <img src="https://github.com/ALPHACamp/movie-list-api/blob/master/public/posters/c9XxwwhPHdaImA2f1WEfEsbhaFB.jpg?raw=true" alt="movie-poster" class="img-fluid">
                      </div>
                      <div class="col-sm-4">
                        <p><em id="movie-modal-date">release date: 2020/01/05</em></p>
                        <p id="movie-modal-description">This is a movie.</p>
                      </div>
                    </div>
                  </div>  
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  })
  dataPanel.innerHTML = rawHTml
}

function showMovieModal(id) {
  const modalTitle = document.querySelector('#movie-modal-title')
  const modalImage = document.querySelector('#movie-modal-image')
  const modalDate = document.querySelector('#movie-modal-date')
  const modalDescription = document.querySelector('#movie-modal-description')
  // get 拿到的是整體的網址加上要列出詳細資料，需要補上的id參數
  axios.get(INDEX_URL + id).then((response) => {
    const data = response.data.results
    modalTitle.innerText = data.title
    modalDate.innerText = 'Release date: ' + data.release_date
    modalDescription.innerText = data.description
    modalImage.innerHTML = `<img src="${POSTER_URL + data.image
      }" alt="movie-poster" class="img-fluid">`
  })
}

// 此函式的目的為：取得每個頁面應該渲染的電影清單
function getMoviesByPage(page) {
  // 建立一個開始的電影索引，尋求 0-11, 12-23, 24-35的規律
  // 根據頁面的數字不同，開始跟結尾的值會不一樣，因此設計變數
  const data = filteredMovies.length ? filteredMovies : movies
  const startIndex = (page - 1) * MOVIES_PER_PAGE
  return data.slice(startIndex, startIndex + MOVIES_PER_PAGE)
}

// 計算需要多少的頁面，並將其渲染到螢幕上
function renderPaginator(amount) {
  // 計算總共的頁面
  const numberOfPages = Math.ceil(amount / MOVIES_PER_PAGE)
  // 渲染頁面
  let rawHTml = ``
  for (let page = 1; page <= numberOfPages; page++) {
    rawHTml += `<li class="page-item"><a class="page-link" href="#" data-page='${page}'>${page}</a></li>`
  }
  paginator.innerHTML = rawHTml
}