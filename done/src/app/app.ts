import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Layout } from "./components/layout/layout";
import { NavBar } from "./components/nav-bar/nav-bar";
import { SideMenu } from "./components/side-menu/side-menu";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Layout, NavBar, SideMenu],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('done');
}
