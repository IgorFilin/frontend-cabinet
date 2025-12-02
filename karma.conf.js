module.exports = function (config) {
  config.set({
    plugins: [
      require('karma-jasmine'),
      require('karma-coverage'),
      require('karma-chrome-launcher'),
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
    reporters: ['progress', 'coverage'],
    junitReporter: {
      outputFile: 'test-results.xml',
      useBrowserName: false,
      sendToStdout: false
    },
    singleRun: true,
    autoWatch: false,
    colors: true,
    logLevel: config.LOG_INFO
  });
};