//Custom interface to make working with array of prompted journals easier


export interface PromptedEntry {

  id: number;
  title: string;
  what_happened: string;
  going_through_mind: string;
  emotion1: string;
  intensity1: Array<number>;
  emotion2: string;
  intensity2: Array<number>;

  thought_patterns: Array<boolean>;
  custom_thought_patterns: string;
  thinking_differently: string;
  }
