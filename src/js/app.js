import { genarateId, generatePhrase } from "./utils/helper";
import {deleteNote ,addNote} from "./utils/api";
import quotes from "../notes.json";
console.log(quotes);

export default class App {
  constructor() {

    this._notes = [];
    this.refs = {};
    this.refs.todoElement;
    this.refs.noteList = document.querySelector(".main__card-todo");
    this.refs.start = document.querySelector(`.main__card__start`);
    this.refs.inprogress = document.querySelector(`.main__card__progress`);
    this.refs.completed = document.querySelector(`.main__card__completed`);
    this.refs.afor = document.querySelector('.afor')
    this.refs.circle = document.querySelector('.circleHover')
    this.refs.text = document.querySelector('.text')
    this.refs.circle2 = document.querySelector('.circle2')
    this.refs.autor = document.querySelector('.autor')
    this.refs.ball8 = document.querySelector('.ball8')



    this.renderNodesList = this.renderNodesList.bind(this);

    this.dragAndDrop = this.dragAndDrop.bind(this);
    this.dragStart = this.dragStart.bind(this);
    this.dragEnd = this.dragEnd.bind(this);
    this.dragOver = this.dragOver.bind(this);
    this.dragEnter = this.dragEnter.bind(this);
    this.dragLeave = this.dragLeave.bind(this);
    this.dragDrop = this.dragDrop.bind(this);
    this.taskComplited = this.taskComplited.bind(this);
  }

  get notes(){
  return this._notes;
  }
  set notes(notes){
    this._notes = notes;
  }

  addTodo(obj) {
    this._notes.push(obj);
    addNote(this._notes);
  }

  deleteTodo(id) {
    deleteNote(id);
    this.renderNodesList();
  }

  editTodo() {}

  createNoteContent({ title, body, id }) {
    const div = document.createElement("DIV");
    const h2 = document.createElement("H2");
    const p = document.createElement("P");
    div.className = "main__card-todo";
    div.setAttribute('draggable', 'true');
    div.setAttribute('data-id', `${id}`);
    h2.textContent = title;
    h2.className = "main__card-title";
    p.className = "main__card-body";
    p.textContent = body;
    div.appendChild(h2);
    div.appendChild(p);

    return div;
  }

  renderNodesList() {
    this._notes.forEach(el => {
      if (el.inProgress) {
        this.refs.inprogress.append(this.createNoteContent(el));
      } else if (el.complted) {
        this.refs.completed.append(this.createNoteContent(el));
      } else {
        this.refs.start.append(this.createNoteContent(el));
      }
    });
    this.refs.allNotes = [...document.querySelectorAll('.main__card-todo')];
    this.refs.notesContainer = [...document.querySelectorAll('.main__card')];
    this.refs.allNotes.forEach(note => {
      note.addEventListener('dragstart', this.dragStart);
      note.addEventListener('dragend', this.dragEnd);
    });
    this.refs.notesContainer.forEach(el => {
      console.log(el);
        el.addEventListener('mousedown', this.dragAndDrop);
        el.addEventListener('dragover', this.dragOver);
        el.addEventListener('dragenter', this.dragEnter);
        el.addEventListener('dragleave', this.dragLeave);
        el.addEventListener('drop', this.dragDrop);
    });
  }

  dragAndDrop(e) {
    e.stopPropagation();
    let target = e.target.closest('.main__card-todo');

    this.refs.todoElement = target;
  }

  dragStart(e) {
      setTimeout(() => (e.target.classList.toggle('invisible'), 0));
  }

  dragEnd(e) {
      e.target.classList.remove('invisible');
  }

  dragOver(e) {
      e.preventDefault();
  }

  dragEnter(e) {
      e.preventDefault();
      e.target.classList.toggle('hovered');
  }

  dragLeave(e) {
      e.target.classList.remove('hovered');
  }

  dragDrop(e) {
    let target = e.target.closest('.main__card');

    target.append(this.refs.todoElement);

    if (target.classList.contains('main__card__start')) {
      let curentElementId = Number(this.refs.todoElement.dataset.id);
      this._notes.forEach(el => {
        if (curentElementId === el.id) {
            el.inProgress = false;
            el.complted = false;
          }
        }
      );
      addNote(this._notes);
    } else if (target.classList.contains('main__card__progress')) {
      let curentElementId = Number(this.refs.todoElement.dataset.id);
      this._notes.forEach(el => {
        if (curentElementId === el.id) {
            el.inProgress = true;
            el.complted = false;
          }
      }
    );
      addNote(this._notes);
    } else if (target.classList.contains('main__card__completed')) {
      let curentElementId = Number(this.refs.todoElement.dataset.id);
      this._notes.forEach(el => {
        if (curentElementId === el.id) {
            el.inProgress = false;
            el.complted = true;
          }
      }
    );
      addNote(this._notes);
      setTimeout(() => this.taskComplited(), 1000)
      
    }
  }

  // _________________________8BALL____________
  taskComplited() {
    this.refs.ball8.classList.add('active');
    const quote = quotes[generatePhrase(99) + ''];

    console.log('quote', quote);
    
    const changePhrase = () => {
        this.refs.afor.innerHTML = quote.quoteText;
        if(quote.quoteAuthor !== ''){
        this.refs.autor.innerHTML = '- ' + quote.quoteAuthor + ' -';
        } 
    }
    
    setTimeout(() => {
        this.refs.circle.classList.add('circle')
        this.refs.circle.classList.remove('circleHover')
        
    },1600)
    
    setTimeout(() => {
        
        this.refs.circle2.classList.add('circle2Hover')
        
    },1000)
    
    
    
    
    setTimeout(() => {
      changePhrase();
        this.refs.text.classList.add('textHover')
    },3200)
    
    // text.addEventListener('click', changePhrase)
    setTimeout(() => {
      this.refs.ball8.classList.remove('active');
      this.refs.circle.classList.add('circleHover');
      this.refs.circle2.classList.remove('circle2Hover');
      this.refs.text.classList.remove('textHover');
      this.refs.afor.innerHTML = "";
      this.refs.autor.innerHTML = "";
    }, 9000);
  }




}

