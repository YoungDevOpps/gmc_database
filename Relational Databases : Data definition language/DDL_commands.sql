-- ============================================
-- Data Definition Language (DDL) - Checkpoint
-- ============================================

-- Create the CUSTOMER table
CREATE TABLE CUSTOMER (
    Customer_id NUMBER(10) PRIMARY KEY,
    Customer_name VARCHAR2(25) NOT NULL,
    Customer_tel NUMBER(10)
);

-- Create the PRODUCT table
CREATE TABLE PRODUCT (
    Product_id NUMBER(10) PRIMARY KEY,
    Product_name VARCHAR2(25) NOT NULL,
    Price NUMBER(10, 2)
);

-- Create the ORDERS table
CREATE TABLE ORDERS (
    Order_id NUMBER(10) PRIMARY KEY,
    Quantity NUMBER(10),
    Customer_id NUMBER(10),
    Product_id NUMBER(10),
    FOREIGN KEY (Customer_id) REFERENCES CUSTOMER(Customer_id),
    FOREIGN KEY (Product_id) REFERENCES PRODUCT(Product_id)
);

-- ============================================
-- ALTER TABLE commands
-- ============================================

-- Add a Category column to the PRODUCT table
ALTER TABLE PRODUCT
ADD Category VARCHAR2(20);

-- Add an OrderDate column with SYSDATE as default to the ORDERS table
ALTER TABLE ORDERS
ADD OrderDate DATE DEFAULT SYSDATE;
