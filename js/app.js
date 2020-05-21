$().ready(function () {
  function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType('application/json');
    rawFile.open('GET', 'js/pictures.json', true);
    rawFile.onreadystatechange = function () {
      if (rawFile.readyState === 4 && rawFile.status == '200') {
        callback(rawFile.responseText);
      }
    };
    rawFile.send(null);
  }

  readTextFile('js/pictures.json', function (text) {
    const data = JSON.parse(text);
    const list = data.photos;

    $('.img-container').on('click', 'img', function () {
      $(list).each(function () {
        const $picName = this.name;
        console.log(this.url);
        $(this).each(function () {
          console.log($picName);
        });
      });
    });
  });
  //
});
