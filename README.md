# BAMAZON

**Creator**: `Bruce Chamblee`

**Created on**: `May 12th 2019`

- - -

## ABOUT THE APP
BAMAZON is a node based application which uses a SQL Database for storing and recalling data for use. 
The user has the option of using 3 menus based on what their roles are (listed below) in conjuntion with specific functionality associated with the commands. The  `Commands` are:

   * `BamazonCustomer`

   * `BamazonManager`

   * `BamazonSupervisor`

- - -
## HOW TO USE BAMAZON
### **Video Guide**

Watch the video here: https://drive.google.com/file/d/1Tn7qDmnRzbCjohUjRw0vVCwxXh-kVTjq/view

### **Step by Step instructions**

1. Open your terminal such as Bash.
2. Navigate to the folder that contains the `bamazon.js` file. 
3. Depending on the command you run, the output will vary. 

    **Example 1**: Run the `bamazoncustomer` command
        
    Output: The system will display a list of items for sale. The customer can select the item by ID they want to purchase and the quantity. The system will then remove the quantity from the stock level available and calculate the total value of the items purchased and complete the sale. 

    ![Results](/screenshots/customer_sale.PNG)

    **Example 2**: Run the `bamazonManager` command
    
    Output: The system will display a list of options for the manager to select.
        * View Products - Displays a table with all available products.
    
    ![Results](/screenshots/manager_view_prod.PNG)
    
        * View Low Inventory - Asks the user what level do they want the system to check all the items for low inventory on. Returns a table with any below this level.
    
    ![Results](/screenshots/manager_low_inv.PNG)
    
        * Add Inventory - Asks the user which item ID they want to add inventory to. After the user makes their selection, another prompt asks how many units would they like to add. Once the user presses enter, the system will generate a full list of all the items available along with their updates values. 
    
    ![Results](/screenshots/manager_add_inv.PNG)
    
        * Add Item - Asks the user a range of questions to create the new product.
                **What is the Product name?
                **What Department does the user want to add the product to? (Brings up a list of available Departments.)
                **What is the price per unit for the item being added.
                **How many units do we need to add to inventory?

    ![Results](/screenshots/manager_add_new_item.PNG)
    
    **Example 3**: Run the `BamazonSupervisor` command
        
    Output: The system will display a list of options for the supervisor to select.
        * View Product Sales by Department

    ![Results](/screenshots/supervisor_view_sales.PNG)

        * Create New Department - Asks the user a range of questions to create the new department.
                **What is the department name?
                **What is the over head cost for the department?

    ![Results](/screenshots/supervisor_new_dept.PNG)

- - -

## TECHNOLOGIES USED
* Javascript
* Nodejs
* Node packages:
    * MySQL
    * Inquirer
* MySQL
* Git
* GitHub