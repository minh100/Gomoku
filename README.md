# Gomoku



# Deployment

- [React Error Boundary](https://github.com/bvaughn/react-error-boundary#readme)

## Deploying to Client-side

- [Github Pages Reference](https://dev.to/yuribenjamin/how-to-deploy-react-app-in-github-pages-2a1f)<br/>

## Deploying to Server-side

- Since we are using Heroku to deploy the backend server, we need to take into consideration of the subfolders we want to deploy
    - In this case we only want to deploy the **server** folder
        1. Create a Heroku app
        2. Navigate to root of repo
        3. Create the heroku remote using the command
            ```
            heroku git:remote -a <heroku_url>
        4. Now still at the root of the repo, type
            ```
            git subtree push --prefix <pathToSubfolder> heroku master
            ```
            As an examaple we only want to deploy the server folder
            ```
            git subtree push --prefix server heroku master
            ```
- [Heroku Reference](https://jtway.co/deploying-subdirectory-projects-to-heroku-f31ed65f3f2)<br/>

