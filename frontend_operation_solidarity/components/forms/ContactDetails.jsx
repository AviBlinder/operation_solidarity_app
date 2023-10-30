// components/forms/ContactDetails.js

function ContactDetails({ contact, setContact }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
      <div>
        <label
          htmlFor="phone"
          className="block mt-2 text-sm font-medium text-primary-800"
        >
          Phone Number
        </label>
      </div>

      <div className="mt-1">
        <input
          type="tel"
          name="phone"
          id="phone"
          className="mt-1 block w-full py-1 px-3 border border-gray-300 bg-white rounded-md shadow-xs focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
          placeholder="Enter your phone number"
          value={contact?.phone}
          onChange={(e) => setContact({ ...contact, phone: e.target.value })}
        />
      </div>
      <div className="md:hidden"> </div>
      <div className="md:hidden"> </div>
    </div>
  );
}

export default ContactDetails;