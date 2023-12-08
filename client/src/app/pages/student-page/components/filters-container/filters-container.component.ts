import {Component, EventEmitter, Input, Output} from '@angular/core';
import {APIService} from "../../../../shared/services/api.service";
import {MatDatepickerInputEvent} from "@angular/material/datepicker";
import * as dayjs from "dayjs";
import {FormControl} from "@angular/forms";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-filters-container',
  templateUrl: './filters-container.component.html',
  styleUrls: ['./filters-container.component.scss'],
  animations: [
    trigger('open', [
      transition(':enter', [
        style({
          height: '0',
          'padding-top': '0',
          'padding-bottom': 0
        }),
        animate(200, style({
          height: '*',
          'padding-top': '*',
          'padding-bottom': '*'
        }))
      ])
    ]),
    trigger('close', [
      transition(':leave', [
        style({
          height: '*',
          'padding-top': '*',
          'padding-bottom': '*'
        }),
        animate(200, style({
          height: '0',
          'padding-top': '0',
          'padding-bottom': '0',
        }))
      ])
    ]),
  ]
})


export class FiltersContainerComponent {
  constructor(private api: APIService) {
  }

  csHover: any;
  extCsHover: any;
  extCs: any;
  css: any;
  selectedCs: any[] = [];
  selectedExtCs: any[] = [];
  abroad: boolean = false;
  selectedDate: any = null;

  @Input() params: any;
  @Input() checkFilters: Function = () => {
  };
  @Input() proposals: any;
  @Output() newProposals: EventEmitter<any> = new EventEmitter<any>();
  @Input() showFilters: boolean = false;

  ngOnInit(): void {
    this.api.getExternalCoSupervisors().then((coSupervisors) => {
      this.extCs = coSupervisors;
    })
    this.api.getCoSupervisors().then((coSupervisors) => {
      this.css = coSupervisors;
    })
    if (this.params && this.params.cosupervisors !== null) {
      this.params.cosupervisors.forEach((cs: any) => {
        if (cs.professorId !== undefined) {
          this.selectedCs.push(cs)
        } else {
          this.selectedExtCs.push(cs)
        }
      })
    }
    else {
      this.params.cosupervisors = null;
    }
    console.log(this.params.expirationDate)
    if (this.params.expirationDate !== null) {
      this.selectedDate = new FormControl(dayjs(this.params.expirationDate).toDate())
      console.log(this.selectedDate)
    }
    this.abroad = this.params.abroad
  }

  ngOnChanges(changes: any) {
    if (changes['params'] !== undefined) {
      let newParams = changes['params']
      this.params = newParams.currentValue
      if(newParams.currentValue.cosupervisors === null){
        this.selectedCs = []
        this.selectedExtCs = []
      }
      this.abroad = this.params.abroad
    }
    if (changes['selectedDate'] === null) {
      this.selectedDate = null
    }
  }

  isThereCs(cs: any) {
    let found = false
    this.selectedCs.forEach((c) => {
      if (c.professorId === cs.professorId) {
        found = true
      }
    })
    return found
  }

  toggleCs(cs: any) {
    let found = false
    this.selectedCs.forEach((c) => {
      if (c.professorId === cs.professorId) {
        this.selectedCs.splice(this.selectedCs.indexOf(c), 1)
        found = true
      }
    })

    if (!found) {
      this.selectedCs.push(cs)
    }

    if (this.selectedCs.length > 0 || this.selectedExtCs.length > 0) {
      this.params.cosupervisors = [...this.selectedCs, ...this.selectedExtCs]
      console.log('COSUPERVISORS')
      console.log(this.params.cosupervisors)
    } else {
      this.params.cosupervisors = null
    }
    // this.checkFilters()
    this.updateProposals()
  }

  isThereExtCs(cs: any) {
    let found = false
    this.selectedExtCs.forEach((c) => {
      if (c.externalCoSupervisorId === cs.externalCoSupervisorId) {
        found = true
      }
    })
    return found
  }

  toggleExtCs(cs: any) {
    let found = false
    this.selectedExtCs.forEach((c) => {
      if (c.externalCoSupervisorId === cs.externalCoSupervisorId) {
        this.selectedExtCs.splice(this.selectedExtCs.indexOf(c), 1)
        found = true
      }
    })
    if (!found) {
      this.selectedExtCs.push(cs)
    }

    if (this.selectedCs.length > 0 || this.selectedExtCs.length > 0) {
      this.params.cosupervisors = [...this.selectedCs, ...this.selectedExtCs]
      console.log('COSUPERVISORS')
      console.log(this.params.cosupervisors)
    } else {
      this.params.cosupervisors = null
    }
    // this.checkFilters()
    this.updateProposals()
  }

  updateProposals() {
    this.api.getAllProposals(this.params).then((res) => {
      console.log(res)
      this.proposals = res
      this.newProposals.emit(this.proposals)
    }).catch((err) => {
      console.log(err)
      this.proposals = []
      this.newProposals.emit(this.proposals)
    })
  }


  deleteDate() {
    this.selectedDate = null;
    this.params.expirationDate = null;
    this.updateProposals()
  }

  selectDate(date: MatDatepickerInputEvent<any, any>) {
    this.selectedDate = date
    let year = date.value.getFullYear().toString()
    let month = date.value.getMonth() + 1 < 10 ? `0${date.value.getMonth() + 1}` : (date.value.getMonth() + 1).toString()
    let day = date.value.getDate().toString()
    this.params.expirationDate = `${year}-${month}-${day}`
    this.updateProposals()
  }

  toggleAbroad() {
    this.abroad = !this.abroad
    this.abroad ? this.params.abroad = true : this.params.abroad = null
    this.updateProposals()
  }
}
