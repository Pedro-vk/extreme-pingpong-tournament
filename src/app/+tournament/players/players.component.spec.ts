import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { PlayersComponent } from './players.component';
import { State } from '../../reducers';
import * as players from '../../actions/players.actions';
import * as queue from '../../actions/queue.actions';
import { initialState } from '../../reducers/players-queue.reducer';

describe('PlayersComponent', () => {
  let component: PlayersComponent;
  let fixture: ComponentFixture<PlayersComponent>;
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
      (selector: any) => Observable.of({players: initialState}).map(selector),
    );
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
      ],
      declarations: [ PlayersComponent ],
      providers: [
        {provide: Store, useValue: store}
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be able to create new players', () => {
    component.add('test');

    expect(spyDispatch).toHaveBeenCalledWith(jasmine.objectContaining({
      type: players.ActionTypes.ADD,
      payload: jasmine.objectContaining({name: 'test'}),
    }));
  });

  it('should be able to remove new players', () => {
    component.remove(<any>{name: 'test'});

    expect(spyDispatch).toHaveBeenCalledWith(jasmine.objectContaining({
      type: players.ActionTypes.REMOVE,
      payload: jasmine.objectContaining({name: 'test'}),
    }));
  });

  it('should reset the tournament', () => {
    component.resetUsers();

    expect(spyDispatch).toHaveBeenCalledWith(jasmine.objectContaining({
      type: queue.ActionTypes.SHUFFLE,
    }));
    expect(spyDispatch).toHaveBeenCalledWith(jasmine.objectContaining({
      type: players.ActionTypes.RESET_LIVES,
      payload: 3,
    }));
  });
});
