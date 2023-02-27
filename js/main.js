const FRAME_WIDTH = 500;
const FRAME_HEIGHT = 500;
const MARGINS = { top: 50, bottom: 50, left: 50, right: 50 };
const VIS_WIDTH = FRAME_WIDTH - MARGINS.left - MARGINS.right;
const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom;
const PADDING = 15

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
      .text("Petal Length vs Sepal Length");
});

const FRAME2 = d3
  .select("#vis2")
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
    return parseInt(d.Petal_Width);
  });

  const X_SCALE = d3
    .scaleLinear()
    .domain([0, MAX_X + 1])
    .range([0, VIS_WIDTH]);

  const MAX_Y = d3.max(data, (d) => {
    return parseInt(d.Sepal_Width);
  });

  const Y_SCALE = d3
    .scaleLinear()
    .domain([0, MAX_Y + 1])
    .range([VIS_WIDTH, 0]);

  FRAME2.selectAll("points")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", (d) => {
      return X_SCALE(d.Petal_Width) + MARGINS.left;
    })
    .attr("cy", (d) => {
      return Y_SCALE(d.Sepal_Width) + MARGINS.bottom;
    })
    .attr("r", 10)
    .attr("class", "point")
    .attr("fill", (d) => {
      return COLOR(d.Species);
    });

    FRAME2.append("g")
      .attr("class", "brush")
      .call(
        d3.brush().extent([
          [0, 0],
          [500, 500],
        ])
      );

  FRAME2.append("g")
    .attr(
      "transform",
      "translate(" + MARGINS.left + "," + (VIS_HEIGHT + MARGINS.top) + ")"
    )
    .call(d3.axisBottom(X_SCALE).ticks(5))
    .attr("font-size", 12);

  FRAME2.append("g")
    .attr("transform", `translate( ${MARGINS.bottom}, ${MARGINS.left})`)
    .call(d3.axisLeft(Y_SCALE).ticks(5))
    .attr("font-size", 12);

  FRAME2.append("text")
    .attr("x", FRAME_WIDTH / 2)
    .attr("y", MARGINS.top / 2)
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .style("text-decoration", "underline")
    .text("Petal Width vs Sepal Width");

})

const FRAME3 = d3
    .select("#vis3")
    .append("svg")
    .attr("height", FRAME_HEIGHT)
    .attr("width", FRAME_WIDTH)
    .attr("class", "frame");

d3.csv("data/iris.csv").then((data) => {
  console.log(data);

  const COLOR = d3
      .scaleOrdinal()
      .domain(["setosa", "versicolor", "virginica"])
      .range(["red", "green", "blue"]);

  const X_SCALE = d3
    .scaleBand()
    .range([0, VIS_WIDTH])
    .domain(
      data.map(function (d) {
        return d.Species;
      })
    )
    .padding(0.2);

  const MAX_Y = 50

  const Y_SCALE = d3
    .scaleLinear()
    .domain([0, MAX_Y + 5])
    .range([VIS_HEIGHT, 0]);

  FRAME3.selectAll("bars")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", function (d) {
      return X_SCALE(d.Species) + MARGINS.left;
    })
    .attr("y", 50 + MARGINS.bottom)
    .attr("width", X_SCALE.bandwidth())
    .attr("height", (VIS_HEIGHT - 50))
    .attr("class", "bar")
    .attr("fill", (d) => {
      return COLOR(d.Species)
    });

  FRAME3.append("g")
    .attr(
      "transform",
      "translate(" + MARGINS.left + "," + (VIS_HEIGHT + MARGINS.top) + ")"
    )
    .call(d3.axisBottom(X_SCALE).ticks(5))
    .attr("font-size", 12);

  FRAME3.append("g")
    .attr("transform", `translate( ${MARGINS.bottom}, ${MARGINS.left})`)
    .call(d3.axisLeft(Y_SCALE).ticks(5))
    .attr("font-size", 12);

  FRAME3.append("text")
    .attr("x", FRAME_WIDTH / 2)
    .attr("y", MARGINS.top / 2)
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .style("text-decoration", "underline")
    .text("Counts of Iris Species");
  
})

FRAME2.append("g")
        .attr("class", "brush")
        .call(d3.brush())
           // .extent([[0, 0], [VIS_WIDTH, VIS_HEIGHT]])
         // .on("start brush", updateChart));


function UpdateChart() {
  d3.csv("data/iris.csv").then((data) => {
      console.log(data);



  })

}

