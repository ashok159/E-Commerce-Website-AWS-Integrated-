# NOZAMA
Group Members: Ashdeep Singh, Ali Faiyaz, Ashok Surujdeo

E-Commerce Website that allows users to browse and purchase products.

AWS Integration in Progress:
TODO:
- show sign of successful account creation 
- show sign of user loged in
- implement user sign out
- footer in account page

To link a shopping cart to a user in AWS, you can use Amazon Cognito, which is a user authentication and authorization service provided by AWS. Here are the basic steps:

1) Create an Amazon Cognito User Pool: Create an Amazon Cognito User Pool, which will be used to manage user authentication and authorization. This user pool will allow your users to sign up and sign in to your e-commerce website, and it will store user information such as their username, password, and email address.

2) Integrate Amazon Cognito with your e-commerce website: Integrate Amazon Cognito with your e-commerce website using one of the many available SDKs and libraries. This will allow your website to communicate with Amazon Cognito to authenticate and authorize your users.

3) Assign a shopping cart to each user: Once a user has signed in to your e-commerce website, you can assign a shopping cart to them by storing the shopping cart information in a database or a file, along with the user's unique identifier.

4) Retrieve the user's shopping cart: When a user returns to your e-commerce website, you can retrieve their shopping cart by looking up their unique identifier in your database or file.

5) Allow users to edit their shopping carts: You can allow your users to edit their shopping carts by providing them with a user interface that allows them to add or remove items from their shopping cart.

By using Amazon Cognito, you can provide your users with a secure and reliable way to sign up, sign in, and manage their shopping carts.
