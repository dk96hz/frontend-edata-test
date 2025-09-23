import {Component} from '@angular/core';
import {faSpinner} from '@fortawesome/free-solid-svg-icons';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-loading-spinner',
  imports: [
    FaIconComponent
  ],
  templateUrl: './loading-spinner.html',
  styleUrl: './loading-spinner.css'
})
export class LoadingSpinner {

  protected readonly faSpinner = faSpinner;
}
