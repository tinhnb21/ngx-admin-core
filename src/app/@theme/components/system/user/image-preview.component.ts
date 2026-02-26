import { Component, Input } from '@angular/core';

@Component({
  template: `
    <nb-card>
      <nb-card-body class="img-container">
        <img [src]="imageUrl" />
      </nb-card-body>
    </nb-card>
  `,
  styles: [`
    .img-container {
      text-align: center;
    }
    img {
      max-width: 100%;
      max-height: 80vh;
    }
  `]
})
export class ImagePreviewComponent {
  @Input() imageUrl!: string;
}
