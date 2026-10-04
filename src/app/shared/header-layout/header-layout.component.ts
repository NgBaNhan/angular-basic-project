import {Component} from "@angular/core"
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'header-layout',
  imports: [RouterOutlet ,RouterLink],
  standalone: true,
  templateUrl: './header-layout.component.html',
  styleUrl: './header-layout.component.css'
})
export class HeaderLayoutComponent { }
