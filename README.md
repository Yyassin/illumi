<span title="illumi logo">
 <p align="center">
  <img width="100px" height="100px" src="https://i.imgur.com/yUHjTtA.png" alt="illumi-img">
 </p>
</span>

# Illumi
<span title="illumi login-page">
 <p align="center">
  <img src="https://i.imgur.com/eWtDIYc.png" alt="illumi-img">
 </p>
</span>

[![GitHub release](https://img.shields.io/github/v/release/Yyassin/illumi.svg?colorB=97CA00?label=version)](https://github.com/Yyassin/illumi/releases/latest) [![Github All Releases](https://img.shields.io/github/downloads/Yyassin/illumi/total.svg?colorB=97CA00)](https://github.com/Yyassin/illumi/releases) [![GitHub stars](https://img.shields.io/github/stars/Yyassin/illumi.svg?colorB=007EC6)](https://github.com/Yyassin/illumi/stargazers)  [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/Yyassin/illumi/master/LICENSE)

> A social desktop application made with students in mind. Illumi was designed to help simplify online-learning and the delivery of course content through a digital means. Students are grouped into servers corresponding to their enrolled courses, within which they are able to interact in real-time with their colleagues. Within each server, a catalog of course information, events, lessons, tutorials can be found along with optional real-time messaging rooms and a shared-user whiteboard.

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
- Each server also boasts a whiteboard for collaboration and problem-solving.
- All user uploaded content, including messages and whiteboard-drawing, are rendered and saved in real-time.
- Image uploading with Cloudinary.

### Native Application
- A beatifully crafted UI and custom made titlebars for Windows and Mac.
- Taskbar support for Windows.
- Native desktop notifications anytime a user sends a message in one of your servers.

## Installation
- Download the latest version [here](https://github.com/MarcoPixel/illumi/releases) or visit our [official site](http://illumi2.canadaeast.cloudapp.azure.com/).
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

## Built With

* ReactJS | redux
* NodeJS  | express | socket.io
* ElectronJS
* GraphQL
* MongoDB
* Azure (Deployment)

## Using Project

* A demo user has already been created with the credentials below incase you don't want to create one yourself.
```
email: demo@gmail.com
password: 123456
```
* Otherwise, create a user at the registration page. You will be greeted by a welcome page where you cna create your first server, or accept any server-invitations.
* Once you've joined a server, you will be redirected to the main dashboard.
* You can change servers by selecting the appropriate icon on the leftmost sidebar. Server-pages can be navigated by selecting the corresponding one in the inner-sidebar.
* Creating more servers can be achieved by the clicking the "+" icon beneath all your servers. Edit, delete, invite or leave a server by right-clicking.
* Pages can be managed by selecting one of the page-actions featured in the top-header to edit your current page or create a new one.
* Your user can be editted by clicking on the settings icon featured in the profile section, at the bottom of the inner-sidebar.
* You can interact with others by sending messages in pages with rooms. Deleting a message is as easy as right-clicking and selecting delete.
* Finally, you can view and edit your server specific member by clicking on your avatar or name in a message. Admins can edit all members within a server.

* These are the basic features that'll help you get started, we encourage you to explore the app further and cannot wait to let us know what you think!