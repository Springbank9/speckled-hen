$(document).ready(function() {
		  "use strict";
		  $('.menu > ul > li:has( > ul)').addClass('menu-dropdown-icon');
		  $('.menu > ul > li > ul:not(:has(ul))').addClass('normal-sub');
		  $(".menu > ul").before("<a href=\"#\" class=\"menu-mobile\">&nbsp;</a>");
		  $(".menu > ul > li").hover(function(e) {
		    if ($(window).width() > 943) {
		      $(this).children("ul").stop(true, false).fadeToggle(150);
		      e.preventDefault();
		    }
		  });
		  $(".menu > ul > li").click(function() {
		    if ($(window).width() <= 943) {
		      $(this).children("ul").fadeToggle(150);
		    }
		  });
		  $(".menu-mobile").click(function(e) {
		    $(".menu > ul").toggleClass('show-on-mobile');
		    e.preventDefault();
		  });
		});
		$(window).resize(function() {
		  $(".menu > ul > li").children("ul").hide();
		  $(".menu > ul").removeClass('show-on-mobile');
		});


        {
	class SliderClip {
		constructor(el) {
			this.el = el;
			this.Slides = Array.from(this.el.querySelectorAll('li'));
			this.Nav = Array.from(this.el.querySelectorAll('nav a'));
			this.totalSlides = this.Slides.length;
			this.current = 0;
			this.autoPlay = true; //true or false
			this.timeTrans = 4000; //transition time in milliseconds
			this.IndexElements = [];

			for(let i=0;i<this.totalSlides;i++) {
				this.IndexElements.push(i);
			}

			this.setCurret();
			this.initEvents();
		}
		setCurret() {
			this.Slides[this.current].classList.add('current');
			this.Nav[this.current].classList.add('current_dot');
		}
		initEvents() {
			const self = this;

			this.Nav.forEach((dot) => {
				dot.addEventListener('click', (ele) => {
					ele.preventDefault();
					this.changeSlide(this.Nav.indexOf(dot));
				})
			})

			this.el.addEventListener('mouseenter', () => self.autoPlay = false);
			this.el.addEventListener('mouseleave', () => self.autoPlay = true);

			setInterval(function() {
				if (self.autoPlay) {
					self.current = self.current < self.Slides.length-1 ? self.current + 1 : 0;
					self.changeSlide(self.current);
				}
			}, this.timeTrans);

		}
		changeSlide(index) {

			this.Nav.forEach((allDot) => allDot.classList.remove('current_dot'));

			this.Slides.forEach((allSlides) => allSlides.classList.remove('prev', 'current'));

			const getAllPrev = value => value < index;

			const prevElements = this.IndexElements.filter(getAllPrev);

			prevElements.forEach((indexPrevEle) => this.Slides[indexPrevEle].classList.add('prev'));

			this.Slides[index].classList.add('current');
			this.Nav[index].classList.add('current_dot');
		}
	}

	const slider = new SliderClip(document.querySelector('.slider'));
}