# Weather App by Korvan Nameni

This program fetches the current weather across the globe of the selected city/state/country and displays related weather information. 
This program also compares the weather of two separate locations.

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.1.4.


# KNOWN ISSUES:
 * variables don't update after the first button press - Change detection
    - Angular's faulty change detection causes HTML text to update after a second button press due to there being two current-weather.ts instances.
    - > With any two button presses after a change in input, the HTML corresponding with the first button will update.

# HOW TO CLONE:
    1. clone repository
    2. in the integrated terminal: npm install
    3. in the integrated terminal: ng serve --open

# RETRIEVE API KEY:
    To use this program, you must insert your own API key. 
    1. Navigate to: https://openweathermap.org/api#one_call_3
    2. Login/create an account
    3. navigate to your name in the top right corner -> my Keys
    4. paste in your key at src/app/get-api.ts (line 20)
    5. delete the import at the top of the file (line 4)

# COMING SOON:
    - A UI indicator for an incorrect input (Only a message is printed to the console)
    - Icons for the weather descriptions
    - A "more" tab which displays misc. weather information (humidity, pressure, etc)