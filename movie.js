const API_KEY = '9014454ca86b5731edc2041f83621f40';

const questions = [
  {
    text: 'What genre are you looking for?',
    options: ['Comedy', 'Action', 'Romance', 'Animation', 'Thriller', "Doesn't Matter"],
  },
  {
    text: 'What language do you want the movie to be in?',
    options: ['English', 'Korean', 'Japanese', 'French', 'Mandarin', "Doesn't Matter"],
  },
  {
    text: 'What year do you want the movie to be made?',
    options: ['Before 80s', '90s', '2000s', '2010s', '2020s', "Doesn't Matter"],
  },
];

let currentQuestion = 0;
let answers = [];

const quizOptionsElement = document.getElementById('quiz-options');
const restartButton = document.createElement('button');
restartButton.classList.add('option-btn');
restartButton.textContent = 'Restart';
restartButton.addEventListener('click', () => start());
quizOptionsElement.appendChild(restartButton);

const backButton = document.createElement('button');
backButton.classList.add('option-btn');
backButton.textContent = 'Back';
backButton.addEventListener('click', () => goBack());
quizOptionsElement.appendChild(backButton);

const movieResult = document.getElementById('movieResult');
const movieInfo = document.getElementById('movieInfo');
const moviePoster = document.getElementById('moviePoster');

function start() {
  answers = [];
  currentQuestion = 0;
  refreshScreen();
  backButton.style.display = "none";

  displayQuestion();
}

function goBack() {
  currentQuestion--;
  let temp_answers = answers.slice(0, currentQuestion);
  answers = temp_answers;
  refreshScreen();
  displayQuestion();
}

function refreshScreen() {
  document.getElementById('noResult').textContent = '';
  movieInfo.innerHTML = '';
  moviePoster.innerHTML = '';
  movieResult.style.display = 'none';
}

function displayQuestion() {
  const questionTextElement = document.getElementById('question-text');
  const optionsContainer = document.getElementById('options-container');
  const currentQuestionObj = questions[currentQuestion];

  questionTextElement.textContent = currentQuestionObj.text;

  optionsContainer.innerHTML = '';
  currentQuestionObj.options.forEach((option) => {
    const button = document.createElement('button');
    button.classList.add('option-btn');
    button.textContent = option;
    button.addEventListener('click', () => selectOption(option));
    optionsContainer.appendChild(button);
  });

  if (currentQuestion === 1) {
    backButton.style.display = 'inline';
  }
  else if (currentQuestion === 0) {
    backButton.style.display = 'none';

  }

};

function selectOption(option) {
  if (currentQuestion < questions.length - 1) {
    answers.push(option);
    currentQuestion++;
    displayQuestion();
  } else {
    answers[2] = option;
    document.getElementById('noResult').textContent = '';
    pickMovie();
  }
};

function genrePicker(genre) {
  if (genre === "Doesn't Matter") {
    return 0;
  }

  let genreIds = [35, 28, 10749, 16, 53];
  let index = questions[0].options.indexOf(genre);
  let genrePick = genreIds[index]

  return genrePick;
};

function languagePicker(language) {
  if (language === "Doesn't Matter") {
    return 0;
  }

  let languageIds = ['en', 'ko', 'ja', 'fr', 'zh'];
  let index = questions[1].options.indexOf(language);
  let languagePick = languageIds[index]

  return languagePick;
};

function pickRandomMovie(movies) {
  const randomIndex = Math.floor(Math.random() * movies.length);
  return movies[randomIndex];
};

function pickSorting() {
  let sortings = ['vote_average.desc', 'primary_release_date.desc', 'primary_release_date.asc', 'vote_average.asc', 'vote_count.desc', 'revenue.desc'];
  const randomIndex = Math.floor(Math.random() * sortings.length);
  return sortings[randomIndex];
};

