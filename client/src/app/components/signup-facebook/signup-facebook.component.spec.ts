import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupFacebookComponent } from './signup-facebook.component';

describe('SignupFacebookComponent', () => {
  let component: SignupFacebookComponent;
  let fixture: ComponentFixture<SignupFacebookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupFacebookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupFacebookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
