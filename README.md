# Wallazon
![alt text](https://raw.githubusercontent.com/JoaquimRS/Wallazon/main/frontend/src/assets/img/wallazon.png)

_Website of second hand products that allows you to login, register, see all the products, filter them, add to favorites, create a comments, follow users and modify your profile_

<!-- ## INDEX

* About this project
* Built With
* Features
* Working in all website
-->

         
## ABOUT THIS PROJECT 

    Website that have second hand products
    Allows you to login, register and modify your account
    Also you can add to favorites the products you like or follow the users that create the products
    You can post comments for the products
    

## BUILT WITH

* [NodeJS]
* [Express] - Backend
* [Mongo] - Backend
* [Angular] - Frontend

[Mongo]: <https://www.mongodb.com/es>
[NodeJS]: <https://nodejs.org/en/>
[Express]: <https://expressjs.com/es/>
[Angular]: <https://angular.io/>
[Carousel]: <https://keen-slider.io/>
[InfiniteScroll]: <https://www.npmjs.com/package/ngx-infinite-scroll>
[JWT]: <https://jwt.io/introduction>
[FileUpload]: <https://www.npmjs.com/package/multer>
[CryptoJS]: <https://cryptojs.gitbook.io/docs/>
[Argon2]: <https://www.npmjs.com/package/argon2>
[FortAwesome]: <https://www.npmjs.com/package/font-awesome>

## FEATURES

| Page | Features |
|---------|-------------|
| Home | Categories([Carousel]), Infinite Scroll Products([InfiniteScroll]) |
| Shop | Filters, Pagination, QueryString |
| Detail | Resolver, Comments, Fast Product Edit |
| Login | NoAuthGuard, Regex, Validators, Token([JWT]), Save Current User, Crypt Algorithms ([CryptoJS],[Argon2]) |
| Register | NoAuthGuard, Regex, Validators, Token([JWT]), Save Current User, Crypt Algorithms ([CryptoJS],[Argon2]) |
| Search | Instant Search |
| Profile | AuthGuard, Children Router, Resolvers, ProfileGuard, Follow User, Upload User Image([FileUpload]), User Statistics |


## WORKING IN ALL WEBSITE

* FontAwesome: [FortAwesome]
* HttpInterceptors
* CurrentUserSubject
* IsAuthenticatedSubject
* AuthGuard : If IsAuthenticatedSubject
* NoAuthGuard: If Not IsAuthenticatedSubject
* ProfileGuard: If CurrentUserSubject == Profile User

