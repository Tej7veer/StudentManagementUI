export interface Student {
  id: number;
  name: string;
  email: string;
  age: number;
  course: string;
  createdDate: string;
}

export interface CreateStudent {
  name: string;
  email: string;
  age: number;
  course: string;
}
