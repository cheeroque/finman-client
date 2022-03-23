<template>
  <div class="card card-widget">
    <div class="card-header">
      <h5 class="card-title">В&nbsp;этом месяце</h5>
    </div>
    <SvgChartHorizontal
      :border-radius="4"
      :combine-threshold="0.05"
      :items="chartData"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      chartData: [
        {
          displayValue: '6 368',
          fill: '#ff8040',
          label: 'Красота и здоровье',
          textFill: '#fff',
          value: 6368,
        },
        {
          displayValue: '2 817',
          fill: '#004080',
          label: 'Хозтовары',
          textFill: '#fff',
          value: 2817,
        },
        {
          displayValue: '667',
          fill: '#8000ff',
          label: 'Для дома',
          textFill: '#fff',
          value: 667,
        },
        {
          displayValue: '510',
          fill: '#cb1245',
          label: 'Продукты',
          textFill: '#fff',
          value: 510,
        },
        {
          displayValue: '500',
          fill: '#008080',
          label: 'Транспорт',
          textFill: '#fff',
          value: 500,
        },
      ],
    }
  },
}
</script>
