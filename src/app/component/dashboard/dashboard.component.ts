import { Component, OnInit, ViewChild } from '@angular/core';
import { Task } from 'src/app/model/task';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  taskObj : Task = new Task();
  taskArr : Task[] = [];

  addTaskValue : string = '';
  startTime:any = '';
  EndTime:any = '';
  editTaskValue : string = '';
  editstartTime : string = '';
  editEndTime: string = '';
  subtractMinute:any=[]
  subtractMinute2:any=[]
  // @ViewChild('toggleTimepicker')
  constructor(private crudService : CrudService) { }

  ngOnInit(): void {
    this.editTaskValue = '';
    this.editstartTime = '';
    this.editEndTime = '';
    this.addTaskValue = '';
    this.startTime = '';
     this.EndTime = '';
    this.taskObj = new Task();
    this.taskArr = [];
    this.getAllTask();
    this.getValue()
  }
  getAllTask() {
    this.crudService.getAllTask().subscribe(res => {
      this.taskArr = res;
      for(let i=0;i< this.taskArr.length;i++){
        debugger
        this.subtractMinute.push(parseInt(this.taskArr[i].startTime))
        this.subtractMinute2.push(this.taskArr[i].endTime)
       
      }
     
    }, err => {
      alert("Unable to get list of tasks");
    });
  }

  addTask() {
    this.taskObj.task_name = this.addTaskValue;
    this.taskObj.startTime = this.startTime;
    this.taskObj.endTime = this.EndTime;
    this.crudService.addTask(this.taskObj).subscribe(res => {
      this.ngOnInit();
      this.addTaskValue = '';
      this.startTime = '';
      this.EndTime = '';
    }, err => {
      alert(err);
    })
  }

  editTask() {
    this.taskObj.task_name = this.editTaskValue;
    this.taskObj.startTime = this.editstartTime
    this.taskObj.endTime = this.editEndTime
    this.crudService.editTask(this.taskObj).subscribe(res => {
      this.ngOnInit();
    }, err=> {
      alert("Failed to update task");
    })
  }

  deleteTask(etask : Task) {
    this.crudService.deleteTask(etask).subscribe(res => {
      this.ngOnInit();
    }, err=> {
      alert("Failed to delete task");
    });
  }

  call(etask : Task) {
    this.taskObj = etask;
    this.editTaskValue = etask.task_name;
    this.editstartTime = etask.startTime;
    this.editEndTime = etask.endTime
  }

getValue(){
  var sub1=Number(this.subtractMinute2)
  var sub2=Number(this.subtractMinute)
console.log(sub2)
}
}
