// index.js
// создание свойства класса без конструктора

import './styles/style.scss'
import { createNode } from './createNode'

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
heading.innerHTML = 'Как интересно!'

// добавляем параграф и заголовок в DOM
const root = document.querySelector('#root')
root.append(heading, p, p2)

root.addEventListener('pointerover', function(e) {
  console.log(e.currentTarget, this);
  if (e.currentTarget !== this) return
  this.classList.remove('bg-dark')
})

const btn = document.querySelector('.btn-click')
btn.addEventListener('click', function () {
  root.classList.toggle('bg-dark')
})


// TODO спросить про полифил с появлением файла