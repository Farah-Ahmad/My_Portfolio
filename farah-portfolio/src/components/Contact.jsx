import { useState } from "react";
import { motion } from "framer-motion";

import contactService from "../services/contactService";

import {
  useSettings,
} from "../context/SettingsContext";

function Contact() {
  const { settings } =
    useSettings();

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      subject: "",
      message: "",
      company_fax: "",
    });

  const [loading, setLoading] =
    useState(false);

  const [
    successMessage,
    setSuccessMessage,
  ] = useState("");

  const [errors, setErrors] =
    useState({});


  /*
  |--------------------------------------------------------------------------
  | Handle Input Change
  |--------------------------------------------------------------------------
  */

  const handleChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }

    if (errors.general) {
      setErrors((prev) => ({
        ...prev,
        general: null,
      }));
    }

    if (successMessage) {
      setSuccessMessage("");
    }
  };


  /*
  |--------------------------------------------------------------------------
  | Submit Contact Form
  |--------------------------------------------------------------------------
  */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) {
      return;
    }

    setLoading(true);
    setSuccessMessage("");
    setErrors({});

    try {
      const response =
        await contactService.sendMessage(
          formData
        );

      setSuccessMessage(
        response.message ||
          "Your message has been sent successfully."
      );

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        company_fax: "",
      });
    } catch (error) {
      /*
       * Validation / honeypot
       */

      if (
        error.response?.status === 422
      ) {
        const validationErrors =
          error.response?.data?.errors;

        if (
          validationErrors &&
          Object.keys(
            validationErrors
          ).length > 0
        ) {
          setErrors(
            validationErrors
          );
        } else {
          setErrors({
            general: [
              "Your message could not be sent. Please try again.",
            ],
          });
        }

        return;
      }


      /*
       * Rate limit
       */

      if (
        error.response?.status === 429
      ) {
        setErrors({
          general: [
            "Too many messages were sent. Please wait a moment and try again.",
          ],
        });

        return;
      }


      /*
       * Other errors
       */

      setErrors({
        general: [
          "Something went wrong. Please try again.",
        ],
      });
    } finally {
      setLoading(false);
    }
  };


  return (
    <section
      className="contact section"
      id="contact"
    >
      <div className="section-container">

        <div className="contact-wrapper">

          {/* =========================
              CONTACT INFO
          ========================= */}

          <motion.div
            className="contact-content"
            initial={{
              opacity: 0,
              x: -40,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
            }}
            viewport={{
              once: true,
            }}
          >

            <p className="section-label">
              Contact
            </p>


            <h2>
              Have a project or opportunity?
              <span>
                {" "}
                Let's talk.
              </span>
            </h2>


            <p className="contact-description">
              I'm open to full-stack,
              frontend, and backend
              development opportunities,
              freelance projects, and
              software collaborations.
            </p>


            <div className="contact-details">

              {/* EMAIL */}

              {settings.contact_email && (
                <motion.div
                  className="contact-item"
                  whileHover={{
                    x: 5,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                >

                  <span>
                    Email
                  </span>

                  <a
                    href={`mailto:${settings.contact_email}`}
                  >
                    {
                      settings.contact_email
                    }
                  </a>

                </motion.div>
              )}


              {/* LOCATION */}

              {settings.location && (
                <motion.div
                  className="contact-item"
                  whileHover={{
                    x: 5,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                >

                  <span>
                    Location
                  </span>

                  <p>
                    {settings.location}
                  </p>

                </motion.div>
              )}


              {/* GITHUB */}

              {settings.github_url && (
                <motion.div
                  className="contact-item"
                  whileHover={{
                    x: 5,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                >

                  <span>
                    GitHub
                  </span>

                  <a
                    href={
                      settings.github_url
                    }
                    target="_blank"
                    rel="noreferrer"
                  >
                    View GitHub Profile
                  </a>

                </motion.div>
              )}


              {/* LINKEDIN */}

              {settings.linkedin_url && (
                <motion.div
                  className="contact-item"
                  whileHover={{
                    x: 5,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                >

                  <span>
                    LinkedIn
                  </span>

                  <a
                    href={
                      settings.linkedin_url
                    }
                    target="_blank"
                    rel="noreferrer"
                  >
                    View LinkedIn Profile
                  </a>

                </motion.div>
              )}

            </div>

          </motion.div>


          {/* =========================
              CONTACT FORM
          ========================= */}

          {settings.show_contact_form && (

            <motion.form
              className="contact-form"
              onSubmit={handleSubmit}
              initial={{
                opacity: 0,
                x: 40,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.6,
                delay: 0.1,
                ease: "easeOut",
              }}
              viewport={{
                once: true,
              }}
            >

              {/* =========================
                  HONEYPOT
              ========================= */}

              <div
                className="contact-honeypot"
                aria-hidden="true"
              >

                <label htmlFor="company_fax">
                  Company Fax
                </label>

                <input
                  id="company_fax"
                  name="company_fax"
                  type="text"
                  value={
                    formData.company_fax
                  }
                  onChange={
                    handleChange
                  }
                  tabIndex={-1}
                  autoComplete="new-password"
                />

              </div>


              {/* SUCCESS */}

              {successMessage && (
                <div className="form-success">
                  {successMessage}
                </div>
              )}


              {/* GENERAL ERROR */}

              {errors.general && (
                <div className="form-error-general">
                  {errors.general[0]}
                </div>
              )}


              {/* NAME */}

              <div className="form-group">

                <label htmlFor="name">
                  Name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  value={
                    formData.name
                  }
                  onChange={
                    handleChange
                  }
                  autoComplete="name"
                />

                {errors.name && (
                  <span className="form-error">
                    {errors.name[0]}
                  </span>
                )}

              </div>


              {/* EMAIL */}

              <div className="form-group">

                <label htmlFor="email">
                  Email
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  value={
                    formData.email
                  }
                  onChange={
                    handleChange
                  }
                  autoComplete="email"
                />

                {errors.email && (
                  <span className="form-error">
                    {errors.email[0]}
                  </span>
                )}

              </div>


              {/* SUBJECT */}

              <div className="form-group">

                <label htmlFor="subject">
                  Subject
                </label>

                <input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="Project or opportunity"
                  value={
                    formData.subject
                  }
                  onChange={
                    handleChange
                  }
                />

                {errors.subject && (
                  <span className="form-error">
                    {
                      errors.subject[0]
                    }
                  </span>
                )}

              </div>


              {/* MESSAGE */}

              <div className="form-group">

                <label htmlFor="message">
                  Message
                </label>

                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  placeholder="Tell me about your project..."
                  value={
                    formData.message
                  }
                  onChange={
                    handleChange
                  }
                />

                {errors.message && (
                  <span className="form-error">
                    {
                      errors.message[0]
                    }
                  </span>
                )}

              </div>


              {/* SUBMIT */}

              <motion.button
                type="submit"
                className="contact-submit"
                disabled={loading}
                whileHover={{
                  y: loading
                    ? 0
                    : -2,
                }}
                whileTap={{
                  scale: loading
                    ? 1
                    : 0.98,
                }}
                transition={{
                  duration: 0.2,
                }}
              >

                {loading
                  ? "Sending..."
                  : "Send Message"}


                {!loading && (
                  <span>
                    →
                  </span>
                )}

              </motion.button>

            </motion.form>

          )}

        </div>

      </div>
    </section>
  );
}

export default Contact;