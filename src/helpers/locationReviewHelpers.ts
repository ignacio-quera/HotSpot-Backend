const  LocationReview = require("../models/locationReviews");
const Location = require("../models/locations");

export const updateLocationScore = async (locationId: string) => {
    try {
        const reviews = await LocationReview.find({ locationId });
        if (reviews.length === 0) {
            throw new Error('No reviews found for this location');
        }
        var totalSum = 0;
        for (const review of reviews) {
            if (review.rating < 1 || review.rating > 5) {
                throw new Error('Invalid rating');
            }
            totalSum += review.rating;
        }
        const averageScore = totalSum / reviews.length;
        await Location.update({ _id: locationId }, { score: averageScore });
    } catch (error) {
        throw new Error('Error updating location score');
    }
};