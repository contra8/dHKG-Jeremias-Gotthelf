import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AktuellesComponent } from './aktuelles.component';

describe('AktuellesComponent', () => {
  let component: AktuellesComponent;
  let fixture: ComponentFixture<AktuellesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AktuellesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AktuellesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
