const puppeteer = require('puppeteer');

let url = 'https://www.tutorialsteacher.com/online-test/test-question?test=nodejs';


(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url);

  let electronicData = await page.evaluate(() => {
    let questions = [];
    let dataJson = {};
    let dataAnswer = [];
    try {
      dataJson.question = document.querySelector('.card-body > pre').innerText;
      let input_group = document.querySelectorAll('.input-group');
      input_group.forEach((ar) => {
        try{
          dataAnswer.push(ar.querySelector('.input-group > label').innerText);
        }
        catch (err) {
          console.log(err);
      }
      });
      dataJson.answer = dataAnswer;
    }
    catch (err) {
      console.log(err);
    }
    questions.push(dataJson);
    return questions;
  });

  console.log(electronicData);
  await browser.close();
})();