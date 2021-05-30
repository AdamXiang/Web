const BASE_URL = 'https://movie-list.alphacamp.io'
const INDEX_URL = BASE_URL + '/api/v1/movies/'
const POSTER_URL = BASE_URL + '/posters/'

const dataPanel = document.querySelector('#data-panel')
const searchForm = document.querySelector('#search-form')
const searchInput = document.querySelector('#search-input')
const movies = JSON.parse(localStorage.getItem('favoriteMovies'))


function removeFromFavorite(id) {
  if (!movies) return

  // 透過 id 來尋找要刪除的電影 index
  const movieIndex = movies.findIndex((movie) => movie.id === id)
  if (movieIndex === -1) return

  // 透過 splice 來刪除電影
  movies.splice(movieIndex, 1)

  // 存回 localStorage
  localStorage.setItem('favoriteMovies', JSON.stringify(movies))

  // 重新渲染頁面
  renderMovieList(movies)
}

dataPanel.addEventListener("click", function onPanelClicked(event) {
  if (event.target.matches('.btn-show-movie')) {
    showMovieModal(Number(event.target.dataset.id))
  } else if (event.target.matches('.btn-remove-favorite')) {
    removeFromFavorite(Number(event.target.dataset.id))
  }
})

renderMovieList(movies)

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
              <button class=" btn btn-danger btn-remove-favorite" data-id='${item.id}'>X</button>
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