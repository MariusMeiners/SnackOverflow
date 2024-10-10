import {useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Stripe from 'stripe';
import Link from "next/link"

import "../app/globals.css";

const SuccessPage: React.FC = () => {
  const router = useRouter();
  const { deliveryDate } = router.query;
  const [formattedDate, setFormattedDate] = useState<string | null>(null);

  useEffect(() => {
    if (deliveryDate) {
      // Parse the date string and format it to German format
      const date = new Date(deliveryDate as string);
      const germanFormattedDate = new Intl.DateTimeFormat('de-DE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }).format(date);
      setFormattedDate(germanFormattedDate);
    }
  }, [deliveryDate]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center max-w-lg w-11/12 md:w-1/2">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Payment successful
        </h1>
        <p className="text-lg md:text-xl mt-4">
          Thank you for your continued support in making the world a better place. &#128154;
        </p>
        <p className="text-md class mt-4">
        Your order will be delivered on <strong>{formattedDate}</strong></p>
        <p className="text-md class mt-4"><Link className="text-base md:text-lg text-green-600 underline" href="/">Return to Crave
        </Link></p>
      </div>
    </div>
  );
};

export default SuccessPage;