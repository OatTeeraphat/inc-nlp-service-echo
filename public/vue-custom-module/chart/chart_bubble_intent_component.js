export default Vue.component('bubble-chart-intent', {
  extends: VueChartJs.Bubble,
  props: ['dataChart'],
  mounted() {
    this.$nextTick(() => {
      //console.log(this.dataChart)
      this.createChart()
    })
  },
  methods : {
    createChart() {
      this.renderChart({
        labels: ['Data'],
        datasets: [
          {
            label: 'GREETING',
            backgroundColor: colorByStory.GREETING,
            pointBackgroundColor: 'white',
            borderWidth: 1,
            pointBorderColor: colorByStory.GREETING,
            data: [
              {
                x: 65,
                y: 75,
                r: 80,
                intent: "สวัสดีจ้า",
                calls: "1,938",
                story_name: "GREETING"
              },
              {
                x: 90,
                y: 38,
                r: 45,
                intent: "หิวมั้ย",
                calls: "1,038",
                story_name: "GREETING"
              },
              {
                x: 5,
                y: 95,
                r: 3,
                intent: "สบายดีรึป่าว",
                calls: "7",
                story_name: "GREETING"
              },
              {
                x: 65,
                y: 40,
                r: 3,
                intent: "มีคนมั้ย",
                calls: "7",
                story_name: "GREETING"
              },
              {
                x: 10,
                y: 5,
                r: 12,
                intent: "Hello Dog",
                calls: "32",
                story_name: "GREETING"
              },
            ]
          },
          {
            label: 'CHITCHAT',
            backgroundColor: colorByStory.CHITCHAT,
            pointBackgroundColor: 'white',
            borderWidth: 1,
            pointBorderColor: colorByStory.CHITCHAT,
            data: [
              {
                x: 15,
                y: 70,
                r: 60,
                intent: "กินข้าวยัง",
                calls: "1,438",
                story_name: "CHITCHAT"
              },
              {
                x: 50,
                y: 20,
                r: 40,
                intent: "ชื่อรัยอ่ะ",
                calls: "913",
                story_name: "CHITCHAT"
              },
              {
                x: 20,
                y: 30,
                r: 25,
                intent: "รักน่ะเด็กดื้อ",
                calls: "412",
                story_name: "CHITCHAT"
              },
              {
                x: 92,
                y: 92,
                r: 5,
                intent: "ดีจังตังอยู่ครบ",
                calls: "12",
                story_name: "CHITCHAT"
              }
            ]
          },
          {
            label: 'FAQ',
            backgroundColor: colorByStory.FAQ,
            pointBackgroundColor: 'white',
            borderWidth: 1,
            pointBorderColor: colorByStory.FAQ,
            data: [
              {
                x: 85,
                y: 10,
                r: 20,
                intent: "ถามใรตอบได้",
                calls: "112",
                story_name: "FAQ"
              },
              {
                x: 45,
                y: 40,
                r: 15,
                intent: "จัดส่งอย่างไร",
                calls: "42",
                story_name: "FAQ"
              },
              {
                x: 40,
                y: 75,
                r: 10,
                intent: "จัดส่งที่ไหน",
                calls: "12",
                story_name: "FAQ"
              }
            ]
          },
          {
            label: 'PRODUCT',
            backgroundColor: colorByStory.PRODUCT,
            pointBorderColor: colorByStory.PRODUCT,
            data: [
              {
                x: 35,
                y: 85,
                r: 20,
                intent: "อยากดูของ",
                calls: "95",
                story_name: "PRODUCT"
              },
              {
                x: 30,
                y: 3,
                r: 15,
                intent: "มีรัยขาย",
                calls: "42",
                story_name: "PRODUCT"
              },
              {
                x: 90,
                y: 65,
                r: 5,
                intent: "ของหมดแล้วต้องสั่งนะ",
                calls: "12",
                story_name: "PRODUCT"
              }
            ]
          }
        ]
      }, 
      {
          plugins: {
            datalabels: {
              anchor: function (context) {
                var value = context.dataset.data[context.dataIndex];
                return value.r < 30 ? 'end' : 'center';
              },
              align: function (context) {
                var value = context.dataset.data[context.dataIndex];
                return value.r < 30 ? 'end' : 'center';
              },
              color: function (context) {
                var value = context.dataset.data[context.dataIndex];
                return value.r < 30 ? colorByStory[value.story_name] : 'white';
              },
              font: {
                weight: 'bold',
                family: "'Poppins', 'Bai Jamjuree'",
                textAlign: 'center'
              },
              formatter: function (value, context) {
                var value = context.dataset.data[context.dataIndex];
                return value.r > 10 ? value.intent + '\n' + value.calls : '';
              },
              offset: 2,
              padding: 0
            }
          },
          scales: {
            yAxes: [{
              angleLines: {
                display: false
              },
              ticks: {
                display: false,
                maxTicksLimit: 2,
                max: 100
              },
              gridLines: {
                display: false,
                drawBorder: false
              }
            }],
            xAxes: [{
              ticks: {
                display: false,
                maxTicksLimit: 2
              },
              gridLines: {
                display: false,
                drawBorder: false
              }
            }]
          },
          legend: {
            display: false
          },
          tooltips: {
            enabled: true,
            mode: 'single',
            titleFontColor: "#888",
            titleFontSize: 12,
            bodyFontColor: "#673AB7",
            bodyFontSize: 16,
            bodyFontStyle: 'bold',
            footerFontSize: 10,
            footerFontStyle: 'bold',
            footerFontColor: "#888",
            footerSpacing: 2,
            backgroundColor: "rgba(256,256,256,0.95)",
            displayColors: false,
            borderColor: "rgba(220, 220, 220, 0.9)",
            borderWidth: 2,
            callbacks: {
              title: function (it, data) {
                //console.log(it, data)
                return data.datasets[it[0].datasetIndex].data[it[0].index].intent
              },
              label: function (it, data) {
                console.log(it, data)
                return data.datasets[it.datasetIndex].data[it.index].calls
              },
              footer: function (it, data) {
                return data.datasets[it[0].datasetIndex].label;
              }
            }
          },
          responsive: true,
          maintainAspectRatio: false,
          height: 150
      })
    }
  },
  watch: {
    dataChart() {
      this.$nextTick(() => {
        this.createChart()
      })
    }
  }
})


