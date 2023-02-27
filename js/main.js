const FRAME_WIDTH = 500;
const FRAME_HEIGHT = 500;
const MARGINS = { top: 50, bottom: 50, left: 50, right: 50 };
const VIS_WIDTH = FRAME_WIDTH - MARGINS.left - MARGINS.right;
const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom;
const PADDING = 15;

const FRAME1 = d3
  .select("#vis1")
  .append("svg")
  .attr("height", FRAME_HEIGHT)
  .attr("width", FRAME_WIDTH)
  .attr("class", "frame");

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

  const MAX_X_LENGTH = d3.max(data, (d) => {
    return parseInt(d.Petal_Length);
  });

  const X_SCALE_LENGTH = d3
    .scaleLinear()
    .domain([0, MAX_X_LENGTH + 1])
    .range([0, VIS_WIDTH]);

  const MAX_Y_LENGTH = d3.max(data, (d) => {
    return parseInt(d.Sepal_Length);
  });

  const Y_SCALE_LENGTH = d3
    .scaleLinear()
    .domain([0, MAX_Y_LENGTH + 1])
    .range([VIS_WIDTH, 0]);

  FRAME1.selectAll("points")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", (d) => {
      return X_SCALE_LENGTH(d.Petal_Length) + MARGINS.left;
    })
    .attr("cy", (d) => {
      return Y_SCALE_LENGTH(d.Sepal_Length) + MARGINS.bottom;
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
    .call(d3.axisBottom(X_SCALE_LENGTH).ticks(5))
    .attr("font-size", 12);

  FRAME1.append("g")
    .attr("transform", `translate( ${MARGINS.bottom}, ${MARGINS.left})`)
    .call(d3.axisLeft(Y_SCALE_LENGTH).ticks(5))
    .attr("font-size", 12);

  FRAME1.append("text")
    .attr("x", FRAME_WIDTH / 2)
    .attr("y", MARGINS.top / 2)
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .style("text-decoration", "underline")
    .text("Petal Length vs Sepal Length");

  const MAX_X_WIDTH = d3.max(data, (d) => {
    return parseInt(d.Petal_Width);
  });

  const X_SCALE_WIDTH = d3
    .scaleLinear()
    .domain([0, MAX_X_WIDTH + 1])
    .range([0, VIS_WIDTH]);

  const MAX_Y_WIDTH = d3.max(data, (d) => {
    return parseInt(d.Sepal_Width);
  });

  const Y_SCALE_WIDTH = d3
    .scaleLinear()
    .domain([0, MAX_Y_WIDTH + 1])
    .range([VIS_WIDTH, 0]);

  FRAME2.selectAll("points")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", (d) => {
      return X_SCALE_WIDTH(d.Petal_Width) + MARGINS.left;
    })
    .attr("cy", (d) => {
      return Y_SCALE_WIDTH(d.Sepal_Width) + MARGINS.bottom;
    })
    .attr("r", 10)
    .attr("class", "point")
    .attr("fill", (d) => {
      return COLOR(d.Species);
    });

  FRAME2.append("g")
    .attr(
      "transform",
      "translate(" + MARGINS.left + "," + (VIS_HEIGHT + MARGINS.top) + ")"
    )
    .call(d3.axisBottom(X_SCALE_WIDTH).ticks(5))
    .attr("font-size", 12);

  FRAME2.append("g")
    .attr("transform", `translate( ${MARGINS.bottom}, ${MARGINS.left})`)
    .call(d3.axisLeft(Y_SCALE_WIDTH).ticks(5))
    .attr("font-size", 12);

  const FRAME3 = d3
    .select("#vis3")
    .append("svg")
    .attr("height", FRAME_HEIGHT)
    .attr("width", FRAME_WIDTH)
    .attr("class", "frame");

  const X_SCALE = d3
    .scaleBand()
    .range([0, VIS_WIDTH])
    .domain(
      data.map(function (d) {
        return d.Species;
      })
    )
    .padding(0.2);

  const MAX_Y = 50;

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
    .attr("height", VIS_HEIGHT - 50)
    .attr("class", "bar")
    .attr("fill", (d) => {
      return COLOR(d.Species);
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

  let brushExtent;

  function handleBrush(e) {
    brushExtent = e.selection;
    update();
  }

  function isInBrushExtent(d) {
    return (
      brushExtent &&
      X_SCALE_WIDTH(d.Petal_Width) >= brushExtent[0][0] - MARGINS.left &&
      X_SCALE_WIDTH(d.Petal_Width) <= brushExtent[1][0] - MARGINS.right &&
      Y_SCALE_WIDTH(d.Sepal_Width) >= brushExtent[0][1] - MARGINS.top &&
      Y_SCALE_WIDTH(d.Sepal_Width) <= brushExtent[1][1] - MARGINS.bottom
    );
  }

  function update() {
    d3.select("#vis1")
      .selectAll("circle")
      .data(data)
      .attr("cx", (d) => {
        return X_SCALE_LENGTH(d.Petal_Length) + MARGINS.left;
      })
      .attr("cy", (d) => {
        return Y_SCALE_LENGTH(d.Sepal_Length) + MARGINS.bottom;
      })
      .attr("r", 10)
      .attr("class", "point")
      .attr("fill", (d) => {
        return COLOR(d.Species);
      })
      .attr("stroke", (d) => {
        return isInBrushExtent(d) ? "orange" : null;
      })
      .attr("stroke-width", 5)
      .style("opacity", (d) => {
        return isInBrushExtent(d) ? 0.8 : 0.5;
      });

    FRAME3.selectAll("bars")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", function (d) {
        return X_SCALE(d.Species) + MARGINS.left;
      })
      .attr("y", 50 + MARGINS.bottom)
      .attr("width", X_SCALE.bandwidth())
      .attr("height", VIS_HEIGHT - 50)
      .attr("class", "bar")
      .attr("fill", (d) => {
        return COLOR(d.Species);
      })
      .attr("stroke", (d) => {
        return isInBrushExtent(d) ? "orange" : null;
      })
      .attr("stroke-width", (d) => {
        return isInBrushExtent(d) ? 5 : null;
      });
  }

  update();

  FRAME2.append("text")
    .attr("x", FRAME_WIDTH / 2)
    .attr("y", MARGINS.top / 2)
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .style("text-decoration", "underline")
    .text("Petal Width vs Sepal Width");

  FRAME2.append("g").attr("id", "brush");
  FRAME2.select("#brush").call(
    d3
      .brush()
      .extent([
        [0, 0],
        [500, 500],
      ])
      .on("start brush", handleBrush)
  );
});
