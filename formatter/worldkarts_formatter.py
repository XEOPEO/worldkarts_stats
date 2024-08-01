import pandas as pd

# Define the input and output file names
input_file = 'dataset.txt'
output_file = 'dataset.csv'

# Read the text file into a DataFrame using sep='\s+'
df = pd.read_csv(input_file, sep='\s+', header=None, names=['round', 's1', 's2', 's3'])

# Calculate the 'time_sec' column as the sum of 's1', 's2', and 's3'
df['time_sec'] = df['s1'] + df['s2'] + df['s3']

# Round 'time_sec' to 3 decimal places
df['time_sec'] = df['time_sec'].round(3)

# Function to convert seconds to mm:ss.000 format
def convert_to_mmss(seconds):
    minutes = int(seconds // 60)
    seconds = seconds % 60
    return f"{minutes:02d}:{seconds:06.3f}"

# Create the 'time' column with the converted format
df['time'] = df['time_sec'].apply(convert_to_mmss)

# Rearrange columns to place 'time_sec' at the beginning, followed by 'time', 's1', 's2', 's3', and 'round'
df = df[['time_sec', 'time', 's1', 's2', 's3', 'round']]

# Save the rearranged DataFrame to a CSV file
df.to_csv(output_file, sep='\t', index=False)