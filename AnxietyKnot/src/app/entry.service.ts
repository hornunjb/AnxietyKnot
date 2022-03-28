import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { PromptedEntry } from './prompted-entry.model';

@Injectable({providedIn: 'root'})
export class EntryService {
  private entries: PromptedEntry[] = [];
  private entriesUpdated = new Subject<PromptedEntry[]>();

  constructor(private http: HttpClient) {}

  getEntries() {
    this.http
      .get<{ message: string; entries: any}>('http://localhost:3000/api/entries')
      .pipe(
        map(entryData => {
          return entryData.entries.map(entry => {
            return {
              id: entry._id,
              date: entry.date,
              title: entry.title,
              what_happened: entry.what_happened,
              going_through_mind: entry.going_through_mind,
              emotion1: entry.emotion1,
              intensity1: entry.intensity1,
              emotion2: entry.emotion2,
              intensity2: entry.intensity2,

              thought_patterns: entry.thought_patterns,
              custom_thought_patterns: entry.custom_thought_patterns,
              thinking_differently: entry.thinking_differently,
              creator: entry.creator,
              mood: entry.mood,

            };
          });


        })
      )
      .subscribe((transformedEntries) => {
        this.entries = transformedEntries;
        this.entriesUpdated.next([...this.entries]);
      });
  }

  getEntryUpdateListener() {
    return this.entriesUpdated.asObservable();
  }

  getEntry(id: string) {
    return this.http.get<{
    _id: string;
    date: Date,
    title: string;
    what_happened: string;
    going_through_mind: string;
    emotion1: string;
    intensity1: number;
    emotion2: string;
    intensity2: number;
    thought_patterns: Array<string>;
    custom_thought_patterns: string;
    thinking_differently: string;
    creator: string;
    mood: string;
    }>("http://localhost:3000/api/entries/" + id);
  }
  /*
getEntry(id: string) {
    return {...this.entries.find(p => p.id === id)}
  }
  */


  addEntry
  ( date: Date,
    title: string,
    what_happened: string,
    going_through_mind: string,
    emotion1: string,
    intensity1: number,
    emotion2: string,
    intensity2: number,
    thought_patterns: Array<string>,
    custom_thought_patterns: string,
    thinking_differently: string,
    mood: string, )
    {
    const entry: PromptedEntry = {
      id: "",
      date: date,
      title: title,
      what_happened: what_happened,
      going_through_mind: going_through_mind,
      emotion1: emotion1,
      intensity1: intensity1,
      emotion2: emotion2,
      intensity2: intensity2,
      thought_patterns: thought_patterns,
      custom_thought_patterns: custom_thought_patterns,
      thinking_differently: thinking_differently,
      creator: null,
      mood: mood,
    };
    this.http
      .post<{ message: string, entryId: string }>(
        "http://localhost:3000/api/entries", entry
        )
      .subscribe(responseData => {
        const id = responseData.entryId;
        entry.id = id;
        this.entries.push(entry);
        this.entriesUpdated.next([...this.entries]);
      });
  }

  updateEntry(
    id: string,
    date: Date,
    title: string,
    what_happened: string,
    going_through_mind: string,
    emotion1: string,
    intensity1: number,
    emotion2: string,
    intensity2: number,
    thought_patterns: Array<string>,
    custom_thought_patterns: string,
    thinking_differently: string,
    mood: string,
  ){
    const entry: PromptedEntry = {
      id: id,
      date: date,
      title: title,
      what_happened: what_happened,
      going_through_mind: going_through_mind,
      emotion1: emotion1,
      intensity1: intensity1,
      emotion2: emotion2,
      intensity2: intensity2,
      thought_patterns: thought_patterns,
      custom_thought_patterns: custom_thought_patterns,
      thinking_differently: thinking_differently,
      creator: null,
      mood: mood,
    };
    this.http.put("http://localhost:3000/api/entries/" + id, entry)
    .subscribe(response => console.log(response)
    // NAVIGATES USER AFTER POST UPDATE
       // this.router.navigate(["/"]);
    );
  }

  deleteEntry(entryId: string) {
    this.http.delete("http://localhost:3000/api/entries/" + entryId)
      .subscribe(() => {
        const updatedEntries = this.entries.filter(entry => entry.id !== entryId);
        this.entries = updatedEntries;
        this.entriesUpdated.next([...this.entries]);
      });
  }
}


