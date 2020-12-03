# API Routes
POST -- '/api/reviews-module/reviews/:id' -- posts a review and set of ratings to the database
GET -- '/api/reviews-module/ratings/:id' -- fetches all ratings for the current product
GET -- '/api/reviews-module/reviews/:id' -- fetches all reviews for the current product
PUT -- '/api/reviews-module/reviews/:id' -- updates information on a given review (except for ratings)
PUT -- '/api/reviews-module/ratings/:id' -- updates ratings information for a particular review
DELETE -- '/api/reviews-module/reviews/:id' -- delete a review

# Project Name

> Reviews module modeled after airbnb

## Related Projects

  - https://github.com/Mormont-team-6/photo-carousel
  - https://github.com/Mormont-team-6/Reservation-Service
  - https://github.com/Mormont-team-6/places-to-stay
  - https://github.com/Mormont-team-6/Customer-Reviews-Proxy

## Table of Contents

1. [Usage](#Usage)
1. [Development](#development)

## Usage

Startind node / nodemon

```sh

npm start

npm run-script start:dev

```

Starting and stopping a pm2 instance

```sh

sudo npm install pm2@latest -g

npm run-script start:pm2

npm run-script stop:pm2

```

## Development

### Install Dependencies

From within the root directory:

```sh

npm install

```
Webpack

```sh

npm run-script build

```


