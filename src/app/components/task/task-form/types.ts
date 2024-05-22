import { ITask } from 'app/models/task.model';

export type TaskMode = 'create' | 'edit';
export interface IDialogData {
  mode: TaskMode;
  task?: ITask;
}
