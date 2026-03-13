import { differenceInYears } from 'date-fns';

export const calculateBMI = (heightCm, weightKg) => {
    if (!heightCm || !weightKg) return { value: 0, status: "Unknown", color: "text-gray-500" };

    const heightM = heightCm / 100;
    const bmi = weightKg / (heightM * heightM);
    const value = parseFloat(bmi.toFixed(1));

    let status = "Normal";
    let color = "text-green-500";
    let advice = "Maintain your current calorie intake.";

    if (value < 18.5) {
        status = "Underweight";
        color = "text-blue-500";
        advice = "You should be in a calorie surplus to gain weight.";
    } else if (value >= 18.5 && value < 24.9) {
        status = "Normal Weight";
        color = "text-green-500";
        advice = "You are in a healthy range. Maintain your calories.";
    } else if (value >= 25 && value < 29.9) {
        status = "Overweight";
        color = "text-yellow-500";
        advice = "You should be in a slight calorie deficit.";
    } else {
        status = "Obese";
        color = "text-red-500";
        advice = "You should be in a calorie deficit to lose weight.";
    }

    return { value, status, color, advice };
};

// Mifflin-St Jeor Equation
export const calculateMaintenanceCalories = (heightCm, weightKg, age, gender, activityLevel = 1.2) => {
    // activityLevel: 1.2 (Sedentary) to 1.9 (Extra Active)
    let bmr;
    if (gender === 'male') {
        bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * age) + 5;
    } else {
        bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * age) - 161;
    }

    return Math.round(bmr * activityLevel);
};
