# Notifier

A better javascript alert system than normal javascript alert

## Build

    npm install

    bower install

    gulp

## Usage

Several quick start options:

* Clone the repo: git clone git@github.com:anekdotes/notifier.git.

* Install with Bower: bower install notifier.

To use the library, include the js file and css file into your html head.

    <script type="text/javascript" src="<path_to_build>/build/js/notifier.min.js"></script>

    <link type="text/css" rel="stylesheet" href="<path_to_build>/build/css/notifier.css" media="screen">

Then call what you need

    Notifier.alert.success('Success', 'Good job!');

    Notifier.alert.error('Error', 'Oh oh!');

    Notifier.alert.info('Info', 'Did you know?');

    Notifier.alert.warning('Warning', 'Careful!');
