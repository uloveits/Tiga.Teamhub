//用于定义皮肤
//自定义皮肤
var dark_skin = {
  //颜色数组，默认从数组第一个元素取色
  colors: [
    "#00FF00", //chart背景色
    "#FFFF00", //线的颜色
    "#7798BF", //
    "#aaeeee",
    "#ff0066",
    "#eeaaee",
    "red",
    "#00FFFF", //双游标
    "#ffff00", //倍频 边频
    "#4A4E53", //checkedlabel color
    "#4A4E53", //checkedlabel border color
    "#FFF", //checkedlabel颜色
    "#FFF", //恢复缩放颜色
    "#ffff00", //标注
  ],
  //背景透明
  chart: {
    backgroundColor: "#000",
    reflow: true,
  },

  //title白色字
  title: {
    style: { color: "#FFFFFF", fontSize: "18px" },
    //align:"right"
  },

  //x,y轴上的字白色
  xAxis: {
    gridLineWidth: 0.5,
    tickLength: 5,
    gridLineColor: "#A9A9A9",
    minorGridLineWidth: 0,
    labels: {
      style: {
        color: "#FFFFFF",
      },
    },
    minPadding: 0.0,
    maxPadding: 0,
    endOnTick: false,
  },

  yAxis: {
    lineWidth: 1,
    gridLineWidth: 0.5,
    minorGridLineWidth: 0,
    tickWidth: 1,
    tickLength: 5,
    gridLineColor: "#A9A9A9",
    // minPadding: 0.0,
    title: {
      style: { color: "#FFFFFF" },
    },
    // markable: { enabled: false }, //不显示每一个点的实心
    labels: {
      style: {
        color: "#FFFFFF",
      },
    },
    tickPixelInterval: 100,
    showFirstLabel: false,
    showLastLabel: false,
    endOnTick: false,
    // showLastLabel: true,
    // startOnTick: true
    // maxPadding: 0
  },

  //图例上的字白色
  legend: {
    itemStyle: {
      font: "9pt Trebuchet MS, Verdana, sans-serif",
      color: "#A9A9A9",
    },
    itemHoverStyle: {
      font: "9pt Trebuchet MS, Verdana, sans-serif",
      color: "#FFFFFF",
    },
  },
  exporting: { enabled: false }, //隐藏导出按钮
  plotOptions: {
    series: {
      animation: false,
      enableMouseTracking: false,
      cropThreshold: 0,
    },
  },
};

var default_skin = {
  //颜色数组，默认从数组第一个元素取色
  colors: [
    "#377EEA", //线的颜色
    "#7798BF", //annotations border
    "#bcbcbc", //annotations background
    "#ff0066",
    "#eeaaee",
    "#55BF3B",
    "red",
    "blue", //双游标
    "blue", //倍频 边频
    "#f7f7f7", //checkedlabel color
    "#7798BF", //checkedlabel border color
    "#000", //checkedlabel颜色
    "#000", //恢复缩放颜色
    "#000",
  ],
  //背景透明
  chart: {
    backgroundColor: "#FFF",
    plotBackgroundColor: "#F4F4F4",
    plotBorderColor: "#BEBEBE",
    reflow: true,
    // plotBorderColor: '#346691',
    plotBorderWidth: 2,
    spacing: [5, 5, 5, 5],
  },
  //x,y轴上的字白色
  xAxis: {
    gridLineWidth: 1,
    gridLineColor: "#e1e1e1",
    tickLength: 5,
    minorGridLineWidth: 0,
    minPadding: 0,
    maxPadding: 0,
    endOnTick: false,
  },

  yAxis: {
    lineWidth: 1,
    gridLineColor: "#e1e1e1",
    gridLineWidth: 1,
    minorGridLineWidth: 0,
    tickWidth: 1,
    tickLength: 5,
    tickPixelInterval: 100,
    showFirstLabel: false,
    showLastLabel: false,
    endOnTick: false,
    // endOnTick: true,
    // showLastLabel: true,
    // startOnTick: true
    // minPadding: 0.0,
    // maxPadding: 0
  },

  //图例上的字白色
  legend: {},
  exporting: { enabled: false }, //隐藏导出按钮
  plotOptions: {
    series: {
      zIndex: 99999,
      animation: false,
      enableMouseTracking: false,
      cropThreshold: 0,
    },
  },
};
// 从storage中获取明暗主题配置，设置highchart的主题色；
if (window.localStorage) {
  try {
    var ls = JSON.parse(window.localStorage.getItem("RZGraphDarkTheme"));
    if (ls === false) {
      window.Highcharts.setOptions(default_skin);
    } else {
      window.Highcharts.setOptions(dark_skin);
    }
  } catch (e) {
    /*Ignore*/
    window.Highcharts.setOptions(dark_skin);
  }
} else {
  window.Highcharts.setOptions(dark_skin);
}
// window.Highcharts.setOptions(dark_skin);
