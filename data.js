// const searchButton = document.querySelector('.search-button')
// searchButton.addEventListener('click', function(){
//     const inputKeyword = document.querySelector('.input-keyword')
//     fetch('http://www.omdbapi.com/?apikey=69247038&s=' + inputKeyword.value)
//         .then(response => response.json())
//         .then(response => {
//             movies = response.Search
//             let cards = ''
//             movies.forEach(m => cards += showCards(m))
//             const movieContainer = document.querySelector('.container-movies')
//             movieContainer.innerHTML = cards

//         })

//              // Button Swow Detail
//              const detailButton = document.querySelectorAll('.modal-detail-button')
//              detailButton.forEach(btn => {
//                  btn.addEventListener('click', function(){
                    
//                     const imdbid = this.dataset.imdbid
//                     console.log(imdbid)
//                     fetch('http://www.omdbapi.com/?apikey=69247038&i=' + imdbid)
//                     .then(response => response.json())
//                     .then(m => {
//                         const movieDetail = showMovieDetails(m)
//                         const modalBody = document.querySelector('.modal-body')
//                         modalBody.innerHTML = movieDetail
//                     })
//                  })
//              })

// })


// Search Movie
const searchButton = document.querySelector('.search-button')
searchButton.addEventListener('click',async function(){
    const inputKeyword = document.querySelector('.input-keyword')
    const movies = await getMovies(inputKeyword.value)
    updateUI(movies);
    
})
// event binding | show detail
document.addEventListener('click', async function(e){
    if( e.target.classList.contains('modal-detail-button')){
        const imdbid = e.target.dataset.imdbid;
        const movieDetail = await getMovieDetail(imdbid)
        updateUIDetail(movieDetail)
    }
})


function getMovies(keyword){
    return fetch('http://www.omdbapi.com/?apikey=69247038&s=' + keyword)
        .then(response => response.json())
        .then(response => response.Search);
}


function getMovieDetail(imdbid){
    return fetch('http://www.omdbapi.com/?apikey=69247038&i=' + imdbid)
            .then(response => response.json())
            .then(m => m);
}



function updateUI(movies){
    let cards = '';
    movies.forEach(m => cards += showCards(m));
    const movieContainer = document.querySelector('.container-movies');
    movieContainer.innerHTML = cards;
}




function updateUIDetail(m){
    const movieDetail = showMovieDetails(m)
    const modalBody = document.querySelector('.modal-body')
    modalBody.innerHTML = movieDetail
}

function showCards(m){
    return `<div class="col-md-4 my-3">
                <div class="card">
                    <img src="${m.Poster}" class="card-img-top">
                    <div class="card-body">
                    <h5 class="card-title">${m.Title}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
                    <a href="#" class="btn btn-primary modal-detail-button" data-imdbid= "${m.imdbID}" data-toggle="modal" data-target="#detailMovieModal">Show Detail</a>
                    </div>
                </div>
             </div>`
}

function showMovieDetails(m){
    return `<div class="container-fluid">
               <div class="row">
                   <div class="col-md3">
                       <div class="row">
                           <img src="${m.Poster}" class="img-fluid">
                       </div>
                   </div>
                   <div class="col-md">
                       <ul class="list-group">
                           <li class="list-group-item"><h4>${m.Title} (${m.Year})</h4></li>
                           <li class="list-group-item"><strong>Director: </strong>${m.Director}</li>
                           <li class="list-group-item"><strong>Writer: </strong>${m.Writer}</li>
                           <li class="list-group-item"><strong>Actors: </strong>${m.Actors}</li>
                           <li class="list-group-item"><h4>Plot: </h4>${m.Plot}</li>
                           <li class="list-group-item"><h4>Awards: </h4>${m.Awards}</li>
                         </ul>
                   </div>
               </div>
             </div>`
  
}