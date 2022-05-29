import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Exercise } from '../model/exercise.model';

@Injectable()
export class TrainingService {
  private API_URL = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getAllTrainings(): Observable<any> {
    return this.http.get(`${this.API_URL}/training`);
  }

  getTrainigByUrl(id: number): Observable<any> {
    return this.http.get(`${this.API_URL}/training/${id}`);
  }

  findExercise(trainingId: number): Observable<Exercise[]> {
    return this.http.get<Exercise[]>(`${this.API_URL}/exercise/${trainingId}`);
  }

  saveTraining(trainingData) {
    const trainingFinal = new FormData();
    trainingFinal.append('naziv', trainingData.naziv);
    trainingFinal.append('jacina', trainingData.jacina);
    trainingFinal.append('opis', trainingData.opis);
    trainingFinal.append('omiljeni', trainingData.omiljeni);
    trainingFinal.append('spreman', trainingData.spreman);
    trainingFinal.append('vezbe', JSON.stringify(trainingData['vezbe']));
    if (trainingData.slika) {
      trainingFinal.append('image', trainingData.slika, trainingData.naziv);
    }
    return this.http.post(`${this.API_URL}/training/create`, trainingFinal);
  }

  updateTraining(trainingData) {
    console.log('TRAINING DATA UPDATE', trainingData);
    const trainingFinal = new FormData();
    trainingFinal.append('id', trainingData.id);
    trainingFinal.append('naziv', trainingData.naziv);
    trainingFinal.append('jacina', trainingData.jacina);
    trainingFinal.append('opis', trainingData.opis);
    trainingFinal.append('omiljeni', trainingData.omiljeni);
    trainingFinal.append('spreman', trainingData.spreman);
    trainingFinal.append('vezbe', JSON.stringify(trainingData['vezbe']));

    if (typeof trainingData.slika === 'object') {
      console.log('objekat');
      trainingFinal.append('image', trainingData.slika, trainingData.naziv);
    } else if (typeof trainingData.slika === 'string') {
      console.log('string');
      trainingFinal.append('image', trainingData.slika);
    }

    return this.http.post(`${this.API_URL}/training/update`, trainingFinal);
  }

  getAllExercises(): Observable<any> {
    return this.http.get(`${this.API_URL}/exercise`);
  }

  getExerciseForTraining(id: number) {
    return this.http.get(`${this.API_URL}/exercise/${id}`);
  }

  deleteTraining(id: number) {
    return this.http.delete(`${this.API_URL}/training/delete/${id}`);
  }
}
