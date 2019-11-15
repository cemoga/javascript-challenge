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
  
  
    // Then, select the unordered table element
    var tbody = d3.select("tbody");
  
    // remove any children from the table to
    tbody.html("");
  
    filteredData.forEach(UFOsight => {
        var row = tbody.append("tr");
        Object.entries(UFOsight).forEach(([key, value]) => {
          var cell = row.append("td");
          cell.text(value);
        });
      });
    
  });