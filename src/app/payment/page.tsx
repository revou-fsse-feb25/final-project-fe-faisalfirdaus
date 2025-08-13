"use client";

import React, { useState } from "react";
import { ArrowLeft, CreditCard, MapPin, Calendar } from "lucide-react";

const PaymentPage = () => {
  const [selectedPayment, setSelectedPayment] = useState("");

  const paymentMethods = [
    {
      id: "mjix",
      name: "m.jix POINT",
      subtitle: "Saldo: Rp62.000",
      icon: "m points",
      type: "point",
    },
    {
      id: "mandiri",
      name: "Mandiri Virtual Account",
      subtitle: "",
      icon: "mandiri",
      type: "virtual",
    },
    {
      id: "card",
      name: "Credit Card / Debit Card",
      subtitle: "",
      icon: "card",
      type: "card",
    },
  ];

  const orderDetails = {
    movie: "DEMON SLAYER -KIMETSU NO YAIBA- THE MOVIE: INFINITY CASTLE",
    cinema: "Cinema XXI",
    location: "BRAGA XXI Studio 2, Reguler 2D",
    datetime: "Jumat, 15 Agustus 2025, 12:15",
    seat: "F5",
    quantity: 1,
    price: 35000,
  };

  const handlePaymentSelect = (paymentId) => {
    setSelectedPayment(paymentId);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
      .format(amount)
      .replace("IDR", "Rp");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <ArrowLeft
              size={24}
              className="text-gray-600 cursor-pointer hover:text-gray-800"
            />
            <h1 className="text-xl font-semibold text-gray-800">
              Konfirmasi pesanan
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Payment Methods */}
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-medium text-gray-800 mb-4">
                Pilih metode pembayaran
              </h2>

              {/* m.jix POINT */}
              <div className="bg-white rounded-lg border border-gray-200 mb-4">
                <label className="flex items-center p-4 cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="payment"
                    value="mjix"
                    checked={selectedPayment === "mjix"}
                    onChange={() => handlePaymentSelect("mjix")}
                    className="w-4 h-4 text-blue-600 mr-4"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-gray-800">m.jix POINT</div>
                    <div className="text-sm text-red-500">Saldo: Rp62.000</div>
                  </div>
                  <div className="bg-gray-100 px-3 py-1 rounded text-xs font-medium border">
                    m points
                  </div>
                </label>
              </div>
            </div>

            <div>
              <h3 className="text-base font-medium text-gray-800 mb-4">
                Virtual Account
              </h3>

              {/* Mandiri Virtual Account */}
              <div className="bg-white rounded-lg border border-gray-200 mb-4">
                <label className="flex items-center p-4 cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="payment"
                    value="mandiri"
                    checked={selectedPayment === "mandiri"}
                    onChange={() => handlePaymentSelect("mandiri")}
                    className="w-4 h-4 text-blue-600 mr-4"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-gray-800">
                      Mandiri Virtual Account
                    </div>
                  </div>
                  <div className="bg-blue-600 text-white px-3 py-1 rounded text-xs font-medium">
                    mandiri
                  </div>
                </label>
              </div>
            </div>

            <div>
              <h3 className="text-base font-medium text-gray-800 mb-4">
                Cards
              </h3>

              {/* Credit/Debit Card */}
              <div className="bg-white rounded-lg border border-gray-200 mb-4">
                <label className="flex items-center p-4 cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={selectedPayment === "card"}
                    onChange={() => handlePaymentSelect("card")}
                    className="w-4 h-4 text-blue-600 mr-4"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-gray-800">
                      Credit Card / Debit Card
                    </div>
                  </div>
                  <div className="border border-gray-300 px-3 py-1 rounded">
                    <CreditCard size={16} />
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Order Details */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-medium text-gray-800 mb-6">
              Detail pesanan
            </h2>

            {/* Movie Info */}
            <div className="flex gap-4 mb-6">
              <div className="w-16 h-24 bg-gradient-to-br from-orange-400 via-red-500 to-yellow-600 rounded-lg flex-shrink-0 flex items-center justify-center text-white text-xs font-bold text-center">
                DEMON
                <br />
                SLAYER
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 mb-2 leading-tight">
                  {orderDetails.movie}
                </h3>
                <div className="text-sm text-gray-600 mb-1">
                  {orderDetails.cinema}
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-600 mb-1">
                  <MapPin size={14} />
                  {orderDetails.location}
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Calendar size={14} />
                  {orderDetails.datetime}
                </div>
              </div>
            </div>

            {/* Ticket Details */}
            <div className="border-t pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-medium">
                    {orderDetails.quantity}
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">Tiket</div>
                    <div className="text-sm text-gray-600">
                      {orderDetails.seat}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600">
                    {orderDetails.quantity} x{" "}
                    {formatCurrency(orderDetails.price)}
                  </div>
                  <div className="font-semibold text-gray-800">
                    {formatCurrency(orderDetails.price)}
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div className="border-t pt-4 space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>{formatCurrency(orderDetails.price)}</span>
                </div>
                <div className="flex justify-between font-semibold text-gray-800 text-lg">
                  <span>Total pembayaran</span>
                  <span>{formatCurrency(orderDetails.price)}</span>
                </div>
              </div>

              {/* Pay Button */}
              <button
                className={`w-full mt-6 py-3 px-4 rounded-lg font-medium transition-colors ${
                  selectedPayment
                    ? "bg-gray-800 text-white hover:bg-gray-900"
                    : "bg-gray-400 text-gray-600 cursor-not-allowed"
                }`}
                disabled={!selectedPayment}
              >
                Bayar {formatCurrency(orderDetails.price)}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
