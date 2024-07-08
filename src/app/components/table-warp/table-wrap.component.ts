import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";





@Component({
  standalone: true,
  selector: 'app-table-wrap',
  templateUrl: './table-wrap.component.html',
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatPaginatorModule],
})
export class TableWrapComponent implements AfterViewInit {
  @Input() displayedColumns!: string[];
  @Input() dataSource!: MatTableDataSource<any>;

  @Output() remove = new EventEmitter<string>();
  @Output() update = new EventEmitter<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  isDateColumn(column: string): boolean {
    const dateColumns = ['examDate']; // Add more date columns as needed
    return dateColumns.includes(column);
  }

  removeElement(id: string) {
    this.remove.emit(id);
  }

  updateElement(element: any) {
    this.update.emit(element);
  }
}
