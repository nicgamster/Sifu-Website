module.exports = (temp, news) => {
  let output = temp.replace(/{%IMG%}/g, news.img);
  output = output.replace(/{%DATE%}/g, news.date);
  output = output.replace(/{%TITLE%}/g, news.title);
  output = output.replace(/{%DESCRIPTION%}/g, news.description);
  output = output.replace(/{%NEWS-TEXT%}/g, news.news_text);
  output = output.replace(/{%ID%}/g, news.id);

  return output;
};
