// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');

const travisCapability = {
    browserName: 'chrome',
    chromeOptions: {
        args: ['--headless', '--no-sandbox', '--disable-gpu']
    }
};

const capability = {
    browserName: 'chrome'
};

const capabilities = process.env.TRAVIS ? travisCapability : capability;

exports.config = {
    allScriptsTimeout: 11000,
    specs: ['./src/**/*.e2e-spec.ts'],
    capabilities,
    directConnect: true,
    baseUrl: 'http://localhost:4200/',
    framework: 'jasmine',
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000,
        print: function() {}
    },
    onPrepare() {
        require('ts-node').register({
            project: require('path').join(__dirname, './tsconfig.e2e.json')
        });

        const config = {
            spec: { displayStacktrace: true },
            colors: { enabled: !process.env.TRAVIS }
        };

        jasmine.getEnv().addReporter(new SpecReporter(config));
    }
};
