const musicInfo = [];

function addSongFromField(event) {
  event.preventDefault();

  const info = $('#musicField').eq(0).val();

  musicInfo.push(info);
  renderList();
  $('#musicField').eq(0).val('');
}

$('#addButton').click(addSongFromField);
$('#musicField').keyup(function(event) {
  if (event.which == 13) { // User presses Enter
    addSongFromField(event);
  }
});

function renderList() {
  const $list = $('.info').eq(0);

  $list.empty();

  for (const info of musicInfo) {
    const $item = $('<li class="list-group-item">').text(info);

    $list.append($item)
  }
}

$('#getPlaylistBtn').click(function (event) {
  var iTunesURL = 'https://itunes.apple.com/search'
  for (var i = 0; i < musicInfo.length; i++) {
    var musicKeyword = musicInfo[i];
    let iTunesOptions = { 
      term: musicKeyword,
      limit: 5,
      format: "json"
    };

    $.getJSON( iTunesURL, iTunesOptions, function(data){
        $.each(data.results, function(i,result) {
          console.log("what");
          var newItem = "<p>";
          newItem += result.artistName + ": " + result.trackName + "</p>";
          $("#results").append(newItem);
        })
      }
    )
  };
  // You may use anything from musicInfo.
  console.log('Testing Music Call');
});
