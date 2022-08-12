var margin = { top: 50, right: 50, bottom: 0, left: 50 },
  width = 960 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

var formatTickDate = d3.timeFormat('%A %e');
var formatTooltipDate = d3.timeFormat('%A %e - %H:%M');

var startDate = Date.now();
var endDate = new Date();

Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

var moving = false;
var targetValue = width;
var timer;

endDate = endDate.addDays(10);

var tickVals = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((iter) => new Date().setHours(24 * iter, 0, 0, 0));

var playButton = d3.select('#play-button');

var sliderTime = d3
  .sliderBottom()
  .min(startDate)
  .max(endDate)
  .step(1000 * 60 * 60 * 3)
  .width(width + margin.left + margin.right - 20)
  .tickFormat(formatTickDate)
  .tickValues(tickVals)
  .fill('#2196f3')
  .displayFormat(formatTooltipDate)
  .default(Date.now())
  .handle(d3.symbol().type(d3.symbolCircle).size(200)())
  .on('drag', function (val) {
    resetTimer();
  })
  .on('onchange', function (val) {
    d3.select('.tick text').attr('opacity', '1');
    d3.select('p#value-time').text(formatTooltipDate(val));
  });
//nell'onchange aggiorna i layers

var gTime = d3.select('div#slider-time').append('svg').attr('width', 1000).attr('height', 100).append('g').attr('transform', 'translate(30,30)');

gTime.call(sliderTime);

d3.select('p#value-time').text(formatTooltipDate(sliderTime.value()));
d3.select('.parameter-value text').attr('y', '-29');
d3.selectAll('.tick text').style('text-anchor', 'start');
document.querySelector('.parameter-value path').removeAttribute('tabindex');

playButton.on('click', function () {
  var button = d3.select(this);
  if (button.text() == 'Pause') {
    resetTimer();
  } else {
    moving = true;
    timer = setInterval(update, 1000);
    button.text('Pause');
  }
});

function update() {
  var offset = sliderTime.value().valueOf() + 10800000;
  sliderTime.value(offset);
  //pause, uncomment to restart
  if (offset >= endDate.valueOf()) {
    resetTimer();
    // sliderTime.value(startDate.valueOf());
  }
}

function resetTimer() {
  moving = false;
  clearInterval(timer);
  playButton.text('Play');
}
