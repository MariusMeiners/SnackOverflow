import {useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Stripe from 'stripe';
import Link from "next/link"

import "../app/globals.css";

const SuccessPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center max-w-lg w-11/12 md:w-1/2">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Payment Cancelled
        </h1>
        <p><Link className="text-base md:text-lg text-green-600 underline" href="/">Return to Crave
        </Link></p>
      </div>
    </div>
  );
};

export default SuccessPage;