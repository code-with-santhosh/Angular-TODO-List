import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ITask } from '../shared/model/task';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  todoForm!: FormGroup;
  taskList: ITask[] = [];
  inprogressList: ITask[] = [];
  completedList: ITask[] = [];
  updateIndex: any;
  isEditEnabled: boolean = false;
  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.todoForm = this.fb.group({
      task: ['', Validators.required],
    });
    this.loadDemoData();
  }
  addTask() {
    this.taskList.push({
      task: this.todoForm.value.task,
      isCompleted: false,
    });
    this.todoForm.reset();
  }

  updateTask() {
    this.taskList[this.updateIndex].task = this.todoForm.value.task;
    this.taskList[this.updateIndex].isCompleted = false;
    this.todoForm.reset();
    this.updateIndex = undefined;
    this.isEditEnabled = false;
  }

  onDeleteTask(i: number, type: string) {
    if (type === 'todo') {
      this.taskList.splice(i, 1);
    } else if (type === 'inprogress') {
      this.inprogressList.splice(i, 1);
    } else if (type === 'completed') {
      this.completedList.splice(i, 1);
    }
  }
  onEdit(item: ITask, i: any) {
    this.todoForm.controls['task'].setValue(item.task);
    this.updateIndex = i;
    this.isEditEnabled = true;
  }
  drop(event: CdkDragDrop<ITask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  loadDemoData() {
    this.taskList = [
      { task: 'Buy groceries', isCompleted: false },
      { task: 'Schedule doctor appointment', isCompleted: false },
      { task: 'Finish reading book', isCompleted: false },
      { task: 'Plan weekend trip', isCompleted: false },
      { task: 'Clean the house', isCompleted: false },
    ];

    this.inprogressList = [
      { task: 'Write blog post', isCompleted: false },
      { task: 'Organize photo album', isCompleted: false },
    ];
    this.completedList = [
      { task: 'Pay electricity bill', isCompleted: true },
      { task: 'Submit project report', isCompleted: true },
      { task: 'Call mom', isCompleted: true },
    ];
  }
}
