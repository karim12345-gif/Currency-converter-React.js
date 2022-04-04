
## Available Scripts

In the project directory, you can run the following commands:


### `Clone the project`
You can clone the project using this line, and then install the dependencies from the next step.
```
git clone https://github.com/karim12345-gif/Currency-converter-React.js.git
```

### `npm install`

To install all the dependencies and libraries for the project before running it.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload automatically when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.


### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)



### what is Docker ?
It is a container that packages up code and all its dependencies so the application can run much faster from one computing environment to another

# creating a docker image 
 1. We need to create two files one called **Dockerfile** and another one called  **.dockerignore**


 2. Why are we using  ***dockerfile***?

 >Because it contains all the commands a user could call on, that helps with building an image within a container. This process is helpful for deployments by simplifying the process.


 3. Inside of ***Dockerfile*** you need to enter the following commands:

 ```
FROM node:17-alpine AS development

#set your working directory
WORKDIR /app

#add path
ENV PATH /app/node_modules/.bin:$PATH

#install app dependencies
COPY package.json .
COPY package-lock.json ./
RUN npm install --silent
RUN npm install react-scripts@5.0.0 -g --silent

#add app
COPY . ./

#the port with our project will run on usually its 3000
EXPOSE 3000

#this is for docker to start the project, I am using npm but if your using yarn
# then you can easily replace it
CMD ["npm", "start"]
 ```


4. Why are we using  ***.dockerignore*** ?

>It basically allows you to eliminate files from the context like .gitignore file allows you to exclude files from your git repository.

>It also makes the build much faster and light weight, by removing big files that are not needed.

5. So for ***.dockerignore*** we need to add the following commands:
 ```
node_modules
build

.dockerignore
Dockerfile
Dockerfile.prod
  ```


6. Now we have to create an image for our project:
     ```
     docker build -t YourImagename(no capital letters):dev .
     ```

7. Afterwards we have to create a container that will save our image inside of it:
    ```
    docker run -it -p 3000:3000 YourImageName:dev
    ```

8. Now you can open your Docker panel from your laptop and start the project from the container that you have created and press ***Start***

