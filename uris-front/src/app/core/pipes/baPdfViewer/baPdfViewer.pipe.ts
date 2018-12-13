import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser';

@Pipe({ name: 'baPdfViewer' })
export class BaPdfViewerPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(data) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(data);
  }
} 