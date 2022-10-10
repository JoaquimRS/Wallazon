import { Component, ElementRef, ViewChild, Input, OnInit } from "@angular/core";
import KeenSlider, { KeenSliderInstance } from "keen-slider";
import { Category } from "src/app/core";



@Component({
  selector: 'carousel',
  templateUrl: './carousel.component.html',
  styleUrls: [
    './carousel.component.css'
  ]
})
export class CarouselComponent{
  @Input() categories: Category [] = []
    
  @ViewChild("sliderRef") sliderRef!: ElementRef<HTMLElement>

  slider!: KeenSliderInstance

  ngAfterViewInit() {
    this.slider = new KeenSlider(this.sliderRef.nativeElement, {
      slides: {
        perView: 6,
      },
    })
  }

  ngOnDestroy() {
    if (this.slider) this.slider.destroy()
  }

}
