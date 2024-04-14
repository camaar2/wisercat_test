import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' //This way we will have a single service for all components
})
export class ApiService {
  //In an actual application, we would send this data to an API. Currently, I am just logging it to the console.
  submitFormData(formData: any) {
    console.log(`The data was sent to an API successfully! Form Data: ${JSON.stringify(formData)}`);
  }
}