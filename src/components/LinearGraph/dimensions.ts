export const DIMENSIONS = {
  width: 900,
  height: 400,
  margin: {
    top: 15,
    right: 15,
    bottom: 40,
    left: 60
  },
  get boundedWidth() {
    return this.width - this.margin.left - this.margin.right;
  },
  get boundedHeight() {
    return DIMENSIONS.height - DIMENSIONS.margin.top - DIMENSIONS.margin.bottom;
  }
};
