require('dotenv').config();

const { Builder, By, Key, until } = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');
const options = new firefox.Options();

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

(async function StartBot() {
  let driver = await new Builder().forBrowser('firefox').build();
  console.log('opening the browser');
  try {
    //go to instagram and login - done
    await driver.get('https://www.instagram.com');
    console.log('instagram is loaded');
    await sleep(5000);
    await driver.wait(until.elementLocated(By.name('username')), 10000); // Wait for the username field to be located
    await driver.findElement(By.name('username')).sendKeys(process.env.INSTAGRAM_USERNAME); // Enter the username
    await driver.findElement(By.name('password')).sendKeys(process.env.INSTAGRAM_PASSWORD); // Enter the password and submit the form
    await sleep(3000);
    await driver.findElement(By.className('_acan _acap _acas _aj1-')).click(); // Click the login button
    console.log('logged into your acc');
    
    // Wait for 5 seconds
    await sleep(5000);

    //say no to "turn on Notifications"-done
    await driver.wait(until.elementLocated(By.className('_a9-- _a9_1')), 10000);
    await driver.wait(until.elementIsEnabled(driver.findElement(By.className('_a9-- _a9_1'))), 10000);
    await driver.findElement(By.className('_a9-- _a9_1')).click();

    await sleep(3000);

   // Click notification button -done(the sidebar is loaded)
    await driver.wait(until.elementLocated(By.css('[aria-label="Notifications"]')), 10000); // Wait for the notification button to be located
    await driver.wait(until.elementIsEnabled(driver.findElement(By.css('[aria-label="Notifications"]'))), 10000); // Wait for the notification button to be clickable
    await driver.findElement(By.css('[aria-label="Notifications"]')).click();
    console.log('notificaiton button clicked')
    await sleep(5000);
    //click to see all notificaitons in the sidebar x1iyjqo2 -done
    await driver.wait(until.elementLocated(By.css('[aria-label=""]')), 10000);
    await driver.wait(until.elementIsEnabled(driver.findElement(By.css('[aria-label=""]'))), 10000); // Wait for the notifications to be clickable
    await driver.findElement(By.css('[aria-label=""]')).click();
    console.log('noti sidebar is loaded')

    //To delete 1 request
    
   /* await sleep(5000);
    await driver.wait(until.elementLocated(By.xpath('/html/body/div[2]/div/div/div[1]/div/div/div/div[1]/div[1]/div[1]/div/div/div[2]/div/div/div/div/div[2]/div[3]/div[2]/div')), 10000);
    await driver.wait(until.elementIsEnabled(driver.findElement(By.xpath('/html/body/div[2]/div/div/div[1]/div/div/div/div[1]/div[1]/div[1]/div/div/div[2]/div/div/div/div/div[2]/div[3]/div[2]/div'))), 10000); // Wait for the notifications to be clickable
    await driver.findElement(By.xpath('/html/body/div[2]/div/div/div[1]/div/div/div/div[1]/div[1]/div[1]/div/div/div[2]/div/div/div/div/div[2]/div[3]/div[2]/div')).click();
    console.log("deleted the request");
    await sleep(10000); */

    // loop to delete all requests
    let count = 2;
    while (true) {
      try {
        let xpath = `/html/body/div[2]/div/div/div[1]/div/div/div/div[1]/div[1]/div[1]/div/div/div[2]/div/div/div/div/div[${count}]/div[3]/div[2]/div`;
        await driver.wait(until.elementLocated(By.xpath(xpath)), 10000);
        let deleteElement = await driver.findElement(By.xpath(xpath));
        await driver.executeScript("arguments[0].scrollIntoView(true);", deleteElement);
        await driver.wait(until.elementIsEnabled(deleteElement), 10000);
        await deleteElement.click();
        console.log(`Deleted request ${count}`);
        await sleep(3000);
        count++;
      } catch (err) {
        console.log("No more requests to delete");
        break;
      }
    }
    //accepting requests
    let Acount = 3;
      while (true) {
      try {
        let xpath = `/html/body/div[2]/div/div/div[1]/div/div/div/div[1]/div[1]/div[1]/div/div/div[2]/div/div/div/div/div[${Acount}]/div[3]/div[1]/div`;
        await driver.wait(until.elementLocated(By.xpath(xpath)), 10000);
        let acceptElement = await driver.findElement(By.xpath(xpath));
        await driver.executeScript("arguments[0].scrollIntoView(true);", acceptElement);
        await driver.wait(until.elementIsEnabled(acceptElement), 10000);
        await acceptElement.click();
        console.log(`Accepted request ${Acount-2}`);
        await sleep(3000);
        Acount++;
      } catch (err) {
        console.log("No more requests to accept");
        break;
      }
    }

  } finally {    
    await driver.quit();
  }
})();
