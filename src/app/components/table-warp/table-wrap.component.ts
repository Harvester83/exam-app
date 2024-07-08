import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Subject } from '../../../store/subjects/subject.model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-table-wrap',
  templateUrl: './table-wrap.component.html',
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule],
})
export class TableWrapComponent {
  @Input() displayedColumns!: string[];
  @Input() dataSource!: MatTableDataSource<any>;

  @Output() remove = new EventEmitter<string>();
  @Output() update = new EventEmitter<any>();

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
