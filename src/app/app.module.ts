import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { reducer } from './reducers'
import { AppComponent } from './app.component';
import { TournamentComponent } from './+tournament/tournament.component';
import { PlayersComponent } from './+tournament/players/players.component';

@NgModule({
  declarations: [
    AppComponent,
    TournamentComponent,
    PlayersComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    StoreModule.provideStore(reducer),
    ...(environment.production ? [] : [StoreDevtoolsModule.instrumentOnlyWithExtension()]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
