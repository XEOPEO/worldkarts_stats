# Worldkarts stats
Is a webapp to visualize data gotten from Karting sessions at World Karts.
For every session World Karts provides data of the session through mail.
This data is then parsed in a CSV which is read in this webapp.

This application will give further feedback and statistics based on the given data.
You will be able to see: Fastest Lap, Optimal Lap with sector differences from the best lap.
Also the kart linked to the best lap will be shown as the date when it has been achieved.

## The worldkarts_formatter.py
The formatter is a python script with the goal to make it easier to create the csv in Micorosft Excel or Google Sheets.
You can simply select the rounds and sector times from the mail.
You don't select the laptimes, those will be recalculated by adding up the sector times.
Paste those values in file named dataset.txt in the same folder as the script.
Then you simply have to run the script
``` python3 worldkarts_formatter.py ```
Which will output a CSV file which is TAB delimitted, for easy select all and paste in Micorosft Excel or Google Sheets

## The format of the CSV
The CSV must follow the following header count and order:
| time_sec | time | s1 | s2 | s3 | round | kart_nr | week | date

The columns for kart_nr, week and date have to be manually filled in, also why you need Excel or Google Sheets
Once the dataset complete you can export the sheet to a csv file comma delimitted.