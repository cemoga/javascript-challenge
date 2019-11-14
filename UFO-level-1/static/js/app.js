// from data.js
var tableData = data;

// YOUR CODE HERE!

// Select the button
var button = d3.select("#filter-btn" );


{/* <button id="filter-btn" type="button" class="btn btn-default">Filter Table</button> */}

button.on("click", function() {

    // Select the input element and get the raw HTML node
    var inputElement = d3.select(".form-control");
  
    // Get the value property of the input element
    var inputValue = inputElement.property("value");
  
    console.log(inputValue);
    console.log(tableData);
  
    var filteredData = tableData.filter(UFOShighting => UFOShighting.datetime === inputValue);
  
    console.log(filteredData);
  
  
    // Then, select the unordered list element by class name
    var list = d3.select("#tbody");
  
    // remove any children from the list to
    list.html("");
  
    // append stats to the list
    list.append("li").text(`Mean: ${mean}`);
    list.append("li").text(`Median: ${median}`);
    list.append("li").text(`Mode: ${mode}`);
    list.append("li").text(`Variance: ${variance}`);
    list.append("li").text(`Standard Deviation: ${standardDeviation}`);
  });