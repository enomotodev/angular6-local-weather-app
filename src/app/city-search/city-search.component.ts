import { Component, OnInit, EventEmitter, Output } from '@angular/core'
import { FormControl, Validators } from '@angular/forms'
import { debounceTime } from 'rxjs/operators'
import { WeatherService } from '../weather/weather.service'

@Component({
  selector: 'app-city-search',
  templateUrl: './city-search.component.html',
  styleUrls: ['./city-search.component.css']
})
export class CitySearchComponent implements OnInit {
  @Output() searchEvent = new EventEmitter<string>()
  search = new FormControl('', [Validators.minLength(3)])

  constructor(private weatherService: WeatherService) {
  }

  ngOnInit() {
    this.search.valueChanges
      .pipe(debounceTime(1000))
      .subscribe((searchValue: string) => {
        if (!this.search.invalid) {
          this.searchEvent.emit(searchValue)
        }
      })
  }

  getErrorMessage() {
    return this.search.hasError('minlength') ? 'Type more than one character to search' : '';
  }
}
