import { useState, useEffect } from 'react';
import { loadStripe, Stripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null>;

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY! ||
            'pk_test_51Q80egAiaZMQ8ZPM1BHeEv5DrlfJBXFWUI9rJulygXoSthfNG49rhxrNxUdWuYYgDO8OZwOhRejLjGXat9cwyzsD00Ud4HsG79');
  }
  return stripePromise;
};