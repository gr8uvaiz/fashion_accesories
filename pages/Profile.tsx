import React, { useState, useEffect } from "react";
import CustomSelect from "../src/components/CustomSelect";
import AddressForm from "../src/components/AddressForm";
import ConfirmDialog from "../src/components/ConfirmDialog";
import axios from "axios";
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

interface ProfileData {
  name: string;
  email: string;
  profile: {
    avatar?: string;
    phone?: string;
    dateOfBirth?: string;
    gender?: string;
    bio?: string;
  };
}

interface Address {
  _id: string;
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

const Profile: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<"personal" | "addresses">(
    "personal",
  );

  const [profileData, setProfileData] = useState<ProfileData>({
    name: "",
    email: "",
    profile: {
      avatar: "",
      phone: "",
      dateOfBirth: "",
      gender: "",
      bio: "",
    },
  });

  const [avatarPreview, setAvatarPreview] = useState("");
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | undefined>();
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    addressId: string | null;
  }>({
    isOpen: false,
    addressId: null,
  });

  useEffect(() => {
    fetchProfile();
    fetchAddresses();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        const user = response.data.user;
        setProfileData({
          name: user.name || "",
          email: user.email || "",
          profile: {
            avatar: user.profile?.avatar || "",
            phone: user.profile?.phone || "",
            dateOfBirth: user.profile?.dateOfBirth
              ? new Date(user.profile.dateOfBirth).toISOString().split("T")[0]
              : "",
            gender: user.profile?.gender || "",
            bio: user.profile?.bio || "",
          },
        });
        setAvatarPreview(user.profile?.avatar || "");
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast.error("Failed to load profile data");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAddresses = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/profile/addresses`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        setAddresses(response.data.addresses);
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Image size should be less than 2MB");
        return;
      }

      if (!file.type.startsWith("image/")) {
        toast.error("Please upload a valid image file");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setAvatarPreview(base64String);
        setProfileData({
          ...profileData,
          profile: { ...profileData.profile, avatar: base64String },
        });
        toast.success("Profile picture updated");
      };
      reader.onerror = () => {
        toast.error("Failed to read image file");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = async () => {
    try {
      setIsSaving(true);
      const token = localStorage.getItem("token");

      const response = await axios.put(`${API_URL}/profile`, profileData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        toast.success("Profile updated successfully!");
      }
    } catch (error: any) {
      console.error("Error updating profile:", error);
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveAddress = async (addressData: Omit<Address, "_id">) => {
    try {
      const token = localStorage.getItem("token");

      if (editingAddress) {
        // Update existing address
        const response = await axios.put(
          `${API_URL}/profile/addresses/${editingAddress._id}`,
          addressData,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        if (response.data.success) {
          setAddresses(response.data.addresses);
          toast.success("Address updated successfully!");
          setShowAddressForm(false);
          setEditingAddress(undefined);
        }
      } else {
        // Add new address
        const response = await axios.post(
          `${API_URL}/profile/addresses`,
          addressData,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        if (response.data.success) {
          setAddresses(response.data.addresses);
          toast.success("Address added successfully!");
          setShowAddressForm(false);
        }
      }
    } catch (error: any) {
      console.error("Error saving address:", error);
      toast.error(error.response?.data?.message || "Failed to save address");
    }
  };

  const handleDeleteAddress = async (addressId: string) => {
    setConfirmDialog({ isOpen: true, addressId });
  };

  const confirmDeleteAddress = async () => {
    if (!confirmDialog.addressId) return;

    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `${API_URL}/profile/addresses/${confirmDialog.addressId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (response.data.success) {
        setAddresses(response.data.addresses);
        toast.success("Address deleted successfully!");
      }
    } catch (error: any) {
      console.error("Error deleting address:", error);
      toast.error(error.response?.data?.message || "Failed to delete address");
    } finally {
      setConfirmDialog({ isOpen: false, addressId: null });
    }
  };

  const handleSetDefault = async (addressId: string) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${API_URL}/profile/addresses/${addressId}/default`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (response.data.success) {
        setAddresses(response.data.addresses);
        toast.success("Default address updated!");
      }
    } catch (error: any) {
      console.error("Error setting default address:", error);
      toast.error(
        error.response?.data?.message || "Failed to set default address",
      );
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <span className="material-icons text-5xl text-primary animate-spin">
              refresh
            </span>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Loading profile...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Profile</h1>
        <p className="text-slate-500">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800 sticky top-24">
            {/* Avatar Section */}
            <div className="text-center mb-6">
              <div className="relative inline-block">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-gradient-to-br from-primary to-purple-600 p-1">
                  <div className="w-full h-full rounded-full overflow-hidden bg-white dark:bg-slate-900">
                    {avatarPreview ? (
                      <img
                        src={avatarPreview}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-slate-100 dark:bg-slate-800">
                        <span className="material-icons text-5xl text-slate-400">
                          person
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <label className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full cursor-pointer hover:bg-primary-dark transition-all shadow-lg">
                  <span className="material-icons text-sm">photo_camera</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
              <h2 className="text-xl font-bold mt-4">{profileData.name}</h2>
              <p className="text-sm text-slate-500">{profileData.email}</p>
            </div>

            {/* Navigation */}
            <div className="space-y-2">
              <button
                onClick={() => setActiveTab("personal")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  activeTab === "personal"
                    ? "bg-primary text-white"
                    : "hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
              >
                <span className="material-icons">person</span>
                <span className="font-medium">Personal Info</span>
              </button>
              <button
                onClick={() => setActiveTab("addresses")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  activeTab === "addresses"
                    ? "bg-primary text-white"
                    : "hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
              >
                <span className="material-icons">location_on</span>
                <span className="font-medium">Addresses</span>
                {addresses.length > 0 && (
                  <span className="ml-auto bg-slate-200 dark:bg-slate-700 text-xs px-2 py-1 rounded-full">
                    {addresses.length}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-8">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-100 dark:border-slate-800">
            {activeTab === "personal" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold mb-6">
                    Personal Information
                  </h3>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) =>
                        setProfileData({ ...profileData, name: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={profileData.email}
                      disabled
                      className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 dark:border-slate-700 dark:bg-slate-800 bg-slate-50 cursor-not-allowed opacity-60"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={profileData.profile.phone}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          profile: {
                            ...profileData.profile,
                            phone: e.target.value,
                          },
                        })
                      }
                      className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      placeholder="9876543210"
                      maxLength={10}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      value={profileData.profile.dateOfBirth}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          profile: {
                            ...profileData.profile,
                            dateOfBirth: e.target.value,
                          },
                        })
                      }
                      className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <CustomSelect
                      label="Gender"
                      options={[
                        { value: "male", label: "Male" },
                        { value: "female", label: "Female" },
                        { value: "other", label: "Other" },
                      ]}
                      value={profileData.profile.gender || ""}
                      onChange={(value) =>
                        setProfileData({
                          ...profileData,
                          profile: { ...profileData.profile, gender: value },
                        })
                      }
                      placeholder="Select gender"
                      searchable={false}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium mb-1">
                      Bio
                    </label>
                    <textarea
                      value={profileData.profile.bio}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          profile: {
                            ...profileData.profile,
                            bio: e.target.value,
                          },
                        })
                      }
                      rows={4}
                      maxLength={500}
                      className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                      placeholder="Tell us about yourself..."
                    />
                    <p className="text-xs text-slate-400 mt-1">
                      {profileData.profile.bio?.length || 0}/500 characters
                    </p>
                  </div>
                </div>

                <div className="mt-8">
                  <button
                    onClick={handleSaveProfile}
                    disabled={isSaving}
                    className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSaving ? (
                      <>
                        <span className="material-icons animate-spin">
                          refresh
                        </span>
                        Saving...
                      </>
                    ) : (
                      <>
                        <span className="material-icons">save</span>
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {activeTab === "addresses" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold">Saved Addresses</h3>
                  {!showAddressForm && (
                    <button
                      onClick={() => {
                        setShowAddressForm(true);
                        setEditingAddress(undefined);
                      }}
                      className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all"
                    >
                      <span className="material-icons text-sm">add</span>
                      Add New
                    </button>
                  )}
                </div>

                {showAddressForm ? (
                  <AddressForm
                    address={editingAddress}
                    onSave={handleSaveAddress}
                    onCancel={() => {
                      setShowAddressForm(false);
                      setEditingAddress(undefined);
                    }}
                  />
                ) : addresses.length === 0 ? (
                  <div className="text-center py-12">
                    <span className="material-icons text-6xl text-slate-200 mb-4">
                      location_off
                    </span>
                    <p className="text-slate-500 mb-4">
                      No addresses saved yet
                    </p>
                    <button
                      onClick={() => setShowAddressForm(true)}
                      className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg inline-flex items-center gap-2"
                    >
                      <span className="material-icons">add</span>
                      Add Your First Address
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {addresses.map((address) => (
                      <div
                        key={address._id}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          address.isDefault
                            ? "border-primary bg-primary/5"
                            : "border-slate-200 dark:border-slate-700"
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-semibold">{address.label}</h4>
                              {address.isDefault && (
                                <span className="text-xs bg-primary text-white px-2 py-0.5 rounded-full">
                                  Default
                                </span>
                              )}
                            </div>
                            <p className="text-sm font-medium">
                              {address.fullName}
                            </p>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              {address.phone}
                            </p>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                              {address.street}, {address.city}, {address.state}{" "}
                              - {address.postalCode}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                setEditingAddress(address);
                                setShowAddressForm(true);
                              }}
                              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all"
                              title="Edit"
                            >
                              <span className="material-icons text-sm">
                                edit
                              </span>
                            </button>
                            <button
                              onClick={() => handleDeleteAddress(address._id)}
                              className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 rounded-lg transition-all"
                              title="Delete"
                            >
                              <span className="material-icons text-sm">
                                delete
                              </span>
                            </button>
                          </div>
                        </div>
                        {!address.isDefault && (
                          <button
                            onClick={() => handleSetDefault(address._id)}
                            className="mt-3 text-sm text-primary hover:underline"
                          >
                            Set as default
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Confirm Dialog */}
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title="Delete Address"
        message="Are you sure you want to delete this address? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
        onConfirm={confirmDeleteAddress}
        onCancel={() => setConfirmDialog({ isOpen: false, addressId: null })}
      />
    </div>
  );
};

export default Profile;
