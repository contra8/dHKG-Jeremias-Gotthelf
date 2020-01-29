import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KorrespondenzComponent } from './korrespondenz.component';

describe('KorrespondenzComponent', () => {
  let component: KorrespondenzComponent;
  let fixture: ComponentFixture<KorrespondenzComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KorrespondenzComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KorrespondenzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
