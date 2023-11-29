import {Component, EventEmitter, Input, Output} from '@angular/core';
import {APIService} from "../../../../shared/services/api.service";
import {MatDatepickerInputEvent} from "@angular/material/datepicker";

@Component({
  selector: 'app-filters-container',
  templateUrl: './filters-container.component.html',
  styleUrls: ['./filters-container.component.scss']
})


export class FiltersContainerComponent {
  constructor(private api: APIService) {}
  csHover: any;
  extCsHover: any;
  extCs: any;
  css: any;
  selectedCs: any[] = [];
  selectedExtCs: any[] = [];
  abroad: boolean = false;

  @Input() params: any;
  @Input() checkFilters: Function = () => {};
  @Input() proposals: any;
  @Output() newProposals: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit(): void {
    this.api.getExternalCoSupervisors().then((coSupervisors) => {
      console.log(coSupervisors)
      this.extCs = coSupervisors;
    })
    this.api.getCoSupervisors().then((coSupervisors) => {
      console.log(coSupervisors)
      this.css = coSupervisors;
    })
  }

  ngOnChanges(changes: any) {
    if(changes['params'] !== undefined) {
      let newParams = changes['params']
      this.params = newParams.currentValue
      console.log(`PARAMS: ${JSON.stringify(newParams.currentValue)}`)
      if(newParams.currentValue.cosupervisors !== null) {
        this.selectedCs = newParams.currentValue.cosupervisors
      }
      else {
        this.selectedCs = []
      }
      if(newParams.currentValue.extCs !== null) {
        this.selectedExtCs = newParams.currentValue.extCs
      }
      else {
        this.selectedExtCs = []
      }
      this.selectedDate = newParams.currentValue.expirationDate
    }
    if(changes['selectedDate'] !== undefined) {
      let newDate = changes['selectedDate']
      this.selectedDate = newDate.currentValue
    }
  }

  toggleCs(cs: any) {
    if (this.selectedCs.includes(cs)) {
      this.selectedCs = this.selectedCs.filter((c) => c !== cs)
    }
    else {
      this.selectedCs.push(cs)
    }
    if(this.selectedCs.length > 0 || this.selectedExtCs.length > 0) {
      this.params.cosupervisors = [...this.selectedCs, ...this.selectedExtCs]
    }
    else {
      this.params.cosupervisors = null
    }
    // this.checkFilters()
    this.updateProposals()
  }

  toggleExtCs(cs: any) {
    console.log(cs)
    if (this.selectedExtCs.includes(cs)) {
      this.selectedExtCs = this.selectedExtCs.filter((c) => c !== cs)
    }
    else {
      this.selectedExtCs.push(cs)
    }
    if(this.selectedCs.length > 0 || this.selectedExtCs.length > 0) {
      this.params.cosupervisors = [...this.selectedCs, ...this.selectedExtCs]
    }
    else {
      this.params.cosupervisors = null
    }
    // this.checkFilters()
    this.updateProposals()
  }

  updateProposals() {
    this.api.getAllProposals(this.params).then((res)=>{
      console.log(res)
      this.proposals = res
      this.newProposals.emit(this.proposals)
    }).catch((err)=>{
      console.log(err)
    })
  }

  selectedDate: any = null;
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
