// a model for how a post looks like in our application

export interface Post {
  id: string;
  date: Date;
  title: string;
  content: string;
  mood: string;
  creator: string;
}
