// Britz Advertiser — small enhancements. The site works without JavaScript.
(function () {
  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var links = document.getElementById('nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.textContent = open ? 'Close' : 'Menu';
    });
  }

  // Current year in footer
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // Contact form: validate, then open the visitor's email app with the message filled in.
  // TODO: swap for a form service (e.g. Formspree) or server endpoint if you'd like messages sent directly.
  var form = document.getElementById('contact-form');
  if (form) {
    var TO = 'britzadvertiser@gmail.com';
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.name.value.trim();
      var email = form.email.value.trim();
      var msg = form.message.value.trim();
      var okEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      form.name.setAttribute('aria-invalid', String(!name));
      form.email.setAttribute('aria-invalid', String(!okEmail));
      form.message.setAttribute('aria-invalid', String(!msg));
      var err = document.getElementById('form-error');
      if (!name || !okEmail || !msg) { err.hidden = false; return; }
      err.hidden = true;

      var interests = Array.prototype.map.call(
        form.querySelectorAll('input[name="interest"]:checked'),
        function (i) { return i.value; }
      ).join(', ');
      var body = [
        'Name: ' + name,
        'Business: ' + (form.business.value.trim() || '-'),
        'Email: ' + email,
        'Phone: ' + (form.phone.value.trim() || '-'),
        'Interested in: ' + (interests || '-'),
        '',
        msg
      ].join('\n');
      var subject = 'Website enquiry from ' + name;
      window.location.href = 'mailto:' + TO + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    });
  }
})();
