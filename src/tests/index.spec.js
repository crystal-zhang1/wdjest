import { By, until } from "selenium-webdriver";
import { getDriver } from "../common/drivers.js";
import { pauseMillisec } from "../common/helpers.js";

const debug = true;
const testTimeout = 60000; // 60 seconds
let driver;

describe("Lizuarte De Sousa's Website", () => {
  beforeAll(async () => {
    driver = await getDriver("chrome");
  });

  afterAll(async () => {
    if (driver) {
      await driver.quit();
    }
  });

  test(
    "home page should be opened successfully",
    async () => {
      await driver.get("https://www.lizuarte.com");

      await driver.wait(until.titleMatches(/Home/i), 10000);

      const pageTitle = await driver.getTitle();

      if (debug) {
        await pauseMillisec(2000);
      } 

      expect(pageTitle).toEqual("Home");
    },
    testTimeout
  );

  test(
    "Success model should be displayed when user submitted Contact form",
    async () => {
      await driver.get("https://www.lizuarte.com/contact");

      await driver.wait(until.titleMatches(/Contact/i), 10000);

      const fnameElm = await driver.findElement(By.id("fname"));
      await driver.wait(() => fnameElm.isEnabled(), 5000);
      await fnameElm.sendKeys("John");

      const lnameElm = await driver.findElement(By.id("lname"));
      await driver.wait(() => lnameElm.isEnabled(), 5000);
      await lnameElm.sendKeys("Doe");

      if (debug) {
        await pauseMillisec(2000);
      } 

      const emailaddrElm = await driver.findElement(By.id("emailaddr"));
      await driver.wait(() => emailaddrElm.isEnabled(), 5000);
      await emailaddrElm.sendKeys("John.doe@gmail.com");

      const phonenumElm = await driver.findElement(By.id("phonenum"));
      await driver.wait(() => phonenumElm.isEnabled(), 5000);
      await phonenumElm.sendKeys("905-123-4567");

      const inquirytxtElm = await driver.findElement(By.id("inquirytxt"));
      await driver.wait(() => inquirytxtElm.isEnabled(), 5000);
      await inquirytxtElm.sendKeys("Just another test!");

      if (debug) {
        await pauseMillisec(2000);
      } 
      
      const submitBtn = await driver.findElement(
        By.css(".request-form button")
      );
      await driver.wait(() => submitBtn.isEnabled(), 5000);

      if (debug) {
        await pauseMillisec(2000);
      } 

      await submitBtn.submit();

      await driver.wait(until.elementLocated(By.css(".model-btn")), 10000);
      const modelBtn = await driver.findElement(By.css(".model-btn"));
      const modelBtnTxt = await modelBtn.getText();

      if (debug) {
        await pauseMillisec(5000);
      } 

      expect(modelBtnTxt).toEqual("OK");
    },
    testTimeout
  );
});
