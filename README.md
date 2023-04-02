Instagram Bot
This is a simple bot that logs into your Instagram account, dismisses the "Turn on Notifications" prompt, clicks the notification button, and deletes all pending follow requests. It can also accept all of your pending follow requests.

Prerequisites
Before you can run this bot, you need to have the following installed on your machine:

Node.js
npm (Node Package Manager)
Installation
slenium web-driver library
Clone this repository to your local machine.
Navigate to the cloned directory and run npm install to install the required dependencies.
Create a file named .env in the root directory and add the following environment variables:
makefile
Copy code
INSTAGRAM_USERNAME=your_instagram_username
INSTAGRAM_PASSWORD=your_instagram_password
Run npm start to start the bot.
Notes
This bot was built using the following technologies:
Node.js
Selenium WebDriver
Firefox web browser
The bot is currently set up to delete all pending follow requests and accept all pending follow requests. If you want to modify this behavior, you can do so by editing the code.
Use this bot at your own risk. Instagram's terms of service prohibit the use of bots on their platform, so use this bot at your own discretion.