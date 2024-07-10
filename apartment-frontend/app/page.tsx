"use client";

import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { config } from "../config";
import { formatPrice } from "@/util/priceFormat";
import Link from "next/link";

interface Apartment {
  id: number;
  name: string;
  description: string;
  price: number;
  pic_url: string;
}

const Home: React.FC = () => {
  const [apartments, setApartments] = useState<Apartment[]>([]);

  useEffect(() => {
    axios
      .get(process.env.NEXT_PUBLIC_API_URL + "apartments/get-all-apartments")
      .then((res) => {
        console.log(res.data.data);
        setApartments(res.data.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold my-8">Apartments</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {apartments.map((apartment) => (
            <div
              key={apartment.id}
              className="bg-white border rounded-lg overflow-hidden shadow-lg"
            >
              <img
                src={process.env.NEXT_PUBLIC_API_URL + "uploads/" + apartment.pic_url}
                alt={apartment.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{apartment.name}</h2>
                <p className="text-gray-700 mb-4">{apartment.description}</p>
                <p className="text-gray-900 font-bold">
                  {formatPrice(apartment.price)}
                </p>
                <button
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200"
                >
                  <Link href={`apartment/${apartment.id}`}>View Details</Link>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
