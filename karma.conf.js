module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-junit-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      jasmine: {
        random: false
      }
    },
    reporters: ['progress', 'junit'],
    junitReporter: {
      outputDir: '.',
      outputFile: 'test-results.xml',
      useBrowserName: false
    },
    browsers: ['ChromeHeadless'],
    singleRun: true
  });
};