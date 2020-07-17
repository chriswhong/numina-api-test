# numina-daily-traffic-comparison

A web app for visually comparing Numina traffic counts from two different days

## Overview

This app allows a user to compare the same analytics data for two different dates simultaneously.  The user chooses two dates to compare using a calendar date picker along with a mode (pedestrian, car, etc) The hourly counts for the mode are displayed on a chart with a line for each date, so a quick visual comparison can be made.

The user must authenticate using Numina graphQL api credentials

## To run locally

- Clone this repository
- `cd` into the directory and install dependencies: `yarn`
- run `yarn start`, the app will be available at `http://localhost:3000`
- login with your Numina graphQL api credentials
