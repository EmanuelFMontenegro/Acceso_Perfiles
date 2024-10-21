import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecursosDeUsuariosComponent } from './recursos-de-usuarios.component';

describe('RecursosDeUsuariosComponent', () => {
  let component: RecursosDeUsuariosComponent;
  let fixture: ComponentFixture<RecursosDeUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecursosDeUsuariosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecursosDeUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
