export default {
  getChartHeight (vuetifyBreakpointName) {
    switch (vuetifyBreakpointName) {
      case 'xs': return 200;
      case 'sm': return 230;
      case 'md': return 500;
      case 'lg': return 500;
      case 'xl': return 800;
      default : throw Error("Invalid $vuetify.breakpoint.name: " + vuetifyBreakpointName);
    }
  }
}