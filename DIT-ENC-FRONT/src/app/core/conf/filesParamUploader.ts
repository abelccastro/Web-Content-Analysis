
export class FilesParamUploader {
  tipo: string;
  data: string;
  nombre: string;

  constructor({tipo = 'PDF', data = '', nombre = 'archivo.pdf'}) {
    this.tipo = tipo ? tipo : 'POST';
    this.data = data ? data : '';
    this.nombre = nombre ? nombre : 'archivo.pdf';
  }
}