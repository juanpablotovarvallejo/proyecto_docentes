import { Component, Input, ViewChild, AfterViewInit, OnChanges, SimpleChanges} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})
export class TablaComponent<T> implements AfterViewInit {

  @Input() dataSource: T[] = [];
  @Input() displayedColumns: string[] = [];

  filteredDataSource!: MatTableDataSource<T>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  ngAfterViewInit() {
    this.filteredDataSource = new MatTableDataSource(this.dataSource);
    this.filteredDataSource.paginator = this.paginator;
    this.filteredDataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['dataSource'] && changes['dataSource'].currentValue) {
      this.filteredDataSource.data = changes['dataSource'].currentValue;
      if (this.paginator) {
        this.paginator.firstPage();
      }
    }
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filteredDataSource.filter = filterValue.trim().toLowerCase();

    if (this.filteredDataSource.paginator) {
      this.filteredDataSource.paginator.firstPage();
    }
  }

}
