import { Component, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  template: `
    <nb-card class="preview-card">
      <nb-card-header class="header">
        <span>Xem ảnh</span>

        <div class="actions">
          <button nbButton size="tiny" (click)="zoomOut()">−</button>
          <button nbButton size="tiny" (click)="zoomIn()">+</button>
          <button nbButton size="tiny" status="info" (click)="reset()">Reset</button>
          <button nbButton size="tiny" status="danger" (click)="close()">✕</button>
        </div>
      </nb-card-header>

      <nb-card-body
        class="img-container"
        (wheel)="onWheel($event)"
      >
        <img
          [src]="imageUrl"
          [style.transform]="transform"
          (mousedown)="startDrag($event)"
          (mousemove)="onDrag($event)"
          (mouseup)="stopDrag()"
          (mouseleave)="stopDrag()"
          draggable="false"
        />
      </nb-card-body>
    </nb-card>
  `,
  styles: [`
    .preview-card {
      width: 90vw;
      height: 90vh;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .actions button {
      margin-left: 4px;
    }

    .img-container {
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      height: calc(90vh - 56px);
      background: #000;
      cursor: grab;
    }

    img {
      max-width: 100%;
      max-height: 100%;
      user-select: none;
      transition: transform 0.1s ease;
    }
  `]
})
export class ImagePreviewComponent {
  @Input() imageUrl!: string;

  scale = 1;
  posX = 0;
  posY = 0;
  dragging = false;
  startX = 0;
  startY = 0;

  constructor(private dialogRef: NbDialogRef<ImagePreviewComponent>) {}

  get transform() {
    return `translate(${this.posX}px, ${this.posY}px) scale(${this.scale})`;
  }

  zoomIn() {
    this.scale = Math.min(this.scale + 0.2, 5);
  }

  zoomOut() {
    this.scale = Math.max(this.scale - 0.2, 0.5);
  }

  reset() {
    this.scale = 1;
    this.posX = 0;
    this.posY = 0;
  }

  close() {
    this.dialogRef.close();
  }

  onWheel(event: WheelEvent) {
    event.preventDefault();
    event.deltaY < 0 ? this.zoomIn() : this.zoomOut();
  }

  startDrag(event: MouseEvent) {
    this.dragging = true;
    this.startX = event.clientX - this.posX;
    this.startY = event.clientY - this.posY;
  }

  onDrag(event: MouseEvent) {
    if (!this.dragging) return;
    this.posX = event.clientX - this.startX;
    this.posY = event.clientY - this.startY;
  }

  stopDrag() {
    this.dragging = false;
  }
}
