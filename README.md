# numina-daily-traffic-comparison

A web app for visually comparing Numina traffic counts from two different days

## Overview

This app allows a user to compare the same analytics data for two different dates simultaneously.  The user chooses two dates to compare using a calendar date picker along with a mode (pedestrian, car, etc) The hourly counts for the mode are displayed on a chart with a line for each date, so a quick visual comparison can be made.

The app uses the [Numina API sandbox](https://numina.co/announcing-numina-api-sandbox/). Which includes only a couple of weeks of data for a sensor in Downtown Brooklyn, New York.

The user must authenticate using Numina graphQL api credentials

## To run locally

- Clone this repository
- `cd` into the directory and install dependencies: `yarn`
- run `yarn start`, the app will be available at `http://localhost:3000`
- login with your Numina graphQL api credentials

## Screenshot

<img width="995" alt="Numina_Daily_Traffic_Comparison" src="https://user-images.githubusercontent.com/1833820/87744025-5a3bcd80-c7b8-11ea-9872-067241e053de.png">
