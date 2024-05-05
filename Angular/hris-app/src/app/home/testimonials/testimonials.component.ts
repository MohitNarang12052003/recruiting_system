import { Component, ViewChild } from '@angular/core';
import {
  NgbCarousel,
  NgbCarouselModule,
  NgbSlideEvent,
  NgbSlideEventSource,
} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css'],
})
export class TestimonialsComponent {
  images = [
    {
      name: 'Kinjala Ahuja',
      image: '../../../assets/Images/Kinjala_Ahuja_photograph.jpg',
      position: 'Chief Executive Officer',
      description:
        'I am honored to lead this exceptional team towards redefining the future of fintech. Together, we are committed to revolutionizing the way people manage their finances, empowering individuals and businesses alike to thrive in a rapidly evolving digital economy.',
    },
    {
      name: 'Mohit Narang',
      image: '../../../assets/Images/mohit picture.jpeg',
      position: 'Chief Technology Officer',
      description:
        "At our company, we embrace innovation as the cornerstone of our success. It's truly inspiring to collaborate with such talented individuals, pushing the boundaries of technology to create groundbreaking solutions that revolutionize the financial landscape.",
    },
    {
      name: 'Nidhi Pinjani',
      image: '../../../assets/Images/Nidhi_Pinjani.jpg',
      position: 'Chief Financial Officer',
      description:
        "I am proud to be part of a team that prioritizes financial integrity and transparency above all else. Together, we are dedicated to ensuring that our financial strategies are not only robust but also aligned with our company's values, driving sustainable growth and prosperity.",
    },
    {
      name: 'Hirday Rochani',
      image: '../../../assets/Images/Hirday_Rochani.jpg',
      position: 'Chief Operations Officer',
      description:
        "It's truly a privilege to lead the operational efforts of such a dynamic and forward-thinking organization. Every day, I am inspired by the dedication and passion of our team as we work tirelessly to streamline processes and drive operational excellence, setting new standards for the industry.",
    },
  ];

  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;
  pauseOnFocus = true;

  @ViewChild('carousel', { static: true }) carousel!: NgbCarousel;

  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }

  onSlide(slideEvent: NgbSlideEvent) {
    if (
      this.unpauseOnArrow &&
      slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT ||
        slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)
    ) {
      this.togglePaused();
    }
    if (
      this.pauseOnIndicator &&
      !slideEvent.paused &&
      slideEvent.source === NgbSlideEventSource.INDICATOR
    ) {
      this.togglePaused();
    }
  }
}
