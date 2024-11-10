import React, { useState, useEffect } from "react";
import { acceptPrivacyPolicy } from "@/actions/user/acceptPrivacyPolicy";

const PrivacyFormModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [error, setError] = useState("");

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError("");

    try {
      await acceptPrivacyPolicy();
      setAccepted(true);
      closeModal();
    } catch (err) {
      setError("Failed to accept privacy policy. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") closeModal();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <div>
      {!accepted ? (
        <button
          onClick={openModal}
          className="px-6 py-2 text-white bg-gradient-to-r from-purple-500 via-purple-600 to-blue-500 rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-purple-300 transition-all duration-200 animate-gradient"
        >
          Fill this first to upload content
        </button>
      ) : (
        <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-200/20 rounded-lg p-4">
          <p className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
            You have accepted the privacy policy!
          </p>
        </div>
      )}

      {isOpen && (
        <div className="fixed inset-0 mt-20 z-50 overflow-y-auto">
          <div
            className="fixed inset-0 bg-[#090919]/80 backdrop-blur-sm"
            onClick={closeModal}
            aria-hidden="true"
          />
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-[#090919] to-[#161837]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.1),transparent)] animate-pulse"></div>
              </div>

              <div className="relative sticky top-0 flex items-center justify-between p-4 md:p-6 border-b border-purple-500/20 backdrop-blur-md">
                <h2 className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-500 to-blue-400">
                  Privacy Policy
                </h2>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-white/5 rounded-full transition-colors duration-200"
                  aria-label="Close modal"
                >
                  <svg
                    className="w-5 h-5 text-purple-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="relative p-4 md:p-6 max-h-[60vh] overflow-y-auto text-gray-300/90">
                <div className="space-y-6">
                  <section>
                    <h3 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                      1. User Responsibility for Uploaded Content
                    </h3>
                    <p className="mt-2">
                      Users must confirm ownership of the content (audio, music, podcast, etc.) they upload or have proper permissions/licenses.
                    </p>
                    <p className="mt-2">
                      Users must acknowledge that they will not upload content that violates copyright or other intellectual property rights.
                    </p>
                    <p className="mt-2">
                      Users agree to indemnify and hold the platform harmless from any claims or damages due to unauthorized content.
                    </p>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                      2. Copyright and Licensing
                    </h3>
                    <p className="mt-2">
                      Users must not upload copyrighted materials without authorization.
                    </p>
                    <p className="mt-2">
                      Users are responsible for securing licenses for third-party materials in their content.
                    </p>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                      3. Content Moderation
                    </h3>
                    <p className="mt-2">
                      The platform reserves the right to remove any content violating copyright laws or terms of service.
                    </p>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                      4. Content Removal Requests
                    </h3>
                    <p className="mt-2">
                      Content subject to copyright claims may be removed upon request.
                    </p>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                      5. Acknowledgment of Legal Compliance
                    </h3>
                    <p className="mt-2">
                      Users agree to comply with all applicable laws related to content uploaded on the platform.
                    </p>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                      6. Policy Changes
                    </h3>
                    <p className="mt-2">
                      This privacy policy may be updated, with changes communicated to users via the platform.
                    </p>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                      7. Data Storage and Localization
                    </h3>
                    <p className="mt-2">
                      All personal data is stored within India in compliance with Indian data protection laws unless cross-border transfers are consented to.
                    </p>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                      8. Compliance with Indian Laws
                    </h3>
                    <p className="mt-2">
                      This policy follows Indian law, with disputes subject to Indian jurisdiction.
                    </p>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                      9. Marketing Communications
                    </h3>
                    <p className="mt-2">
                      By accepting this policy, users consent to marketing communications, with opt-out available anytime.
                    </p>
                  </section>
                </div>
              </div>

              <div className="relative flex justify-center items-center gap-4 bg-gray-800/60 p-4">
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="px-6 py-2 text-white bg-gradient-to-r from-purple-500 via-purple-600 to-blue-500 rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-purple-300 transition-all duration-200"
                >
                  {isSubmitting ? "Submitting..." : "I Accept"}
                </button>
                <button
                  onClick={closeModal}
                  className="px-6 py-2 text-white bg-gray-600 rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-purple-300 transition-all duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrivacyFormModal;
