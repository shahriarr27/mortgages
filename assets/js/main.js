$(document).ready(function() {
  $('#state_select').select2();

    
    $.get("assets/files/data.csv", function(data) {
      // Parse the CSV data
      const parsedData = Papa.parse(data).data;

      //group the data by state
      const groupedData = [];

      parsedData.forEach((row) => {
        const state = row[0];
        if (!groupedData[state]) {
          groupedData[state] = [];
        }
        groupedData[state].push(row.slice(1));
      });
      console.log(groupedData);

      //extract state names
      var stateNames = Object.keys(groupedData);
      for(let i = 0; i < stateNames.length; i++) {
        if(stateNames[i] === "" || stateNames[i] === 'State') {
          stateNames.splice(i, 1);
        }
      }

      //show state name at dropdown
      const container = document.getElementById("state_select");
      for(var i = 0; i < stateNames.length; i++) {
        container.innerHTML += `
          <option value="option${i+1}">
            ${stateNames[i]}
          </option>
        `;
      }

      console.log(stateNames);
      // show results for each state in properties
      const singlePropertyWrapper = document.getElementById("property-wrapper");
      // var properties = groupedData[stateNames[0]];
      
      // groupedData.forEach(function(property){
      //   console.log(property);
      // })
      for(var i = 0; i < stateNames.length; i++) {
        singlePropertyWrapper.innerHTML += `
        <div id="option${i+1}" class="single-property-wrapper">
          ${stateNames[i]}
      
        </div>
        
        `;
      }
    });
    
    //hides dropdown content
    $(".single-property-wrapper").hide();
    
    //unhides first option content
    $("#option1").show();
    
    //listen to dropdown for change
    $("#state_select").change(function(){
      //rehide content on change
      $('.single-property-wrapper').hide();
      //unhides current item
      $('#'+$(this).val()).fadeIn();
    });
});