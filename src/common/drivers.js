import { chrome } from "chromedriver";
import { Builder, By } from "selenium-webdriver";

const drivers = {};

// "firefox", "chrome"
async function buildDriver(browserName) {
  drivers[browserName] = await new Builder().forBrowser(browserName).build();

  return drivers[browserName];
}

async function getDriver(browserName) {
  const driver = drivers[browserName]
    ? drivers[browserName]
    : buildDriver(browserName);

  return driver;
}

export { getDriver };
