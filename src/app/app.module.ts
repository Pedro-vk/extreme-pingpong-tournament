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
import { TournamentComponent, PlayersComponent, GameComponent } from './+tournament';

@NgModule({
  declarations: [
    AppComponent,
    TournamentComponent, PlayersComponent, GameComponent,
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
