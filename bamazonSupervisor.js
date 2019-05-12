var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "bamazon"
});

var query = connection.connect(function(err) {
  if (err) throw err;
  console.log("connection successful");
  queryBamazon();
  promptSupervisor();
});

function queryBamazon() {
    console.log(`
      ____  ___    __  ______ _____   ____  _   __
     / __ )/   |  /  |/  /   /__  /  / __ \/ | / /
    / __  / /| | / /|_/ / /| | / /  / / / /  |/ /
   / /_/ / ___ |/ /  / / ___ |/ /__/ /_/ / /|  /
  /_____/_/  |_/_/  /_/_/  |_/____/\____/_/ |_/
  `);
    console.log("Items up for sale");
    console.log("------------------");
};

function promptSupervisor(){
    inquirer
        .prompt({
            type: "list",
            name: "choice",
            message: "What would you like to do?",
            choices: [
                "View product sales by department",
                "Create new department",
                "Quit"
            ]
        }).then(function(answer){
            switch(answer.choice){
                case "View product sales by department":
                    viewSales();
                    break;
                case "Create new department":
                    addDepartment(query);
                    break;
                case "Quit":
                    connection.end();
            }
        })
}

function viewSales(){
    console.log("BAMAZON PROFIT/LOSS STATEMENT");
     var mySql = `SELECT
                    d.departmentid,
                    d.departmentname,
                    d.over_head_costs,
                    p.product_sales,
                    p.product_sales - d.over_head_costs as total_profit
                FROM departments d
                LEFT JOIN products p
                ON d.departmentname = p.departmentname
                ORDER BY d.departmentname;`
    
    connection.query(mySql, function(err, results){
        console.table(results)
        promptSupervisor();
    })
}


function addDepartment (data) {
    inquirer
    .prompt([
        {
            type: "input",
            name: "newDept",
            message: "What new department would you like to add? [Quit with Q]",
            // validate: function(val) {
            //     return !isNaN(val) || val.toLowerCase() === "q"
            // }
        },
        {
            Type: "number",
            name: "newOHCost",
            message: "What is the Over Head Cost for this department?"
        }
    ])
    .then (function(answer){
        connection.query("INSERT INTO departments set ?",
        {
            departmentname: answer.newDept,
            over_head_costs: answer.newOHCost
        },
        function(err, res) {
            if (err) throw err;
            console.log("\n")
            console.log(answer.newDept + " department has been added to the Database! \n")
            promptSupervisor();
        }
        )
    })

}
