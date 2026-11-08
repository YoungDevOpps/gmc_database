-- ============================================
-- Data Query Language (DQL) - Checkpoint
-- ============================================

-- 1. Display all the data of customers
SELECT * FROM CUSTOMER;

-- 2. Display the product_name and category for products
--    which their price is between 5000 and 10000
SELECT Product_Name, Category
FROM PRODUCT
WHERE Price BETWEEN 5000 AND 10000;

-- 3. Display all the data of products sorted in descending order of price
SELECT * FROM PRODUCT
ORDER BY Price DESC;

-- 4. Display the total number of orders, the average amount,
--    the highest total amount and the lowest total amount
SELECT
    COUNT(*) AS Total_Orders,
    AVG(Total_amount) AS Average_Amount,
    MAX(Total_amount) AS Highest_Amount,
    MIN(Total_amount) AS Lowest_Amount
FROM ORDERS;

-- 5. For each product_id, display the number of orders
SELECT Product_id, COUNT(*) AS Number_Of_Orders
FROM ORDERS
GROUP BY Product_id;

-- 6. Display the customer_id which has more than 2 orders
SELECT Customer_id
FROM ORDERS
GROUP BY Customer_id
HAVING COUNT(*) > 2;

-- 7. For each month of the 2020 year, display the number of orders
SELECT EXTRACT(MONTH FROM OrderDate) AS Order_Month, COUNT(*) AS Number_Of_Orders
FROM ORDERS
WHERE EXTRACT(YEAR FROM OrderDate) = 2020
GROUP BY EXTRACT(MONTH FROM OrderDate)
ORDER BY Order_Month;

-- 8. For each order, display the product_name, the customer_name
--    and the date of the order
SELECT P.Product_Name, C.Customer_Name, O.OrderDate
FROM ORDERS O
JOIN CUSTOMER C ON O.Customer_id = C.Customer_id
JOIN PRODUCT P ON O.Product_id = P.Product_id;

-- 9. Display all the orders made three months ago
SELECT * FROM ORDERS
WHERE OrderDate BETWEEN ADD_MONTHS(SYSDATE, -3) AND SYSDATE;

-- 10. Display customers (customer_id) who have never ordered a product
SELECT Customer_id, Customer_Name
FROM CUSTOMER
WHERE Customer_id NOT IN (SELECT Customer_id FROM ORDERS);
