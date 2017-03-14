import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { TournamentComponent } from './tournament.component';
import { State } from '../reducers';
import * as players from '../actions/players.actions';
import * as queue from '../actions/queue.actions';
import { initialState } from '../reducers/players-queue.reducer';

describe('TournamentComponent', () => {
  let component: TournamentComponent;
  let fixture: ComponentFixture<TournamentComponent>;
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
          ['test1']: {lives: 2, initialLives: 3},
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
      declarations: [ TournamentComponent ],
      providers: [
        {provide: Store, useValue: store}
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reset the tournament', () => {
    component.startTournament();

    expect(spyDispatch).toHaveBeenCalledWith(jasmine.objectContaining({
      type: queue.ActionTypes.SHUFFLE,
    }));
    expect(spyDispatch).toHaveBeenCalledWith(jasmine.objectContaining({
      type: players.ActionTypes.RESET_LIVES,
      payload: 3,
    }));
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
