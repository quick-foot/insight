import { browser, logging } from 'protractor';
import { AppPage } from './app.po';

describe('workspace-project App', () => {
    let page: AppPage;

    beforeEach(() => {
        page = new AppPage();
    });

    it('should display welcome message', async () => {
        await page.navigateTo();
        await expect(page.getTitleText()).toEqual('Welcome to insight!');
    });

    afterEach(async () => {
        // Assert that there are no errors emitted from the browser
        const logs = await browser
            .manage()
            .logs()
            .get(logging.Type.BROWSER);

        const loggingEntry = {
            level: logging.Level.SEVERE
        } as logging.Entry;

        const expectedLoggingSeverity = jasmine.objectContaining(loggingEntry);

        expect(logs).not.toContain(expectedLoggingSeverity);
    });
});
