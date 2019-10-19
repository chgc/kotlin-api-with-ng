import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ApiService, Todo } from './api.service';
import { mergeMap, tap } from 'rxjs/operators';

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

  ngOnInit() {
    this.loadTodos().subscribe();
  }

  addTodo() {
    if (this.newTodoControl.invalid) return;

    this.api
      .addTodo({
        id: 0,
        item: this.newTodoControl.value,
        isCompleted: false,
        isEdit: false
      })
      .pipe(mergeMap(() => this.loadTodos()))
      .subscribe({
        next: () => this.newTodoControl.reset('')
      });
  }

  loadTodos() {
    return this.api.queryTodos().pipe(tap(todos => (this.todos = todos)));
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

    this.api
      .updateTodo(todo)
      .pipe(mergeMap(() => this.loadTodos()))
      .subscribe({
        next: () => this.newTodoControl.reset('')
      });
  }

  deleteTodo(todo) {
    this.api
      .deleteTodo(todo)
      .pipe(mergeMap(() => this.loadTodos()))
      .subscribe({
        next: () => this.newTodoControl.reset('')
      });
  }

  get leftItems() {
    return this.todos.filter(x => !x.isCompleted).length;
  }
}
