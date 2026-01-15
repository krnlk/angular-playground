import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormGroupTemplate } from './form-group-template';

describe('FormGroupTemplate', () => {
  let component: FormGroupTemplate;
  let fixture: ComponentFixture<FormGroupTemplate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormGroupTemplate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormGroupTemplate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
