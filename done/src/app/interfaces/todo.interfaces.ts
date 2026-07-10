export interface Todo {
  name: string;
  description: string;
  checked: boolean;
  due?: Date;
  createdAt: Date;
}

export interface TodoDoc {
  name: string;
  description: string;
  completion: boolean;
  due?: Date;
  createdAt: Date;
}
