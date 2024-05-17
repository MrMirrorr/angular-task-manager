export interface ITask {
  title: string;
  description: string;
  id: string;
  complete: boolean;
}

export interface INewTask extends Omit<ITask, 'id'> {}
