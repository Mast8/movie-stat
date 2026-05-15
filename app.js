
// help button event
document.getElementById("helpBtn").addEventListener("click", () => {
    //get active div
    //ternary to get active table
    const catalogDiv = document.getElementById("catalog");    
    const activeTable = catalogDiv.style.display === "none" ? "Table 2" : "Table 1";

    //message that includes active table variable
    const message =
        "Help (Active: " + activeTable + ")\n\n" +
        "- Dropdown switches between Table 1 and Table 2.\n" +
        "- Sort prompts for a column name alphabetically or for numbers ascending.\n" +
        "- Reset restores default sorting by ID.\n" +
        "- Dark Mode toggles dark/light theme.\n" +
        "- Background Image toggles a page background image.";
    // send alert message
    alert(message);
});


//change div from list1 to list 2 including titles and hide the other
document.addEventListener("DOMContentLoaded", () => {
            const tableSelect =document.getElementById("tableSelect");
            const catalogDiv = document.getElementById("catalog");

            //const catalogTable = document.getElementById("catalog-table");
            const statsDiv = document.getElementById("stats");

            // hide stats on load
            statsDiv.style.display = "none";

            // event for change in select
            tableSelect.addEventListener("change", () => {
                if (tableSelect.value === "inventory") {

                    // show table 1, hide table 2
                    catalogDiv.style.display = "block";
                    statsDiv.style.display = "none";
                } else if (tableSelect.value === "stats") {
                    // hide table 1, show table 2
                    catalogDiv.style.display = "none";
                    statsDiv.style.display = "block";
                    //create table 2
                    buildTable();
                }
            });
         } );

 //function to create table 2
 function buildTable() {
            document.getElementById("stats").innerHTML = "";
            
            // adds title to div for table
            const title = document.createElement("h2");
            title.textContent = "Table 2 - Viewer Stats";
            document.getElementById("stats").appendChild(title);

            // build stats table
            const statsTable = document.createElement("table");
        
            // header row from first object keys
            const statsKeys = Object.keys(statsJSON[0]);
            const statsHeaderRow = document.createElement("tr");

            // add each object key to the header
            for (let k of statsKeys) {
                const th = document.createElement("th");
                th.textContent = k;
                statsHeaderRow.appendChild(th);
            }
            statsTable.appendChild(statsHeaderRow);
        
            // data rows
            statsJSON.forEach(item => {
                const tr = document.createElement("tr");
                // loop for all keys
                for (let k of statsKeys) {
                    //adds data to td
                    const td = document.createElement("td");
                    td.textContent = item[k];
                    // append tr to td
                    tr.appendChild(td);
                }
                statsTable.appendChild(tr);
            });
            // append table to element stats
            document.getElementById("stats").appendChild(statsTable);
    }


//create html table 
function getHTMLTable(tableId) {
    const table = document.getElementById(tableId);
    // skip the header row
    const rows = Array.from(table.rows).slice(1); 

    // create object from html table
    return rows.map(row => {
        const cells = row.cells;
        return {
            // Mapping the HTML cells to object keys
            ID: parseInt(cells[0].innerText),
            Title: cells[1].innerText,
            Type: cells[2].innerText,
            Genre: cells[3].innerText,
            Year: parseInt(cells[4].innerText),
            Rating: cells[5].innerText,
            Duration: cells[6].innerText,
            Language: cells[7].innerText,
            Director: cells[8].innerText
        };
    });
}

// initialize the catalog array from the existing HTML
let catalog = getHTMLTable("catalog-table");

//sort button
document.getElementById("sortBtn").addEventListener("click", () => {
    
    const catalogDiv = document.getElementById("catalog");
    // check active table
    const activeTable = catalogDiv.style.display === "none" ? "Table 2" : "Table 1";
    const isTable1 = catalogDiv.style.display !== "none";

    // get keys based on active table
    const activeKeys = isTable1 ? Object.keys(catalog[0]) : Object.keys(statsJSON[0]);

    // ask for column name and adds keys for easy use
    const input = prompt( "(Active " + activeTable + ")\nSort by column, the options (case sensitive) are:\n" + activeKeys.join(", "));
    
    //avoid wrong message if click cancel
    if (input === null) return;

    // check if input is valid
    if (!activeKeys.includes(input)) {
        alert("Invalid Input");
        return;
    }

    // sort active table
    if (isTable1) {
        catalog.sort((a, b) => {
            // sorts numbers from low to high
            if (typeof a[input] === "number") {
                return a[input] - b[input];   
            // sorts text ascending
            } else {
                // alphabetical A to Z
                return a[input] > b[input] ? 1 : -1; 
            }
        });
        // rebuild table 1 with sorted data
        buildCatalogTable(); 

    } else {
        // sort data 
        statsJSON.sort((a, b) => {
            if (typeof a[input] === "number") {
                // sorts numbers from low to high
                return a[input] - b[input];
            // sorts text ascending
            } else {
                return a[input] > b[input] ? 1 : -1;
            }
        });
        // rebuild table 2 with sorted data
        buildTable(); 
    }
});

// function to clear the HTML table and rewrite it with sorted data
function buildCatalogTable() {
    const table = document.getElementById("catalog-table");
    
    // remove all rows except the header (index 0)
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }

    // insert the sorted data back into the HTML
    catalog.forEach(item => {
        const row = table.insertRow();
        row.innerHTML = `
            <td>${item.ID}</td>
            <td>${item.Title}</td>
            <td>${item.Type}</td>
            <td>${item.Genre}</td>
            <td>${item.Year}</td>
            <td>${item.Rating}</td>
            <td>${item.Duration}</td>
            <td>${item.Language}</td>
            <td>${item.Director}</td>
        `;
    });
}

//reset button event
document.getElementById("resetBtn").addEventListener("click", () => {
    
    const catalogDiv = document.getElementById("catalog");
    // check active table
    const isTable1 = catalogDiv.style.display !== "none";
    if(isTable1){
        // sorts and build table 1 by ID ascending
        catalog.sort((a,b) => a.ID -b.ID);
        buildCatalogTable();
    } else {
        //sorts table 2 by ID ascending
        statsJSON.sort((a,b) => a.ID -b.ID );
        //render the html for table 2
        buildTable();
    }
    
});

// dark mode code
document.getElementById("darkBtn").addEventListener("click", () => {
    //adds the dark class to body
    document.body.classList.toggle("dark");
    const darkBtn = document.getElementById("darkBtn");
    //changes button text from light to dark
    darkBtn.textContent = document.body.classList.contains("dark") ? "Light Mode" : "Dark Mode";
});

// change background event
document.getElementById("bgBtn").addEventListener("click", function() {
    const body = document.body;
    const btn = document.getElementById("bgBtn");

    body.classList.toggle("bg-change");
    //check the text of the btn
    if(body.classList.contains("bg-change")){
        btn.textContent = "Background Image [ON]";
    } else {
        btn.textContent = "Background Image [OFF]";
    }
});