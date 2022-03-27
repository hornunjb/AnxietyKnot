import { EventEmitter, Injectable } from '@angular/core';
import { journalDisplay } from './journalDisplay.model';

@Injectable({
  providedIn: 'root'
})
export class TrackerService {

  private moods: number[] = [];
  private sad: number = 0;
  private somewhatSad: number = 0;
  private okay: number = 0;
  private somewhatGood: number = 0;
  private good: number = 0;
  private talliedMoods: number[];



  constructor() { }

  addMoods(moods) {
    this.moods = moods;
  }

  getMoods() {
    return this.moods;
  }

  getMoodsTallied() {
    this.sad = 0;
    this.somewhatSad = 0;
    this.okay = 0;
    this.somewhatGood = 0;
    this.good = 0;
    for(var i = 0; i < this.moods.length; i++) {
      switch(this.moods[i]) {
        case 1: {
          this.sad++;
          break;
        }
        case 2: {
          this.somewhatSad++;
          break;
        }
        case 3: {
          this.okay++;
          break
        }
        case 4: {
          this.somewhatGood++;
          break
        }
        case 5: {
          this.good++;
          break
        }
      }
    }
    return [this.sad, this.somewhatSad, this.okay, this.somewhatGood, this.good];
  }
}
