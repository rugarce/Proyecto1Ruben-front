import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, Output,EventEmitter } from '@angular/core';
import { Producto } from '../../models/producto';
import { Paginado } from '../../models/paginado';

@Component({
  selector: 'app-paginacion',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './paginacion.component.html',
  styleUrl: './paginacion.component.css',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class PaginacionComponent { 
  @Input() paginacion!: Paginado<Producto>;
  @Output() page = new EventEmitter<number>();
  
  currentPage = 0;
  itemsPerPage = 12;

  constructor(){
  }

  get totalPages() {
    return Math.ceil(this.paginacion.numElementosTotales / this.paginacion.tamPagina);
  }


  nextPage() {
    if ((this.currentPage+1) * this.itemsPerPage < this.paginacion.numElementosTotales) {
      this.currentPage++;
      this.page.emit(this.currentPage);
    }
  }

  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.page.emit(this.currentPage);
    }
  }

  goToPage(page: number) {
    if (page >= 0 && page <= this.totalPages) {
      this.currentPage = page;
      this.page.emit(this.currentPage);
    }
  }





}
