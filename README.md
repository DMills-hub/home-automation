# Home Automation

#### Requirements
- [Docker](https://www.docker.com/products/docker-desktop/)
- [Python](https://www.python.org/downloads/)
- [NodeJS](https://nodejs.org/en/download)
- [MongoDB Compass](https://www.mongodb.com/try/download/compass)
- Environment Variables

#### Backend

- Make sure you are in your python venv
- Run `make run-backend`

#### App

- Run `make run-app`

#### CDK

- AWS CDK Infrastructure is located in cdk folder
- To deploy you will need a bootstrapped version of cdk deployed to the relevant AWS account -> [docs](https://docs.aws.amazon.com/cdk/v2/guide/bootstrapping.html)
- To Deploy:
    - `npm run cdk -- synth --profile AWS_PROFILE_NAME STACK_NAME`
    - `npm run cdk -- diff --profile AWS_PROFILE_NAME STACK_NAME`
    - Before running the deploy command make sure these two previous commands give the expected output
    - `npm run cdk -- deploy --profile AWS_PROFILE_NAME STACK_NAME`