## How to run the code
To run the code, you will need to install nodejs. To verify that node is installed, open a terminal and type in the command
`node -v`
If you get a version number, you have node installed.

Now, open a terminal in the root of the project and enter the command
`npm install`
This will install the project dependancies. 

To run the code, enter the command.
`npm run start`
This will prompt you to go to https://127.0.0.1:5000/app/widget.html to view the webpage. (this is the reason for the "cert.pem" and "key.pem". Forget why I needed to set up a localhost https server in the first place)
Also note, the browser will warn you about the webpage being potentially unsafe. Its just because it doesn't trust the self-signed certificate used to run the localhost https server. If you still feel unsafe, you can manually
open the html page found in `/app/widget.html` and bypass the localhost web server entirely.

To debug the code, in a separate terminal, enter the command
`npm run debug`. 
If this doesn't run, ensure that typescript is installed so the console understands what the `tsc` command is.

## Background about this code sample.
This code sample is a sales page for a client. Because some of the information involved in this project could be considered confidential, some aspects of this repository have been redacted. 
Specificially, any names that link to the client involved and any other data that shouldn't be made public. However, the code still builds and runs for localhost for development and testing. 

I have included in the repository some screenshots of the original design mockups that the client gave me can be found in `/screenshots/client_mockups/`. 
After creating rapid prototypes and having multiple meetings about this sales page, the design was eventually modified to look like the screenshots found in `/screenshots/live_screenshots`. 
This repository includes the code to build the final design, but minus live data. I can demonstrate the live version of this code during an interview.

Some notes about the code itself. This code is designed to be included as a "widget" into a system called "Zoho Creator". Widgets are a componentised webpage built from raw HTTP/CSS/Javascript. 
They are placed inside of an iframe inside of Zoho Creator with limitations put on what external APIs they can access, and some basic features like page navigation do not work. 
The client wanted a sales page which will allow the customer to do the following
* View products
* Filter products by certain characteristics
* Search for products
* Display stock levels
* Display cheaper prices for bulk orders
* Display images of the products
* Display detailed information on a product
* Add products to cart

The frontend components provided by Zoho Creator did not provide enough functionality to fit the requirements of the client. So this custom widget was created for that purpose.

## Project Structure
The `/src` folder contains the files I wrote to make this widget. I didn't want to write raw javascript without any type annotations so I added typescript to the project. 

The `/app` folder contains the output of the typescript compiler. This file also contains the output.css file which is the css file built from tailwindcss. 
          I prefer using tailwind css to regular css because I find the documentation found at https://tailwindcss.com/docs is quicker to reference than raw css, but they are very similar.

The `/dist` folder contains the built code which is uploaded to Zoho Creator as a widget. 

The `/server` folder contains the code to run a local https server for the project. I believe this exists to debug some errors found after the widget was posted onto Zoho Creator, but I don't remember.

The `/screenshots` folder contains some screenshots about the client's original mockups and the final product added to Zoho Creator.

Inside of `/src`, there are 4 main files.
* `types/d/ts`, this file contains all my custom typescript types to power editor's LSP.
* `config.ts`, this file contains most of the app constants used inside of the app.
* `apiConnection.ts`, this file contains all of the API requests to fetch data out of the Zoho Creator database. As well as calls to an azure function that I wrote to pull extract the customer prices and specials out of our own SQL database.
* `index.ts`, a very long file containing all of the application logic. 
    

## What I learnt from this project
This was the first time I had written code in raw HTML, CSS and Javascript without the use of javascript libraries (like ReactJs) or prebuilt UI components such as (Material UI, Ant Design, etc). So, this project was a great learning experience.
However, there are a things I would do differently in future now that I have had more experience. 

Firstly, I would manage state differently and break up the responsibilities earlier. In my initial prototype, the application logic was quite simple, and my state was very easy to manage, just a simple global javascript object. 
However, as features started building up,  managing the state became much more difficult compared to using ReactJS which took care of a lot of the complexities for you if you used the `useState` and `useEffect` hooks. 
It was also difficult managing the effects of changing state, such as updating all areas of the screen that are affected by that state change.

In the future, I would also do a better job of breaking elements up into components. I wrote most of my initial prototype in a single render function for a proof of concept. While I did slowly start breaking down that render component into functions 
such as the `RenderTableHeader`, `RenderTableBody`, and `RenderTableFooter` functions. This should have been broken up into a table class, which methods for rendering the table, updating the state of the table, and methods for fetching data to populate the table.

