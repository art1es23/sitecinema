/* Задания на урок:

+++ 1) Удалить все рекламные блоки со страницы (правая часть сайта)

+++ 2) Изменить жанр фильма, поменять "комедия" на "драма"

+++ 3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ],

        init: function () {
            this.deletePromo();
            this.renameGenre();
            this.changeBG();
            this.sortMovies(this.movies);
            this.addMovie();
            this.removeMovieAtList();
        },

        deletePromo: () => {

            const promoItem = document.querySelectorAll(".promo__adv img");

            promoItem.forEach(item => {
                item.remove();
            });

        },

        renameGenre: () => {
            const titleGenre = document.querySelector(".promo__genre");

            titleGenre.textContent = `Драма`;
        },

        changeBG: () => {
            const bgMovie = document.querySelector(".promo__bg");

            bgMovie.style.backgroundImage = `url('../img/bg.jpg')`;
        },

        sortMovies: function (films) {

            const listMovies = document.querySelector(".promo__interactive-list");

            listMovies.innerHTML = '';

            for (let i = 0; i < films.length; i++) {
                let arr = films.sort();

                let listMoviesItems = document.createElement("li");
                listMoviesItems.classList.add("promo__interactive-item");
                listMoviesItems.innerHTML = `${i + 1}-${arr[i]}<div class="delete"></div>`;
                listMovies.append(listMoviesItems);
            }

            document.querySelectorAll('.delete').forEach((item, i) => {
                item.addEventListener('click', () => {
                    item.parentElement.remove();
                    this.movies.splice(i, 1);
                    this.sortMovies(this.movies);
                });
            });
        },

        addMovie: function () {
            const addForm = document.querySelector('form.add');
            const inputMovie = addForm.querySelector('.adding__input');
            const checkbox = addForm.querySelector('[type="checkbox"]');
            const listMovies = document.querySelector('.promo__interactive-list');

            addForm.addEventListener('submit', (e) => {
                e.preventDefault();
                let inputValue = inputMovie.value;
                let favorite = checkbox.checked;


                if (inputValue) {
                    if (favorite) {
                        console.log('Its your favorite movie!!!');
                    }

                    if (inputValue.length > 21) {
                        console.log('more than 21');
                        inputValue = `${inputValue.substring(0, 22)}...`;
                    }
                    this.movies.push(inputValue);
                    this.sortMovies(this.movies);
                }
                e.target.reset();
            });
        },

    };

    movieDB.init();
});