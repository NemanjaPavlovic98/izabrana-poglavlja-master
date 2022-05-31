import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  
  private API_URL = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getAllExercises(): Observable<any> {
    return this.http.get(`${this.API_URL}/exercise`);
  }

  getSingleExercises(id: number): Observable<any> {
    return this.http.get(`${this.API_URL}/exercise/single/${id}`);
  }

  getAllMuscles(): Observable<any> {
    return this.http.get(`${this.API_URL}/muscles`);
  }

  getSingleMuscles(id): Observable<any> {
    return this.http.get(`${this.API_URL}/muscles/${id}`);
  }

  saveExercise(exerciseData) {
    return this.http.post(`${this.API_URL}/exercise/create`, exerciseData);
  }

  updateExercise(exerciseData) {
    return this.http.post(`${this.API_URL}/exercise/update`, exerciseData);
  }

  deleteExercise(id: number) {
    return this.http.delete(`${this.API_URL}/exercise/delete/${id}`);
  }
}