async function pickMovie() {


  const genre = genrePicker(answers[0]);
  const language = languagePicker(answers[1]);
  const sorting = pickSorting();

  let url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=${sorting}&include_adult=false&include_video=false&vote_average.gte=7&vote_count.gte=50`;

  if (genre !== 0) {
    url += `&with_genres=${genre}`;
  }

  if (language !== 0) {
    url += `&with_original_language=${language}`;
  }

  if (answers[2] === 'Before 80s') {
    url += `&primary_release_date.lte=1980`;
  } else if (answers[2] === '90s') {
    url += `&primary_release_date.gte=1990&primary_release_date.lte=2000`;
  } else if (answers[2] === '2000s') {
    url += `&primary_release_date.gte=2000&primary_release_date.lte=2010`;
  } else if (answers[2] === '2010s') {
    url += `&primary_release_date.gte=2010&primary_release_date.lte=2020`;
  } else if (answers[2] === '2020s') {
    url += `&primary_release_date.gte=2020`;
  }

  let data = await movieListPage(url, 1);
  let movies;

  if (data.total_pages > 1) {
    let newMovies = await movieListPage(url, data.total_pages);
    movies = newMovies.results;
  } else {
    movies = data.results;
  }

  movieResult.style.display = 'block';

  if (movies.length > 0) {
      const randomMovie = pickRandomMovie(movies);
      const movieId = randomMovie.id;
      const movieDetails = await findMovieDetails(movieId);
      displayMovie(movieDetails);
  }
  else {
      document.getElementById('noResult').textContent = 'No movies found for this criteria, please pick another!';
      document.getElementById('movieInfo').textContent = '';
      document.getElementById('moviePoster').textContent = '';
  }
};

async function movieListPage(url, totalPages) {
  if (totalPages !== 1) {
    randomPage = Math.floor(Math.random() * totalPages);
    url += `&page=${randomPage}`;
  }

  const response = await fetch(url);
  const data = await response.json();
  return data;
}

async function findMovieDetails(movieId) {
  let url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`;
  const response = await fetch(url);
  const movieDetails = await response.json();
  return movieDetails;
};



function detailExpander(movieDetails) {
  let details = [];

  movieDetails.forEach(detail => {
    let input = (detail.genre !== undefined) ? detail.genre : detail.name;
    details.push(input);
  })

  return details.join(', ');
}

function timeConverter(minutes) {
  let hours = 0;

  while (minutes >= 60) {
    minutes -= 60;
    hours++;
  }

  return `${hours}h ${minutes}m`
}

function displayMovie(movie) {
  movieInfo.innerHTML = `
  <h1>${movie.title}</h1>
  <h3>${movie.tagline}</h3>
  <table class="table table-striped">
      <tr>
          <th scope="row">Release Date</th>
          <td>${movie.release_date}</td>
      </tr>
      <tr>
          <th scope="row">Runtime</th>
          <td>${timeConverter(movie.runtime)}</td>
      </tr>
      <tr>
          <th scope="row">Production Countries</th>
          <td>${detailExpander(movie.production_countries)}</td>
      </tr>
      <tr>
          <th scope="row">Genres</th>
          <td>${detailExpander(movie.genres)}</td>
      </tr>
      <tr>
          <th scope="row">Vote Score</th>
          <td>${movie.vote_average} (${movie.vote_count})</td>
      </tr>
    </table>
  <div class="d-flex align-content-between flex-wrap" id="overview">
    <p>${movie.overview}</p>
  </div>
  `;

  moviePoster.innerHTML = `
  <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="img-fluid" alt="Movie Poster" />
  `;

  const rerollButton = document.createElement('button');
  rerollButton.classList.add('option-btn');
  rerollButton.textContent = 'Next option!';
  rerollButton.addEventListener('click', () => pickMovie())
  movieInfo.appendChild(rerollButton);
};

    // const backButton = document.createElement('button');
// backButton.classList.add('option-btn');
// backButton.textContent = 'Back';
// backButton.addEventListener('click', () => goBack());
// quizOptionsElement.appendChild(backButton);


start();
