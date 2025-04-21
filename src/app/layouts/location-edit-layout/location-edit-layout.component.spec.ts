import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationEditLayoutComponent } from './location-edit-layout.component';

describe('LocationEditLayoutComponent', () => {
  let component: LocationEditLayoutComponent;
  let fixture: ComponentFixture<LocationEditLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocationEditLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationEditLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
