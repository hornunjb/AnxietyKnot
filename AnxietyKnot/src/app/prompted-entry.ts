//Custom interface to make working with array of prompted journals easier


export interface PromptedEntry {

  id: string;
  date: Date;
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
  }
