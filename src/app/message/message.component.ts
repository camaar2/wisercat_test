import { Component, Input } from "@angular/core";

@Component({
  selector: "app-message",
  template: `
    <div *ngIf="infoMessage" class="messageComponent messageInfo">
      {{ infoMessage }}
    </div>
    <div *ngIf="errorMessage" class="messageComponent messageError">
      {{ errorMessage }}
    </div>
    <div *ngIf="successMessage" class="messageComponent messageSuccess">
      {{ successMessage }}
    </div>
  `,
  styleUrls: ["./message.component.css"],
})
export class MessageComponent {
  @Input() errorMessage: string | null = null;
  @Input() infoMessage: string | null = null;
  @Input() successMessage: string | null = null;
}
