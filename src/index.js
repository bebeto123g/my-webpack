// index.js
// создание свойства класса без конструктора

import './style.scss'
import {createNode} from "./createNode";

class Game {
  name = 'Violin Charades'
}

const myGame = new Game()

// создаем параграф
const p = createNode('p')
p.textContent = `I like ${myGame.name.split(' ')[0]}.`

const p2 = createNode('p')
p2.textContent = `I like ${myGame.name.split(' ')[1]}.`

// создаем элемент заголовка
const heading = createNode('h1')
heading.textContent = 'Как интересно!'

// добавляем параграф и заголовок в DOM
const root = document.querySelector('#root')
root.append(heading, p, p2)