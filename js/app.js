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

  $('span').hide();

  readTextFile('js/pictures.json', function (text) {
    const data = JSON.parse(text);
    const list = data.photos;

    $('#gallery-container').on('click', 'img', function () {

      list.forEach((item, index, arr) => {
        const altText = item.alttext;
        const caption = item.captions;
        const $img = item.url;
        // console.log("Current: " + item.altte);
        // console.log("Previous: " + ((0 === index) ? "START" : arr[index - 1].name));
        // console.log("Next: " + ((arr.length - 1 === index) ? "END" : arr[index + 1].name));
        const dispayContent = $('.display');



        if ($(this).attr('alt') === altText) {

          dispayContent.html(`<span class="goLeft"><</span><img src="${$img}" alt="${altText}" class='active'><span class='count'></span> <span class='captions'>${caption}</span><span class="x">X</span><span class="goRight">></span>`).show()


          $('.goRight').on('click', function () {
            var img = arr[index + 1].url
            $('.active').attr('src', img);

            $(".captions").text(arr[index + 1].captions);
            $('.count').text(arr[index++].name)
            // console.log() 
            // console.log($(arr[index + 1].url))

            if (index === (list.length) - 1) {
              $('.goRight').hide();
              console.log('end')
            }
          })

          $('.goLeft').on('click', function () {
            var img = arr[index - 1].url
            $('.active').attr('src', img);

            $(".captions").text(arr[index - 1].captions);
            $('.count').text(arr[index--].name)

            if (index === 0) {
              $('.goLeft').hide();
              console.log('end')
            }
          })


          $('.x').click(function () {
            $('.display').hide()
          })
        }
      });




    });
  });
  //
});
