import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Todo {
  id: number;
  item: string;
  isCompleted: boolean;
  editItem?: string;
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

  queryTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>('');
  }

  batchUpdate(posts) {
    return this.http.post('', posts);
  }
}
