// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get form element
    const predictionForm = document.querySelector('.prediction-form');
    
    if (predictionForm) {
        predictionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get input value
            const yearInput = document.getElementById('year').value;
            
            // Basic validation
            if (yearInput < 2025 || yearInput > 2040) {
                showPredictionResult("Please enter a year between 2025 and 2040.");
                return;
            }
            
            // Call forecast function with input year
            const result = forecastForYear(yearInput);
            
            // Display result
            showPredictionResult(result);
        });
    }
    
    // Function to simulate the forecast (similar to your Python function)
    function forecastForYear(yearInput) {
        try {
            const year = parseInt(yearInput);
            
            if (year < 2025 || year > 2040) {
                return "Enter a year between 2025 and 2040.";
            }
            
            // Simulate forecasting based on the year
            // This uses a similar logic to your Python function but simplified for JavaScript
            const baseYear = 2025;
            const monthsToForecast = (year - baseYear) * 12 + 12;
            
            // Add variation based on the year (similar to your Python version)
            const variation = (year % 7) * Math.random() * 0.4 + 0.8;
            
            // Base prediction value that increases slightly each year
            let basePrediction = 3000 + (year - baseYear) * 500;
            
            // Apply variation
            const avgCases = basePrediction * variation;
            
            // Decision based on threshold (similar to your Python version)
            const threshold = 5000;
            const status = avgCases > threshold 
                ? " COVID likely present in " + year + " (Predicted cases: " + Math.round(avgCases) + ")"
                : " COVID not likely in " + year + " (Predicted cases: " + Math.round(avgCases) + ")";
            
            return status;
            
        } catch (error) {
            return "Please enter a valid numeric year.";
        }
    }
    
    // Function to update the prediction result display
    function showPredictionResult(resultText) {
        const predictionText = document.getElementById('prediction-text');
        
        if (predictionText) {
            predictionText.textContent = resultText;
            
            // Add visual indication if it contains a status emoji
            if (resultText.includes('✅')) {
                predictionText.style.backgroundColor = '#e8f5e9';
                predictionText.style.color = '#2e7d32';
                predictionText.style.border = '1px solid #a5d6a7';
            } else if (resultText.includes('❌')) {
                predictionText.style.backgroundColor = '#fbe9e7';
                predictionText.style.color = '#c62828';
                predictionText.style.border = '1px solid #ffccbc';
            } else {
                // Reset styles for other messages
                predictionText.style.backgroundColor = '#f4f4f4';
                predictionText.style.color = '#333';
                predictionText.style.border = 'none';
            }
        }
    }
    
    // Handle tab navigation (for the future implementation)
    const tabLinks = document.querySelectorAll('.tab-navigation a');
    
    tabLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all tabs
            tabLinks.forEach(item => item.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Future implementation: Show/hide relevant content sections
        });
    });
});