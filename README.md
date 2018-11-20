# contact-library
This library is emailing and messaging library

Deployed [Heroku](https://contact-library.herokuapp.com/)

The library has No front-end it is a just api end points

`/contact/send-sms`
sends SMS type transaction using msg91
```
{
	
	"to":["1234567890"],
	"type":"transactional",
	"service":"msg91",
	"text":"utext matter"
	
}

```
type:transcational/promotional


`/contact/send-email`
```
{
	
	"to":user@user.com,
	"type":"promotionalOffer",//folloUps etc
	"text":"utext matter",
  "bcc":[],
  "cc":[],
  "config":{
      //template specific configurations
  }
  //authentication purpose
  "admin":"admin@admin.com",
  "pass":"adminPass"
	
}

```
