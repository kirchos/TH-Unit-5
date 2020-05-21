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

    $('#gallery-container').on('click', 'img', function () {
      for (let i = 0; i < list.length; i++) {
        const altText = list[i].alttext;
        const caption = list[i].captions;
        const img = list[i].url;
        const displayContent = $(`<div class="popUp"><span class='x'>x</span><span class='goLeft'><</span><span class="goRight">></span><img class='currentImg' src="${img}"><span class='img-caption'>${caption}</span></div>`);

        if ($(this).attr('alt') === altText) {
          console.log(caption);
          $('#gallery-container').prepend(displayContent);

          $('.goRight').on('click', function () {
            $("#gallery-container").next($('.img-container')).append(displayContent)
            console.log($('img').attr('alt'))
          })
        }




        $('.x').click(function () {
          $(displayContent).hide()
        })



      }
    });
  });
  //
});
