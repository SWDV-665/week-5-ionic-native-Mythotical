import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  groceryItems: string[] = ['Apples', 'Bananas', 'Milk', 'Bread', 'Eggs'];
  newItem: string = '';
  editedItem: string = '';
  editedIndex: number = -1;
  isEditMode: boolean = false;

  constructor(private alertController: AlertController) {}

  addItem() {
    if (this.newItem.trim() !== '') {
      this.groceryItems.push(this.newItem);
      this.newItem = ''; // Clear input field
    }
  }

  editItem(index: number) {
    this.editedItem = this.groceryItems[index];
    this.editedIndex = index;
    this.isEditMode = true;
  }

  saveEdit() {
    if (this.editedIndex !== -1 && this.editedItem.trim() !== '') {
      this.groceryItems[this.editedIndex] = this.editedItem;
      this.editedItem = '';
      this.editedIndex = -1;
      this.isEditMode = false;
    }
  }

  cancelEdit() {
    this.editedItem = '';
    this.editedIndex = -1;
    this.isEditMode = false;
  }

  async confirmDelete(index: number) {
    const alert = await this.alertController.create({
      header: 'Confirm Deletion',
      message: `Are you sure you want to remove "${this.groceryItems[index]}"?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          handler: () => {
            this.removeItem(index);
          }
        }
      ]
    });

    await alert.present();
  }

  removeItem(index: number) {
    this.groceryItems.splice(index, 1);
    if (this.isEditMode && this.editedIndex === index) {
      this.cancelEdit();
    }
  }
}
