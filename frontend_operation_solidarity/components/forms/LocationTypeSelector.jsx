const LocationTypeSelector = ({ locationType, setLocationType }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-primary-800">
        Location Type
      </label>
      <div className="mt-2">
        <label className="inline-flex items-center">
          <input
            type="radio"
            className="form-radio"
            name="locationType"
            value="cityAddress"
            checked={locationType === 'cityAddress'}
            onChange={() => setLocationType('cityAddress')}
          />
          <span className="ml-2">City and Address</span>
        </label>
        <label className="inline-flex items-center ml-6">
          <input
            type="radio"
            className="form-radio"
            name="locationType"
            value="fromTo"
            checked={locationType === 'fromTo'}
            onChange={() => setLocationType('fromTo')}
          />
          <span className="ml-2">From / To</span>
        </label>
      </div>
    </div>
  );
};

export default LocationTypeSelector;
