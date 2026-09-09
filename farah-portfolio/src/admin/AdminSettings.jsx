import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import settingService from "../services/settingService";

const emptySettings = {
  full_name: "",
  professional_title: "",
  location: "",
  contact_email: "",

  hero_label: "",
  hero_description: "",

  about_heading: "",
  about_text_1: "",
  about_text_2: "",
  about_text_3: "",

  github_url: "",
  linkedin_url: "",

  seo_title: "",
  seo_description: "",

  show_contact_form: true,
  show_cv_button: true,
};

function AdminSettings() {
  const [formData, setFormData] =
    useState(emptySettings);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [errors, setErrors] =
    useState({});

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");


  /* =========================
     LOAD SETTINGS
  ========================= */

  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true);
      setError("");

      try {
        const response =
          await settingService.getAdminSettings();

        const settings =
          response.data || {};

        setFormData({
          full_name:
            settings.full_name || "",

          professional_title:
            settings.professional_title || "",

          location:
            settings.location || "",

          contact_email:
            settings.contact_email || "",

          hero_label:
            settings.hero_label || "",

          hero_description:
            settings.hero_description || "",

          about_heading:
            settings.about_heading || "",

          about_text_1:
            settings.about_text_1 || "",

          about_text_2:
            settings.about_text_2 || "",

          about_text_3:
            settings.about_text_3 || "",

          github_url:
            settings.github_url || "",

          linkedin_url:
            settings.linkedin_url || "",

          seo_title:
            settings.seo_title || "",

          seo_description:
            settings.seo_description || "",

          show_contact_form:
            settings.show_contact_form ??
            true,

          show_cv_button:
            settings.show_cv_button ??
            true,
        });
      } catch (error) {
        if (
          error.response?.status !== 401 &&
          error.response?.status !== 403
        ) {
          setError(
            "Could not load settings."
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);


  /* =========================
     HANDLE CHANGE
  ========================= */

  const handleChange = (e) => {
    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setFormData((prev) => ({
      ...prev,

      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }

    setError("");
    setSuccess("");
  };


  /* =========================
     SAVE SETTINGS
  ========================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (saving) {
      return;
    }

    setSaving(true);
    setErrors({});
    setError("");
    setSuccess("");

    try {
      const response =
        await settingService.updateAdminSettings(
          formData
        );

      if (response.data) {
        setFormData((prev) => ({
          ...prev,
          ...response.data,
        }));
      }

      setSuccess(
        response.message ||
          "Settings updated successfully."
      );
    } catch (error) {
      if (
        error.response?.status === 422
      ) {
        setErrors(
          error.response?.data?.errors ||
            {}
        );

        return;
      }

      if (
        error.response?.status !== 401 &&
        error.response?.status !== 403
      ) {
        setError(
          "Could not save settings."
        );
      }
    } finally {
      setSaving(false);
    }
  };


  /* =========================
     LOADING
  ========================= */

  if (loading) {
    return (
      <main className="admin-dashboard">

        <section className="admin-content">

          <div className="admin-empty">
            Loading settings...
          </div>

        </section>

      </main>
    );
  }


  return (
    <main className="admin-dashboard">

      <section className="admin-content">

        {/* =========================
            HEADER
        ========================= */}

        <motion.div
          className="admin-page-heading"
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
        >

          <div>

            <p className="section-label">
              Website
            </p>

            <h1>
              Settings
            </h1>

            <p>
              Manage your portfolio content,
              social links, SEO and website
              preferences.
            </p>

          </div>

        </motion.div>


        {/* ERROR */}

        {error && (
          <div className="admin-dashboard-error">
            {error}
          </div>
        )}


        {/* SUCCESS */}

        {success && (
          <div className="form-success">
            {success}
          </div>
        )}


        <form
          className="admin-project-form"
          onSubmit={handleSubmit}
        >

          {/* =========================
              PERSONAL INFORMATION
          ========================= */}

          <div className="admin-form-section">

            <h2>
              Personal Information
            </h2>


            <div className="admin-form-grid">

              <div className="form-group">

                <label htmlFor="full_name">
                  Full Name
                </label>

                <input
                  id="full_name"
                  name="full_name"
                  type="text"
                  value={formData.full_name}
                  onChange={handleChange}
                />

                {errors.full_name && (
                  <span className="form-error">
                    {errors.full_name[0]}
                  </span>
                )}

              </div>


              <div className="form-group">

                <label htmlFor="professional_title">
                  Professional Title
                </label>

                <input
                  id="professional_title"
                  name="professional_title"
                  type="text"
                  value={
                    formData.professional_title
                  }
                  onChange={handleChange}
                />

                {errors.professional_title && (
                  <span className="form-error">
                    {
                      errors
                        .professional_title[0]
                    }
                  </span>
                )}

              </div>


              <div className="form-group">

                <label htmlFor="location">
                  Location
                </label>

                <input
                  id="location"
                  name="location"
                  type="text"
                  value={formData.location}
                  onChange={handleChange}
                />

              </div>


              <div className="form-group">

                <label htmlFor="contact_email">
                  Contact Email
                </label>

                <input
                  id="contact_email"
                  name="contact_email"
                  type="email"
                  value={
                    formData.contact_email
                  }
                  onChange={handleChange}
                />

                {errors.contact_email && (
                  <span className="form-error">
                    {
                      errors.contact_email[0]
                    }
                  </span>
                )}

              </div>

            </div>

          </div>


          {/* =========================
              HERO
          ========================= */}

          <div className="admin-form-section">

            <h2>
              Hero Section
            </h2>


            <div className="form-group">

              <label htmlFor="hero_label">
                Small Label
              </label>

              <input
                id="hero_label"
                name="hero_label"
                type="text"
                value={
                  formData.hero_label
                }
                onChange={handleChange}
              />

            </div>


            <div className="form-group">

              <label htmlFor="hero_description">
                Hero Description
              </label>

              <textarea
                id="hero_description"
                name="hero_description"
                rows="5"
                value={
                  formData.hero_description
                }
                onChange={handleChange}
              />

            </div>

          </div>


          {/* =========================
              ABOUT
          ========================= */}

          <div className="admin-form-section">

            <h2>
              About Section
            </h2>


            <div className="form-group">

              <label htmlFor="about_heading">
                About Heading
              </label>

              <input
                id="about_heading"
                name="about_heading"
                value={
                  formData.about_heading
                }
                onChange={handleChange}
              />

            </div>


            <div className="form-group">

              <label htmlFor="about_text_1">
                Paragraph 1
              </label>

              <textarea
                id="about_text_1"
                name="about_text_1"
                rows="4"
                value={
                  formData.about_text_1
                }
                onChange={handleChange}
              />

            </div>


            <div className="form-group">

              <label htmlFor="about_text_2">
                Paragraph 2
              </label>

              <textarea
                id="about_text_2"
                name="about_text_2"
                rows="4"
                value={
                  formData.about_text_2
                }
                onChange={handleChange}
              />

            </div>


            <div className="form-group">

              <label htmlFor="about_text_3">
                Paragraph 3
              </label>

              <textarea
                id="about_text_3"
                name="about_text_3"
                rows="4"
                value={
                  formData.about_text_3
                }
                onChange={handleChange}
              />

            </div>

          </div>


          {/* =========================
              SOCIAL LINKS
          ========================= */}

          <div className="admin-form-section">

            <h2>
              Social Links
            </h2>


            <div className="admin-form-grid">

              <div className="form-group">

                <label htmlFor="github_url">
                  GitHub URL
                </label>

                <input
                  id="github_url"
                  name="github_url"
                  type="url"
                  value={
                    formData.github_url
                  }
                  onChange={handleChange}
                />

              </div>


              <div className="form-group">

                <label htmlFor="linkedin_url">
                  LinkedIn URL
                </label>

                <input
                  id="linkedin_url"
                  name="linkedin_url"
                  type="url"
                  value={
                    formData.linkedin_url
                  }
                  onChange={handleChange}
                />

              </div>

            </div>

          </div>


          {/* =========================
              SEO
          ========================= */}

          <div className="admin-form-section">

            <h2>
              SEO
            </h2>


            <div className="form-group">

              <label htmlFor="seo_title">
                Website Title
              </label>

              <input
                id="seo_title"
                name="seo_title"
                type="text"
                value={
                  formData.seo_title
                }
                onChange={handleChange}
              />

            </div>


            <div className="form-group">

              <label htmlFor="seo_description">
                Meta Description
              </label>

              <textarea
                id="seo_description"
                name="seo_description"
                rows="4"
                value={
                  formData.seo_description
                }
                onChange={handleChange}
              />

            </div>

          </div>


          {/* =========================
              OPTIONS
          ========================= */}

          <div className="admin-form-section">

            <h2>
              Website Options
            </h2>


            <div className="admin-settings-options">

              <label className="admin-checkbox">

                <input
                  type="checkbox"
                  name="show_contact_form"
                  checked={
                    formData.show_contact_form
                  }
                  onChange={handleChange}
                />

                <span>
                  Show Contact Form
                </span>

              </label>


              <label className="admin-checkbox">

                <input
                  type="checkbox"
                  name="show_cv_button"
                  checked={
                    formData.show_cv_button
                  }
                  onChange={handleChange}
                />

                <span>
                  Show CV Download Button
                </span>

              </label>

            </div>

          </div>


          {/* =========================
              SAVE
          ========================= */}

          <div className="admin-form-actions">

            <button
              type="submit"
              disabled={saving}
            >
              {saving
                ? "Saving..."
                : "Save Settings"}
            </button>

          </div>

        </form>

      </section>

    </main>
  );
}

/*
|--------------------------------------------------------------------------
| IMPORTANT
|--------------------------------------------------------------------------
*/

export default AdminSettings;