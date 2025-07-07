/*
	Solid State by HTML5 UP - Modified for Consistent Top Navigation with Sticky Header
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/
(function ($) {
	var $window = $(window),
		$body = $('body'),
		$header = $('#header'),
		$banner = $('#banner');

	// Breakpoints.
	breakpoints({
		xlarge: '(max-width: 1680px)',
		large: '(max-width: 1280px)',
		medium: '(max-width: 980px)',
		small: '(max-width: 736px)',
		xsmall: '(max-width: 480px)'
	});

	// Play initial animations on page load.
	$window.on('load', function () {
		window.setTimeout(function () {
			$body.removeClass('is-preload');
		}, 100);
	});

	// Make header sticky and always visible
	function makeHeaderSticky() {
		if ($header.length > 0) {
			// Add sticky class to header
			$header.addClass('is-sticky');
			
			// Add CSS for sticky behavior - initially transparent at top
			$header.css({
				'position': 'fixed',
				'top': '0',
				'left': '0',
				'right': '0',
				'z-index': '10000',
				'background-color': 'transparent', // Start transparent
				'transition': 'all 0.3s ease' // Smooth transitions
			});

			// Add padding to body to prevent content from hiding behind header
			var headerHeight = $header.outerHeight();
			$body.css('padding-top', headerHeight + 'px');
			
			// Update padding when window resizes
			$window.on('resize', function() {
				var newHeaderHeight = $header.outerHeight();
				$body.css('padding-top', newHeaderHeight + 'px');
			});
		}
	}

	// Handle header background based on scroll position
	function handleHeaderScroll() {
		if ($header.hasClass('is-sticky')) {
			var scrollTop = $window.scrollTop();
			
			if (scrollTop > 50) { // Show background after scrolling 50px
				$header.css({
					'background-color': '#62687f', // Dark blue background
					'box-shadow': '0 2px 10px rgba(0, 0, 0, 0.2)' // Add shadow
				});
			} else { // Hide background when at top
				$header.css({
					'background-color': 'transparent',
					'box-shadow': 'none'
				});
			}
		}
	}

	// Modified header functionality - add scroll listener for background changes
	if ($banner.length > 0) {
		$window.on('resize', function () { $window.trigger('scroll'); });
		$window.on('scroll', handleHeaderScroll);
	} else {
		// If no banner, still handle scroll effects
		$window.on('scroll', handleHeaderScroll);
	}

	// Ensure header has consistent structure on all pages
	function ensureConsistentHeader() {
		var $existingHeader = $('#header');

		// If header exists but doesn't have the new navigation structure, update it
		if ($existingHeader.length > 0) {
			var $nav = $existingHeader.find('#nav');
			var $mobileToggle = $existingHeader.find('#mobile-menu-toggle');

			// If the header doesn't have the new nav structure, add it
			if ($nav.length === 0) {
				// Remove old menu link if it exists
				$existingHeader.find('nav a[href="#menu"]').parent().remove();

				// Add new navigation structure
				var navHTML = `
					<nav id="nav">
						<ul class="links">
							<li><a href="index.html">Home</a></li>
							<li><a href="aboutus.html">About Us</a></li>
							<li><a href="opportunities.html">Opportunities</a></li>
							<li><a href="elements.html">Elements</a></li>
						</ul>
					</nav>
				`;

				// Add mobile menu toggle
				var mobileToggleHTML = `
					<a href="#mobile-menu" id="mobile-menu-toggle">
						<span class="icon fa-bars"></span>
					</a>
				`;

				$existingHeader.append(navHTML);
				$existingHeader.append(mobileToggleHTML);
			}
		}

		// Ensure mobile menu exists with consistent structure
		var $mobileMenu = $('#mobile-menu');
		if ($mobileMenu.length === 0) {
			var mobileMenuHTML = `
				<nav id="mobile-menu">
					<div class="inner">
						<ul class="links">
							<li><a href="index.html">Home</a></li>
							<li><a href="aboutus.html">About Us</a></li>
							<li><a href="opportunities.html">Opportunities</a></li>
							<li><a href="elements.html">Elements</a></li>
						</ul>
						<a href="#" class="close">X</a>
					</div>
				</nav>
			`;
			$body.append(mobileMenuHTML);
		}
	}

	// Run the header consistency check
	ensureConsistentHeader();

	// Make header sticky after ensuring it exists
	makeHeaderSticky();

	// Mobile menu functionality
	var $mobileMenu = $('#mobile-menu');
	var $mobileToggle = $('#mobile-menu-toggle');

	// Mobile menu toggle
	$body.on('click', '#mobile-menu-toggle', function (event) {
		event.preventDefault();
		event.stopPropagation();
		$mobileMenu.toggleClass('is-visible');
		$(this).toggleClass('is-active');
	});

	// Close mobile menu when clicking close button
	$body.on('click', '#mobile-menu .close', function (event) {
		event.preventDefault();
		$mobileMenu.removeClass('is-visible');
		$mobileToggle.removeClass('is-active');
	});

	// Close mobile menu when clicking on a menu link
	$body.on('click', '#mobile-menu a:not(.close)', function () {
		$mobileMenu.removeClass('is-visible');
		$mobileToggle.removeClass('is-active');
	});

	// Close mobile menu when clicking outside
	$(document).on('click', function (event) {
		if (!$mobileMenu.is(event.target) &&
			!$mobileToggle.is(event.target) &&
			$mobileMenu.has(event.target).length === 0 &&
			!$mobileToggle.has(event.target).length === 0) {
			$mobileMenu.removeClass('is-visible');
			$mobileToggle.removeClass('is-active');
		}
	});

	// Close mobile menu on escape key
	$body.on('keydown', function (event) {
		if (event.keyCode == 27) {
			$mobileMenu.removeClass('is-visible');
			$mobileToggle.removeClass('is-active');
		}
	});

	// Highlight active page in navigation
	function highlightActivePage() {
		var currentPage = window.location.pathname.split('/').pop();
		if (currentPage === '' || currentPage === '/') {
			currentPage = 'index.html';
		}

		// Remove active class from all nav links
		$('#nav a, #mobile-menu a').removeClass('active');

		// Add active class to current page link
		$('#nav a[href="' + currentPage + '"], #mobile-menu a[href="' + currentPage + '"]').addClass('active');
	}

	// Run active page highlighting
	highlightActivePage();

	// Smooth scrolling for anchor links (if any) - account for sticky header
	$body.on('click', 'a[href^="#"]', function (event) {
		var target = $(this.getAttribute('href'));
		if (target.length) {
			event.preventDefault();
			$('html, body').animate({
				scrollTop: target.offset().top - ($header.outerHeight() || 0)
			}, 800);
		}
	});

})(jQuery);