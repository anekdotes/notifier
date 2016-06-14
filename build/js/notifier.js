(function(window, $){
  if(!window.Notifier){ window.Notifier = {}; }
  var Notifier = window.Notifier;

  var listener;
  var $container;
  var nextId = 0;

  var alerts = {
    clear: clear,
    options: getDefaults(),
    subscribe: subscribe,
    info: info,
    success: success,
    warning: warning,
    error: error
  };

  Notifier.alert = alerts;

  function show(params) {
    params.optionsOverride = typeof params.optionsOverride !== 'undefined' ?
      params.optionsOverride : {};

    // Get right options, get container
    var options = $.extend(alerts.options, params.optionsOverride);
    var $container = $(options.container);
    var killTimeout = null;

    nextId++;

    // Build alert element
    $alertElem = $('<div/>');
    $alertElem.addClass('notifier').addClass('notifier-item').addClass('notifier-'+params.type);
    $alertElem.append('<h4>'+params.title+'</h4>');
    $alertElem.append('<div>'+params.message+'</div>');
    $alertElem.hide();

    // Append it and show it
    $container.append($alertElem);
    $alertElem.fadeIn({
      duration: 300,
      easing: 'swing'
    });

    // Set time of death
    if (options.duration > 0) {
      killTimeout = setTimeout(hideAlert($alertElem), options.duration);
    }
    $alertElem.click(hideAlert($alertElem));

    publish({
      alertId: nextId,
      state: 'visible',
      startTime: new Date(),
      options: options
    });

    return $alertElem;

    function hideAlert($item) {
      return function() {
        return $item.fadeOut({
          duration: 1000,
          easing: 'swing',
          complete: function () {
            removeAlert($item);
            publish({
              alertId: nextId,
              state: 'hidden',
              endTime: new Date(),
              options: options
            });
          }
        });
      };//closure
    }
  }

  function info(title, message, optionsOverride) {
    return show({
      type: 'info',
      title: title,
      message: message,
      optionsOverride: optionsOverride
    });
  }
  function success(title, message, optionsOverride) {
    return show({
      type: 'success',
      title: title,
      message: message,
      optionsOverride: optionsOverride
    });
  }
  function warning(title, message, optionsOverride) {
    return show({
      type: 'warning',
      title: title,
      message: message,
      optionsOverride: optionsOverride
    });
  }
  function error(title, message, optionsOverride) {
    return show({
      type: 'danger',
      title: title,
      message: message,
      optionsOverride: optionsOverride
    });
  }

  function publish(args) {
    if (!listener) {
      return;
    }
    listener(args);
  }
  function subscribe(callback) {
    listener = callback;
  }
  function clear() {
    $(options.container).empty();
  }
  function getDefaults() {
    return {
      duration: 7500,
      container: '#notifier-container'
    };
  }
  function removeAlert($alert) {
    var $container = $(alerts.options.container);
    $alert.remove();
    $alert = null;
  }

  $(function(){
    $('body').append('<div class="notifier-container" id="notifier-container"></div>');
  });

})(window, $);
