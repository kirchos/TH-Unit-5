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

  $('.display').css('display', 'none')
  const hideD = function () {
    $('.display').click(function () {
      $('.display').hide();
    })
  };

  readTextFile('js/pictures.json', function (text) {
    const data = JSON.parse(text);
    const list = data.photos;

    $('#gallery-container').on('click', 'img', function () {
      for (let i = 0; i < list.length; i++) {
        const altText = list[i].alttext;
        const caption = list[i].captions;
        const $img = list[i].url;
        const dispayContent = $('.display');

        if ($(this).attr('alt') === altText) {

          dispayContent.html(`<img src="${$img}" alt="${altText}" class='active'> <span class='captions'>${caption}</span><span class="x">X</span><span class="goLeft"><</span><span class="goRight">></span>`).show()


          $('.goRight').on('click', function () {
            let currentIndex = list.indexOf(list[i]);
            let nextIndex = (currentIndex + 1) % list.length;

            $('.active').attr('src', list[nextIndex].url)
            if (list[nextIndex].alttext) {

              $('.active').attr('src', list[nextIndex].url)
              console.log(list[nextIndex].alttext)

              //test
              list.forEach((item, index, arr) => {
                console.log("Current: " + item.alttext);
                console.log("Previous: " + ((0 === index) ? "START" : arr[index - 1].name));
                console.log("Next: " + ((arr.length - 1 === index) ? "END" : arr[index + 1].name));
              });
            }
          })

          $('.x').click(function () {
            $('.display').hide()
          })
        }








      }
    });
  });
  //
});
