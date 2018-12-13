import { Filtro } from './filtro';
import { Page } from './page';
export class Busqueda {
    constructor(
        public page: Page,
        public filtro: Filtro
    ){}
}