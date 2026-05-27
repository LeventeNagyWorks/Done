import { Component } from '@angular/core';
import { Checkbox } from "../../components/checkbox/checkbox";
import { Button } from "../../components/button/button";

@Component({
  selector: 'app-playground',
  imports: [Checkbox, Button],
  templateUrl: './playground.html',
})
export class Playground {}
