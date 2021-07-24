window.addEventListener('load', function () {
    flatpickr('.start_date_input', {
      // Enable date+time input
      enableTime: true,
      // Set default date in input to 5 minutes in future
      defaultDate: new Date(Date.now() + 300000),
      // Set minimum date in input to 1 minute in future
      minDate: new Date(Date.now() + 60000)
    });
  });