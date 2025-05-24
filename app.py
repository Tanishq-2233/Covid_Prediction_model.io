from flask import Flask, render_template, request
import pandas as pd
import numpy as np
from statsmodels.tsa.statespace.sarimax import SARIMAX

# Flask app
app = Flask(__name__)

# Load and preprocess dataset (keep this same)
df = pd.read_csv('C:/Users/predator/Downloads/cleaned_time_series.csv')
df['Date'] = pd.to_datetime(df['Date'])
df = df.groupby('Date')[['Confirmed']].sum().asfreq('MS')
df['Confirmed_log'] = np.log1p(df['Confirmed'])

# Train model
train = df['Confirmed_log'][:-12]
model = SARIMAX(train, order=(1, 1, 1), seasonal_order=(1, 1, 0, 12),
                enforce_stationarity=False, enforce_invertibility=False)
results = model.fit()

# Forecast function (same logic)
def forecast_for_year(year_input):
    try:
        year = int(year_input)
        if year < 2025 or year > 2040:
            return "Invalid Year: Enter between 2025 and 2040."

        last_date = df.index[-1]
        months_to_forecast = (year - last_date.year) * 12 + 12
        forecast = results.get_forecast(steps=months_to_forecast)
        pred_log = forecast.predicted_mean
        pred = np.expm1(pred_log.clip(upper=20))

        year_start = months_to_forecast - 12
        year_end = months_to_forecast
        year_values = pred.iloc[year_start:year_end]

        
        avg_cases = year_values.mean() 

        threshold = 10000
        status = "COVID likely present" if avg_cases > threshold else "COVID not likely"
        return status

    except ValueError:
        return "Error: Please enter a valid numeric year."

# Route
@app.route('/', methods=['GET', 'POST'])
def index():
    result = ""
    if request.method == 'POST':
        year = request.form['year']
        result = forecast_for_year(year)
    return render_template('index.html', result=result)

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
