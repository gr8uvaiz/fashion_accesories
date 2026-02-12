import React, { useState } from "react";
import { Country, State, City } from "country-state-city";
import CustomSelect from "./CustomSelect";
import { toast } from "sonner";

interface Address {
  _id?: string;
  label: string;
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  isDefault: boolean;
}

interface AddressFormProps {
  address?: Address;
  onSave: (address: Omit<Address, "_id">) => Promise<void>;
  onCancel: () => void;
}

interface FormErrors {
  label?: string;
  fullName?: string;
  phone?: string;
  street?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
}

const AddressForm: React.FC<AddressFormProps> = ({
  address,
  onSave,
  onCancel,
}) => {
  const [formData, setFormData] = useState<Omit<Address, "_id">>({
    label: address?.label || "",
    fullName: address?.fullName || "",
    phone: address?.phone || "",
    street: address?.street || "",
    city: address?.city || "",
    state: address?.state || "",
    country: address?.country || "IN",
    postalCode: address?.postalCode || "",
    isDefault: address?.isDefault || false,
  });

  const [selectedCountry, setSelectedCountry] = useState(
    address?.country || "IN",
  );
  const [selectedState, setSelectedState] = useState(address?.state || "");
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  const countries = Country.getAllCountries().map((country) => ({
    value: country.isoCode,
    label: country.name,
  }));

  const states = State.getStatesOfCountry(selectedCountry).map((state) => ({
    value: state.isoCode,
    label: state.name,
  }));

  const cities = selectedState
    ? City.getCitiesOfState(selectedCountry, selectedState).map((city) => ({
        value: city.name,
        label: city.name,
      }))
    : [];

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case "label":
        if (!value.trim()) return "Address label is required";
        if (value.trim().length < 2)
          return "Label must be at least 2 characters";
        if (value.trim().length > 30)
          return "Label must not exceed 30 characters";
        return undefined;

      case "fullName":
        if (!value.trim()) return "Full name is required";
        if (value.trim().length < 3)
          return "Name must be at least 3 characters";
        if (value.trim().length > 50)
          return "Name must not exceed 50 characters";
        return undefined;

      case "phone":
        if (!value.trim()) return "Phone number is required";
        const phoneRegex = /^[6-9]\d{9}$/;
        if (!phoneRegex.test(value.replace(/\s/g, ""))) {
          return "Enter a valid 10-digit mobile number";
        }
        return undefined;

      case "street":
        if (!value.trim()) return "Street address is required";
        if (value.trim().length < 10)
          return "Address must be at least 10 characters";
        if (value.trim().length > 200)
          return "Address must not exceed 200 characters";
        return undefined;

      case "city":
        if (!value.trim()) return "City is required";
        return undefined;

      case "state":
        if (!value.trim()) return "State is required";
        return undefined;

      case "country":
        if (!value.trim()) return "Country is required";
        return undefined;

      case "postalCode":
        if (!value.trim()) return "Postal code is required";
        const postalRegex = /^\d{6}$/;
        if (!postalRegex.test(value.trim())) {
          return "Enter a valid 6-digit postal code";
        }
        return undefined;

      default:
        return undefined;
    }
  };

  const handleChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });

    if (touched[name]) {
      const error = validateField(name, value);
      setErrors({ ...errors, [name]: error });
    }
  };

  const handleBlur = (name: string, value?: string) => {
    setTouched({ ...touched, [name]: true });
    // Use the provided value if available, otherwise get from formData
    const valueToValidate =
      value !== undefined
        ? value
        : (formData[name as keyof typeof formData] as string);
    const error = validateField(name, valueToValidate);
    setErrors({ ...errors, [name]: error });
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    // Create a current snapshot of form data with the latest values
    const currentFormData = {
      ...formData,
      country: selectedCountry,
      state: selectedState,
    };

    // Validate all fields
    Object.keys(currentFormData).forEach((key) => {
      if (key !== "isDefault") {
        const error = validateField(
          key,
          currentFormData[key as keyof typeof currentFormData] as string,
        );
        if (error) {
          newErrors[key as keyof FormErrors] = error;
          isValid = false;
        }
      }
    });

    setErrors(newErrors);
    setTouched({
      label: true,
      fullName: true,
      phone: true,
      street: true,
      city: true,
      state: true,
      country: true,
      postalCode: true,
    });

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix all errors before saving");
      return;
    }

    try {
      setIsSaving(true);
      // Ensure we send the latest values including selectedCountry and selectedState
      const dataToSave = {
        ...formData,
        country: selectedCountry,
        state: selectedState,
      };
      await onSave(dataToSave);
    } catch (error) {
      console.error("Error saving address:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-6">
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium mb-1">
            Address Label <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.label}
            onChange={(e) => handleChange("label", e.target.value)}
            onBlur={() => handleBlur("label")}
            maxLength={30}
            className={`w-full px-4 py-3 rounded-lg border-2 ${
              errors.label && touched.label
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-slate-200 dark:border-slate-700 focus:border-primary focus:ring-primary"
            } dark:bg-slate-800 transition-all`}
            placeholder="Home, Office, etc."
          />
          {errors.label && touched.label && (
            <p className="text-red-500 text-xs mt-1">{errors.label}</p>
          )}
          <p className="text-xs text-slate-400 mt-1">
            {formData.label.length}/30
          </p>
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
            onBlur={() => handleBlur("fullName")}
            maxLength={50}
            className={`w-full px-4 py-3 rounded-lg border-2 ${
              errors.fullName && touched.fullName
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-slate-200 dark:border-slate-700 focus:border-primary focus:ring-primary"
            } dark:bg-slate-800 transition-all`}
            placeholder="John Doe"
          />
          {errors.fullName && touched.fullName && (
            <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
          )}
          <p className="text-xs text-slate-400 mt-1">
            {formData.fullName.length}/50
          </p>
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium mb-1">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            onBlur={() => handleBlur("phone")}
            maxLength={10}
            className={`w-full px-4 py-3 rounded-lg border-2 ${
              errors.phone && touched.phone
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-slate-200 dark:border-slate-700 focus:border-primary focus:ring-primary"
            } dark:bg-slate-800 transition-all`}
            placeholder="9876543210"
          />
          {errors.phone && touched.phone && (
            <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
          )}
        </div>

        <div className="sm:col-span-2">
          <CustomSelect
            label="Country"
            options={countries}
            value={selectedCountry}
            onChange={(value) => {
              setSelectedCountry(value);
              setSelectedState("");
              handleChange("country", value);
              handleChange("state", "");
              handleChange("city", "");
              // Mark as touched and validate with the new value
              handleBlur("country", value);
            }}
            placeholder="Select country"
            error={
              errors.country && touched.country ? errors.country : undefined
            }
          />
        </div>

        <div>
          <CustomSelect
            label="State"
            options={states}
            value={selectedState}
            onChange={(value) => {
              setSelectedState(value);
              handleChange("state", value);
              handleChange("city", "");
              // Mark as touched and validate with the new value
              handleBlur("state", value);
            }}
            placeholder="Select state"
            disabled={!selectedCountry}
            error={errors.state && touched.state ? errors.state : undefined}
          />
        </div>

        <div>
          <CustomSelect
            label="City"
            options={cities}
            value={formData.city}
            onChange={(value) => {
              handleChange("city", value);
              // Mark as touched and validate with the new value
              handleBlur("city", value);
            }}
            placeholder="Select city"
            disabled={!selectedState}
            error={errors.city && touched.city ? errors.city : undefined}
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium mb-1">
            Street Address <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.street}
            onChange={(e) => handleChange("street", e.target.value)}
            onBlur={() => handleBlur("street")}
            maxLength={200}
            className={`w-full px-4 py-3 rounded-lg border-2 ${
              errors.street && touched.street
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-slate-200 dark:border-slate-700 focus:border-primary focus:ring-primary"
            } dark:bg-slate-800 transition-all`}
            placeholder="123 Main Street, Apartment 4B"
          />
          {errors.street && touched.street && (
            <p className="text-red-500 text-xs mt-1">{errors.street}</p>
          )}
          <p className="text-xs text-slate-400 mt-1">
            {formData.street.length}/200
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Postal Code <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.postalCode}
            onChange={(e) => handleChange("postalCode", e.target.value)}
            onBlur={() => handleBlur("postalCode")}
            maxLength={6}
            className={`w-full px-4 py-3 rounded-lg border-2 ${
              errors.postalCode && touched.postalCode
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-slate-200 dark:border-slate-700 focus:border-primary focus:ring-primary"
            } dark:bg-slate-800 transition-all`}
            placeholder="400001"
          />
          {errors.postalCode && touched.postalCode && (
            <p className="text-red-500 text-xs mt-1">{errors.postalCode}</p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isDefault}
              onChange={(e) =>
                setFormData({ ...formData, isDefault: e.target.checked })
              }
              className="w-4 h-4 text-primary border-slate-300 rounded focus:ring-primary"
            />
            <span className="text-sm font-medium">Set as default address</span>
          </label>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isSaving}
          className="flex-1 bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSaving ? (
            <>
              <span className="material-icons animate-spin">refresh</span>
              Saving...
            </>
          ) : (
            <>
              <span className="material-icons">save</span>
              Save Address
            </>
          )}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 font-semibold py-3 rounded-xl transition-all"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AddressForm;
