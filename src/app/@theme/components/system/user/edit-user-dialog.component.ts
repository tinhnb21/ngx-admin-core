import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { ImagePreviewComponent } from '../../common/preview-image/image-preview.component';

@Component({
  selector: 'ngx-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.scss'],
})
export class EditUserDialogComponent {
  @Input() data: any;
  @Input() isAdd = false;

  selectedAvatar!: File;
  avatarPreview: string | ArrayBuffer | null = null;

  constructor(
    protected ref: NbDialogRef<EditUserDialogComponent>,
    private dialogService: NbDialogService,
    private cdr: ChangeDetectorRef
  ) { }

  save() {
    this.ref.close(this.data);
  }

  cancel() {
    this.ref.close();
  }

  onAvatarSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    // validate
    if (!file.type.startsWith('image/')) {
      alert('Chỉ được upload ảnh');
      return;
    }

    this.selectedAvatar = file;

    const reader = new FileReader();
    reader.onload = () => {
      this.avatarPreview = reader.result;
      this.cdr.markForCheck();
    };
    reader.readAsDataURL(file);
  }

  openImage() {
    this.dialogService.open(ImagePreviewComponent, {
      context: {
        imageUrl: this.avatarPreview || this.data.avatar,
      },
    });
  }
}
