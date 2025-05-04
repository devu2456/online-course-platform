import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FooterComponent,
    NavbarComponent,
  ],
  exports: [FooterComponent, NavbarComponent]
})
export class SharedModule {}