<div align="right">
    <img height='20px' src='https://github.com/amazingandyyy/revieweer/blob/master/client/src/assets/svgs/logo-long.png?raw=true'/>
</div>

# Revieweer [![Build Status](https://travis-ci.com/amazingandyyy/revieweer.svg?token=C7NJ8bT8vb8dmq7fMDsa&branch=master)](https://travis-ci.com/amazingandyyy/revieweer)

revieweer.com Official Resource for Website and Server

## What is Revieweer

Review, Explore, Earn

- Order, unpackage and review
- Explore more new products
- Earn more cashback + bonus

## Feature

- [ ] account CRUD
  - [x] create
    - [x] email verification
  - [x] read
    - [x] login
    - [x] account dashboard
  - [ ] update
    - [x] basic name
    - [ ] reset password
    - [ ] change password
  - [ ] delete account
- [ ] product CRUD
  - [x] create
    - [x] fetch product details api
    - [x] create new product
  - [x] read
    - [x] list at client
  - [ ] update
    - [x] update detials by admin
    - [ ] end/active by admin
  - [ ] delete
- [ ] review CRUD
  - [x] create
  - [ ] read
    - [ ] read one(need style)
    - [ ] read user's own list(need style)
  - [ ] update
    - [ ] add new order number from user
    - [ ] update progress
- Payment system
  - link bank account
  - admin payout
- Advance Features
  - [ ] admin dashboard design
    - [ ] product
    - [ ] orders
    - [ ] pay out status
  - [ ] referral program
    - [ ] rule
    - [ ] graph
    - [ ] referral code generator
  - [ ] insight dashboard
    - [ ] user ranking
    - [ ] user behavior
    - [ ] referral infrastructure

## Company

- [ ] VIS
  - [x] logo
  - [x] font
  - [x] color
    - primary green: `#13AB67`
  - [ ] style definition
- [x] email
  - [x] host by namecheap, served by cloudfare
  - [x] team@revieweer.com
  - [ ] email signature
  - [ ] email template
- [ ] server
  - [x] server(`https://server.revieweer.com`)
  - [x] webhook(`https://server.revieweer.com/webhook`)
  - [ ] docs(`https://server.revieweer.com/docs`)
  - [ ] server 404 handler
- [x] client app
  - [x] website(`https://www.revieweer.com`)
  - [x] website(`https://revieweer.com`)
  - [x] 404 handler _> redirect to `/#`, handled by ReactRouter
- [ ] company social account
  - [x] [github](https://github.com/revieweer)
  - [x] [twitter](https://twitter.com/revieweer_team)
  - [x] [facebook](https://facebook.com/revieweer)
  - [x] [medium](https://medium.com/revieweer)
  - [x] [linkedin](https://www.linkedin.com/company/revieweer/)
  - [ ] Wechat Official Account
- internal
  - [ ] comunication app
  - new hires
    - [ ] Chief Operating Officer
    - [ ] Chief Sales Offiver
    - [ ] Site Quality(React/Redux) Engineer
    - [ ] Quality(Infrustructure) Engineer
    - [ ] Writor(FB, Wechat, Medium)

## Production DevOps/Setups

- [x] Automatic CI
  - [x] [travis-ci](https://travis-ci.com/amazingandyyy/revieweer)
- [ ] Testing
  - [ ] Unit Testing
    - [ ] Node endpoints
    - [ ] React Snapshot
  - [x] Linter checking
- [x] Internet Security
  - [x] [https](https://www.cloudflare.com/a/overview/revieweer.com)
  - [ ] DDos Protection
- [x] Monitoring
  - [x] [Sentry](https://sentry.io/revieweer/)
    - [node](https://sentry.io/revieweer/express/)
    - [reac](https://sentry.io/revieweer/react-0v/)
  - [ ] New Relic
- [x] Traffic Analytics
  - [x] [Google Analytics](https://analytics.google.com/analytics/web/#realtime/rt-overview/a97391318w170557385p170363690/)
- [ ] SEO
  - [x] manifest
  - [ ] PWA
  - [ ] SSR
  - [ ] open graph tags
- [ ] UX Tracking
  - [ ] Mixpanel
  - [ ] Segment
- [ ] RWD
  - [x] Google Mobile-Friendly Test [Report](https://search.google.com/test/mobile-friendly?id=vCXMGoCZL5l9phVAeNg_Nw)
- Customer Services
  - [ ] Intercom
  - [ ] Helping page

## License/Copy Rights

All rights reserved.

<div align="center">
    <img height='20px' src='https://github.com/amazingandyyy/revieweer/blob/master/client/src/assets/svgs/logo-r.png?raw=true'/>
</div>
