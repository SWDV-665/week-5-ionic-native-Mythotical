import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  groceries: string[] = ['Bread', 'Milk', 'Eggs'];
  newGrocery: string = ''; // Initialize newGrocery property

  constructor(private alertController: AlertController) {}

  addGrocery() {
    if (this.newGrocery && this.newGrocery.trim() !== '') {
      this.groceries.push(this.newGrocery.trim());
      this.newGrocery = '';
    }
  }

  removeGrocery(grocery: string) {
    const index = this.groceries.indexOf(grocery);
    if (index > -1) {
      this.groceries.splice(index, 1);
    }
  }

  async editGrocery(index: number) {
    const alert = await this.alertController.create({
      header: 'Edit Grocery Item',
      inputs: [
        {
          name: 'editedGrocery',
          type: 'text',
          value: this.groceries[index],
          placeholder: 'Enter edited grocery item',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Save',
          handler: (data) => {
            if (data.editedGrocery && data.editedGrocery.trim() !== '') {
              this.groceries[index] = data.editedGrocery.trim();
            }
          },
        },
      ],
    });

    await alert.present();
  }
}
