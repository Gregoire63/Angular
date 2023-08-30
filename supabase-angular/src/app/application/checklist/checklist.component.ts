import { Component, OnInit } from '@angular/core';
import { SupabaseService, Check } from '../../services/supabase.service'
import {AbstractControl, FormBuilder,FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {JsonPipe, NgFor } from '@angular/common';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { CustomDatePipe } from '../../pipe/date.pipe'
import { UpdatedAtDirective } from 'src/app/directive/updated-at.directive';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.css'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatCheckboxModule, JsonPipe, NgFor, CustomDatePipe, UpdatedAtDirective],
})
export class ChecklistComponent implements OnInit {
  changes$!: Observable<any>;
  loading: Boolean = false;
  listItemsForm: FormGroup;
  defaultItems: { name: string, checked: boolean, updated_at: Date }[] = [];
  newCheckName: string = '';
  itemsWithControls: { item: any, control: AbstractControl }[] = [];


  constructor(
    private _formBuilder: FormBuilder,
    private supabaseService: SupabaseService
  ) {
    this.listItemsForm = this._formBuilder.group({});
    this.changes$ = new Observable((observer) => {
      this.listItemsForm.valueChanges.subscribe((value) => {
        observer.next(value);
      });
    });
  }
  getChecklist(){
    this.loading = true
    this.supabaseService.getItems().then(
      (items) => {
        items.forEach((item) => {
          // Créez un groupe de contrôles pour chaque item
          const itemGroup = this._formBuilder.group(item);
          // Ajoutez le groupe de contrôles au formulaire avec le nom de l'item
          this.listItemsForm.addControl(item.name, itemGroup);
        });
        this.defaultItems = items;
        this.loading = false
      },
      (error) => {
        console.error('Error fetching items:', error);
        this.loading = false
      }
    );
  }
  ngOnInit() {  
    this.getChecklist()
    this.changes$.subscribe((formValue) => {
      if(!this.loading)
      Object.keys(formValue).forEach((controlName) => {
        if (this.listItemsForm.get(controlName)?.dirty) {
          this.addCheck(this.defaultItems.find(r=>r.name==controlName))
        }
      });
    });
  }
  async addCheck(check?:Check){
    let dataToSend = {
      ...check,
      checked: !check?.checked,
      updated_at: new Date()
    }
    if(!check){
      if (this.newCheckName.trim() == '') return
      dataToSend.name= this.newCheckName,
      dataToSend.created_at = new Date()
      dataToSend.checked = false
    }
    await this.supabaseService.updateCheckList(dataToSend as Check)
    this.newCheckName= ''
    this.getChecklist()
  }
}
