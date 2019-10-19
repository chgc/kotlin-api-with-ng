import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Todo {
  id: number;
  item: string;
  editItem?: string;
  isCompleted: boolean;
  isEdit: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}

  addTodo(todo) {
    return this.http.post('', todo);
  }

  updateTodo(todo) {
    return this.http.put('', todo);
  }

  deleteTodo(todo) {
    return this.http.delete('');
  }

  queryTodos() {
    return this.http.get('');
  }
}
