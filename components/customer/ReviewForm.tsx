"use client"

import React, { useState } from 'react';
import { ChevronRight, Calendar, MapPin, User, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import type { Machine, ServiceOrJob, Review } from './types';

interface ReviewFormProps {
  item: ServiceOrJob;
  machine: Machine;
  onBack: () => void;
  onSubmit: (reviewData: { rating: number; message: string }) => Promise<boolean>;
  existingReviews: Review[];
}

const ReviewForm: React.FC<ReviewFormProps> = ({
  item,
  machine,
  onBack,
  onSubmit,
  existingReviews,
}) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const existingReview = existingReviews.find((r) => r.itemId === item.id);

  const getStatusColor = (status: string) => {
    const statusLower = status.toLowerCase();
    if (statusLower.includes('completed')) return 'bg-green-100 text-green-800';
    if (statusLower.includes('progress')) return 'bg-blue-100 text-blue-800';
    if (statusLower.includes('pending')) return 'bg-yellow-100 text-yellow-800';
    return 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getRatingLabel = (rating: number) => {
    switch (rating) {
      case 1:
        return 'Poor';
      case 2:
        return 'Fair';
      case 3:
        return 'Good';
      case 4:
        return 'Very Good';
      case 5:
        return 'Excellent';
      default:
        return '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (rating === 0) {
      setError('Please select a rating');
      return;
    }

    if (!message.trim()) {
      setError('Please enter a review message');
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await onSubmit({ rating, message: message.trim() });
      if (result) {
        setSuccess(true);
        setTimeout(() => {
          onBack();
        }, 1500);
      } else {
        setError('Failed to submit review. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-100 to-blue-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-10 h-10 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              Review Submitted!
            </h3>
            <p className="text-gray-600">
              Thank you for your feedback. Redirecting...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-100 to-blue-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-400 to-sky-500 text-white p-6 shadow-lg">
        <div className="max-w-4xl mx-auto">
          <Button
            onClick={onBack}
            variant="ghost"
            className="text-blue-100 hover:text-white hover:bg-white/10 mb-4 -ml-2"
          >
            <ChevronRight className="w-5 h-5 rotate-180 mr-1" />
            Back to List
          </Button>
          <h1 className="text-3xl font-bold mb-2">Leave a Review</h1>
          <p className="text-blue-100">Share your experience with this service</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Item Details Card */}
        <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-xl mb-6">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <h2 className="text-2xl font-bold text-gray-800">{item.jobId}</h2>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                      item.status
                    )}`}
                  >
                    {item.status}
                  </span>
                </div>
                <p className="text-gray-600 text-sm">
                  {machine.machineNumber} • {machine.machineName}
                </p>
              </div>
            </div>

            {item.description && (
              <p className="text-gray-700 mb-4 pb-4 border-b border-gray-200">
                {item.description}
              </p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Date</p>
                  <p className="font-semibold">{formatDate(item.date)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Location</p>
                  <p className="font-semibold line-clamp-1">{item.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Technician</p>
                  <p className="font-semibold">{item.technician_name}</p>
                </div>
              </div>
            </div>

            {item.note && (
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-xs font-semibold text-yellow-800 mb-1">Note:</p>
                <p className="text-sm text-yellow-700">{item.note}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Review Form */}
        {existingReview ? (
          <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-xl">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-green-600 fill-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Already Reviewed
              </h3>
              <p className="text-gray-600 mb-4">
                You have already submitted a review for this item.
              </p>
              <div className="flex justify-center mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-6 h-6 ${
                      star <= existingReview.rating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <p className="text-gray-700 italic">"{existingReview.message}"</p>
            </CardContent>
          </Card>
        ) : (
          <form onSubmit={handleSubmit}>
            <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-xl">
              <CardContent className="p-6">
                {/* Rating Section */}
                <div className="mb-6">
                  <label className="block text-gray-700 font-bold mb-4 text-lg">
                    How would you rate this service?
                  </label>
                  <div className="flex justify-center gap-3 py-6 bg-gray-50 rounded-xl">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-lg p-1"
                      >
                        <Star
                          className={`w-12 h-12 md:w-14 md:h-14 transition-colors ${
                            star <= (hoverRating || rating)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  {(rating > 0 || hoverRating > 0) && (
                    <p className="text-center text-lg font-semibold text-gray-700 mt-3">
                      {getRatingLabel(hoverRating || rating)}
                    </p>
                  )}
                </div>

                {/* Message Section */}
                <div className="mb-6">
                  <label
                    htmlFor="review-message"
                    className="block text-gray-700 font-bold mb-2 text-lg"
                  >
                    Share your experience
                  </label>
                  <Textarea
                    id="review-message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your experience with this service. What went well? Any suggestions for improvement?"
                    rows={6}
                    className="resize-none border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-400/20"
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    {message.length} characters
                  </p>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-600 font-medium">{error}</p>
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting || rating === 0}
                  className="w-full h-12 bg-gradient-to-r from-blue-400 to-sky-500 hover:from-blue-500 hover:to-sky-600 text-white font-semibold shadow-lg shadow-blue-400/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Submitting Review...
                    </span>
                  ) : (
                    'Submit Review'
                  )}
                </Button>
              </CardContent>
            </Card>
          </form>
        )}
      </div>
    </div>
  );
};

export default ReviewForm;