import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ApiService, Todo } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  todos: Todo[] = [];
  newTodoControl = new FormControl('', Validators.required);
  editTodoControl = new FormControl();

  constructor(private api: ApiService) {}

  addTodo() {
    if (this.newTodoControl.invalid) return;
    const maxId =
      this.todos
        .map(x => x.id)
        .sort()
        .pop() || 0;

    this.todos.push({
      id: maxId + 1,
      item: this.newTodoControl.value,
      isCompleted: false,
      isEdit: false
    });
    this.newTodoControl.reset('');
  }

  markAllComplete(event) {
    this.todos = this.todos.map(x => {
      x.isCompleted = event.target.checked;
      return x;
    });
  }

  editTodo(todo) {
    todo.isEdit = true;
    todo.editItem = todo.item;
  }

  updateTodo(todo) {
    if (todo.editItem.length == 0) {
      this.deleteTodo(todo);
      return;
    }
    todo.item = todo.editItem;
    todo.editItem = '';
    todo.isEdit = false;
  }

  deleteTodo(todo) {
    const idx = this.todos.findIndex(x => x.id == todo.id);
    this.todos.splice(idx, 1);
  }

  get leftItems() {
    return this.todos.filter(x => !x.isCompleted).length;
  }
}
