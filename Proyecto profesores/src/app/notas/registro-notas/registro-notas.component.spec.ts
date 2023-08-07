import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroNotasComponent } from './registro-notas.component';

describe('RegistroNotasComponent', () => {
  let component: RegistroNotasComponent;
  let fixture: ComponentFixture<RegistroNotasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistroNotasComponent]
    });
    fixture = TestBed.createComponent(RegistroNotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
