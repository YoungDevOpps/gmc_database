-- ============================================
-- Data Manipulation Language (DML) - Checkpoint
-- ============================================

-- Insert data into the CUSTOMER table
INSERT INTO CUSTOMER (Customer_id, Customer_Name, Customer_Tel)
VALUES ('C01', 'ALI', 71321009);

INSERT INTO CUSTOMER (Customer_id, Customer_Name, Customer_Tel)
VALUES ('C02', 'ASMA', 77345823);

-- Insert data into the PRODUCT table
INSERT INTO PRODUCT (Product_id, Product_Name, Category, Price)
VALUES ('P01', 'Samsung Galaxy S20', 'Smartphone', 3299);

INSERT INTO PRODUCT (Product_id, Product_Name, Category, Price)
VALUES ('P02', 'ASUS Notebook', 'PC', 4599);

-- Insert data into the ORDERS table
INSERT INTO ORDERS (Customer_id, Product_id, OrderDate, Quantity, Total_amount)
VALUES ('C01', 'P02', NULL, 2, 9198);

INSERT INTO ORDERS (Customer_id, Product_id, OrderDate, Quantity, Total_amount)
VALUES ('C02', 'P01', TO_DATE('28/05/2020', 'DD/MM/YYYY'), 1, 3299);
