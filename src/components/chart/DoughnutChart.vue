<script>
  import { Doughnut, mixins } from "vue-chartjs"
  const { reactiveProp } = mixins

  export default {
    extends: Doughnut,
    mixins: [reactiveProp],
    props: {
      options: {
        type: Object
      }
    },

    mounted () {
      this.renderChart(this.chartData, this.options)
    },

    watch: {
      options: {
        deep: true,
        handler: function () {
          this.renderChart(this.chartData, this.options);
        }
      }
    }
  };
</script>
