# chartjs-plugin-whisker
ChartJS plugin that allows you to draw error bar whiskers onto your existing chart


# Install
npm install chartjs-plugin-whisker

# Default options
```javascript
plugins: {
  whiskers: {
    enable: false,
    color: '#A9A9A9',
    fontFamily: 'Arial',
    lineWidth: 2,
    label: {
      min: 'min',
      center: 'middle',
      max: 'max'
    }
  }
}
```

# How to use 
```javascript
var chart = new Chart(ctx, {
    type: 'horizontalBar',
    data: {"datasets":[
      {"label":"Summative","data":[15,"41.67"],"backgroundColor":"#40442B", "whiskers":[{"min": 7,"center": 11, "max": 20},{"min": 33,"center": 43, "max": 55}]},
      {"label":"OSCE","data":["85.78",0],"backgroundColor":"#DF506C", "whiskers":[{"min": 76,"center": 85, "max": 96, },{}]},
      {"label":"NBME","data":["75.59","41.67"],"backgroundColor":"#4EDAAB","whiskers":[{"min": 52,"center": 65, "max": 78},{"min": 32,"center": 42, "max": 68}]},
      {"label":"Final","data":["85.64","41.67"],"backgroundColor":"#B5CF8E"}],
      "labels":["Clerkship - Pediatrics","Clerkship - Psychiatry"]},
    options: {
        plugins: {
            whiskers: {
              enable: true,
              label: {
                min: '-1 STD',
                center: 'Average',
                max: '+1 STD'
              }
            }
        }
      }
    })
```
