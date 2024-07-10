import { LiveAnnouncer } from "@angular/cdk/a11y";
import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  standalone: true,
  selector: 'app-table-wrap',
  templateUrl: './table-wrap.component.html',
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
  ],
})
export class TableWrapComponent implements AfterViewInit {
  @Input() displayedColumns!: string[];
  @Input() dataSource!: MatTableDataSource<any>;

  @Output() remove = new EventEmitter<string>();
  @Output() update = new EventEmitter<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _liveAnnouncer: LiveAnnouncer) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
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
