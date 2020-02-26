const { Builder, By, until } = require("selenium-webdriver")
const assert = require("assert")
const fs = require('fs')
const { promisify } = require('util')

describe("UIテスト デモ", () => {

    let driver

    before(() => {
        driver = new Builder().forBrowser("chrome").build()
        process.on("unhandledRejection", console.dir)
    });

    after(() => {
        return driver.quit()
    });

    it("テスト1", async () => {

        const WaitTime = 10000
        await driver.get("https://....")
        await driver.wait(until.elementLocated(By.id("user_id")), WaitTime).sendKeys("user001")
        await driver.wait(until.elementLocated(By.id("login_button")), WaitTime).click()
        const ErrorMessage = await driver.wait(until.elementLocated(By.id("error_message")), WaitTime).getText()
        let base64 = await driver.takeScreenshot()
        let buffer = Buffer.from(base64, "base64")
        await promisify(fs.writeFile)("./screenshots/error_message.jpg", buffer)
        assert.equal(ErrorMessage, "ユーザーIDが間違っています")

    });

});