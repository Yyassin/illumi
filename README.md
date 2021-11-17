<span title="illumi logo">
 <p align="center">
  <img width="100px" height="100px" src="https://i.imgur.com/yUHjTtA.png" alt="illumi-img">
 </p>
</span>

<h1 align="center" style="margin-top: 0px;">illumi</h1>
<span title="illumi login-page">
 <p align="center">
  <img width="800vw" src="https://i.imgur.com/O8a3eOe.png" alt="illumi-img">
 </p>
</span>

[![GitHub release](https://img.shields.io/github/v/release/Yyassin/illumi.svg?colorB=97CA00?label=version)](https://github.com/Yyassin/illumi/releases/latest) [![Github All Releases](https://img.shields.io/github/downloads/Yyassin/illumi/total.svg?colorB=97CA00)](https://github.com/Yyassin/illumi/releases) [![GitHub stars](https://img.shields.io/github/stars/Yyassin/illumi.svg?colorB=007EC6)](https://github.com/Yyassin/illumi/stargazers)  [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/Yyassin/illumi/master/LICENSE)

> A social desktop application made with students in mind. Illumi was designed to help simplify online-learning and the delivery of course content through a digital means. Students are grouped into servers corresponding to their enrolled courses, within which they are able to interact in real-time with their colleagues. Within each server, a catalog of course information, events, lessons, tutorials can be found along with optional real-time messaging rooms and a shared-user whiteboard.

## Table of Contents
<!--ts-->
   * [Requirements](#minimum-requirements)
   * [Features](#features)
      * [Functionality](#functionality)
      * [Native Application](#native-application)
   * [Demo](#demo)
   * [Installation](#installation)
      * [Running in Development](#running-in-development)
      * [Documentation](#documentation)
   * [Built With](#built-with)
   * [Using the Project](#using-project)
<!--te-->

## Minimum Requirements:
 - Windows 7 or higher.
 - macOS 10.13 or later.
 
 ## Features
 ### Functionality
- User authentication and session handling.
- Organize courses into a single shared hub, **servers** . Supports roles to manage member permissions and responsibilities.
- Manage members through an **invitation** system.
- Servers also features a page to share **events** to promote planning.
- Tutorials and lessons can be shared through **Pages** where users can upload the content they desire. An option to add a **Room** within a page allows for community discussion.
- Each server also boasts a **shared-realtime-whiteboard** for collaboration and problem-solving.
- All user uploaded content, including messages and whiteboard-drawing, are rendered and saved in real-time.
- **Image uploading** with Cloudinary.

### Native Application
- A beatifully crafted UI and custom made titlebars for Windows and Mac.
- Taskbar support for Windows.
- Native desktop notifications anytime a user sends a message in one of your servers.

## Demo
<span title="illumi login-page">
 <p align="left">
  <img src="./client/public/illumi-demo.gif" alt="illumi-img">
 </p>
</span>

- View full [demo video](https://drive.google.com/file/d/11Tpckd5a3gp5Wl3fnLgkU2zpxzba3vAI/view?usp=sharing).

## Installation
- Download the latest version [here](https://github.com/yyassin/illumi/releases) or visit our [official site](http://illumi2.canadaeast.cloudapp.azure.com/).
- Run the downloaded setup file and then launch the app from the created shortcut.
- You're done! 🎉

### Running in Development

You will first need to clone the repository to your local machine:
```
git clone https://github.com/Yyassin/illumi.git
```
* Install [Node js](https://nodejs.org/en/) version 12.x or later.

* Navigate to the appropriate directory from terminal:
```
cd ~/illumi
```

* Create a config folder under ```client/src``` with file ```keys.js``` within it. Here place your cloudinary bucket name for image uploads:
```
module.exports = {
    cloudURL: '<YOUR.CLOUDINARY.NAME>'
}
```


* Create another config folder under ```server``` with file ```keys.js``` within it. Here place your mongo URI for connection to the database and also an API key, to secure REST access:
```
module.exports = {
    api: {
        key: 'secret_string'
    },

    database: {
        uri: `mongodb+srv://<username>:<password>@<your-cluster-url>/test?retryWrites=true&w=majority`,
    },
}
```

* Install the required dependencies in both the server and client directories:
```
cd ~/illumi/client && npm i
cd ~/illumi/server && npm i
```
* Run the main client file, along with the backend server in seperate terminals:
```
cd ~/illumi/client && npm run dev
cd ~/illumi/server && npm run dev
```
### Documentation
Visit `localhost:5000/api` while the app is running for further app and API documentation. Alternatively, head over to the deployed site [here](http://illumi2.canadaeast.cloudapp.azure.com/).
  
* Enjoy! 🎉

**Note** : The backend server is routinely turned off from 10 PM to 8 AM. The app will not function during these hours.

## Issues & feature requests

If you still experience any issues, we encourage you to report them [here](https://github.com/Yyassin/illumi/issues). Please follow the existing template, otherwise the issue will be closed without notice. 

Any ideas to grow the app? You can also request features by adding a **request label** and we'll take a look! Developers are welcome to submit a pull request.

##### [Here are our currently open issues](https://github.com/Yyassin/illumi/issues).

## Built With

* ReactJS | redux
* NodeJS  | express | socket.io
* ElectronJS
* GraphQL
* MongoDB
* Azure (Deployment)

## Using Project
<span title="illumi login-page">
 <p align="center">
  <img src="https://i.imgur.com/EqUYvaB.png" alt="illumi-img">
 </p>
</span>

* A demo user has already been created with the credentials below incase you don't want to create one yourself.
```
email: demo@gmail.com
password: 123456
```
* Otherwise, create a user at the registration page. You will be greeted by a welcome page where you can create your first server, or accept any server-invitations.
* Create more servers through the plus-icon on the left-most sidebar. Pages can be editted by the controls at the top-header.
* Servers, server members and messages can be edited by right-clicking to bring up a context menu.
* Your user can be editted by clicking on the settings icon featured in the profile section, at the bottom of the inner-sidebar.

* These are the basic features that'll help you get started, there's much more to experience in the application!
