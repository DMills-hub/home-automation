#!/usr/bin/env node
import 'source-map-support/register'
import * as cdk from 'aws-cdk-lib'
import { HomeAutomationStack } from '../lib/home-automation-stack'
import config from '../config'
import { ManagementStack } from '../lib/management-stack'

const app = new cdk.App()

type Stage = 'home-automation' | 'management'

const stage = app.node.tryGetContext('stage') as Stage | undefined

if (!stage) {
  throw new Error('Please provide a valid stage!')
}

if (stage === 'home-automation') {
  new HomeAutomationStack(app, 'HomeAutomationStack', config)
}

if (stage === 'management') {
  new ManagementStack(app, 'ManagementStack', { env: config.env })
}
