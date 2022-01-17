
# Pages Bookstore Express App

Online bookstore app built with Express.js and MySQL!!

## Demo

https://user-images.githubusercontent.com/75661314/149398249-1f2ea5d8-38b8-4551-b8c9-af48286e9e04.mp4

## Screen Views

![view-1](https://user-images.githubusercontent.com/75661314/149398941-57402716-597f-4bad-982e-4e7cbc008693.png)

![view-2](https://user-images.githubusercontent.com/75661314/149398950-8e033e24-f3a1-4d43-8b80-ac8ff554036c.png)

![view-3](https://user-images.githubusercontent.com/75661314/149398954-90f238f0-949c-47ea-952a-2ed327d7ce0a.png)

![view-4](https://user-images.githubusercontent.com/75661314/149398960-461ce281-06bc-4433-adc8-cabde06b1507.png)

![view-5](https://user-images.githubusercontent.com/75661314/149398966-dc94fc3a-7d6b-4165-9a8a-e274a5c0d7eb.png)

## Requirements

1. Node.js
2. MySQL Server

## Usage

1. Fork the repository and clone it.

2. Create a MySQL database.

3. Create a `.env` file and insert the following code. Replace values with yours!!

    ```javascript
    PORT = 3000
    MYSQL_DATABASE = 'database name'
    MYSQL_USER = 'username'
    MYSQL_PASSWORD = 'password'
    SESSION_SECRET = 'sessions secret key'
    ```

4. First install all dependencies:

    ```bash
    npm ci
    ```

5. Start the Node.js server

    ```bash
    npm start
    ```

6. App can be found at

    ```bash
    Ecommerce app listening at http://localhost:[PORT]
    ```