// [
//   {
//     label: 'GREETING',
//     backgroundColor: colorByStory.GREETING,
//     pointBackgroundColor: 'white',
//     borderWidth: 1,
//     pointBorderColor: colorByStory.GREETING,
//     data: [
//       {
//         x: 65,
//         y: 75,
//         r: 80,
//         intent: "สวัสดีจ้า",
//         calls: "1,938",
//         story_name: "GREETING"
//       },
//       {
//         x: 90,
//         y: 38,
//         r: 45,
//         intent: "หิวมั้ย",
//         calls: "1,038",
//         story_name: "GREETING"
//       },
//       {
//         x: 5,
//         y: 95,
//         r: 3,
//         intent: "สบายดีรึป่าว",
//         calls: "7",
//         story_name: "GREETING"
//       },
//       {
//         x: 65,
//         y: 40,
//         r: 3,
//         intent: "มีคนมั้ย",
//         calls: "7",
//         story_name: "GREETING"
//       },
//       {
//         x: 10,
//         y: 5,
//         r: 12,
//         intent: "Hello Dog",
//         calls: "32",
//         story_name: "GREETING"
//       },
//     ]
//   },
//   {
//     label: 'CHITCHAT',
//     backgroundColor: colorByStory.CHITCHAT,
//     pointBackgroundColor: 'white',
//     borderWidth: 1,
//     pointBorderColor: colorByStory.CHITCHAT,
//     data: [
//       {
//         x: 15,
//         y: 70,
//         r: 60,
//         intent: "กินข้าวยัง",
//         calls: "1,438",
//         story_name: "CHITCHAT"
//       },
//       {
//         x: 50,
//         y: 20,
//         r: 40,
//         intent: "ชื่อรัยอ่ะ",
//         calls: "913",
//         story_name: "CHITCHAT"
//       },
//       {
//         x: 20,
//         y: 30,
//         r: 25,
//         intent: "รักน่ะเด็กดื้อ",
//         calls: "412",
//         story_name: "CHITCHAT"
//       },
//       {
//         x: 92,
//         y: 92,
//         r: 5,
//         intent: "ดีจังตังอยู่ครบ",
//         calls: "12",
//         story_name: "CHITCHAT"
//       }
//     ]
//   },
//   {
//     label: 'FAQ',
//     backgroundColor: colorByStory.FAQ,
//     pointBackgroundColor: 'white',
//     borderWidth: 1,
//     pointBorderColor: colorByStory.FAQ,
//     data: [
//       {
//         x: 85,
//         y: 10,
//         r: 20,
//         intent: "ถามใรตอบได้",
//         calls: "112",
//         story_name: "FAQ"
//       },
//       {
//         x: 45,
//         y: 40,
//         r: 15,
//         intent: "จัดส่งอย่างไร",
//         calls: "42",
//         story_name: "FAQ"
//       },
//       {
//         x: 40,
//         y: 75,
//         r: 10,
//         intent: "จัดส่งที่ไหน",
//         calls: "12",
//         story_name: "FAQ"
//       }
//     ]
//   },
//   {
//     label: 'PRODUCT',
//     backgroundColor: colorByStory.PRODUCT,
//     pointBorderColor: colorByStory.PRODUCT,
//     data: [
//       {
//         x: 35,
//         y: 85,
//         r: 20,
//         intent: "อยากดูของ",
//         calls: "95",
//         story_name: "PRODUCT"
//       },
//       {
//         x: 30,
//         y: 3,
//         r: 15,
//         intent: "มีรัยขาย",
//         calls: "42",
//         story_name: "PRODUCT"
//       },
//       {
//         x: 90,
//         y: 65,
//         r: 5,
//         intent: "ของหมดแล้วต้องสั่งนะ",
//         calls: "12",
//         story_name: "PRODUCT"
//       }
//     ]
//   }
// ]