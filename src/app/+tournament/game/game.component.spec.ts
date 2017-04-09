import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { GameComponent } from './game.component';
import { State } from '../../reducers';
import * as queue from '../../actions/queue.actions';
import { initialState } from '../../reducers/players-queue.reducer';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;
  let store: any;
  let spyDispatch: jasmine.Spy;
  let spySelect: jasmine.Spy;

  beforeEach(() => {
    store = {
      dispatch: () => {},
      select: () => {},
    };
    spyDispatch = spyOn(store, 'dispatch');
    spySelect = spyOn(store, 'select').and.callFake(
      (selector: any) => Observable.of({players: {
        ...initialState,
        entities: {
          test1: {lives: 2, initialLives: 3},
        },
        queue: ['test1'],
      }}).map(selector),
    );
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RouterTestingModule,
      ],
      declarations: [ GameComponent ],
      providers: [
        {provide: Store, useValue: store}
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch the match result', () => {
    component.matchFinished(<any>{id: 'test1'}, <any>{id: 'test2'});

    expect(spyDispatch).toHaveBeenCalledWith(jasmine.objectContaining({
      type: queue.ActionTypes.RESULT,
      payload: {
        winner: jasmine.objectContaining({id: 'test1'}),
        loser: jasmine.objectContaining({id: 'test2'}),
      },
    }));
  });
});
