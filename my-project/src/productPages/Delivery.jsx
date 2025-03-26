import React from "react";

const Delivery = () => {
  return (
    <div>
      <div className="flex flex-col gap-5">
        <h1 className="text-gray-700 font-bold text-xl">SHIPPING DETAILS</h1>

        <div>
          <div className="flex flex-col gap-5">
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-2 ">
                <label htmlFor="firstName" className="text-gray-500">
                  First Name
                </label>
                <input
                  type="text"
                  className="bg-transparent border border-gray-400 py-3 px-5 "
                />
              </div>
              <div className="flex flex-col gap-2 ">
                <label htmlFor="lastName" className="text-gray-500">
                  Last Name
                </label>
                <input
                  type="text"
                  className="bg-transparent border border-gray-400 py-3 px-5"
                />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-2 ">
                <label htmlFor="firstName" className="text-gray-500">
                  City
                </label>
                <input
                  type="text"
                  className="bg-transparent border border-gray-400 py-3 px-5 "
                />
              </div>
              <div className="flex flex-col gap-2 ">
                <label htmlFor="lastName" className="text-gray-500">
                  Recipient phone
                </label>
                <input
                  type="tel"
                  className="bg-transparent border border-gray-400 py-3 px-5"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-gray-500">
                Street Address
              </label>
              <input
                type="email"
                placeholder="house number and street number"
                className="bg-transparent border border-gray-400 py-3 px-10"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="mobileNumber" className="text-gray-500">
                Street Address 2 (optional)
              </label>
              <input
                type="text"
                placeholder="apartment,suite,unit,etc..."
                className="bg-transparent border border-gray-400 py-3 px-10"
              />
            </div>
            <div className="flex flex-col gap-3 ">
              <label htmlFor="mobileNumber" className="text-gray-500">
                Order Notes(Optional)
              </label>
              <textarea
                name=""
                id=""
                className="bg-transparent border border-gray-400 p-3 "
                placeholder="Notes about your order... "
              ></textarea>
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor="mobileNumber" className="text-gray-500">
                Checking Shipping Cost
              </label>
              <button className="bg-gray-600 py-3 text-white font-semibold">
                CHECK SHIPPING COST
              </button>
              <div className="flex justify-between items-center border-b border-gray-400 pb-5 mt-3">
                <span className="text-gray-700 font-semibold">Total</span>
                <span className="text-gray-800">Rs.100,000</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Delivery;
