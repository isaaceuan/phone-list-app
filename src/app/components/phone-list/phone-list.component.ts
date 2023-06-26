import { Component } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { phone } from './phone-list';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'phone-list',
  templateUrl: './phone-list.component.html',
  styleUrls: ['./phone-list.component.css']
})
export class PhoneListComponent {

  phones: phone[] = JSON.parse(localStorage.getItem('phones')!);
  currentPhone!: phone
  currentNumber!: string


  constructor(private modalService: NgbModal, private toastr: ToastrService) { }

  open(content: object) {

    if (this.phones?.length == 3) {
      this.toastr.warning('Solo puedes agregar máximo 3 teléfonos');
      return
    }

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', windowClass: 'edit-modal' }).result.then(
      (result) => {
        this.createPhone()
      },
      (reason) => {
        this.currentNumber = ''
      },
    );
  }

  setPhoneSelected(phone: phone): void {
    this.currentPhone = phone
    this.currentNumber = phone.number
  }

  openEdit(content: object) {

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', windowClass: 'create-modal' }).result.then(
      (result) => {
        this.EditPhone()
      },
      (reason) => {
        this.currentNumber = ''
      },
    );
  }
  openDelete(content: object) {

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.DeletePhone()

      },
      (reason) => {
        this.currentNumber = ''
      },
    );
  }

  createPhone(): void {

    let id = Date.now()
    let phonesArray = []
    if (this.currentNumber == '') {
      this.toastr.warning('El teléfono no puede ir vacio');
      return
    }
    let phoneData: phone = {
      id,
      number: this.currentNumber
    }

    if (localStorage.getItem('phones') == null) {
      phonesArray.push(phoneData)
      localStorage.setItem('phones', JSON.stringify(phonesArray));
      this.phones = phonesArray
      this.toastr.success('Teléfono añadido con éxito');

    } else {
      phonesArray = JSON.parse(localStorage.getItem('phones')!);
      phonesArray.push(phoneData);
      localStorage.setItem('phones', JSON.stringify(phonesArray));
      this.phones = phonesArray
      this.toastr.success('Teléfono añadido con éxito');
    }

    this.currentNumber = ''


  }
  EditPhone(): void {
  
    if (this.currentNumber == '') {
      this.toastr.warning('El teléfono no puede ir vacio');
      return
    }

    let phonesArray = JSON.parse(localStorage.getItem('phones')!)
    let objIndex = phonesArray.findIndex((obj: any) => obj.number == this.currentPhone.number);
    phonesArray[objIndex].number = this.currentNumber
    localStorage.setItem('phones', JSON.stringify(phonesArray));
    this.phones = phonesArray
    this.toastr.success('Teléfono actualizado con éxito');
    this.currentNumber = ''


  }
  DeletePhone(): void {
    let phonesArray = JSON.parse(localStorage.getItem('phones')!)
    let objIndex = phonesArray.findIndex((obj: any) => obj.number == this.currentPhone.number);
    phonesArray.splice(objIndex, 1)
    this.phones = phonesArray
    localStorage.setItem('phones', JSON.stringify(phonesArray));
    this.toastr.success('Teléfono eliminado con éxito');
    this.currentNumber = ''

  }
}
