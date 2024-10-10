import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

import {Item} from "../../lib/types";

type RequestBody = {
    customerName: string,
    customerAddress: string,
    customerEmail: string,
    deliveryDate: string,
    items: Item[]
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const {customerName, customerAddress, customerEmail, items, deliveryDate} = req.body;

      const lineItems = items.filter((item: Item) => item.amount != 0).map((item: Item) => {
        return {
            price_data: {
                currency: 'EUR',
                product_data: {
                    name: item.subcategory,
                },
                unit_amount: item.listPrice * 100 // Stripe needs an integer in cents etc.
            },
            quantity: item.amount
        }
      });

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        customer_email: customerEmail,
        line_items: lineItems,
        metadata: {
            customerName,
            customerAddress,
            deliveryDate,
        },
        success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}&deliveryDate=${deliveryDate}`,
        cancel_url: `${req.headers.origin}/cancel`,
      });

      res.status(200).json({ sessionId: session.id });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}