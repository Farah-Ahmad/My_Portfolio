import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import cvService from "../services/cvService";

import {
  useSettings,
} from "../context/SettingsContext";


function Hero() {
  const { settings } =
    useSettings();

  const [cvUrl, setCvUrl] =
    useState("");

  const [
    cvAvailable,
    setCvAvailable,
  ] = useState(false);


  /*
  |--------------------------------------------------------------------------
  | Load Current CV
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    const fetchCv = async () => {
      try {
        const response =
          await cvService.getCurrentCv();

        const cv =
          response.data || response;

        if (cv?.url) {
          setCvUrl(cv.url);

          setCvAvailable(true);
        } else {
          setCvUrl("");

          setCvAvailable(false);
        }
      } catch (error) {
        if (
          error.response?.status === 404
        ) {
          setCvUrl("");

          setCvAvailable(false);
        } else {
          console.error(
            "Could not load CV:",
            error
          );

          setCvUrl("");

          setCvAvailable(false);
        }
      }
    };

    fetchCv();
  }, []);


  return (
    <section
      className="hero"
      id="home"
    >
      <div className="hero-container">

        {/* =========================
            LEFT SIDE
        ========================= */}

        <motion.div
          className="hero-content"
          initial={{
            opacity: 0,
            x: -50,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.7,
            ease: "easeOut",
          }}
        >

          {/* HERO LABEL */}

          <p className="hero-label">
            {settings.hero_label}
          </p>


          {/* NAME */}

          <h1>
            {settings.full_name}
          </h1>


          {/* PROFESSIONAL TITLE */}

          <h2>
            {settings.professional_title}
          </h2>


          {/* DESCRIPTION */}

          <p className="hero-description">
            {settings.hero_description}
          </p>


          {/* =========================
              BUTTONS
          ========================= */}

          <div className="hero-buttons">

            <a
              href="#projects"
              className="primary-button"
            >
              View My Work
            </a>


            {cvAvailable &&
              settings.show_cv_button && (
                <a
                  href={cvUrl}
                  className="secondary-button"
                  target="_blank"
                  rel="noreferrer"
                >
                  Download CV
                </a>
              )}

          </div>


          {/* =========================
              SOCIAL LINKS
          ========================= */}

          <div className="hero-socials">

            {settings.github_url && (
              <a
                href={
                  settings.github_url
                }
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
            )}


            {settings.linkedin_url && (
              <a
                href={
                  settings.linkedin_url
                }
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            )}

          </div>

        </motion.div>


        {/* =========================
            RIGHT SIDE
        ========================= */}

        <motion.div
          className="hero-code-card"
          initial={{
            opacity: 0,
            x: 50,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.7,
            delay: 0.2,
            ease: "easeOut",
          }}
        >

          <div className="code-card-header">
            <span></span>
            <span></span>
            <span></span>
          </div>


          <div className="code-content">

            <p>
              <span className="code-purple">
                const
              </span>{" "}

              <span className="code-blue">
                developer
              </span>{" "}

              = {"{"}
            </p>


            {/* NAME */}

            <p className="code-indent">

              name:{" "}

              <span className="code-green">
                "{settings.full_name}"
              </span>
              ,

            </p>


            {/* ROLE */}

            <p className="code-indent">

              role:{" "}

              <span className="code-green">
                "{settings.professional_title}"
              </span>
              ,

            </p>


            {/* FRONTEND */}

            <p className="code-indent">

              frontend: [

              <span className="code-green">
                "React"
              </span>

              ,{" "}

              <span className="code-green">
                "Vue.js"
              </span>

              ],

            </p>


            {/* BACKEND */}

            <p className="code-indent">

              backend: [

              <span className="code-green">
                "Laravel"
              </span>

              ,{" "}

              <span className="code-green">
                "Spring Boot"
              </span>

              ],

            </p>


            {/* DATABASE */}

            <p className="code-indent">

              database: [

              <span className="code-green">
                "MySQL"
              </span>

              ,{" "}

              <span className="code-green">
                "MongoDB"
              </span>

              ],

            </p>


            {/* PASSION */}

            <p className="code-indent">

              passion:{" "}

              <span className="code-green">
                "Building Software"
              </span>

            </p>


            <p>
              {"};"}
            </p>

          </div>

        </motion.div>

      </div>
    </section>
  );
}

export default Hero;