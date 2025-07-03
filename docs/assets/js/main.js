/*
	Solid State by HTML5 UP - Modified for Consistent Top Navigation
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

	// Header functionality - works on all pages
	if ($banner.length > 0 && $header.hasClass('alt')) {
		$window.on('resize', function () { $window.trigger('scroll'); });
		$banner.scrollex({
			bottom: $header.outerHeight(),
			terminate: function () { $header.removeClass('alt'); },
			enter: function () { $header.addClass('alt'); },
			leave: function () { $header.removeClass('alt'); }
		});
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
						<h2>Menu</h2>
						<ul class="links">
							<li><a href="index.html">Home</a></li>
							<li><a href="aboutus.html">About Us</a></li>
							<li><a href="opportunities.html">Opportunities</a></li>
							<li><a href="elements.html">Elements</a></li>
						</ul>
						<a href="#" class="close">Close</a>
					</div>
				</nav>
			`;
			$body.append(mobileMenuHTML);
		}
	}

	// Run the header consistency check
	ensureConsistentHeader();

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

	// Smooth scrolling for anchor links (if any)
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
