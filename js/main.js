const FRAME_WIDTH = 500;
const FRAME_HEIGHT = 500;
const MARGINS = { top: 50, bottom: 50, left: 50, right: 50 };
const VIS_WIDTH = FRAME_WIDTH - MARGINS.left - MARGINS.right;
const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom;

const FRAME1 = d3
  .select("#vis1")
  .append("svg")
  .attr("height", FRAME_HEIGHT)
  .attr("width", FRAME_WIDTH)
  .attr("class", "frame");

d3.csv("data/iris.csv").then((data) => {
    const COLOR = d3
      .scaleOrdinal()
      .domain(["setosa", "versicolor", "virginica"])
      .range(["red", "green", "blue"]);

    const MAX_X = d3.max(data, (d) => {
      return parseInt(d.Petal_Length);
    });

    const X_SCALE = d3
      .scaleLinear()
      .domain([0, MAX_X + 1])
      .range([0, VIS_WIDTH]);

    const MAX_Y = d3.max(data, (d) => {
      return parseInt(d.Sepal_Length);
    });

    const Y_SCALE = d3
      .scaleLinear()
      .domain([0, MAX_Y + 1])
      .range([VIS_WIDTH, 0]);

    FRAME1.selectAll("points")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", (d) => {
        return X_SCALE(d.Petal_Length) + MARGINS.left;
      })
      .attr("cy", (d) => {
        return Y_SCALE(d.Sepal_Length) + MARGINS.bottom;
      })
      .attr("r", 10)
      .attr("class", "point")
      .attr("fill", (d) => {
        return COLOR(d.Species);
      });

    FRAME1.append("g")
      .attr(
        "transform",
        "translate(" + MARGINS.left + "," + (VIS_HEIGHT + MARGINS.top) + ")"
      )
      .call(d3.axisBottom(X_SCALE).ticks(5))
      .attr("font-size", 12);

    FRAME1.append("g")
      .attr("transform", `translate( ${MARGINS.bottom}, ${MARGINS.left})`)
      .call(d3.axisLeft(Y_SCALE).ticks(5))
      .attr("font-size", 12);

    FRAME1.append("text")
      .attr("x", FRAME_WIDTH / 2)
      .attr("y", MARGINS.top / 2)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .style("text-decoration", "underline")
      .text("Value vs Date Graph");
});
