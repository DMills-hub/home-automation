#!/usr/bin/env node
import 'source-map-support/register'
import * as cdk from 'aws-cdk-lib'
import { HomeAutomationStack } from '../lib/home-automation-stack'
import config from '../config'

const app = new cdk.App()
new HomeAutomationStack(app, 'HomeAutomationStack', config)
