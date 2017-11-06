NUMBER FORMAT: +11234567890
Breakdown: country code +1, area code 123, first 3 456, last 4 7890

#User
https://us-central1-serious-cabinet-100514.cloudfunctions.net/StorageAPI-user
GET:
1. User
- command: getUser
- number: the number for the user (see format)
Returns JSON of everything associated with that user.

2. Products
- command: getUserProducts
- number: the number for the user (see format)
Returns array of all product names for the user

3. Favorites
- command: getUserFavorites
- number: the number for the user (see format)
Returns an array of all favotires for a user

PUT:
1. Add
- command: addUser
- number: the number for the user (see format)
Will create a user account or alert user exists

3. Add Product
- command: addUserProduct
- number: the number for the user (see format)
- prod: the name of the product
Will add the product name to the array of user products

5. Add Favorite
- command: addUserFavorite
- number:the number for the user (see format)
- fave: the name of the favorite
- Will add the favorite to the user's favorites

#Product
https://us-central1-serious-cabinet-100514.cloudfunctions.net/StorageAPI-product
GET:
1. Product
- command: getProduct
- name: product name
Will return JSON of everything associated with the product

2. Price
- command: getProductPrice
- name: the product name
Will return the current unformatted price 

3. Long
- command: getProductLong
- name: the product name
Will return the long description

4. Short
- command: getProductShort
- name: the product name
Will return the short description

5. History
- command: getProductHistory
- name: the product name
Will return JSON of the product history

6. Rating
- command: getProductRating
- name: the product name
Will return the product rating out of 10

PUT:
1. Add Product
- command: addProduct
- name: product name
- short: short description
- long: long description
- raiting: raiting out of 10
Adds the product

2. Add Price
- command: addProductPrice
- name: product name
- price: price with no format
Will add an instance of that price for the product

#Auth
https://us-central1-serious-cabinet-100514.cloudfunctions.net/StorageAPI-auth
GET:
1. ValidateCode
- command: verifyCode
- number: the number that the code wqas sent to
- code: the code provided
Will return Valid Code or Invalid Code

Put:
1. SendCode
- command: sendCode
- number: the number to send to
Sends an SMS code to the number

2. CallCode
- command: callCode
- number: the number to call for the code
Calls the number with the code