// app/apartment/[id]/page.tsx

import { config } from "@/config";
import { formatPrice } from "@/util/priceFormat";
import axios from "axios";
import Image from "next/image";
import { notFound } from "next/navigation";

interface Apartment {
  id: number;
  name: string;
  description: string;
  price: number;
  pic_url: string;
}

async function fetchApartmentDetails(id: string) {
  const response = await axios.get(
    process.env.NEXT_PUBLIC_API_URL + "apartments/get-apartment",
    {
      params: {
        apartment_id: +id,
      },
    }
  );

  return response.data.data;
}

export default async function ApartmentDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  let apartment: Apartment | null = null;

  try {
    apartment = await fetchApartmentDetails(id);
  } catch (error) {
    console.error("Error fetching apartment details:", error);
    notFound(); // Redirect to 404 page
  }

  if (!apartment) {
    notFound(); // Redirect to 404 page
  }

  return (
    <div className="min-h-screen flex  justify-center">
    <div className="bg-white p-6 shadow-lg rounded-lg  flex">
      <div className="flex-1 mr-6">
        <div className="relative h-96 rounded-lg overflow-hidden">
          <img
            src={config.picBaseURL + apartment.pic_url}
            alt={apartment.name}
            style={{height: "100%", width: "100%"}}
            className=""
          />
        </div>
      </div>
      <div className="flex-1">
        <h1 className="text-4xl font-bold mb-6">{apartment.name}</h1>
        <p className="text-gray-700 mb-4">{apartment.description}</p>
        <p className="text-green-600 font-bold text-2xl">
          {formatPrice(apartment.price)}
        </p>
      </div>
    </div>
  </div>
  );
}
