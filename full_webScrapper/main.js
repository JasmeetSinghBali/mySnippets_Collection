const scrape=require('website-scraper');
      url=''//Replace with the Website Url U want to Scrape and then navigate to this directory in terminal type node main.js the scraped Website Will be in scraped-Website Directory of this root Project Folder.Enjoy!!


scrape({
  urls: [url],
  urlFilter: function (url) {
    return url.indexOf(url) === 0;
  },
  recursive: true,
  maxDepth: 50,
  prettifyUrls: true,
  filenameGenerator: 'bySiteStructure',
  directory: './scraped-website'
}).then((data) => {
  console.log("Entire website succesfully downloaded");
}).catch((err) => {
  console.log("An error ocurred", err);
});
