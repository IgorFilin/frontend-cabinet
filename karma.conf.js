module.exports = function (config) {
  config.set({
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-junit-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    browsers: ['ChromeHeadlessCI'],
    customLaunchers: {
      ChromeHeadlessCI: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage']
      }
    },
    reporters: ['progress', 'junit'],
    junitReporter: {
      outputFile: 'test-results.xml',
      sendToStdout: false
    },
    singleRun: true,
    autoWatch: false,
    colors: true,
    logLevel: config.LOG_INFO
  });
};